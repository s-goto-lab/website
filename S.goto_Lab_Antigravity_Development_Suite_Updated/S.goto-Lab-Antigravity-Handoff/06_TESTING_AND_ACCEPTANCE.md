# Quality Assurance and Acceptance Matrix

## Release-level requirements

| Topic | Requirement | Evidence |
|---|---|---|
| Build | Clean deterministic Astro static build and type checks | Commands, exit codes, locked package versions |
| Functional routes | `/`, `/capabilities`, `/about`, `/contact`, 404 and nav links work | Playwright + manual browser check |
| Mobile | 320/360/390 widths without horizontal scrolling/collisions | Screenshots, visual inspection |
| Tablet/desktop | 768, 1024, 1440+ widths coherent | Screenshots, visual inspection |
| Accessibility | Target WCAG 2.2 AA; functional keyboard flow; focus visible; semantic headings; link names; contrast; skip link | Automated and manual checks, limitations noted |
| Motion | Filament many→one and **one outgoing path**; content visible with JS disabled; reduced-motion stops nonessential movement | DOM/SVG inspection + motion/manual tests |
| Navigation | Menu, back/forward, deep links and browser reload work | Browser E2E results |
| Content | No fabricated statistics/clients/legal company status, personal or product disclosure | Human approval check against text + static output |
| Contact | Every live control works or is removed until verified; no secrets; safe handling | End-to-end verified email/form or release blocker |
| Public privacy | No secrets, unpublished SerialNow data/images or draft case studies in `dist`, metadata, sitemap or JS | Artifact inspection and search assertions |
| SEO | Unique page titles/descriptions, canonical links correct for approved domain, robots/sitemap, OG only with approved assets | Static HTML audit |
| Performance | Aim for CWV good thresholds; use realistic mobile lab baselines before launch, distinguish lab vs field data | Lighthouse/WebPageTest/DevTools methodology |
| Reliability | No error in ordinary browser usage, fallback fonts, graceful no-JS navigation | Browser console + manual |
| Maintained | README commands, source ownership, meaningful checkpoint status, rollback strategy | Repo audit |

## Performance reference targets (not claimed measurements)

Good Core Web Vitals targets: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at field 75th percentile. Before enough field traffic exists, conduct repeatable representative mobile lab runs; log device/network and don't claim field metrics from simulations. Keep JavaScript small; no video/autoplay or enormous SVG filters in hero unless necessity demonstrated.

## Suggested Playwright cases

1. Open each initial public route, assert main landmark, unique H1/title, no broken local links.
2. Keyboard-only navigate header and mobile menu; test Escape and focus management.
3. On reduced-motion emulation, assert no mandatory animation prevents content or buttons.
4. Inspect hero SVG structure: one outgoing Filament path after junction, intended path count; visual human review remains required.
5. Set tiny viewport, assert no horizontal overflow; ensure menu/CTAs reachable and usable.
6. Contact category selection updates truthful message/subject and doesn't lead to broken/unverified destinations.
7. Scan published HTML + JS + sitemap for forbidden private product content, personal identifiers, draft tags and bogus case studies.
8. Disable JS and verify core site content/navigation remains accessible.

## Visual acceptance checklist

- Strong, sophisticated hero—not an amateur landing page, empty dark screen, or obvious generic template.
- Wordmark optical balance and letterform craft reviewed in hero, header and small-size examples.
- Filament curves smooth and intentional; no disconnected crossings, **one outgoing** vermilion line.
- Ink/Paper/Vermilion palette accurately treated, not overused; light/dark sequence cinematic but readable.
- Carefully art-directed Capabilities/About/Contact pages with practical commercial clarity.
- No filler illustrations, fake 'product dashboard' captures, or template placeholders in release candidate.
- All layouts reviewed on at least one real browser at representative mobile and desktop sizes.

## Testing discipline

Automated WCAG tooling finds only some errors. Keep manual assessment and real rendering in the acceptance gate. If a test can't run, mark **NOT RUN**, explain why, and don't convert it into a pass. When release confidence is insufficient, STOP with a concrete remediation plan.
