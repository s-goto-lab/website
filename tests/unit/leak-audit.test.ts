import { describe, it, expect, beforeAll } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { execSync } from "node:child_process";

const DIST_DIR = path.resolve(__dirname, "../../dist");

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

describe("Build Output & Leak Boundary Audit (WEB-007, WEB-008)", () => {
  beforeAll(() => {
    // Enforce a fresh production build so that audits strictly evaluate current source output
    execSync("npm run build", {
      cwd: path.resolve(__dirname, "../../"),
      stdio: "pipe",
    });
  });

  it("verifies dist/ exists and contains approved static HTML output", () => {
    expect(fs.existsSync(DIST_DIR)).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, "index.html"))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, "capabilities/index.html"))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, "about/index.html"))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, "contact/index.html"))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, "404.html"))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, "sitemap.xml"))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, "robots.txt"))).toBe(true);
  });

  it("strictly confirms /work route does NOT exist in dist/", () => {
    expect(fs.existsSync(path.join(DIST_DIR, "work"))).toBe(false);
    expect(fs.existsSync(path.join(DIST_DIR, "work/index.html"))).toBe(false);
    expect(fs.existsSync(path.join(DIST_DIR, "work.html"))).toBe(false);
  });

  it("strictly confirms internal preview route /brand-study does NOT exist in dist/", () => {
    expect(fs.existsSync(path.join(DIST_DIR, "brand-study"))).toBe(false);
    expect(fs.existsSync(path.join(DIST_DIR, "brand-study/index.html"))).toBe(false);
    expect(fs.existsSync(path.join(DIST_DIR, "brand-study.html"))).toBe(false);
  });

  it("strictly scans all files in dist/ for prohibited leak keywords", () => {
    const files = getAllFiles(DIST_DIR);
    expect(files.length).toBeGreaterThan(0);

    const forbiddenPatterns = [
      /serialnow/i,
      /phantom/i,
      /serial_now/i,
      /\/home\/s_goto/i,
      /shagoto\.me\/work/i,
      /<blockquote[^>]*testimonial/i,
    ];

    const violations: { file: string; match: string }[] = [];

    for (const file of files) {
      // Only inspect text files (html, js, css, xml, txt, json)
      if (/\.(html|js|css|xml|txt|json)$/i.test(file)) {
        const content = fs.readFileSync(file, "utf-8");
        for (const pattern of forbiddenPatterns) {
          if (pattern.test(content)) {
            violations.push({
              file: path.relative(DIST_DIR, file),
              match: pattern.toString(),
            });
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });

  it("strictly confirms no dummy or unverified mailto addresses appear in dist/", () => {
    const configuredEmail = process.env.PUBLIC_CONTACT_EMAIL?.trim();
    const files = getAllFiles(DIST_DIR);
    const violations: { file: string; email: string }[] = [];

    for (const file of files) {
      if (/\.(html|js)$/i.test(file)) {
        const content = fs.readFileSync(file, "utf-8");
        // Check for any actual mailto links (e.g. href="mailto:someone@example.com")
        const mailtoMatches = content.match(/href=["']mailto:([^"']+)["']/gi);
        if (mailtoMatches) {
          for (const match of mailtoMatches) {
            if (configuredEmail) {
              if (!match.includes(`mailto:${configuredEmail}`)) {
                violations.push({
                  file: path.relative(DIST_DIR, file),
                  email: match,
                });
              }
            } else {
              violations.push({
                file: path.relative(DIST_DIR, file),
                email: match,
              });
            }
          }
        }
      }
    }

    // When unconfigured, zero active mailto links should exist.
    // When configured, only the verified founder email is allowed.
    expect(violations).toEqual([]);
  });
});
