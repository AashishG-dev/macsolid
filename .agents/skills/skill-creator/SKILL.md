---
name: skill-creator
description: Guidelines and standards for creating, refining, and documenting modular AI agent skills using YAML frontmatter, progressive disclosure, and verified runbooks.
---

# Skill Creator

A meta-skill for creating and maintaining high-quality agent skills in accordance with the Antigravity Customization Architecture and Anthropic Skills Specification.

---

## 1. Skill Anatomy

Every skill is a dedicated folder inside an active discovery root (e.g. `.agents/skills/<skill-name>/`):

```text
skills/<skill-name>/
├── SKILL.md            # Required: YAML frontmatter + core procedures
├── references/         # Optional: Deep architectural specs, API references
├── scripts/            # Optional: Automations, test scripts, CLI helpers
└── examples/           # Optional: Working code snippets or sample configs
```

---

## 2. YAML Frontmatter Specification

The root `SKILL.md` must start with valid YAML frontmatter:

```yaml
---
name: kebab-case-skill-name
description: >-
  Action-oriented, third-person description explaining WHAT the skill does
  and EXACTLY WHEN the agent should activate it.
---
```

### Frontmatter Best Practices
- **`name`**: Lowercase alphanumeric with hyphens (e.g., `gsap-animation`, `vanta-backgrounds`).
- **`description`**: Must provide clear trigger keywords and context so the agent's progressive disclosure mechanism accurately routes requests.

---

## 3. Principles of Agent Skill Authoring

1. **Progressive Disclosure**:
   - Keep the root `SKILL.md` concise (< 500 lines).
   - Put lengthy API documentation or detailed checklists into the `references/` folder and link to them using relative markdown paths.
2. **Actionable Procedures & Patterns**:
   - Provide concrete, copy-pasteable, verified code templates rather than vague generalities.
   - Include troubleshooting notes for common failure modes (e.g., RAF conflicts, memory leaks, missing CSS imports).
3. **Verification Steps**:
   - State how the agent or developer can verify that the skill was successfully applied (e.g., dev server test, browser console check, visual layout inspection).

