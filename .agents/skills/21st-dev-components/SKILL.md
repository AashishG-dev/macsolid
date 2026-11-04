---
name: 21st-dev-components
description: Production-ready animated components inspired by 21st.dev, featuring modern bento layouts, border beams, interactive docks, glow cards, and minimalist widgets.
---

# 21st.dev Component Catalog & Design Patterns

[21st.dev](https://21st.dev/) is the design platform catalog for cutting-edge animated React and Tailwind CSS components.

---

## 1. Signature Patterns

### A. Border Beam (Subtle Moving Light Edge)
Traces a soft light beam along the perimeter of cards:

```tsx
export const BorderBeam = ({
  duration = 8,
  borderWidth = 1.5,
  size = 150,
  className = '',
}: {
  duration?: number;
  borderWidth?: number;
  size?: number;
  className?: string;
}) => {
  return (
    <div
      style={{
        '--size': `${size}px`,
        '--duration': `${duration}s`,
        '--border-width': `${borderWidth}px`,
      } as React.CSSProperties}
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] 
      ![mask-clip:padding-box,border-box] ![mask-composite:intersect] 
      [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] 
      after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam 
      after:[animation-duration:var(--duration)] after:[background:linear-gradient(to_left,#2563eb,#60a5fa,transparent)] 
      after:[offset-anchor:calc(var(--size)*0.5px)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))] ${className}`}
    />
  );
};
```

### B. Minimalist Glass Capsule Navigation Pill
```tsx
export const NavigationCapsule = () => {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-6 px-5 py-2.5 rounded-full border border-slate-200/80 bg-white/70 backdrop-blur-md shadow-sm">
        <a href="#hero" className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">AutoBOM</a>
        <div className="h-4 w-px bg-slate-200" />
        <a href="#features" className="text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors">Features</a>
        <a href="#section-view" className="text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors">GPU Engine</a>
        <a href="#pricing" className="text-xs font-mono text-slate-600 hover:text-slate-900 transition-colors">Trial</a>
        <button className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all">
          Download
        </button>
      </nav>
    </header>
  );
};
```

### C. Bento Grid Structure (Swiss Precision CAD Layout)
- High contrast borders (`border-slate-200/70`)
- Subtle hover transforms (`hover:-translate-y-1 transition-all duration-300`)
- Technical telemetry badges (`font-mono text-[11px] text-blue-600 bg-blue-50/70 border border-blue-200/50`)

