---
name: frontend-design
description: Production frontend design framework emphasizing design thesis first, intentional color token systems, avoiding generic AI UI tropes, and accessible, responsive craftsmanship.
---

# Frontend Design

A comprehensive playbook for crafting distinctive, production-grade user interfaces that feel authored, intentional, and polished.

---

## 1. Design Thesis First

Before writing any component or markup:
1. **Identify the Product's Primary Job**: What is the core emotion and function? (e.g. For AutoBOM / Part Separator: *Uncompromising industrial precision, speed, and mathematical exactness*).
2. **Define the Visual Metaphor**: Is it a clean drafting board, an illuminated laboratory, a high-end Swiss physical watch, or an IDE?
3. **Establish Constraints**: Pick 1 primary sans font, 1 mono font, and a disciplined 5-token color palette. Do not inject random ad-hoc colors.

---

## 2. Compact Token System (Light Theme Minimalist Example)

| Token Name | Hex Code | Role |
| :--- | :--- | :--- |
| `surface-canvas` | `#FAFAFA` | Main background, soft alabaster |
| `surface-elevated` | `#FFFFFF` | Cards, popovers, floating navigation |
| `border-subtle` | `#E2E8F0` / `rgba(0,0,0,0.06)` | 1px precision hairline boundaries |
| `text-primary` | `#0F172A` | High-contrast obsidian headlines & copy |
| `text-muted` | `#64748B` | Secondary details, captions, specs |
| `accent-primary` | `#2563EB` | Cobalt / technical CAD blue indicator |
| `accent-highlight` | `#0284C7` | Interactive states, hovers, lasers |

---

## 3. Eliminating AI Visual Tropes ("AI Slop")

Avoid these overused AI design clichés:
- ❌ Garish purple-to-pink gradient text on every headline.
- ❌ Massive neon blurred spheres randomly floating behind text.
- ❌ All-caps letter-spaced labels on every single word.
- ❌ Cookie-cutter 3-card feature grids with identical circular icon backgrounds.
- ❌ Cluttered stock 3D renders with no relevance to the actual software product.

Instead, embrace:
- ✅ **Authentic Product Artifacts**: Real CAD diagrams, real wireframe cross-sections, real data tables, real dimension annotations.
- ✅ **Whitespace as Luxury**: Give elements room to breathe. Use asymmetric layouts, generous section padding (`py-28` to `py-40`), and clear hierarchy.
- ✅ **Tactile Micro-Details**: Subtle 1px grid guides, corner crosshairs `+`, hairline dividers, delicate box shadows (`0 1px 3px rgba(0,0,0,0.04), 0 20px 40px -15px rgba(0,0,0,0.03)`).

---

## 4. Typography Scale & Hierarchy

- **Display 1 (Hero)**: `clamp(2.75rem, 6vw, 5.5rem)`, `-0.035em` tracking, tight line-height `1.05`.
- **Display 2 (Section Titles)**: `clamp(2rem, 4vw, 3.5rem)`, `-0.025em` tracking, line-height `1.15`.
- **Body Large**: `1.125rem` (`18px`), line-height `1.6`, text-slate-600.
- **Monospace Telemetry**: `0.8125rem` (`13px`), `font-mono`, tracking normal, uppercase accents for technical metrics (`X: +142.50mm`, `BOM_REV: 2.4`).

---

## 5. Responsive & Accessibility Standards

- Mobile First & Fluid Typography: Use CSS `clamp()` and responsive Tailwind breakpoints (`md:`, `lg:`, `xl:`).
- Touch Targets: Interactive controls must be at least 44x44px on mobile devices.
- Focus Rings: Clean, high-contrast `:focus-visible` styling (`ring-2 ring-blue-500 ring-offset-2`).
- Contrast Ratios: Ensure normal text achieves at least 4.5:1 contrast against background surfaces.

