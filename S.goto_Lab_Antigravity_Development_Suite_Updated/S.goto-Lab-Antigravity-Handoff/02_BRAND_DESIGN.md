# Art Direction & Visual Identity — The Filament

## Standard

The site must feel like a **sophisticated modern innovator**: Instrument-level attention to composition, but an original S.goto Lab identity. The design should inspire confidence in S.goto Lab's ability to understand practical problems and deliver elegant, working solutions. Avoid ordinary SaaS hero blocks, stock mockups, trendy glassmorphism for its own sake, trendy dot-matrix imitation, aggressive corporate sales visuals, and fake design awards.

### Approved aesthetic system

- **Filament**: multiple precise, fine continuous strands enter from one side and converge at a **single clear node**. After the node, **exactly one** continuous resolved line extends onward. No branching or parallel strands on the outgoing side. It symbolizes complexity → decision → useful solution. The user compared the feeling to a tree/timeline/Marvel TVA; this is a conceptual analogy **not** permission to reproduce Marvel artwork.
- **Identity relationship**: the Filament is an independent graphic signature; the primary wordmark `S.goto Lab` remains recognizable without it. They can appear together in hero compositions but should not be glued together in all uses.
- **Typography**: *Measured Contrast*. A precise contemporary wordmark with subtly bespoke, optically tuned letterform features; expressive editorial typography for stories and large hero moments; highly readable body/navigation type. Candidate font families can be tested, but no specific family is founder-approved. Test actual letterforms at real sizes; do **not** treat default system text as finished logo art.
- **Palette**: Ink / Paper / Vermilion. Concept reference swatches (NOT immutable brand hex tokens): near-black `#171819`, warm paper `#F4F1E9`, vermilion `#B43F30`, secondary warm-neutral greys. Validate final color tokens and text contrast. The user earlier referred to a 'blue' line, but final WEB-004 specifically approved **vermilion** convergence and outgoing line.
- **Cinematic Contrast**: atmospheric dark opening, warm editorial light stretches, intentionally used dark emphasis. The background should not be uniformly dark. Product stories should respect their own approved palette rather than inherit Lab vermilion everywhere.
- **Craft**: rhythm, negative space, careful optical alignment, dramatic yet controlled type scale, original diagrammatic motion, texture only if deliberate, subtle editorial metadata.

## Filament invariants (design and automated inspection)

1. At least three distinct incoming fine paths may be visible in the hero, all flowing into one terminal junction.
2. One and only one outgoing line exists after the junction; no second, ghosted, decorative, looping or continuing grey path on the resolved side.
3. At the convergence node, preserve clear geometry: visually no disconnected seams, ambiguous crossing, or duplicate junction nodes.
4. Colors: muted neutrals before convergence; vermilion emphasizes the point and continuing line. Keep sufficient contrast and harmony in both light/dark treatments.
5. High-quality static fallback visible without JS; motion must not be essential to reading content. CSS reduced-motion must disable large/translational effects.
6. Fast mobile composition. Motion must not block primary CTA or input, and it must not replay incessantly or scroll-hijack.
7. Original work only. The attached **user-supplied** reference image contains branches continuing after a dot; the user's explicit correction is controlling: **only one outgoing line**.

## Composition test cases

- **Hero**: full `S.goto Lab` identity, powerful original editorial headline, brief descriptive subline, clear paths to Capabilities and Contact, Filament as independent signature. Header/navigation reachable immediately.
- **Navigation**: full readable name; compact optional alternate wordmark; no Filament required for nav legibility. Display full name where space permits.
- **Small-format**: decide an independently reviewed icon variant for favicon/small surfaces, not automatically `S.`.
- **Light sections**: refined typography, generous whitespace, strong art-directed illustration where grounded. No invented work.
- **Case studies**: individual initiative's palette and visual identity can dominate the story; S.goto Lab provides a consistent editorial framework.

## Motion direction (WEB-009)

Directed Cinematic Motion: initial gentle reveal, Filament convergence, one resolved line. Use subtle text and image transitions; natural scrolling, keyboard navigation, reduced-motion alternative, mobile-first optimization. Prefer native CSS/SVG/Web APIs with measured JS. Never load external animation library without demonstrated need.

## Founder visual gate

Don't claim identity final until reviewed **real** desktop, mobile, navigation and small-format renders. Bring 2–3 high-quality, genuinely differentiated *optical refinements* to the founder, not three generic font swaps. Report fonts and licensing sources, contrast audit, asset provenance and known limitations. Keep the approved creative philosophy while allowing artistic iteration within it.
