import { test, expect } from "@playwright/test";

/**
 * Synthetic Laboratory Performance Verification (WEB-001)
 *
 * NOTE: These tests measure synthetic laboratory performance under Playwright Chromium.
 * Laboratory measurements provide reproducible engineering thresholds (LCP < 2.5s, CLS < 0.1),
 * distinct from Real User Monitoring (RUM) field metrics collected across diverse end-user devices.
 */
test.describe("Laboratory Performance & Asset Budget Baseline (WEB-001)", () => {
  const publicRoutes = ["/", "/capabilities", "/about", "/contact"];

  for (const route of publicRoutes) {
    test(`audits positive Core Web Vitals observations on ${route}`, async ({ page }) => {
      // Inject PerformanceObserver before DOM/scripts execute
      await page.addInitScript(() => {
        const isObserverSupported = typeof PerformanceObserver !== "undefined";

        window.__labPerformance = {
          observerSupported: isObserverSupported,
          lcp: -1,
          lcpObserved: false,
          cls: 0,
        };

        if (isObserverSupported) {
          try {
            const lcpObserver = new PerformanceObserver((entryList) => {
              const entries = entryList.getEntries();
              const lastEntry = entries[entries.length - 1];
              if (lastEntry) {
                window.__labPerformance.lcp = lastEntry.startTime;
                window.__labPerformance.lcpObserved = true;
              }
            });
            lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

            const clsObserver = new PerformanceObserver((entryList) => {
              for (const entry of entryList.getEntries()) {
                if (!(entry as any).hadRecentInput) {
                  window.__labPerformance.cls += (entry as any).value;
                }
              }
            });
            clsObserver.observe({ type: "layout-shift", buffered: true });
          } catch {
            window.__labPerformance.observerSupported = false;
          }
        }
      });

      const response = await page.goto(route, { waitUntil: "networkidle" });
      expect(response).not.toBeNull();
      expect(response!.status()).toBe(200);

      // Allow micro-animations and layout settling
      await page.waitForTimeout(600);

      const metrics = await page.evaluate(() => (window as any).__labPerformance);

      // Require supported observer: absence of observer capability is a failure, not a pass
      expect(metrics.observerSupported).toBe(true);

      // Require meaningful positive LCP observation (not 0 or unobserved default)
      expect(metrics.lcpObserved).toBe(true);
      expect(metrics.lcp).toBeGreaterThan(0);
      expect(metrics.lcp).toBeLessThan(2500); // 2.5s "Good" LCP threshold

      // Require near-zero Cumulative Layout Shift
      expect(metrics.cls).toBeLessThan(0.05);

      // Navigation Timing assertions
      const navigationTiming = await page.evaluate(() => {
        const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        if (!nav) return null;
        return {
          domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
          loadComplete: nav.loadEventEnd - nav.startTime,
        };
      });

      expect(navigationTiming).not.toBeNull();
      expect(navigationTiming!.domContentLoaded).toBeGreaterThan(0);
      expect(navigationTiming!.domContentLoaded).toBeLessThan(2000);
      expect(navigationTiming!.loadComplete).toBeLessThan(3000);
    });
  }

  test("verifies production asset hygiene and zero tracking scripts across routes", async ({ page }) => {
    for (const route of publicRoutes) {
      await page.goto(route, { waitUntil: "networkidle" });

      // Verify no third-party tracker or ad scripts
      const scriptSrcs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("script[src]")).map((s) => (s as HTMLScriptElement).src);
      });
      for (const src of scriptSrcs) {
        expect(src).not.toMatch(/google-analytics|gtag|facebook|hotjar|segment|mixpanel/i);
      }

      // Verify all stylesheet and script assets are first-party or self-hosted
      const assetLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll("link[rel='stylesheet'], link[rel='preload']"))
          .map((l) => (l as HTMLLinkElement).href);
        return links;
      });
      for (const link of assetLinks) {
        // Must not rely on Google Fonts CDN at runtime
        expect(link).not.toMatch(/fonts\.googleapis\.com|fonts\.gstatic\.com/i);
      }
    }
  });
});

declare global {
  interface Window {
    __labPerformance: {
      observerSupported: boolean;
      lcp: number;
      lcpObserved: boolean;
      cls: number;
    };
  }
}

