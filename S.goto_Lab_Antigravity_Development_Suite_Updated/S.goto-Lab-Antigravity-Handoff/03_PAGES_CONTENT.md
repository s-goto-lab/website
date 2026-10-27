# Site Map, Visitor Narrative, and Content Rules

## Approved long-term architecture

**Home / Work / Capabilities / About / Contact**. Home uses identity-to-work narrative: Identity → Purpose → Work → Capabilities → About → Engage. Secondary pages each receive considered editorial compositions (not disposable templates).

## Initial launch visibility (WEB-007 overrides any otherwise-public work assumptions)

- **Public routes initially**: `/`, `/capabilities`, `/about`, `/contact`, plus usable `/404` or equivalent. No public `/work` page or navigation until the founder approves real publishable case-study content. No ghost `Work` nav link, empty 'coming soon' portfolio, teaser for unpublished projects or SerialNow references in public metadata/sitemap.
- **Private architecture**: prepare a composable case-study template/data model and design specs in source/docs as needed, but exclude all unapproved entries/routes/images from output. Never have drafts or test fixtures leak into published JS bundles, static pages, sitemap, or search index.
- **Home while Work private**: identity → purpose → capabilities / approach → accountable about → inquiry. Avoid empty Work sections; adapt gracefully without breaking aesthetic narrative.
- **Future case studies**: editorial introduction; *real problem*, constraints, solution, selected visuals, role of Lab, implementation/status evidence, next legitimate action. Only founder-approved claims and images. Respect client confidentiality and product ownership.

## Visitor types

1. Curious visitor: understand identity and published work.
2. Organization/person with an operational problem: understand problem-first capabilities, request evaluation.
3. Potential collaborator: learn about philosophy and initiate contact.
4. Existing product user: direct to an actual separate product support path **only when authorized**; not automatically handled in general Lab form.

## Page responsibilities and suggested narrative

### Home `/`

- Hero: brand name, intelligent concise positioning, visual Filament, clear 'Explore capabilities' and 'Discuss a problem'. Accessible from first paint.
- Purpose: real-world friction, unnecessary manual work, inefficient routines, information discontinuities, with practical orientation.
- Present value approach: understand problem; design proportionate solution; build/verify (avoid unsupported universal results claims).
- Capabilities preview: software, operational systems, workflow automation, specialized tools; presented as possible means to address challenges, not 'we build anything'.
- Institutional credibility: transparent independent studio/publisher; selected, selective commissioned work; no fake offices, clients, employees, statistics.
- Final CTA: guided invitation to inquire, including general questions.
- Work section only when publicly approved projects exist.

### Capabilities `/capabilities`

- Start with pains: repetitive tasks, disconnected operations, difficult access to information, avoidable manual coordination.
- Then possible approaches: purpose-built applications, workflow automation, internal operations systems, integrations, research/prototyping where relevant.
- State that scope is evaluated individually; do not imply project acceptance before a conversation. Avoid stack-name dumping and exaggerated capability claims.
- How engagement *may* proceed: discuss problem → assess fit/constraints → clarify proposed solution → agree on scope/terms → develop/test/hand off, if mutually agreed.
- CTA to contact; no invented portfolio or pricing packages.

### About `/about`

- Independent Institution: what Lab is, why it exists, what it values, original and selected commissioned models.
- **APPROVED preference**: minimal *named* founder attribution, displayed only after founder reviews and approves the precise text and name for public use. Until then, use truthful institutional wording without identifying the founder. No invented profile/role, corporate registration, team photographs, or personal details imported from memory.
- Link to actual public work when ready; in meantime focus on truthful process and intent.
- CTA to contact.

### Contact `/contact`

- **APPROVED launch mechanism**: Guided Conversation leads to a **verified professional email `mailto:` link**. Use clear routes for (a) discuss a problem / inquire about a **selected commissioned solution** (b) partnership/collaboration (c) general inquiry. The three choices may prefill accurate, non-sensitive subject lines and optional concise body starters. No hosted form or collecting submissions on the site without new founder approval.
- Keep inquiry friction low: no required budget, attachments or detailed specifications. **Selected commissioned inquiries are welcome to be evaluated**, but contacting the Lab does not mean the work is accepted, and no availability, price, outcome or response time is guaranteed.
- **Implementation rule for local preview**: Build the complete category-selection/contact layout, but the public email address is **not yet supplied**. Keep unconfigured send links visibly inactive or absent, with truthful explanatory text; no fabricated `mailto:`, dummy address, fake clickable controls, or insecure unconfigured form. A real public contact launch is **blocked** until the founder supplies and approves a working address, end-to-end verifies each `mailto:` action, and separately authorizes release. Local development may continue.
- Privacy: don't request passwords, health/patient data, financial records or confidential datasets via general inquiry. If adding submission service, first review spam/rate limiting, data retention/privacy, error/success semantics and third-party processors.

## Navigation and UX

- Show full S.goto Lab identity and links for available public routes. On mobile implement a real functional keyboard-friendly menu, visible focus, correct aria labels and escape behavior.
- Real conventional links and back/forward behavior; no fake buttons or scroll hijacking. No dependency on motion for content.
- Correct `/404`, footer links, consistent active indication. Treat SEO/OpenGraph and actual public site path carefully: canonical host `https://lab.shagoto.me` after setup approval; previews must not be indexed.
- Prioritize well-composed pages over artificially long copy; responsive whitespace, legible typography, purposeful imagery.
