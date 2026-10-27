# Quality-Gated Execution Plan and Resume Prompts

The founder approved **manual STOP/PROCEED gates** and *recoverable progress inside checkpoints*. Don't confuse automatic saving of partial work with checkpoint approval. The process is meant to protect quality, not manufacture needless status files.

## Checkpoint 0 — Inspect and plan (FIRST task; no implementation)

Allowed: inspect the new project folder, relevant installed tools, approved brief; draft implementation plan inside site workspace. Not allowed: application scaffold, dependency install, remote repo/account creation, deployment.

**Exit evidence:** safe-path check, actual tool/Node status, staged plan, key trade-offs, acceptance criteria and visually reviewable artifacts plan. End STOP.

## Checkpoint 1 — Independent local Astro foundation

Requires founder `PROCEED`. Create/apply project scaffold **only inside the website folder**; setup TS, CSS tokens, page skeletons, accessible header/footer, navigation, build/lint/type/test workflow, and working local preview. No GitHub/Cloudflare changes without separate approval.

**Exit evidence:** package manifest/lockfile, build/type checks, navigable local pages at mobile and desktop, recorded commits/recovery state. End STOP.

## Checkpoint 2 — Editorial content and static visual experience

Requires `PROCEED`. Implement approved launch-safe copy drafts for founder review, responsive sections and layouts, about/capabilities/contact, typography test variants, wordmark studies, visually polished placeholders *only for legitimate non-factual art*, and disabled/excluded Work content. Do not release unapproved identity artwork as final.

**Exit evidence:** screenshots at 360, 768, 1440 widths; full nav flow; visual comparison to handoff; build tests; founder visual review. End STOP.

## Checkpoint 3 — Filament and directed cinematic motion

Requires `PROCEED` + approval of preferred actual visual direction. Implement many-to-one Filament geometry with only **one** outgoing vermilion strand, high-quality static fallback, controlled intro/reveals/transitions, reduced-motion, mobile variants, no scroll hijacking. No giant animation dependencies unless justified.

**Exit evidence:** recorded video/GIF/screenshots where possible, motion-off verification, keyboard navigation, mobile animation profiling, runtime and bundle measurements, accessible testing. End STOP.

## Checkpoint 4 — Comprehensive quality/launch candidate

Requires `PROCEED`. Test responsiveness, accessibility, real browser navigation, content audit, build output leaks, actual proof of copy, contact behavior, security, SEO, performance, privacy and 404. Fix issues; identify **launch blockers** separately from backlog improvements.

**Exit evidence:** actual automated and manual test results, key screenshots, audit table, build artifact inventory, privacy/report, rollback plan draft, list of needed public approvals. End STOP.

## Checkpoint 5 — Deployment and explicit release

Requires founder `PROCEED` for preparation AND **separate explicit release permission** for production. Confirm site Git remote, Cloudflare capability/account permission, previews/noindex, DNS isolation, and non-automatic production gate. Any deployment changes must be authorized. After release verify HTTP, HTTPS, nav, forms/email, metadata, sitemap and rollback.

**Exit evidence:** deployed URL, actual changes/commit hash, smoke-test report, known-good rollback artifact, founder acceptance. Never claim released until externally verified.

## Recovery/report format (append/update one concise status, not many files)

```text
Checkpoint: CP<n> — IN_PROGRESS | BLOCKED | VERIFIED_COMPLETE
Last verified commit: <hash, or 'none'>
Working tree: <clean / uncommitted details>
Completed: <short evidence-backed bullets>
Tests run: <exact commands and real results; don't invent>
Visual evidence: <paths or N/A>
Remaining tasks: <next bounded actions>
Risks / founder decisions: <only real blockers>
STOP condition: <why paused; next needed authorization>
```

## Model/usage interruption instructions

Before high-cost operations (full browser suites, large asset compilation, system rewrites), checkpoint recoverable state in local Git *if authorized*, and update the status. If unexpectedly interrupted, next session inspects repo/status and reruns critical tests before continuing; **never restart from scratch by assumption**. Work in coherent segments; no massive uncommitted changes at limit exhaustion.

## Reusable manual turn messages (founder only)

- `PROCEED — Authorize Checkpoint 1 only. First verify Checkpoint 0's acceptance gate. Implement exactly the next checkpoint and STOP.`
- `PROCEED — Authorize the next checkpoint only if the previous checkpoint is verified complete; otherwise STOP and report blockers.`
- `RESUME CURRENT CHECKPOINT ONLY — Inspect repo and saved status; report what is truly complete, finish the currently authorized checkpoint, and STOP. Do not advance to the next checkpoint.`
- `STOP — Save recoverable progress, report actual state and tests, and do not begin new work.`

## Anti-patterns

No 'complete in one shot', no skipping mandatory founder gates, no hiding failing tests, no 'looks okay' without browser renders, no forced dependencies, no unpublished-product fixture leaks, no automatic production deploy on normal pushes.
