import { test, expect } from "@playwright/test";

test.describe("Navigation & User Flow", () => {
  test("header contains all approved routes and strictly no /work link", async ({ page }) => {
    await page.goto("/");
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 768;

    if (isMobile) {
      const toggle = page.locator("#mobile-toggle");
      await expect(toggle).toBeVisible();
      await toggle.click();

      const mobileNav = page.locator("nav.mobile-nav");
      await expect(mobileNav).toBeVisible();
      await expect(mobileNav.getByRole("link", { name: "Home" })).toBeVisible();
      await expect(mobileNav.getByRole("link", { name: "Capabilities" })).toBeVisible();
      await expect(mobileNav.getByRole("link", { name: "About" })).toBeVisible();
      await expect(mobileNav.getByRole("link", { name: "Contact" })).toBeVisible();

      // Verify /work link is absent
      const workLink = mobileNav.getByRole("link", { name: /work/i });
      await expect(workLink).toHaveCount(0);
    } else {
      const nav = page.locator("header nav.desktop-nav");
      await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
      await expect(nav.getByRole("link", { name: "Capabilities" })).toBeVisible();
      await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
      await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();

      // Verify /work link is absent
      const workLink = nav.getByRole("link", { name: /work/i });
      await expect(workLink).toHaveCount(0);
    }
  });

  test("can navigate from Home to Capabilities, About, and Contact", async ({ page }) => {
    await page.goto("/");
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 768;

    if (isMobile) {
      // Mobile navigation flow
      await page.click("#mobile-toggle");
      await page.click("nav.mobile-nav >> text=Capabilities");
      await expect(page).toHaveURL(/\/capabilities/);
      await expect(page.locator("main h1")).toContainText("Start with the problem");

      await page.click("#mobile-toggle");
      await page.click("nav.mobile-nav >> text=About");
      await expect(page).toHaveURL(/\/about/);
      await expect(page.locator("main h1")).toContainText("An independent studio for purposeful work");

      await page.click("#mobile-toggle");
      await page.click("nav.mobile-nav >> text=Contact");
      await expect(page).toHaveURL(/\/contact/);
      await expect(page.locator("main h1")).toContainText("Every solution begins with a conversation");
    } else {
      // Desktop navigation flow
      await page.click("header nav.desktop-nav >> text=Capabilities");
      await expect(page).toHaveURL(/\/capabilities/);
      await expect(page.locator("main h1")).toContainText("Start with the problem");

      await page.click("header nav.desktop-nav >> text=About");
      await expect(page).toHaveURL(/\/about/);
      await expect(page.locator("main h1")).toContainText("An independent studio for purposeful work");

      await page.click("header nav.desktop-nav >> text=Contact");
      await expect(page).toHaveURL(/\/contact/);
      await expect(page.locator("main h1")).toContainText("Every solution begins with a conversation");
    }
  });

  test("contact guided conversation updates subject preview dynamically", async ({ page }) => {
    await page.goto("/contact");

    const subjectPreview = page.locator("#preview-subject");
    await expect(subjectPreview).toContainText("Problem Evaluation");

    // Select Collaboration
    await page.click('label[for="cat-collaboration"]');
    await expect(subjectPreview).toContainText("Collaboration");

    // Select General
    await page.click('label[for="cat-general"]');
    await expect(subjectPreview).toContainText("General");
  });

  test("404 page renders for unknown routes and allows returning to home", async ({ page }) => {
    const response = await page.goto("/non-existent-route-404");
    expect(response?.status()).toBe(404);
    await expect(page.locator("main h1")).toContainText("Page not located");

    await page.click('a:has-text("Return to Overview")');
    await expect(page).toHaveURL(/\/$/);
  });

  test("internal preview route /brand-study returns 404 on production host", async ({ page }) => {
    const response = await page.goto("/brand-study");
    expect(response?.status()).toBe(404);
    await expect(page.locator("main h1")).toContainText("Page not located");
  });

  test("mobile navigation is fully accessible when JavaScript is disabled", async ({ browser }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 360, height: 640 },
    });
    const page = await context.newPage();

    await page.goto("/");
    // Toggle button should be hidden in no-JS context
    const toggle = page.locator("#mobile-toggle");
    await expect(toggle).toBeHidden();

    // No-JS fallback navigation should be visible and functional
    const noJsNav = page.locator("nav.no-js-nav");
    await expect(noJsNav).toBeVisible();
    await expect(noJsNav.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(noJsNav.getByRole("link", { name: "Capabilities" })).toBeVisible();
    await expect(noJsNav.getByRole("link", { name: "About" })).toBeVisible();
    await expect(noJsNav.getByRole("link", { name: "Contact" })).toBeVisible();

    // Navigate to Capabilities using no-JS link
    await page.click("nav.no-js-nav >> text=Capabilities");
    await expect(page).toHaveURL(/\/capabilities/);
    await expect(page.locator("main h1")).toContainText("Start with the problem");

    await context.close();
  });

  test("mobile navigation supports Escape key dismissal and focus return", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/");

    const toggle = page.locator("#mobile-toggle");
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const mobileNav = page.locator("nav.mobile-nav");
    await expect(mobileNav).toBeVisible();

    // Press Escape to dismiss
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(mobileNav).toBeHidden();

    // Verify focus returned to toggle
    await expect(toggle).toBeFocused();
  });
});
