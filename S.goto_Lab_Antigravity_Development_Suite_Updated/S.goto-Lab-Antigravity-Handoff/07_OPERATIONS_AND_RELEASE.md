# Hosting, Domain, Access, Contact and Production Gate

## Approved direction, not performed setup

- Temporary hostname `lab.shagoto.me` on the founder's **personal domain** only as an address. The website remains a separate Lab project and doesn't alter personal site ownership. A dedicated future domain is **DEFERRED due to cost**.
- Dedicated publisher GitHub organization and a private standalone website repository are the direction. A previous assistant reported org `s-goto-lab` and `lab-ops` setup had been completed, but this packaging session did not verify live GitHub; do **not** invent remotes or overwrite existing assets.
- Cloudflare-managed static hosting; for current documentation evaluate Workers Static Assets, with Pages an alternate where justified. A deployment product is not automatically authorized.
- No hard-coded hostname spread throughout sources; keep central site URL configuration and canonical/sitemap behavior environment-aware. Support future domain swap and permanent redirects when separately approved.

## Separation and credentials

- Antigravity writes website files only inside approved website directory; least-privilege Git access.
- No production Cloudflare token in repository or general IDE settings. Secret issuance requires founder approval; use narrow scopes and environment isolation.
- No automatic production deployment for every commit. Preview is separate from production; non-public preview if feasible; block search indexing on previews.
- Protect personal `shagoto.me` DNS, tunnel and hosted site from accidental changes. No Cloudflare DNS changes without owner approval and a rollback plan.

## Contact experience

**APPROVED founder preference (2026-10-27):** Guided Conversation with a **verified professional email `mailto:` link** as the v1 contact mechanism. Categories: discuss a problem / selected commissioned-solution inquiry, collaboration/partnership, general inquiry. A choice may prefill a subject. The **actual public address has NOT been supplied**; confirm founder-approved mailbox identity, working email destination, proper link generation, and real email-client behavior before public release. Until then, local preview uses a truthful inactive/omitted send action with no invented `hello@...`, dummy API endpoint, fake 'sent successfully', or collection of sensitive data. Hosted forms are outside approved v1 scope unless separately authorized.

## Legal and claims

No representation as a registered company unless verified. No fixed service pricing, client success claims, guaranteed response times, contractual commitments, compliance certifications, security certifications or unsupported 'world-class team' claims. **Minimal named founder attribution is approved in principle, but actual name/wording require separate founder approval before becoming public.** S.goto Lab may invite inquiries for **selected commissioned solutions**; do not claim any specific inquiry/project is accepted or that capacity is guaranteed. Public copy needs founder approval. The site must not falsely imply SerialNow is production ready.

## Production release checklist

1. Founder signs off final visual artwork, wordmark, published copy, contact address/workflow and any founder details.
2. Verify Git organization/repository and intended branch; preserve known-good code and assets.
3. Build and test exact release candidate (including static artifact leak check).
4. Verify static-host config, correct assets dir, no secret exposure, custom hostname/TLS, preview noindex, appropriate DNS separation.
5. Confirm deliberate **manual** production gate with founder; a normal development commit must not publish.
6. Founder approves release separately. Only then deploy and verify reachable host, title/canonical/robots, all navigation and contact mechanism.
7. Record tested deployment version, actual URL, errors, and rollback procedure. Stop/revert if critical regressions occur.

## Migration to future independent domain

When founder later approves purchase: add new domain, verify ownership/TLS, update central canonical and public contact assets, launch redirects from `lab.shagoto.me`, migrate sitemap/search indexing cautiously, and maintain continuity without changing brand or rebuilding Astro pages.
