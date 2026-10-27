import { test, expect } from "@playwright/test";

test.describe("SEO, Metadata & Canonical Integrity (WEB-001, WEB-008)", () => {
  const publicRoutes = [
    { path: "/", expectedTitle: "S.goto Lab — Independent Solutions Studio & Publisher" },
    { path: "/capabilities", expectedTitle: "Capabilities — S.goto Lab" },
    { path: "/about", expectedTitle: "About — S.goto Lab" },
    { path: "/contact", expectedTitle: "Contact — S.goto Lab" },
  ];

  for (const route of publicRoutes) {
    test(`verifies SEO and OpenGraph metadata for public route: ${route.path}`, async ({ page }) => {
      await page.goto(route.path);

      // Title tag
      const title = await page.title();
      expect(title).toBe(route.expectedTitle);

      // Meta description
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(20);

      // Canonical link
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toBe(`https://lab.shagoto.me${route.path}`);

      // OpenGraph tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
      expect(ogTitle).toBe(route.expectedTitle);

      const ogDesc = await page.locator('meta[property="og:description"]').getAttribute("content");
      expect(ogDesc).toBe(description);

      const ogType = await page.locator('meta[property="og:type"]').getAttribute("content");
      expect(ogType).toBe("website");

      const ogSiteName = await page.locator('meta[property="og:site_name"]').getAttribute("content");
      expect(ogSiteName).toBe("S.goto Lab");

      // Twitter card
      const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute("content");
      expect(twitterCard).toBe("summary");

      // Verify noindex is absent on public routes
      const robotsMeta = page.locator('meta[name="robots"]');
      await expect(robotsMeta).toHaveCount(0);
    });
  }

  test("verifies noindex on error route (/404) and absence of /brand-study", async ({ page }) => {
    // /404
    await page.goto("/404");
    const notFoundRobots = await page.locator('meta[name="robots"]').getAttribute("content");
    expect(notFoundRobots).toBe("noindex, nofollow");
  });

  test("verifies robots.txt and sitemap.xml accessibility and structure", async ({ request }) => {
    // robots.txt
    const robotsRes = await request.get("/robots.txt");
    expect(robotsRes.status()).toBe(200);
    const robotsText = await robotsRes.text();
    expect(robotsText).toContain("User-agent: *");
    expect(robotsText).toContain("Allow: /");
    expect(robotsText).toContain("Sitemap: https://lab.shagoto.me/sitemap.xml");

    // sitemap.xml
    const sitemapRes = await request.get("/sitemap.xml");
    expect(sitemapRes.status()).toBe(200);
    const sitemapText = await sitemapRes.text();
    expect(sitemapText).toContain("<loc>https://lab.shagoto.me/</loc>");
    expect(sitemapText).toContain("<loc>https://lab.shagoto.me/capabilities</loc>");
    expect(sitemapText).toContain("<loc>https://lab.shagoto.me/about</loc>");
    expect(sitemapText).toContain("<loc>https://lab.shagoto.me/contact</loc>");

    // Ensure strictly no unapproved routes in sitemap
    expect(sitemapText).not.toContain("/work");
    expect(sitemapText).not.toContain("/404");
    expect(sitemapText).not.toContain("/brand-study");
  });
});
