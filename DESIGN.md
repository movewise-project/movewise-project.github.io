---
name: Movewise
description: Home-to-Home Moving & Verified Interior Design
colors:
  paper: "#F4F0E6"
  sheet: "#FBF9F4"
  paper-deep: "#EBE5D7"
  ink: "#1C1B18"
  ink-2: "#4A463F"
  ink-3: "#6B665C"
  rule: "#DAD3C4"
  rule-strong: "#B5AC99"
  accent: "#D9531E"
  accent-strong: "#C24A17"
  accent-ink: "#B03F0F"
  accent-tint: "#FBE8DC"
  on-accent: "#FFFFFF"
  verified: "#2E6B4E"
  verified-tint: "#E1EDE5"
  warn: "#C98A12"
  warn-ink: "#7A5200"
  warn-tint: "#F7EACB"
  alert: "#B42318"
  alert-tint: "#F9E1DD"
typography:
  display:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.3rem, 5.4vw, 4.2rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body-lead:
    fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 600
    letterSpacing: "0.06em"
  data:
    fontFamily: "'IBM Plex Mono', ui-monospace, Menlo, Consolas, monospace"
    fontSize: "1.1rem"
    fontWeight: 700
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  full: "9999px"
spacing:
  gutter: "1.5rem"
  card-sm: "1.5rem"
  card-md: "2rem"
  card-lg: "2.5rem"
  section-head-gap: "4rem"
  section: "7rem"
  section-mobile: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.on-accent}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.4rem"
  button-secondary:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.75rem 1.4rem"
  button-sm:
    rounded: "{rounded.sm}"
    padding: "0.45rem 1rem"
  card:
    backgroundColor: "{colors.sheet}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card-md}"
  badge-primary:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0.35rem 0.9rem"
  choice-tile:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.md}"
    padding: "0.8rem 1rem"
  choice-tile-active:
    backgroundColor: "{colors.accent-tint}"
    textColor: "{colors.ink}"
  stat-box:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.sm}"
    padding: "0.75rem"
---

# Design System: Movewise

## Overview

**Creative North Star: "The Verified Route"**

Every piece of furniture follows one checked path: out the old door, down the stairs, into the truck and into its place in the new room. The visual system is drawn the way an architect draws that path: ink on drafting paper. The page is a warm paper field with a faint graph grid; cards are lighter sheets laid on top; walls, doors and dimensions are ink lines; construction orange marks the route and the thing you are acting on; green appears only where something has actually been verified.

The hero is a drawing sheet, not a picture: an animated floor plan where a LiDAR scanner maps the rooms and one item travels through every doorway. The pipeline track, the deliverables route, the fit simulator and the cursor truck all speak this one plan-drawing language.

The page is calm when nothing is happening and reacts precisely when touched. On hover, sheets lift a few pixels, their edge darkens and an orange edge highlight follows the pointer. Motion is long and decelerating (expo-out); nothing bounces. Density is that of a product presentation: generous section spacing (7rem), centered section heads (headline and lead, no eyebrow label), and content in 2–5 column grids.

Rejected directions: the dark "AI startup" night field with blue/violet glows, gradients of any kind on text, buttons, logos or route lines, neon halos, glass blur as decoration, eyebrow labels above headings, and emoji or unicode glyphs as icons.

**Key Characteristics:**
- Warm drafting paper (`paper`) with a 44px graph grid that fades out below the hero.
- Ink for structure and text; construction orange for the route and the action; green only for verified states.
- Lighter sheets (`sheet`) with hairline rules; no glows anywhere.
- Plan-drawing imagery: walls with section hatch, door swings, dimension lines with ticks, dashed planned routes.
- Thin-line SVG icons (1.75 stroke, round caps); furniture as floor-plan footprints.
- Long, decelerating motion; fully calmed under `prefers-reduced-motion`.

## Colors

A light, warm, low-chroma palette: paper and ink carry nearly everything, one construction orange does the pointing, and three status hues appear only in verdicts.

### Primary
- **Construction Orange** (`accent`): the route and the control in your hand. Route lines in the hero drawing and simulator, the LiDAR fan, the slider thumb, the nav underline, the scroll-progress bar, the in-progress deliverable node, the final pipeline node, the logo's route. 3.5:1 on paper, so it is used for lines, nodes and large marks, never for small text.
- **Fill Orange** (`accent-strong`): filled primary buttons and the comparison table's "How Movewise Differs" header, with white text (4.9:1).
- **Orange Ink** (`accent-ink`): orange text on paper (5.2:1): the hero accent line, slider readout, approach arrows, footer and email hovers, focus rings.
- **On Accent** (`on-accent`): white, only on Fill Orange.
- **Orange Tint** (`accent-tint`): the selected furniture tile, the comparison highlight column, text selection.

### Status
- **Verified Green** (`verified` on `verified-tint`): a pass verdict, the "Working prototype" stage, the finished deliverable node, the hero item once it is parked, door checks lighting up.
- **Warning** (`warn` lines, `warn-ink` text on `warn-tint`): only the simulator's "fits if tilted" and "fits straight, but tight" verdicts.
- **Alert Red** (`alert` on `alert-tint`): a fail verdict and the problem list's cross icons.

### Neutral
- **Paper** (`paper`): the page, the inner wells of the simulator and planner note, the hollow nodes.
- **Sheet** (`sheet`): every card, the hero drawing sheet, buttons-secondary, stat boxes.
- **Deep Paper** (`paper-deep`): alternate sections (at 55%), table headers, avatars, the slider track, the footer, wall hatch.
- **Ink** (`ink`): headings, primary text, walls, the skip link.
- **Ink 2** (`ink-2`): body copy, descriptions, nav links, icons at rest (8.2:1).
- **Ink 3** (`ink-3`): captions, stat labels, planned statuses, dimension ticks (5.0:1).
- **Rule** (`rule`): 1px hairlines on cards, tables, inputs, section dividers.
- **Strong Rule** (`rule-strong`): hover borders, secondary-button borders, dashed planned routes, the scrollbar thumb.

### Named Rules

**The Orange Points Rule.** Orange marks the route and the thing being acted on. It owns one deliberate region per screen at most (the primary button, the comparison highlight column, the selected tile) and never decorates a surface that carries no action or route.

**The Green Means Verified Rule.** Green appears only where something is confirmed: a passing verdict, a working prototype, a finished deliverable. Planned capabilities never get green; they get an orange route arrow or a hollow node.

**The Tint-on-Tint Rule.** Text on a tinted fill uses the deep ink of the same hue (`verified` on `verified-tint`, `warn-ink` on `warn-tint`, `alert` on `alert-tint`, `ink` on `accent-tint`), never a gray.

## Typography

**Display Font:** Archivo (fallback: Helvetica Neue, Arial)
**Body Font:** IBM Plex Sans (fallback: Helvetica Neue, Arial)
**Data Font:** IBM Plex Mono (fallback: ui-monospace)

**Character:** Archivo is a sturdy grotesk with the plain authority of title-block lettering. IBM Plex Sans reads like an engineer's notes: clear, slightly technical, never cute. IBM Plex Mono is the dimension text and appears only where a number is a measurement.

### Hierarchy
- **Display** (800, `clamp(2.3rem, 5.4vw, 4.2rem)`, 1.1, -0.035em): the hero headline only. Words rise in one by one; the phrase after "&" ("Verified Interior Design") is set in solid Orange Ink.
- **Headline** (700, `clamp(2rem, 3.6vw, 2.75rem)`, 1.25): section titles, centered above a lead paragraph. Fixed at 2rem on mobile.
- **Title** (700, 1.2–1.4rem, 1.25): card, step, contrast-card and document titles.
- **Body Lead** (400, 1.1rem, 1.7): section descriptions under the headline, inside a 760px column. The hero subtitle uses 1.22rem with a 780px max width.
- **Body** (400, 1rem, 1.65): default text. Card copy runs smaller (0.85–0.95rem) in Ink 2.
- **Label** (600, 0.82rem, 0.06em, uppercase): the hero affiliation badge; table headers, mobile comparison-card labels, the planner-note label and statuses use the same treatment at 0.72–0.85rem. Never as an eyebrow above a section heading.
- **Data** (IBM Plex Mono 700, 1.1rem): simulator measurements (clearance, crew, weight), slider readout, dimension text.

### Named Rules

**The Measured Number Rule.** A number that comes out of the system (a measurement, clearance or count) is set in IBM Plex Mono. Prose numbers stay in the body face.

**The Tight Heading Rule.** Every Archivo heading uses negative tracking (-0.025em, or -0.035em for display). Body text never does.

## Layout

A single centered column with a 1240px max-width container and 1.5rem gutters. Sections are separated by 7rem of vertical padding (5rem under 768px) and no divider line: alternate sections (pipeline, stakeholders, documents) sit on Deep Paper (`.section-alt`), and that change of tone is the separation. Pipeline, simulator and documents open with a centered head block (headline and lead; max 760px, lead capped at 62ch); the argument sections (about, comparison, who it's for, team) open left-aligned, which breaks the repeated rhythm followed by 4rem of space, then its content.

Grids: pipeline 4 columns, stakeholders 4, team 5, documents 3, problem/approach and simulator 2. They collapse at 1024px (pipeline and stakeholders to 2; team to 3; the pipeline track is hidden), at 768px (two-column layouts go to one; team to 2), and at 480px (everything to one column). Navigation collapses into a dropdown at 1180px; the nav PDF button loses its label at 1240px and is hidden at 768px.

Under 768px the simulator reorders to picker → drawing → verdict → slider → stats → note, so the drawing, the verdict and the slider are on screen together while dragging. The comparison table becomes one card per competitor (name, strength, limitation, then the Movewise difference), and the deliverables route turns vertical.

The hero drawing sheet is 21:9 on desktop and 4:3 under 768px.

Card padding scales with importance: 1.5rem (previews), 2rem (steps, stakeholders, documents), 2.5rem (contrast cards, simulator).

## Elevation & Depth

Depth is paper on a desk: lighter sheets on a darker page, separated by hairline rules and soft, warm, downward shadows. Nothing glows. Ordinary cards sit flat; on hover they lift a few pixels, take `shadow-md` and a Strong Rule border. Only the centerpieces carry a shadow at rest: the hero drawing sheet and the simulator (`shadow-lg`), and the approach card (`shadow-md`). The sticky header blurs the paper beneath it and gains a bottom rule once the page scrolls.

### Shadow Vocabulary
- **Lift** (`0 12px 28px -14px rgba(28,27,24,0.22), 0 2px 4px rgba(28,27,24,0.04)`): cards on hover, the comparison table, the approach card.
- **Stage** (`0 24px 50px -24px rgba(28,27,24,0.28), 0 2px 6px rgba(28,27,24,0.05)`): the hero drawing sheet and the simulator.
- **Button** (`0 8px 18px -10px rgba(217,83,30,0.7)`): the primary button; on hover it lifts 2px, darkens to Orange Ink and the shadow deepens.
- **Verified ring** (`0 0 0 4px verified-tint`): filled green route nodes.

### Named Rules

**The Weight Means Importance Rule.** At rest only the centerpieces cast a shadow. Everything else earns depth on hover or when selected. No colored halos, ever.

## Shapes

Precise, lightly rounded rectangles: 6px for small controls, tags and stat boxes; 10px for buttons, wells and tiles; 14px for cards, the simulator, the table wrapper and the hero sheet. Pills (9999px) are reserved for the affiliation badge, and the CS491 tag. Circles are used for nodes, avatars and the slider thumb. Borders are 1px rules; thicker borders appear only as route lines and node rings. A dashed Strong Rule border marks the simulator's measurement canvas.

## Components

### Buttons
- **Shape:** 10px; small variant 6px.
- **Primary:** solid Fill Orange, white text, Button shadow. Hover lifts 2px, darkens to Orange Ink. A trailing arrow slides 3px right.
- **Secondary:** Sheet fill, Strong Rule border, Ink text; hover goes white with an Ink border and lifts 2px.
- **Focus:** a 2px Orange Ink outline at 3px offset (global). The furniture tiles use an Ink outline instead, so focus never looks like the orange selected border.

### Badges
- **Style:** uppercase Label type in a pill, Sheet fill, Strong Rule border, Ink 2 text, no dot (orange is not spent on a label). Used once: the hero's university/course affiliation.

### Hero actions
One primary action ("See How It Works"). The proposal PDF lives in the header, the deliverables route and the footer, not as a second hero button.

### Line Icons
- **Style:** inline SVG, 24px grid, `stroke-width: 1.75`, round caps and joins, `fill: none`, `currentColor`. Pipeline step icons are Ink at 30px; stakeholder icons are Ink 2 and turn Orange Ink on card hover; furniture tiles use plan-view footprints. Approach and comparison bullets are Orange Ink route arrows; problem bullets are Alert Red crosses.

### Cards / Containers
- **Corner Style:** 14px (10px for team cards).
- **Background:** Sheet, going white on hover where interactive.
- **Border:** Rule; Strong Rule on hover.
- **Edge highlight:** a 240px orange radial follows the pointer around the card's 1px edge (`.spotlight::after`); there is no fill glow.
- **Contrast cards:** the problem card is a plain Sheet with Alert Red crosses; the approach card ("The Movewise Approach") has a Strong Rule border and Lift, with Orange Ink route arrows because the approach is planned, not verified.
- **Team cards:** avatar initials, name and email only; roles are added when the team decides them. Two columns down to phone width.

### Choice Tiles (furniture selector)
- **Style:** 10px tiles in a 2-column grid, Paper fill, Ink 2 text.
- **State:** hover goes white with a Strong Rule border; pressing scales to 0.97; selected takes Orange Tint, an orange 1px border plus inset ring, Ink text and an Orange Ink icon.

Below the tiles, the selected item's sample dimensions and pass thresholds are set in IBM Plex Mono.

### Range Slider
- **Track:** a 6px Deep Paper bar drawn inside a 32px tall hit area. **Thumb:** 24px. **Thumb:** orange circle with a soft orange ring that widens on hover and drag. **Focus:** 2px Orange Ink ring around the track (8px offset), thumb grows. The live value is Orange Ink mono beside the label.

### Status Banner
- **Layout:** the drawn icon leads the text, so the fail cross never reads as a close button.
- **Pass:** Verified Green on its tint. **Warn:** Warning ink on its tint, used for "fits if tilted" and "fits straight, but tight" (under the 3 cm scan tolerance). **Fail:** Alert Red on its tint. All 10px with a 1px border of the same hue, a drawn check / warning-triangle / cross icon, and `role="status"`. The clearance stat names its reference ("Clearance, straight" or "Clearance, tilted") and takes the verdict's ink color.

### Simulator Model
- A two-stop route with sample items carried lengthwise: the **front door** (the slider, 60–170 cm, with the fixed landing width marked under the track) and a **stair landing fixed at 86 cm**, labelled "straight run" because its turn is not modeled; door height is not modeled either. Items are chosen so height never matters: sofa, bed base, upright piano, dining table. The page opens on the table at 80 cm, a case where the slider visibly changes the outcome.
- At each stop the item goes in its normal pose (the opening must clear its depth) or tipped (it must clear its height), in movers' words per item: sofa upright / on its back, bed base flat / on edge, table upright / on its side, piano always upright. The normal pose is kept unless it is tight, otherwise the roomier pose wins, so widening the door never makes the verdict worse; when the normal pose is kept although tipping would give more room, the note says so.
- One rule for every number: clearance = opening − profile. Fit needs > 0 (0 cm is a jam); under 3 cm is tight (scan tolerance). The verdict carries its number so the live region announces slider changes: "Fits the whole route (+4 cm at the front door)", "Fits, but tight at the {stop} (+1 cm)", "Doesn't fit at the {stop} (−5 cm)".
- **Route strip** above the drawing: one node per stop on a dashed line (filled green pass, amber tight, hollow red fail; the tightest gets a Deep Paper ring), the stop name, then the opening, pose and clearance in mono.
- **Note** under the verdict, one or two sentences: how it gets through the tightest point, or what stops it and what a real remedy would gain (legs off), or that nothing comes off. No separate stat boxes: the strip carries the numbers.

### Simulator Drawing
- **Shows the tightest stop**, named in small mono caps top left, so the drawing always matches the verdict.
- **Plan view on one linear scale** (1.4 px per cm) for both the doorway and the item's width; the width drawn is the threshold the verdict used, so the drawing can never disagree with the verdict. Depth along the route is schematic.
- **Walls** are drawn as plan sections: Ink outline with a 45° Strong Rule hatch on Deep Paper; jambs are 3px Ink.
- **Dimension line** with end ticks above the wall, IBM Plex Mono, never covered by the item.
- **Item** is a footprint outlined in the verdict color (green pass, amber tight, red fail) with a 16% fill and an Ink label; the planned path is a dashed orange line.
- **Motion:** the item approaches once per item or verdict change, then rests: caught mid-passage when it fits (front already through, clipped just above the wall so it reads as entering the next room), nose against the wall (with a short shake) when it doesn't. When the verdict is "on its side", it approaches upright, stops at the wall, narrows to its side profile (a mono "upright" / "on its side" note travels under it; labels carry a paper halo so the dashed path never cuts them) and then goes through.

### Route Close
The documents section ends on an Ink rule, then the route-end line (half-orange node: what works today, next stop), then two actions: **Read the proposal (PDF)** as the primary for evaluators and **Email the team** as the secondary for stakeholders (to Onur Ege Yakar, the other four in cc), and one plain mono address that can be copied when no mail client opens.

### Skip Link
An Ink pill with Paper text, hidden above the viewport until focused.

### Navigation
- **Style:** sticky header on blurred paper (72% → 94% once scrolled, plus a bottom Rule), 4.5rem tall, shrinking to 4rem. Logo plus Archivo wordmark and an outlined CS491 pill.
- **Links:** five section links (How It Works, Fit Simulator, Comparison, Team & CS491, Documents) plus the Proposal button. Ink 2, 0.92rem/500. Hover and the active section turn Ink, and a solid orange underline draws in from the left.
- **Mobile:** under 1180px a 44px bordered toggle opens a full-width solid Paper dropdown; the icon switches to a cross, Escape or a tap outside closes it (Escape returns focus), menu links are 47px tall and the page behind is scroll-locked. Under 768px the proposal PDF link moves into the menu.

### Stage Status
- **Style:** uppercase Label type led by a status dot. **Working prototype:** Verified Green with a filled dot. **Planned:** Ink 3 with a hollow dot.

### Pipeline Track (signature)
A dashed Strong Rule line above the four pipeline steps that draws in from the left when it scrolls into view. Its nodes sit exactly over each column's centre and report maturity honestly: node 1 is a filled green node with a tint ring (working prototype); nodes 2 and 3 are hollow Ink 3; node 4 is hollow with an orange ring, the destination. A leader line drops from each node to its stage: solid green for the built stage, dashed for planned ones.

The stages themselves follow the drafting convention for future work: the built stage is an inked Sheet (1px Ink border, Lift); planned stages are transparent with a dashed Strong Rule border and Ink 3 icons, and their copy is in the future tense. Any new process or timeline reuses this language.

### Who It's For (stakeholder schedule)
A ruled schedule, not a card grid: an Ink rule on top, then one row per stakeholder (icon, Archivo title, Ink pain point, Ink 2 value in "would…" tense) separated by hairlines. It collapses to icon + stacked text under 768px.

### Route End
The documents section ends with one line led by a half-orange node: where the route stands today and the next stop, with the GitHub link.

### Deliverables Route (signature)
The documents section is an ordered list drawn as a route. Each card carries a 14px node on a line above it (beside it, vertically, under 768px): a filled green node for a finished deliverable, a half-orange node for the one in progress, a hollow node for scheduled ones. The segment out of a finished stop is solid Ink 2; the segment out of the stop in progress is dashed Strong Rule. Unfinished deliverables show only their status, never a disabled button. The finished deliverable's "Open PDF" is a secondary button, so the route close keeps the screen's one orange action.

### Hero Drawing Sheet
A `figure` holding the hero canvas on a graph-paper Sheet (22px grid) inside a Strong Rule frame with Stage shadow. The canvas draws Ink walls and dashed door swings; a LiDAR scanner (orange dot with a pulse ring) sweeps an orange fan and leaves an Ink point cloud with fresh orange hits; one item travels a dashed orange route through every doorway, each door lighting green as the item clears it, and turns green with a drawn tick when parked. A "Concept drawing" caption sits bottom right. The old AI concept render is no longer shown.

### Cursor Truck
On fine pointers, a tiny ink cab towing two outlined paper trailers with an orange roof stripe follows the pointer; its headlight beam is a faint orange wedge over clickable elements.

### Comparison Table
A Sheet-wrapped table with Deep Paper uppercase headers. Its section head is left-aligned. Rows brighten to Paper on hover. The "How Movewise Differs" column has a Fill Orange header with white text, an Orange Tint body with 1px orange side rules, and Orange Ink route arrows. Under 768px each row becomes a card: competitor name as the title, then strength and limitation, then the Movewise difference (tinted, Orange Ink label), its text indented past the arrow.

## Do's and Don'ts

### Do:
- **Do** keep the page on Paper with Sheet cards; depth comes from tone steps, rules and soft warm shadows.
- **Do** draw processes, timelines and flows as plan drawings: ink lines, dashed planned routes, nodes whose fill states maturity.
- **Do** keep orange for the route and the action, and keep it to one deliberate region per screen.
- **Do** use green only for things that are verified.
- **Do** set system-produced measurements in IBM Plex Mono.
- **Do** use the expo-out curve (`cubic-bezier(0.16, 1, 0.3, 1)`) and keep every animation calm under `prefers-reduced-motion`.
- **Do** use the shared thin-line SVG icon set (`.icon`, 1.75 stroke) for every icon.
- **Do** show the numbers a verdict rests on, and keep any drawing on the same scale as the verdict.
- **Do** state maturity where a capability is described: Working prototype or Planned; write planned capabilities in the future tense everywhere on the page.

### Don't:
- **Don't** bring back the dark night field, blue or violet accents, or neon glows.
- **Don't** use gradients on text, buttons, logos, route lines or progress bars; the only gradients allowed are the graph-paper grid and dashed patterns.
- **Don't** use emoji or unicode glyphs (✓ ✕ ● ○) as icons.
- **Don't** put an eyebrow badge above a section heading.
- **Don't** use colored borders thicker than 1px on cards, callouts or list items.
- **Don't** give a card a resting shadow unless it is a centerpiece.
- **Don't** put gray text on a tinted fill; use the deep ink of that hue.
- **Don't** set small text in Construction Orange; use Orange Ink.
- **Don't** use bouncy or springy easing; motion decelerates and settles.
