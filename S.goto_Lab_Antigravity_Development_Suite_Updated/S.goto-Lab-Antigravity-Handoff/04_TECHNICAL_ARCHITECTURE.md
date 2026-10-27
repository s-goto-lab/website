# Engineering Architecture — Astro Static-First

## Core approach

- Astro + TypeScript, static generation (`output: 'static'` or current equivalent) and semantic HTML.
- Build composable pages/layouts, a minimal global design system, project-specific article content structure, and CSS responsive typography.
- Use browser-native CSS and inline/asset SVG for the signature Filament; add small JS modules only when needed for interaction; avoid hydration for static content. External libraries require performance/design justification.
- No general API server, database, CMS, account system, or authentication for v1. **Approved initial contact delivery is a verified-email `mailto:` link**, not a server-side submission service. Any future form/backend would require new founder authorization and privacy/security review.
- Static-compatible Cloudflare deployment. Final Workers Static Assets vs Pages route is **not locked**; assess live official guidance and available account access at deployment stage, not during local build.

## Suggested implementation model (not mandatory directory names)

```text
src/
  layouts/           shared accessible document shell
  components/        header/footer, editorial blocks, Filament, section separators
  styles/            tokens, typography, responsive layout, reduced-motion
  pages/             public Home, Capabilities, About, Contact, 404
  content/           only launch-approved publishable material, or local drafts excluded from builds
public/              reviewed fonts/assets/icons only

# maintain actual checkpoint state near repo root, with concise test evidence and recovery instructions
```

If the site grows into a portfolio, add **typed Astro Content Collections** using current content layer APIs and a `publiclyApproved`/`publishStatus` gate that operates **at build time** (not just CSS hiding). Validation and static generation must prevent draft entries from appearing in routes, sitemap, preloads, bundled content or search indexing. The entire `/work` navigation can remain absent initially.

## Semantic and performance defaults

- Responsive-first styles including 320px mobile through large screens; fluid heading clamps, legible line lengths, thoughtful spacing.
- Minimal layout shifts, sized media and appropriate font fallbacks. Host only license-compliant optimized font formats after review.
- Structure page titles, meta descriptions, OG images (if reviewed), canonical links and sitemap. Prevent accidental indexation of previews.
- Link navigation usable without JS; motion enhancements progressive, no blocked content.
- Content Security Policy may require iterative testing; avoid third-party scripts unless needed.
- Prefer tooling bundled with Astro for type checks; target Playwright for browser tests and optionally Vitest for data/utils. Don't add every framework without a test need.

## Approved contact architecture — verified `mailto:`

Guided Conversation **UX and verified-email `mailto:` delivery** are both founder-approved. For local implementation build accessible category selection and truthful unconfigured-contact state, without any fake endpoint. Implement subject prefill carefully, percent-encoding text and avoiding inserting sensitive text by default. The public address is still **unprovided** and is a hard release blocker until founder approval and actual click/email-client testing. Do not collect/store inquiry contents client-side, install a form service, or invent an address. New submission services require a separate approval.

## Dependency and tooling discipline

Pin a working Node LTS version compatible with the selected supported Astro release; record actual versions. Use lockfile + reproducible install. Before adding a package explain why native CSS/SVG/DOM tools are insufficient. Do not require React/Next simply for animated typography. Select Cloudflare deployment method after checking actual repo/host account configuration and capabilities.

## Risk register

| Risk | Mitigation |
|---|---|
| Cinema harms mobile performance | static-first SVG, reduced motion, budget, mobile testing |
| Generic implementation diminishes identity | design-specific checkpoints with real screenshot approval |
| Contact route non-functional | publication blocker until real founder-approved email destination and working `mailto:` behavior verified |
| Unpublished product leaks | build-time content exclusion; final artifact audit |
| Accidental public deployment | no default auto-prod pipeline; founder-triggered release control |
| Usage quota interruption | commits + status + minimal next-step recovery at each safe point |
| Old publisher docs mistaken for canonical | recheck actual `lab-ops` only where needed |
