# Agent Working Contract — S.goto Lab Official Website

**Read `START_HERE.md` first.** Scope is this website only, under one implementation lead: **Antigravity**. Do not assign Codex/other autonomous tools or parallel writers unless founder explicitly approves a change to that scope.

## Boundaries

1. Work only inside the explicitly opened new **website project** directory, except necessary read-only system/tool inspection. Never write into `phantom`, SerialNow, `shagoto.me` (personal site), `lab-ops`, Cloudflare or other projects. Do not copy unrelated private files or secrets.
2. No GitHub org/repository creation, Git remote addition, account permissions, CI production triggers, Cloudflare changes, subdomain DNS edits, emails, expenses, or public deployment without **separate, specific founder permission**.
3. Respect `WEB-004`: creative direction approved, final production wordmark/fonts/artwork *not* approved. Produce high-fidelity review candidates and obtain founder acceptance at visual gate; do not substitute generic SaaS visuals or an unapproved brand.
4. Initial launch is identity-first. No public SerialNow case study, screenshots, details, product link, or product roadmap until separately approved. Public `Work` route/nav, SEO/sitemap data, JSON bundles and media must not leak unapproved content.
5. All public statements must be truthful and checkable. No fake case studies, customers, review quotes, awards, employees, numbers, legal status, service guarantees or support promises. Do not publish founder-identifying details or an unverified email address.
6. If approved publisher decisions conflict with a proposed implementation detail: **STOP, show the conflict and proposal**; don't reinterpret an approval. Distinguish APPROVED, PROPOSED, ASSUMPTION, DEFERRED, RESEARCH FINDING and SUPERSEDED.
7. **Approved launch preferences (2026-10-27):** understated **named** founder attribution only after founder approves exact public wording; `mailto:` via a verified and founder-approved public email (address not yet supplied); invite inquiries about **selected commissioned solutions**, with no guarantee of accepting work. Build safe local previews; missing founder name/email are release gates, not reasons to stop normal local engineering.

## Execution model

- Complete **one checkpoint at a time**; the founder must write `PROCEED` before the next checkpoint. STOP at the end of each accepted checkpoint and on material blockers. A request to continue within the current authorized checkpoint does not authorize the next checkpoint.
- During Checkpoint 0, **read/inspect/plan only**. Do not initialize source code or create external resources.
- Once authorized, prefer coherent, small Git commits and truthful tests; do not claim a test passed unless executed and evidence recorded. A stopped/partially tested task stays IN PROGRESS.
- Make interruption recovery resilient to quota resets: before resource-heavy operations, checkpoint **recoverable local state**, describe remaining work, and save a succinct status. Do not claim the current checkpoint complete until acceptance criteria are met.
- At each gate provide: actual changed paths, commit IDs if any, tests and results, desktop/mobile visual evidence where relevant, unresolved risks, next planned checkpoint, and a clear STOP.
- Avoid elaborate role hierarchies, redundant documents, sweeping project refactors or unnecessary dependency churn.

## Design and quality priorities

Beautiful typography and art direction; signature Filament (many incoming fine paths → exactly one node → **one** continuing vermilion line); cinematic contrast; restrained interaction; problem-first commercial clarity; static-first Astro/TypeScript; actual responsive and accessibility verification; motion reduction; low runtime JS; no scroll hijack.

## Release boundary

The founder's signoff on website concept (WEB-013) is **not** approval to publish. No development commit may automatically trigger a public production release. Hold production credentials/actions outside ordinary implementation permissions where technically possible.
