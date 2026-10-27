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
});
