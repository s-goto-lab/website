# S.goto Lab — Official Website | Antigravity Handoff Suite

**Edition:** 2026-10-27 · **status:** Founder-approved *direction*, not founder-approved production release.

## Purpose

This is a self-contained *implementation handoff*, not an already built website. It translates the founder's WEB-001–WEB-014 strategic choices into practical requirements so that **Antigravity can serve as the one implementation/integration lead for this website only**. It includes design rules, launch-safe copy drafts, build gates, test requirements, agent instructions, and the founder's Filament sketch.

Do not assume uploading/extracting this bundle creates a GitHub repository, changes Cloudflare, or syncs `lab-ops`. **No external actions have been taken by generating the package.**

## Fastest safe start

1. Create or choose an **empty, independent local directory** for the official website. Do not put it inside `phantom`, SerialNow design-lab, the personal `shagoto.me` repo, or `lab-ops`. If the intended directory already exists, inspect before adding files; never overwrite blindly.
2. Unzip **all contents of this folder** into that project directory, keeping `AGENTS.md` and `START_HERE.md` at its root. This package is documentation/reference material, not the final project scaffold.
3. Open that directory in **Antigravity**, the *only implementation tool for this project*. Start a new agent conversation, then paste `ANTIGRAVITY_KICKOFF.txt`.
4. The first agent task is **Checkpoint 0: inspect + plan only**. Do not generate application source or install dependencies during this phase. Read the plan and respond **PROCEED** only when ready to authorize Checkpoint 1.
5. At each later checkpoint, require code/tests/screenshots or other evidence, a clean stop point, a concise handoff, and a manual **PROCEED** to advance. Do not let a partial checkpoint silently count as complete.

## Governing scope

- **Publisher**: S.goto Lab. Identity: independent solutions studio and curated publisher; generates original solutions and may evaluate commissioned solutions.
- **Temporary future site URL**: `https://lab.shagoto.me` (not yet configured/verified).
- **Website stack**: Astro + TypeScript, static by default; CSS/SVG/limited JS for animation; initial no general backend or CMS.
- **Initial public content**: identity-first; home, capabilities, about, contact. **Work/SerialNow must not appear publicly absent a separate release approval.** Build an editorial-case-study *architecture* without emitting unpublished content into production output.
- **No organization-level claims**: don't claim registered legal company, staff size, clients, proven results, customer SLAs, launch readiness, or product availability without evidence and founder approval.
- **Founder-approved launch preferences (2026-10-27)**: minimal **named** founder attribution, but do not display a real name until founder approves the exact copy; contact uses a verified-email `mailto:` route, **address not yet supplied**; invite inquiries for **selected commissioned solutions**, with no commitment to accepting work. Read `08_FOUNDER_DECISIONS.md`; no unverified address or founder info in public builds.
- **Authority**: Founder approves policies, costs, new accounts, production releases, public claims. `lab-ops` (when verified live and latest) is canonical for publisher-wide rules. Site implementation docs and Git/code/tests are authoritative for this website's actual implementation. This bundled snapshot is an approved-design handoff, **not** live Git synchronization.

## Read order

1. `AGENTS.md` — non-negotiable scope and operating contract.
2. `01_APPROVED_DECISIONS.md` — what was approved, what wasn't.
3. `02_BRAND_DESIGN.md` + `references/filament_reference_notes.md` — visual definition.
4. `03_PAGES_CONTENT.md` + `content/PROPOSED_PUBLIC_COPY.md` — website narrative, navigation, approved visibility rules.
5. `04_TECHNICAL_ARCHITECTURE.md` — boundaries and suggested structure.
6. `05_CHECKPOINTS_AND_PROMPTS.md` — phases, gates, and recovery.
7. `06_TESTING_AND_ACCEPTANCE.md` — measurable quality definition.
8. `07_OPERATIONS_AND_RELEASE.md` — host, DNS, contact and release constraints.
9. `08_FOUNDER_DECISIONS.md` — few remaining business/publication settings; not blockers for local planning.
10. `09_REFERENCES.md` — current official documentation and source-status reminders.

## Non-negotiable first report

At the end of Checkpoint 0, provide: (a) observed environment and discrepancies, (b) exact files/dependencies proposed, (c) milestone acceptance plan, (d) release risk and no-publication boundaries, (e) unresolved questions *only if essential*, and (f) **STOP — awaiting founder PROCEED**.
