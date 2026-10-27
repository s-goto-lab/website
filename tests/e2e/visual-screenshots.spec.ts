import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const viewports = [
  { name: "mobile-320", width: 320, height: 568 },
  { name: "mobile-360", width: 360, height: 640 },
  { name: "mobile-375", width: 375, height: 667 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-wide-1920", width: 1920, height: 1080 },
];

const routes = [
  { path: "/", name: "home" },
  { path: "/capabilities", name: "capabilities" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
  { path: "/404", name: "404" },
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
