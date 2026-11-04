# AGENTS.md — MacSolid / Part Separator Landing Page

Welcome to the **MacSolid / Part Separator** creative frontend engineering repository. This document defines the operational rules, design philosophy, technical guidelines, and active skills catalog for developing an ultra-minimalist, Awwwards-quality landing page with modern scroll-driven animations and animated backgrounds.

---

## 1. Project Context & Product Foundation

* **Core Software**: **MacSolid / Part Separator** (Reference: `C:\Users\gaash\Desktop\PS\PART SEPERATOR`).
* **Domain**: High-performance CAD assembly analysis, automated Bill of Materials (BOM) extraction, multi-threaded C++ STEP parsing, and 60 FPS GPU cross-section inspection.
* **Target Audience**: Mechanical engineers, CAD designers, manufacturing leads, sheet metal / CNC estimators.
* **Visual Identity**: Ultra-minimal light theme ("Swiss Precision CAD"), mathematical exactness, subtle coordinate grids, high-contrast typography, and fluid inertial scroll choreography.

---

## 2. Active Skills Catalog & Knowledge Base

This project uses modular skills located in [`.agents/skills/`](./.agents/skills/). Consult these skills for architectural patterns, component recipes, SEO strategies, and animation standards:

| Skill | Path | Primary Role & Core Capabilities | External Reference |
| :--- | :--- | :--- | :--- |
| **`build-awwwards-quality-sites`** | [SKILL.md](./.agents/skills/build-awwwards-quality-sites/SKILL.md) | Awwwards-caliber art direction, high-impact hero sections, scroll storytelling, micro-interactions, and 60 FPS performance budgets. | [MengTo/Skills](https://github.com/MengTo/Skills/blob/main/agent-skills/web-design/build-awwwards-quality-sites/SKILL.md) |
| **`frontend-design`** | [SKILL.md](./.agents/skills/frontend-design/SKILL.md) | Design thesis first, compact token systems, anti-AI-slop guidelines, WCAG accessibility, and fluid typography. | [Anthropic Frontend Design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) |
| **`skill-creator`** | [SKILL.md](./.agents/skills/skill-creator/SKILL.md) | Standards for creating, refining, and documenting agent skills using YAML frontmatter and progressive disclosure. | [Anthropic Skill Creator](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md) |
| **`lenis-scroll`** | [SKILL.md](./.agents/skills/lenis-scroll/SKILL.md) | Lenis inertial smooth scroll engine, ticker synchronization with GSAP ScrollTrigger, and nested scroll management. | [darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) |
| **`gsap-animation`** | [SKILL.md](./.agents/skills/gsap-animation/SKILL.md) | GSAP timeline scrubbing, pinned interactive stages (exploded CAD view), scroll-triggered stagger reveals, and split text. | [greensock/gsap](https://github.com/greensock/gsap) |
| **`react-bits`** | [SKILL.md](./.agents/skills/react-bits/SKILL.md) | Animated canvas grids (Squares), ethereal text reveals (BlurText, SplitText), magnetic cursor buttons, and spotlight cards. | [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) |
| **`vanta-backgrounds`** | [SKILL.md](./.agents/skills/vanta-backgrounds/SKILL.md) | WebGL 3D dynamic mesh and coordinate backgrounds (Topology, Net) tuned for minimal light-theme contrast. | [tengbao/vanta](https://github.com/tengbao/vanta) |
| **`21st-dev-components`** | [SKILL.md](./.agents/skills/21st-dev-components/SKILL.md) | Curated modern UI components, animated border beams, floating glass capsule navigation, and telemetry badges. | [21st.dev](https://21st.dev/) |
| **`claude-seo` (`seo`)** | [SKILL.md](./.agents/skills/seo/SKILL.md) | Universal SEO hub & audit engine: Core Web Vitals, Schema.org structured data, Generative Engine Optimization (GEO/Perplexity/ChatGPT), technical crawlability, and programmatic SEO. | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) |
| **`seo-technical`** | [SKILL.md](./.agents/skills/seo-technical/SKILL.md) | Technical SEO auditing, indexability, DOM size budgets, HTTP headers, canonicals, and Core Web Vitals (INP/LCP/CLS). | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) |
| **`seo-schema`** | [SKILL.md](./.agents/skills/seo-schema/SKILL.md) | JSON-LD SoftwareApplication, Product, Organization, and FAQ structured data generation for rich search engine snippets. | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) |
| **`seo-geo`** | [SKILL.md](./.agents/skills/seo-geo/SKILL.md) | Generative Engine Optimization (GEO): `llms.txt`, AI search engine citation readiness (Perplexity, ChatGPT, Google AI Overviews). | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) |

---

## 3. Visual Design System & Tokens (Light Theme)

### Color Palette
- **Canvas Base**: `#FAFAFA` (Porcelain) / `#F8FAFC` (Alabaster slate)
- **Elevated Surfaces**: `#FFFFFF` with `backdrop-blur-md` and 1px borders
- **Border / Hairlines**: `#E2E8F0` / `rgba(15, 23, 42, 0.08)`
- **Typography Primary**: `#0F172A` (Obsidian slate, 95% opacity)
- **Typography Secondary**: `#64748B` (Cool graphite)
- **Technical Accent**: `#2563EB` (Cobalt CAD blue) & `#0284C7` (Cyan laser highlight)

### Anti-AI-Slop Directives
1. **No generic gradient text** (avoid purple-to-pink clichés).
2. **No floating decorative blur orbs** that lack semantic meaning.
3. **No uniform 3-card grids** with identical generic icons.
4. **Embrace technical realism**: Use authentic engineering coordinate marks (`+`, `[X, Y, Z]`), real CAD cross-section diagrams, and actual BOM data tables.

---

## 4. Scroll & Motion Architecture

1. **Single Unified RAF**: Lenis's scroll update MUST be driven directly by GSAP's ticker (`gsap.ticker.add((time) => lenis.raf(time * 1000))`) with `gsap.ticker.lagSmoothing(0)`.
2. **Pinned Assembly Stage**: As the user scrolls through the hero, an assembly diagram scrubs into an exploded part view with dimension callouts.
3. **Interactive 60 FPS Cut-Plane**: Visitors can interactively scrub a section plane along cardinal axes with real-time capped solid previews.
