---
name: build-awwwards-quality-sites
description: Guide for crafting award-winning, Awwwards-quality websites with immersive art direction, high-impact hero sections, smooth motion choreography, and bespoke interactions.
---

# Build Awwwards-Quality Sites

A practical methodology for designing and engineering high-impact, award-winning web experiences that combine world-class visual aesthetics, fluid motion choreography, and uncompromising performance.

---

## 1. Core Philosophy: The Art of the "Awwwards" Experience

1. **Art Direction Over Templates**:
   - Avoid generic AI clichés: no generic purple gradient blobs, no bland 3-column feature cards with generic icons, and no uninspired corporate layouts.
   - Establish a distinct design language tailored to the product domain (e.g., Swiss typography, CAD precision, architectural wireframes, tactile micro-details).
2. **Typography as Structure**:
   - Use high-contrast type pairing: an ultra-refined sans or display serif for hero headers paired with a clean monospace font for metadata, coordinates, and technical badges.
   - Use tight negative tracking (`letter-spacing: -0.03em` to `-0.05em`) on oversized display headings.
   - Maintain a disciplined vertical rhythm and generous spatial padding.
3. **The Unforgettable First Viewport (Hero)**:
   - The first 100vh must immediately captivate the visitor with an interactive, physical, or spatial moment (e.g. interactive 3D model, cursor-reactive canvas, audio/visual tactile feedback).
   - Ground the hero with an authentic product artifact (e.g. live interactive cut plane, live exploded CAD assembly, terminal session, or dynamic mock viewport).

---

## 2. Motion Architecture & Scroll Storytelling

### The Modern Motion Stack
* **Smooth Physics**: [Lenis](https://github.com/darkroomengineering/lenis) for inertial scroll damping.
* **Scroll Choreography**: [GSAP ScrollTrigger](https://github.com/greensock/gsap) for timeline-bound scrub animations and pinning.
* **Component Motion**: [Framer Motion](https://www.framer.com/motion/) or GSAP for localized layout transitions, hover magnetism, and micro-interactions.

### Signature Scroll Patterns
1. **Pinned Stage (Curtain / Scrubbed Progression)**:
   - Pin the container while scrubbing an internal camera or transforming layered elements through a sequence of steps.
2. **Scroll-Triggered Stagger Reveals**:
   - Split typography lines or characters with masked overflow (`overflow: hidden`) and translateY reveals (`y: 100%` -> `y: 0%`).
3. **Layered Parallax with Varying Speeds**:
   - Foreground items move at `speed: 1.2`, midground at `speed: 1.0`, background grids/particles at `speed: 0.4`.

---

## 3. Micro-Interactions & Tactile Details

* **Magnetic Buttons & Elements**: Elements gently attract toward the mouse cursor when within a 40px radius.
* **Border Beams & Glows**: Ultra-thin animated light beams tracing around card perimeters on hover.
* **Coordinate HUDs & Live Data**: Subtle live telemetry (cursor `(X, Y)` position, frame rate counter, current scroll progress percentage) displayed in technical monospace.
* **Spotlight Card Effects**: Radial gradient mask following mouse movement across cards to highlight subtle borders.

---

## 4. Performance & Technical Standards

* **60 / 120 FPS Rendering**:
  - Only animate `transform` (`translate3d`, `scale`, `rotate`) and `opacity`.
  - Use `will-change: transform` sparingly on active animating layers; remove after animation completes.
  - Coordinate RAF loops: Never run independent competing `requestAnimationFrame` loops. Feed Lenis RAF directly into GSAP's ticker.
* **Accessibility & Responsiveness**:
  - Respect `prefers-reduced-motion: reduce`: gracefully disable scrubbed zooms and fall back to clean fades.
  - Ensure all interactive controls have clear `:focus-visible` outlines and semantic HTML elements.

