import { test, expect } from "@playwright/test";

test.describe("Core Web Vitals & Runtime Performance Baseline (WEB-001)", () => {
  test("audits Core Web Vitals on Home (LCP < 2500ms, CLS < 0.1)", async ({ page }) => {
    // Inject PerformanceObserver before page scripts run to catch initial paint
    await page.addInitScript(() => {
      window.__vitals = {
        lcp: 0,
        cls: 0,
      };

      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            window.__vitals.lcp = lastEntry.startTime;
          }
        });
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              window.__vitals.cls += (entry as any).value;
            }
          }
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });
      } catch (e) {
        // Observers might not be supported in all contexts
      }
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600); // Allow motion/paints to settle

    const vitals = await page.evaluate(() => (window as any).__vitals);

    // Verify CLS is near 0 (< 0.05 well below 0.1 threshold)
    expect(vitals.cls).toBeLessThan(0.05);

    // Verify LCP is well below 2500ms
    expect(vitals.lcp).toBeLessThan(2500);

    // Verify navigation timing metrics
    const navigationTiming = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
        loadComplete: nav.loadEventEnd - nav.startTime,
      };
    });

    expect(navigationTiming.domContentLoaded).toBeLessThan(2000);
    expect(navigationTiming.loadComplete).toBeLessThan(3000);
  });

  test("verifies all public pages maintain lightweight DOM structure (< 500 DOM elements)", async ({ page }) => {
    const routes = ["/", "/capabilities", "/about", "/contact"];

    for (const route of routes) {
      await page.goto(route);
      const elementCount = await page.evaluate(() => document.querySelectorAll("*").length);
      // Clean, semantic HTML should be extremely lean (< 400 elements)
      expect(elementCount).toBeLessThan(400);

      // Verify no heavy third-party tracker or ad scripts injected
      const scriptSrcs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("script[src]")).map((s) => (s as HTMLScriptElement).src);
      });
      for (const src of scriptSrcs) {
        expect(src).not.toMatch(/google-analytics|gtag|facebook|hotjar/i);
      }
    }
  });
});

declare global {
  interface Window {
    __vitals: {
      lcp: number;
      cls: number;
    };
  }
}
