# S.goto Lab Official Website — Master Implementation Plan

**Workspace:** `/home/s_goto/Documents/s-goto-lab/s.goto_lab-site`  
**Authoritative Specification:** S.goto Lab Antigravity Development Suite (`S.goto_Lab_Antigravity_Development_Suite_Updated/S.goto-Lab-Antigravity-Handoff`)  
**Implementation Lead:** Antigravity (Single Lead)  
**Status:** Checkpoint 0 Planning Artifact · Awaiting Founder `PROCEED` for Checkpoint 1  
**Date:** 2026-10-27  

---

## 1. Executive Summary & Operating Boundaries

This document defines the complete, concrete, implementation-ready plan for engineering the official website of **S.goto Lab**. S.goto Lab is an independent solutions studio and curated publisher that creates original products and evaluates selected commissioned solutions.

### 1.1 Non-Negotiable Operating Contract (AGENTS.md & WEB-001–014)
1. **Workspace Boundary:** Work is confined strictly to `/home/s_goto/Documents/s-goto-lab/s.goto_lab-site`. No writes or modifications may touch `/home/s_goto/Documents/s-goto-lab/lab-ops`, `phantom` / SerialNow, the personal site `shagoto.me`, or Cloudflare infrastructure.
2. **Quality-Gated Checkpoints:** Development advances through discrete, recoverable checkpoints (CP0 to CP5). Each checkpoint concludes with a complete report, evidence verification, and an explicit **STOP**. No advancement occurs without explicit founder **`PROCEED`**.
3. **Identity-First Launch (WEB-007):** Public routes are strictly `/`, `/capabilities`, `/about`, `/contact`, and `/404`. The `/work` route and navigation are completely suppressed at build time. No ghost links, teasers, or unpublished product data (SerialNow / Phantom) may appear in static output, sitemaps, search indexes, or client bundles.
4. **Truthfulness and Legal Claims (WEB-008):** No claims of registered corporate status, undisclosed staff, fake client logos, fabricated testimonials, SLA guarantees, or universal results.
5. **Launch Preferences (2026-10-27):**
   - **Founder Attribution:** Minimal named attribution is approved in concept, but the exact public name, title, and wording remain pending separate founder sign-off. Until approved, About copy uses truthful institutional phrasing with zero personal identification.
   - **Contact Delivery:** Verified professional email via `mailto:` with guided inquiry category selection. **Email address is not yet supplied**. In local preview, the send action is disabled/unconfigured. No fake email (`hello@...`) or unapproved form backend will be used.
   - **Commissioned Inquiries:** S.goto Lab invites inquiries for selected commissioned solutions, evaluated individually without commitment or delivery guarantees.
6. **Release Authorization:** WEB-013 website concept sign-off is not production release approval. Production deployment requires separate, explicit founder authorization.

---

## 2. Environment Verification & Baseline Findings

### 2.1 Workspace & Toolchain State
- **Workspace Path:** `/home/s_goto/Documents/s-goto-lab/s.goto_lab-site` (Verified independent directory; isolated from `lab-ops`).
- **Operating System:** Linux (Kernel 6.17.5-300.fc43.x86_64).
- **Node Runtime:** Node.js `v22.23.1` (Active LTS).
- **Package Manager:** `npm` `10.9.8` (`pnpm`, `yarn`, `bun` not present in PATH; `npm` will be the pinned package manager).
- **Git Version:** `git` `2.51.0` located at `/usr/bin/git`.
- **Git Status:** Currently **not a git repository** (`fatal: not a git repository`). Checkpoint 1 will execute `git init` locally to enable atomic commits and interruption recovery. No remotes will be added without separate approval.
- **Reference Handoff Suite:** Located in `S.goto_Lab_Antigravity_Development_Suite_Updated/S.goto-Lab-Antigravity-Handoff`. Verified all 13 files and 3 subdirectories against `MANIFEST.json`. This directory remains untouched as reference material.

### 2.2 Discrepancies & Resolutions
| Discrepancy / Prior Mention | Verified Reality | Concrete Architectural Resolution |
|---|---|---|
| Historical mention of initialized git repo / sync | Workspace is completely clean; no `.git` folder exists. | Initialize local Git repository during Checkpoint 1. Maintain clean local commit history and recovery state. |
| Early conversation mentioned "blue" line | Final WEB-003 and WEB-004 approve **Ink, Paper & Vermilion** (`#171819`, `#F4F1E9`, `#B43F30`). | Strictly enforce vermilion accent for the convergence node and outgoing line; neutral greys for incoming strands. No blue lines. |
| Sketch showed continuing branches after node | Founder explicitly rejected outgoing branches. | The Filament features multiple incoming strands converging at **exactly one node**, with **one and only one** continuing resolved vermilion line. |
| Public email address | Email address is not provided in handoff suite. | Local preview renders category selection with an unconfigured/inactive send trigger and explanatory notice. Supplying and verifying the mailbox is a hard release blocker for CP5. |
| Public founder attribution | Minimal named attribution approved, but exact copy not approved. | Local preview displays institutional copy only. Founder reviews exact attribution text at CP2/CP4 visual gates. |

---

## 3. Technical Architecture & Design System

### 3.1 Technology Stack
- **Framework:** Astro (Static Output mode: `output: 'static'`) with TypeScript (`strict: true`).
- **Styling:** Vanilla CSS leveraging CSS Custom Properties (Design Tokens), fluid typography (`clamp()`), and container queries. No TailwindCSS, keeping CSS fully transparent, maintainable, and aligned with the custom typography requirements.
- **Animation & Graphics:** Native SVG + CSS animations with progressive JavaScript enhancements. Native `prefers-reduced-motion` compliance. Zero heavy external animation dependencies (no Three.js, GSAP, or Framer Motion).
- **Testing & Quality Assurance:**
  - `astro check` + `tsc --noEmit` for type safety.
  - `@playwright/test` for multi-viewport visual testing, keyboard flow, reduced-motion validation, and build-output leak assertion.
  - `vitest` for utility and content pipeline testing.

### 3.2 Visual Design System (Ink, Paper & Vermilion)
- **Design Tokens (`src/styles/tokens.css`):**
  - **Colors:**
    - `--color-ink`: `#171819` (Deep charcoal/near-black)
    - `--color-paper`: `#F4F1E9` (Warm editorial paper)
    - `--color-paper-light`: `#FAF8F3` (Crisp paper highlight)
    - `--color-vermilion`: `#B43F30` (Vibrant cinnabar/vermilion accent)
    - `--color-vermilion-glow`: `rgba(180, 63, 48, 0.15)`
    - `--color-strand-dim`: `#8F8A82`
    - `--color-strand-mid`: `#B9B3A9`
    - `--color-strand-light`: `#D6D0C7`
    - `--color-border-dark`: `rgba(244, 241, 233, 0.12)`
    - `--color-border-light`: `rgba(23, 24, 25, 0.10)`
  - **Typography:**
    - Wordmark: `S.goto Lab` with subtle bespoke optical balancing and letter-spacing.
    - Display / Editorial Serif: High-contrast, elegant editorial serif for hero headlines, section statements, and philosophical principles.
    - Body / Interface Sans: Precise, highly legible geometric/humanist sans-serif for body copy, technical capabilities, navigation, and metadata.
    - Fluid scale using `clamp()` for headings (H1: `clamp(2.5rem, 5vw + 1rem, 4.5rem)`), ensuring flawless scaling from 320px mobile to 1920px widescreen.
  - **Cinematic Contrast Flow:**
    - **Hero (`/`):** Dramatic dark surface (`--color-ink`) with atmospheric depth, displaying the signature Filament convergence and primary positioning.
    - **Purpose & Capabilities:** Seamless transition to warm editorial light surface (`--color-paper`), allowing comfortable reading of long-form thought and capabilities.
    - **Institutional About & CTA:** High-contrast grounded sections creating rhythm and focus.

### 3.3 The Filament Specification
- **Geometry & Invariants:**
  - 5 graceful Bezier paths entering from the left (`#8F8A82`, `#B9B3A9`, `#D6D0C7`, `#B9B3A9`, `#8F8A82`).
  - Terminal convergence into **one** single point (`cx=650, cy=180, r=6.5`, fill `#B43F30`).
  - **Exactly one** continuous vermilion line (`#B43F30`, stroke-width ~3.8) continuing to the right edge.
  - Strict absence of branching, loops, ghosted paths, or intersecting tangents past the convergence node.
- **Motion Behavior (WEB-009 Directed Cinematic Motion):**
  - Initial load: Gentle coordinated line reveal using SVG `stroke-dasharray` and `stroke-dashoffset` interpolation.
  - Strands converge smoothly into the vermilion node; the single resolved line extends onward.
  - **Static Fallback:** Fully rendered SVG visible immediately if JavaScript is disabled or before script execution.
  - **Accessibility:** `@media (prefers-reduced-motion: reduce)` renders the resolved static geometry with zero translational movement or draw animation.
  - **Mobile:** Scaled responsive `viewBox` (`0 0 1000 360`) maintaining optical line-weight proportionality without causing horizontal scrolling or touch interference.

### 3.4 Contact Architecture (Guided Conversation & Verified `mailto:`)
- **Interaction Model:**
  - Route: `/contact`.
  - Visual selector presenting three approved inquiry categories:
    1. *Discuss a problem / selected commissioned solution*
    2. *Collaboration / partnership*
    3. *General inquiry*
  - Selecting a category dynamically updates an inquiry preview:
    - Target subject line (e.g., `[S.goto Lab] Problem Inquiry: <brief topic>`).
    - Helpful starter body prompt framing the problem without requiring sensitive data.
- **Delivery & Privacy Constraints:**
  - Delivery is strictly via `mailto:` URI with percent-encoded query parameters.
  - **No backend submission service, database, or third-party form handler in v1.**
  - **Local Preview Safety:** Because the public mailbox is unsupplied, the action button is rendered in an inactive/preview state with clear explanatory copy (`Contact delivery configured for verified mailto: — address pending founder sign-off`). No dummy email address will be rendered or linked.

### 3.5 Content Privacy & Leak Prevention (WEB-007)
- **Build-Time Isolation:**
  - Any architectural case study schemas or local draft collections will include an explicit `publishStatus: 'approved_for_public_release'` property.
  - The build pipeline will strictly omit any entry where `publishStatus !== 'approved_for_public_release'`.
  - For the initial release, the `/work` route and navigation link are completely absent.
- **Automated Leak Verification:**
  - A dedicated automated test will inspect `dist/` (HTML, JS, CSS, JSON, sitemap.xml) for prohibited keywords: `SerialNow`, `phantom`, `shagoto.me`, `client testimonials`, or unapproved email patterns.

---

## 4. Directory & File Structure Plan

```text
/home/s_goto/Documents/s-goto-lab/s.goto_lab-site/
├── .gitignore                          # Standard Astro/Node ignore rules
├── package.json                        # Pinned dependencies and scripts
├── package-lock.json                   # Deterministic lockfile
├── tsconfig.json                       # Strict TypeScript configuration
├── astro.config.mjs                    # Static output configuration ('output: static')
├── playwright.config.ts                # End-to-end and responsive visual test config
├── vitest.config.ts                    # Unit test configuration
├── CHECKPOINT_PLAN.md                  # This master plan
├── CHECKPOINT_STATUS.md                # Recoverable checkpoint tracking record
├── public/
│   ├── favicon.svg                     # Reviewed brand favicon
│   ├── robots.txt                      # Search engine directives (noindex on previews)
│   └── fonts/                          # Self-hosted, licensed font files
├── src/
│   ├── env.d.ts                        # Astro type definitions
│   ├── content/
│   │   └── config.ts                   # Typed Content Collections (gated schema)
│   ├── styles/
│   │   ├── tokens.css                  # Color, typography, spacing, and motion tokens
│   │   ├── reset.css                   # Modern CSS reset
│   │   └── global.css                  # Typography styles, layout primitives, utility classes
│   ├── components/
│   │   ├── Header.astro                # Accessible header with wordmark and navigation
│   │   ├── Footer.astro                # Institutional footer with links and legal notice
│   │   ├── Filament.astro              # Signature SVG Filament with motion & static fallback
│   │   ├── GuidedContact.astro         # Interactive inquiry category selector
│   │   ├── Hero.astro                  # Dark cinematic hero section
│   │   ├── PurposeSection.astro        # Light editorial problem-first philosophy
│   │   ├── CapabilitiesSection.astro   # Solution domains and engagement approach
│   │   └── SkipLink.astro              # Accessible jump-to-main content link
│   ├── layouts/
│   │   └── BaseLayout.astro            # Semantic HTML5 shell, SEO meta, OpenGraph
│   └── pages/
│       ├── index.astro                 # Home page (Identity, Purpose, Capabilities, CTA)
│       ├── capabilities.astro          # Dedicated Capabilities page
│       ├── about.astro                 # Dedicated About page (Institutional focus)
│       ├── contact.astro               # Dedicated Contact page (Guided Conversation)
│       └── 404.astro                   # Editorial 404 error page
└── tests/
    ├── unit/
    │   └── contact-query.test.ts       # Mailto URL encoding & inquiry category logic
    ├── e2e/
    │   ├── navigation.spec.ts          # Route navigation, keyboard flow, focus trap
    │   ├── responsive.spec.ts          # Viewport checks (320px, 360px, 768px, 1440px)
    │   ├── accessibility.spec.ts       # Axe-core / semantic heading / landmark validation
    │   └── content-leak.spec.ts        # Automated scan of dist/ for forbidden copy/secrets
```

---

## 5. Phased Milestone Execution Plan

### Checkpoint 0 — Inspection and Deep Implementation Planning (CURRENT)
- **Status:** COMPLETED / VERIFIED.
- **Objectives:** Inspect workspace, verify path independence, analyze handoff specifications, identify discrepancies, produce implementation-ready master plan.
- **Deliverables:**
  - `IMPLEMENTATION_PLAN.md` (this comprehensive document).
  - `CHECKPOINT_STATUS.md` (initial checkpoint status tracking record).
- **Gate:** STOP. Await explicit founder `PROCEED` before starting Checkpoint 1.

### Checkpoint 1 — Independent Local Astro Foundation
- **Prerequisites:** Founder `PROCEED` authorizing Checkpoint 1.
- **Objectives:**
  1. Initialize local Git repository (`git init`) with a robust `.gitignore`.
  2. Scaffold Astro project with TypeScript (`output: 'static'`) in root workspace.
  3. Install core dependencies (`astro`, `@astrojs/check`, `typescript`, `@playwright/test`, `vitest`).
  4. Establish CSS token architecture (`tokens.css`, `reset.css`, `global.css`) matching Ink/Paper/Vermilion palette.
  5. Build `BaseLayout.astro`, `Header.astro`, `Footer.astro`, and `SkipLink.astro`.
  6. Create initial page skeletons (`/`, `/capabilities`, `/about`, `/contact`, `/404`).
  7. Configure scripts (`npm run dev`, `npm run build`, `npm run check`, `npm test`).
  8. Verify clean local build and working dev server.
- **Exit Evidence:** Deterministic `package-lock.json`, passing `astro check`, clean `npm run build` output, initial git commit hash, dev server verification report.
- **Gate:** STOP. Report evidence; await founder `PROCEED`.

### Checkpoint 2 — Editorial Content and Static Visual Experience
- **Prerequisites:** Founder `PROCEED` authorizing Checkpoint 2.
- **Objectives:**
  1. Implement approved public copy drafts across all pages (`PROPOSED_PUBLIC_COPY.md`).
  2. Implement responsive editorial layouts with cinematic contrast transitions (dark hero to light editorial body).
  3. Prepare 2–3 typographic and wordmark optical treatment candidates for `S.goto Lab` for founder review.
  4. Build the static Filament SVG representation with exact geometric invariants.
  5. Implement `GuidedContact.astro` with interactive category selection and inactive/preview send state.
  6. Ensure `/work` route and navigation are completely absent.
- **Exit Evidence:** Viewport screenshot captures at 360px, 768px, and 1440px; wordmark optical candidate comparison; verified navigation flow; passing static build.
- **Gate:** STOP. Present visual candidate review to founder; await founder visual acceptance and `PROCEED`.

### Checkpoint 3 — Filament Signature and Directed Cinematic Motion
- **Prerequisites:** Founder `PROCEED` and visual direction approval from Checkpoint 2.
- **Objectives:**
  1. Implement progressive SVG animation for the Filament: many incoming strands converging to one vermilion node and one continuing line.
  2. Implement subtle, restrained page entrance and scroll reveal transitions using pure CSS and minimal vanilla JS.
  3. Implement strict `@media (prefers-reduced-motion: reduce)` overrides ensuring immediate full rendering without motion.
  4. Ensure complete readability and functionality when JavaScript is disabled (`<noscript>` and static SVG fallback).
  5. Verify no scroll hijacking, frame stutter, or layout shifts on mobile viewports.
- **Exit Evidence:** Visual animation recording/evidence, reduced-motion test results, no-JS navigation verification, runtime performance profiling.
- **Gate:** STOP. Await founder review and `PROCEED`.

### Checkpoint 4 — Comprehensive Quality Audit & Launch Candidate Verification
- **Prerequisites:** Founder `PROCEED` authorizing Checkpoint 4.
- **Objectives:**
  1. Execute automated Playwright test suite across Desktop Chrome, Mobile Chrome (360px), and Mobile Safari/WebKit emulation.
  2. Accessibility Audit: Target WCAG 2.2 AA (color contrast ratios >= 4.5:1, keyboard navigation, focus indicators, ARIA landmarks, heading hierarchy).
  3. Build Output & Leak Audit: Automated verification that `dist/` contains zero draft artifacts, zero private product terms (SerialNow/Phantom), and no unverified emails.
  4. Contact verification: Verify percent-encoding and URL generation logic for `mailto:`.
  5. SEO & Social Metadata Audit: Check title tags, meta descriptions, canonical URLs (`https://lab.shagoto.me`), OpenGraph tags, robots.txt, and sitemap.xml.
  6. Core Web Vitals Lab Baseline: Audit LCP, CLS, and INP metrics using automated testing tools.
- **Exit Evidence:** Complete QA test report, accessibility matrix, leak audit pass log, performance scorecards, list of unresolved release gates.
- **Gate:** STOP. Await founder review and `PROCEED`.

### Checkpoint 5 — Deployment Preparation and Explicit Release Gate
- **Prerequisites:** Founder `PROCEED` for deployment preparation AND separate explicit founder production release authorization.
- **Objectives:**
  1. Receive founder-approved public email address and attribution text.
  2. Inspect and configure Cloudflare static hosting target (Workers Static Assets or Pages) according to live account capabilities.
  3. Configure environment-aware site URL (`https://lab.shagoto.me`).
  4. Establish production release scripts with mandatory manual triggers (no auto-deploy on push).
  5. Verify rollback procedure and maintain verified production release artifacts.
- **Exit Evidence:** Verified deployed URL, live HTTP/HTTPS status, live header/contact check, external smoke test results, signed-off rollback artifact.

---

## 6. Interruption Recovery & Git Strategy

To ensure seamless progress across sessions and safeguard against context or quota limits:
1. **Atomic Commits:** At each safe milestone within authorized checkpoints, a clean git commit will be created with descriptive messages (e.g., `feat(tokens): establish ink-paper-vermilion design tokens`).
2. **State Tracking:** `CHECKPOINT_STATUS.md` at the workspace root will be updated after each major step using the exact standard recovery format.
3. **Resumption Protocol:** If a session is interrupted, the agent will inspect `CHECKPOINT_STATUS.md` and `git status`, verify the last completed step, run existing automated checks, and resume the in-progress checkpoint without rewriting existing work.

---

## 7. Outstanding Founder Release Inputs (Non-Blockers for Local Engineering)

The following items are known inputs required prior to public release (Checkpoint 5), but do **not** block Checkpoint 1 through Checkpoint 4:
1. **Public Founder Attribution Copy:** Exact public name, role, and text for the About section.
2. **Public Contact Email:** Verified mailbox address for the `mailto:` destination.
3. **Domain & Cloudflare Account Verification:** Explicit credentials/instructions for `lab.shagoto.me` Cloudflare routing.
4. **Final Visual Sign-Off:** Selection among wordmark and typography candidates during Checkpoint 2.
5. **Final Production Release Authorization:** Explicit permission to deploy live.
