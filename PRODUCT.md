# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The site serves two audiences with equal weight:

- **Academic evaluators.** Bilkent University CS491/CS492 instructors, jury members and TAs who assess the senior design project. They need to see the problem, the technical approach, progress and the official deliverables.
- **Prospective product stakeholders.** Moving companies, home movers, home furnishers and furniture retailers, who evaluate Movewise as a product that could remove guesswork from a move.

## Product Purpose

Movewise plans a home-to-home move and the furnishing of the new home as one verified journey for every item, from the old door to the new room. It joins steps that today sit in separate tools: room scanning, move estimates and interior layout.

The pipeline has four stages:

1. iPhone LiDAR scanning of rooms, doors, corridors and stairs, with manual floor-plan input for spaces that can't be scanned.
2. Bottleneck and motion-feasibility analysis (the Piano Mover's Problem): clearance, tilt, rotation and door-swing checks along the whole route.
3. Truck loading in reverse unloading order (LIFO), with crew size, estimated hours and disassembly needs.
4. Destination interior layout that respects clearances, door swings, sockets and plumbing.

Success for the website: evaluators can judge the project's rigor and progress, and stakeholders understand what Movewise would do for them.

## Positioning

Existing tools each cover one part of the move. RoomPlan and magicplan scan rooms. IKEA Kreativ and Planner 5D visualize layouts. Smart Moving and ItemFits check one item at a time. Yembo quotes from inventory. Movewise links the scan to physical motion analysis, solves chained bottlenecks across the whole home, and sets the truck loading order. Present this as a difference in mechanism, never as "the first" or the only platform.

## Operating Context

- Academic project: Bilkent University Computer Engineering, CS491 & CS492 Senior Design, academic year 2026–2027.
- Deliverables are published on the site as they are completed: Short Project Proposal (done, `assets/docs/Movewise_Proposal.pdf`), Requirements & Analysis Report (in progress), Detailed Design & Architecture (scheduled).
- Hosted on GitHub Pages under the movewise-project organization.
- The real product works through a mobile LiDAR scanning app and a 3D web planning panel.

## Capabilities and Constraints

- **Maturity: early prototype.** Confirmed 2026-11-09: stage 1 (iPhone LiDAR scanning) works as a prototype; stages 2–4 (passage feasibility, truck loading order, interior layout) are planned, not built. Copy must not describe stages 2–4 as working.
- The site's Passage & Fit Simulator is an illustrative demo with sample dimensions and fixed thresholds, not the real algorithm.
- **Undecided:** individual team roles and deliverable due dates. Do not show either until the team provides them.
- Terms used consistently: "passage feasibility", "bottleneck", "Piano Mover's Problem", "reverse unloading order (LIFO)", "verified layout".

## Brand Commitments

- Name: **Movewise**. Existing logo and favicon: `assets/images/logo.svg`, `assets/images/favicon.svg`.
- Tagline in use: "Home-to-Home Moving & Verified Interior Design".
- No unverified superiority claims such as "the first platform". The current comparison-section intro ("Movewise is the first platform that…") breaks this rule and should be reworded.
- The team list is fixed and must stay exactly as written: Hüsnü Arkca, Aral Müftüoğlu, Onur Ege Yakar, Yunus Emre Aslan and Mehmet Dizdar, with their listed ug.bilkent.edu.tr emails.

## Evidence on Hand

- Project proposal PDF: `assets/docs/Movewise_Proposal.pdf`.
- Hero concept image: `assets/images/hero-concept.jpg`.
- Comparison with existing solutions (in `index.html`).
- **Absent, so do not fabricate:** testimonials, customer or partner names, user counts, benchmark or accuracy figures, pricing, and launch or availability dates.

## Product Principles

1. **Verified, not promised.** Every claim matches what the project has actually shown, at its real maturity.
2. **One journey per item.** Present scanning, moving and furnishing as one connected chain, not a list of features.
3. **Serve both readers.** Academic rigor and stakeholder value carry equal weight; neither is a footnote to the other.
4. **Explain the mechanism.** Show how feasibility is computed (clearances, rotations, bottlenecks) rather than asserting outcomes.
