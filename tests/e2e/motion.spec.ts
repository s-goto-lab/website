import { test, expect } from "@playwright/test";

test.describe("Filament Signature & Directed Cinematic Motion (WEB-009)", () => {
  test("preserves exact geometric invariants in DOM (5 incoming -> 1 node -> 1 resolved line)", async ({ page }) => {
    await page.goto("/");

    const filament = page.locator(".filament-svg");
    await expect(filament).toBeVisible();

    // 5 incoming neutral paths
    const incomingPaths = filament.locator("path.strand");
    await expect(incomingPaths).toHaveCount(5);

    // Exactly 1 terminal convergence node
    const node = filament.locator(".node--resolved");
    await expect(node).toHaveCount(1);
    await expect(node).toHaveAttribute("cx", "650");
    await expect(node).toHaveAttribute("cy", "180");
    await expect(node).toHaveAttribute("fill", "#B43F30");

    // Exactly 1 outgoing resolved strand (no duplicate or branching paths)
    const resolvedPath = filament.locator("path.strand--resolved");
    await expect(resolvedPath).toHaveCount(1);
    await expect(resolvedPath).toHaveAttribute("stroke", "#B43F30");
    await expect(resolvedPath).toHaveAttribute("d", "M 650,180 H 975");
  });

  test("renders static fallback immediately when JavaScript is disabled", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto("/");
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".filament-svg")).toBeVisible();
    await expect(page.locator('.hero-actions >> text=Discuss a Problem')).toBeVisible();

    await context.close();
  });

  test("strict reduced-motion overrides disable motion and render resolved state", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();

    await page.goto("/");
    const filament = page.locator(".filament-svg");
    await expect(filament).toBeVisible();

    // Verify computed stroke-dashoffset is 0 (fully drawn with no animation)
    const resolvedLine = filament.locator(".strand--resolved");
    const strokeDashoffset = await resolvedLine.evaluate((el) => {
      return window.getComputedStyle(el).strokeDashoffset;
    });

    expect(["0px", "0", "none"]).toContain(strokeDashoffset);

    // Verify node is fully visible (opacity: 1)
    const node = filament.locator(".node--resolved");
    const nodeOpacity = await node.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });
    expect(nodeOpacity).toBe("1");

    await context.close();
  });

  test("mobile viewport (360px) maintains visual proportionality without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/");

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Verify hero actions remain clickable on mobile
    const discussBtn = page.locator('.hero-actions >> text=Discuss a Problem');
    await expect(discussBtn).toBeVisible();
  });
});
