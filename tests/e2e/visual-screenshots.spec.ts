import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const viewports = [
  { name: "mobile-360", width: 360, height: 640 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

const routes = [
  { path: "/", name: "home" },
  { path: "/capabilities", name: "capabilities" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/brand-study", name: "brand-study" },
];

test.describe("Visual Evidence Captures", () => {
  for (const vp of viewports) {
    test(`Capture all routes at ${vp.name} (${vp.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      const outputDir = path.join(process.cwd(), "screenshots", vp.name);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      for (const route of routes) {
        await page.goto(route.path);
        await page.waitForLoadState("networkidle");
        const screenshotPath = path.join(outputDir, `${route.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
      }
    });
  }
});
