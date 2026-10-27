# Founder Decisions and Authority — Website Snapshot

This summarizes **founder-confirmed conversation approvals** made through 2026-10-27. It is a handoff summary, not a claim that these decisions have already been committed to the current `lab-ops` repository. Check actual canonical files before publisher-wide changes. Source excerpts provided with the handoff were draft/review documents; a previous conversational report said `lab-ops` existed and had been synced, but that state was **not reverified during packaging**.

| ID | Status | Founder decision | Implementation effect |
|---|---|---|---|
| WEB-001 | APPROVED | Official identity + selected work; not personal portfolio/SerialNow sales page | Institution and publisher-first framing |
| WEB-001A | APPROVED | Independent Solutions Studio & Publisher; original products and selective commissioned work | Real commercial pathway, no fake promises |
| WEB-002 | APPROVED | Contemporary Editorial Experimentalism | Conceptual 60% editorial / 30% contemporary / 10% experimental |
| WEB-003 | APPROVED | Ink, Paper & Vermilion; official primary name is `S.goto Lab` | Restrained palette; no approved blue exception |
| WEB-004 | APPROVED (direction) | Filament Identity; Measured Contrast; Subtly Bespoke lettering; independent coordinated wordmark and Filament | Finished logo/fonts and artwork require separate visual acceptance |
| WEB-005 | APPROVED | Cinematic Storytelling **with Purposeful Exploration** | Cinema throughout, usable navigation throughout |
| WEB-006 | APPROVED | Curated Publisher Headquarters | Home + Work + Capabilities + About + Contact concept |
| WEB-006A | APPROVED | Identity → Purpose → Work → Capabilities → About → Engage | If Work unavailable publicly, omit rather than fabricate |
| WEB-006B | APPROVED | Editorial Case Studies | Each approved project is a problem/solution/evidence story |
| WEB-006C | APPROVED | Problem-First Capabilities | Speak to friction/inefficiency before technology |
| WEB-006D | APPROVED | Independent Institution | Organization first, authentic but proportionate founder accountability |
| WEB-006E | APPROVED | Guided Conversation | Inquiry purpose selection; lightweight contact route |
| WEB-007 | APPROVED | Identity-First Launch | Public Work/SerialNow **withheld pending separate approval** |
| WEB-008 | APPROVED | Accountable Independent Studio | Don't impersonate a registered/legal/larger organization |
| WEB-009 | APPROVED | Directed Cinematic Motion | Controlled animation, no forced scrolling, reduced motion/mobile first |
| WEB-010 | APPROVED | Progressive Static Architecture (Astro) | Astro/TS; static-first; no unnecessary backend/CMS |
| WEB-011 | APPROVED (direction) | Separate publisher repo, Cloudflare-managed static hosting, temporary `lab.shagoto.me` | Domain buy deferred; external setup needs separate authorization |
| WEB-012 | APPROVED | Quality-Gated Development | Recoverable checkpoints; manual founder `PROCEED`; release separately gated |
| WEB-013 | APPROVED | Consolidated website concept | Approves vision **not** actual implementation or public release |
| WEB-014 | APPROVED (sequence) | Reuse prior verified setup; check only new/unknown website-specific items | No unnecessary broad organizational audit |
| Launch preferences (2026-10-27) | APPROVED (conversation-level) | Minimal **named** founder attribution **only after founder approves the exact public wording**; verified-email `mailto:` contact; allow inquiries about **selected commissioned solutions** | Build the experience now with safe placeholders; do not expose a founder name or invented email or imply a commission is accepted. Public release remains separately gated. |

## Publisher-wide constraints

The founder-approved publisher is a selective creator/publisher of products, systems, research, solutions and ventures; **not** a catch-all for founder personal work. The first selected product is SerialNow., with `phantom` as the Codex-led engineering codename. These are distinct identities. Do not modify/migrate Phantom by default.

## Remaining decisions are not blockers for local planning

- Exact final wordmark glyphs, typography/font licenses, responsive logo versions, motion art direction signoff.
- Exact public founder name/attribution wording **still awaits founder approval** (minimal named attribution has been selected).
- **Verified public email address still missing**; `mailto:` is approved as the contact mechanism, but it cannot be enabled for public release until the address is supplied, tested and approved. No hosted form for v1 absent a new decision.
- Public proof/case studies and SerialNow disclosures separately approved.
- Actual GitHub org/repo state, Cloudflare method, secrets and DNS, explicit release approval.

## Source of truth hierarchy

1. Actual latest reviewed Git `lab-ops` for **publisher** rules, if accessible and verified.
2. Actual approved website design decisions, this handoff, then website repository source/tests for **site-specific implementation**.
3. Product-owned documentation for **SerialNow facts**; do not treat this suite as product authority.
4. Tool reports, conversation summaries, and copied PDFs/MDs are supporting evidence, **not** automatic live synchronization.

If sources conflict, cite and flag conflict for founder; don't silently pick the more convenient interpretation.
