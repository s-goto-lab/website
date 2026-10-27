import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const testRoutes = ["/", "/capabilities", "/about", "/contact", "/404", "/brand-study"];

for (const route of testRoutes) {
  test(`accessibility audit for route ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();

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
