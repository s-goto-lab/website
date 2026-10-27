import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const testRoutes = ["/", "/capabilities", "/about", "/contact", "/404"];

for (const route of testRoutes) {
  test(`accessibility audit for route ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator("main")).toBeVisible();
    // Allow keyframed entrance animations (up to 0.9s duration + 0.45s delay) to fully settle
    await page.waitForTimeout(1200);

    const results = await new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22aa",
      ])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
