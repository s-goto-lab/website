import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(__dirname, "../../");

describe("S.goto Lab Baseline Project Configuration & Asset Assertions", () => {
  it("verifies brand color tokens in tokens.css conform to Ink, Paper & Vermilion invariants", () => {
    const tokensPath = path.join(projectRoot, "src/styles/tokens.css");
    const tokensContent = fs.readFileSync(tokensPath, "utf-8");

    // Verify core brand palette custom properties
    expect(tokensContent).toMatch(/--color-ink:\s*#171819;/i);
    expect(tokensContent).toMatch(/--color-paper:\s*#F4F1E9;/i);
    expect(tokensContent).toMatch(/--color-vermilion:\s*#B43F30;/i);

    // Verify typography token references Newsreader
    expect(tokensContent).toMatch(/--font-serif:\s*"Newsreader"/i);
  });

  it("verifies Header component navigation contains approved routes and strictly excludes /work", () => {
    const headerPath = path.join(projectRoot, "src/components/Header.astro");
    const headerContent = fs.readFileSync(headerPath, "utf-8");

    // Nav items must include all approved public destinations
    expect(headerContent).toContain('href: "/"');
    expect(headerContent).toContain('href: "/capabilities"');
    expect(headerContent).toContain('href: "/about"');
    expect(headerContent).toContain('href: "/contact"');

    // Negative assertions: must never include unpublished work or internal preview
    expect(headerContent).not.toContain('href: "/work"');
    expect(headerContent).not.toContain('href: "/brand-study"');
  });

  it("verifies production pages directory contains only approved public routes and 404", () => {
    const pagesDir = path.join(projectRoot, "src/pages");
    const pageFiles = fs.readdirSync(pagesDir);

    expect(pageFiles).toContain("index.astro");
    expect(pageFiles).toContain("capabilities.astro");
    expect(pageFiles).toContain("about.astro");
    expect(pageFiles).toContain("contact.astro");
    expect(pageFiles).toContain("404.astro");

    // Brand study must be isolated from production pages directory
    expect(pageFiles).not.toContain("brand-study.astro");
    expect(pageFiles).not.toContain("work.astro");
  });

  it("verifies package.json scripts and project metadata", () => {
    const pkgPath = path.join(projectRoot, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    expect(pkg.name).toBe("s.goto-lab-site");
    expect(pkg.scripts).toHaveProperty("build");
    expect(pkg.scripts).toHaveProperty("check");
    expect(pkg.scripts).toHaveProperty("test");
    expect(pkg.scripts).toHaveProperty("preview");
  });
});

