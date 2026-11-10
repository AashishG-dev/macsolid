import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FormatItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  badge: string;
  quote: string;
  description: string;
  extensions: string[];
  specs: { label: string; value: string }[];
  accentColor: string;
  href?: string;
  ctaText?: string;
}

interface AnimatedFormatStackProps {
  onNavigate?: (path: string) => void;
}

export const AnimatedFormatStack: React.FC<AnimatedFormatStackProps> = ({ onNavigate }) => {
  const [active, setActive] = useState(0);
  const [cardProgress, setCardProgress] = useState(0); // Fractional card index for smooth sizing
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const formats: FormatItem[] = [
    {
      id: 'solidworks',
      name: 'SolidWorks Native',
      subtitle: '.sldasm · .sldprt Assemblies & Parts',
      category: 'DIRECT CAD INTEGRATION',
      badge: '100% NATIVE API',
      quote: 'Seamless background automation through SolidWorks COM & C++ kernels.',
      description:
        'Extracts assembly hierarchies, suppressed states, custom metadata, and cut-lists without manual file export.',
      extensions: ['.sldasm', '.sldprt', '.swp', '.slddrw'],
      specs: [
        { label: 'Latency', value: '< 1.4s / 500 parts' },
        { label: 'Interface', value: 'Direct COM Automation' },
        { label: 'Accuracy', value: 'Exact Tolerances' },
      ],
      accentColor: '#1A73E8',
      href: '/solidworks-bom-generator',
      ctaText: 'Explore SolidWorks Automated BOM Engine',
    },
    {
      id: 'step',
      name: 'STEP / STP Protocol',
      subtitle: 'AP203 · AP214 · AP242 Standards',
      category: 'MULTI-PROCESS PARSER',
      badge: 'ASYNC WORKER POOL',
      quote: 'Bypasses legacy OpenCASCADE CPU bottlenecks with asynchronous workers.',
      description:
        'Processes multi-gigabyte aerospace assemblies. Automatically heals degenerate surfaces and stitches boundaries.',
      extensions: ['.step', '.stp', '.stpz', '.occ_cache'],
      specs: [
        { label: 'Scale', value: '10,000+ Components' },
        { label: 'Process Model', value: 'Multi-Process Pool' },
        { label: 'Topology', value: 'B-Rep Auto-Stitch' },
      ],
      accentColor: '#0070F3',
      href: '/step-bom-extractor',
      ctaText: 'Explore ISO STEP AP203/214/242 Engine',
    },
    {
      id: 'nx',
      name: 'Siemens NX & JT',
      subtitle: '.prt · JT Facet & Precise Geometry',
      category: 'RAW STOCK SIZING',
      badge: 'INTELLIGENT BOUNDING BOX',
      quote: 'Calculates true raw stock envelopes and Sheet Metal gauge thickness.',
      description:
        'Eliminates wasteful rectangular approximations for rotated or organic parts using PCA principal axes.',
      extensions: ['.prt', '.jt', '.x_t', '.iges'],
      specs: [
        { label: 'Axes', value: 'PCA Principal Axes' },
        { label: 'Stock Margin', value: 'Custom Machining Offset' },
        { label: 'Gauge', value: 'Auto-Thickness Sizing' },
      ],
      accentColor: '#059669',
      href: '/sheet-metal-nesting',
      ctaText: 'Explore Sheet Metal & Raw Stock Sizing',
    },
    {
      id: 'excel',
      name: 'Production BOM & ERP',
      subtitle: '.xlsx · .csv · Custom Templates',
      category: 'MANUFACTURING EXPORT',
      badge: 'CUSTOM ERP SCHEMAS',
      quote: 'One-click generation of customer-branded Bill of Materials with live preview.',
      description:
        'Directly maps isolated solid bodies to structured Excel workbooks with part dimensions, material grades, and weights.',
      extensions: ['.xlsx', '.xls', '.csv', '.json'],
      specs: [
        { label: 'Speed', value: '< 0.5s Full Export' },
        { label: 'Templates', value: 'Custom Macro Ready' },
        { label: 'Drawing', value: 'Auto 2D Projections' },
      ],
      accentColor: '#D97706',
      href: '/roi-calculator',
      ctaText: 'Calculate Engineering Time & Cost Savings',
    },
  ];

  // ONE-TIME ONLY TRIGGER:
  // When the user scrolls to this section for the first time, it triggers the one-by-one reveal
  // sequence ONCE. It is NOT reversible. Even if the user scrolls back to the top and down again,
  // it never re-triggers or collapses.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasPlayedOnce) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true, // Only trigger ONCE in page lifetime
      onEnter: () => {
        setHasPlayedOnce(true);

        // One-by-one smooth reveal sequence with sizing
        const obj = { val: 0 };
        gsap.to(obj, {
          val: formats.length - 1,
          duration: 2.2,
          ease: 'power2.inOut',
          onUpdate: () => {
            setCardProgress(obj.val);
            const currentIdx = Math.round(obj.val);
            setActive(currentIdx);
          },
          onComplete: () => {
            // Settle smoothly back onto primary SolidWorks or current card
            gsap.to(obj, {
              val: 0,
              duration: 0.8,
              ease: 'power3.out',
              onUpdate: () => {
                setCardProgress(obj.val);
                setActive(Math.round(obj.val));
              },
            });
          },
        });
      },
    });

    return () => trigger.kill();
  }, [hasPlayedOnce, formats.length]);

  const handleNext = () => {
    const nextIdx = (active + 1) % formats.length;
    setActive(nextIdx);
    setCardProgress(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (active - 1 + formats.length) % formats.length;
    setActive(prevIdx);
    setCardProgress(prevIdx);
  };

  const handleSelect = (idx: number) => {
    setActive(idx);
    setCardProgress(idx);
  };

  const activeFormat = formats[active];

  return (
    <section ref={sectionRef} id="formats" className="relative py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Antigravity Minimalist Section Title */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#151514] mb-3 font-semibold opacity-60">
          — INTEROPERABILITY MATRIX
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-3">
          Universal CAD Ingestion Engine.
        </h2>
        <p className="text-base text-[#686663] max-w-xl mb-6">
          Native integration with industry-standard assemblies, neutral protocols, and ERP pipelines.
        </p>

        {/* Quick Format Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full border border-[#151514]/[0.08] bg-[#F5F3EF]/90 backdrop-blur-md shadow-xs mb-6 max-w-full">
          {formats.map((f, i) => (
            <button
              key={f.id}
              onClick={() => handleSelect(i)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                active === i
                  ? 'bg-[#151514] text-[#EBE9E5] font-semibold shadow-xs'
                  : 'text-[#686663] hover:text-[#151514] hover:bg-black/[0.04]'
              }`}
            >
              0{i + 1} {f.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-9 h-9 rounded-full border border-[#151514]/[0.1] bg-[#F5F3EF] flex items-center justify-center text-[#151514] hover:bg-white transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Previous format"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs text-[#686663] px-3.5 py-1 rounded-full bg-[#F5F3EF] border border-[#151514]/[0.08]">
            <strong className="text-[#151514]">{active + 1}</strong> / {formats.length}
          </span>
          <button
            onClick={handleNext}
            className="w-9 h-9 rounded-full border border-[#151514]/[0.1] bg-[#F5F3EF] flex items-center justify-center text-[#151514] hover:bg-white transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Next format"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Stack Deck Grid */}
      <div className="rounded-3xl sm:rounded-4xl border border-[#151514]/[0.08] bg-[#F5F3EF]/70 backdrop-blur-md p-5 sm:p-8 md:p-12 shadow-[0_20px_50px_-15px_rgba(21,21,20,0.06)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: 3D Stack that reveals one-by-one ONCE on first visit */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-4 sm:py-6 min-h-[380px]">
            <div
              className="relative w-full max-w-[280px] sm:max-w-[320px] h-[360px] perspective-[1200px] touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {formats.map((item, idx) => {
                const diff = idx - cardProgress;
                const isCurrent = active === idx;

                let scale = 1.0;
                let rotateZ = 0;
                let translateX = 0;
                let translateY = 0;
                let zIndex = 10;
                let opacity = 1;

                if (Math.abs(diff) < 0.45) {
                  scale = 1.04;
                  rotateZ = 0;
                  translateY = 0;
                  translateX = 0;
                  zIndex = 30;
                  opacity = 1;
                } else if (diff < 0) {
                  const pastOffset = Math.abs(diff);
                  scale = Math.max(0.85, 1.0 - pastOffset * 0.08);
                  rotateZ = -pastOffset * 7;
                  translateX = -pastOffset * 18;
                  translateY = pastOffset * 12;
                  zIndex = Math.round(20 - pastOffset * 4);
                  opacity = Math.max(0.4, 1.0 - pastOffset * 0.35);
                } else {
                  const futureOffset = diff;
                  scale = Math.max(0.86, 0.98 - futureOffset * 0.08);
                  rotateZ = futureOffset * 6;
                  translateX = futureOffset * 20;
                  translateY = futureOffset * 14;
                  zIndex = Math.round(20 - futureOffset * 4);
                  opacity = Math.max(0.35, 1.0 - futureOffset * 0.4);
                }

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(idx)}
                    style={{
                      transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotateZ}deg) scale(${scale})`,
                      zIndex,
                      opacity,
                    }}
                    className={`absolute inset-0 rounded-3xl border transition-all duration-400 ease-out p-7 flex flex-col justify-between cursor-pointer select-none ${
                      isCurrent
                        ? 'bg-white border-[#151514]/[0.18] shadow-[0_24px_50px_-10px_rgba(21,21,20,0.14)] ring-1 ring-[#151514]/10'
                        : 'bg-[#F5F3EF] border-[#151514]/[0.08] shadow-xs hover:border-[#151514]/[0.18]'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#8C8A85]">
                          0{idx + 1} · {item.category}
                        </span>
                        <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#EBE9E5] text-[#151514] border border-[#151514]/[0.08]">
                          {item.badge}
                        </span>
                      </div>

                      <div className="text-2xl font-bold text-[#151514] tracking-tight mb-1">
                        {item.name}
                      </div>
                      <div className="font-mono text-xs text-[#151514]/70 font-semibold mb-4">
                        {item.subtitle}
                      </div>
                    </div>

                    {/* Extensions Pills */}
                    <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-[#EBE9E5]/70 border border-[#151514]/[0.06]">
                      {item.extensions.map((ext) => (
                        <span
                          key={ext}
                          className="font-mono text-[11px] font-medium px-2 py-1 rounded-lg bg-white border border-[#151514]/[0.08] text-[#151514] shadow-2xs"
                        >
                          {ext}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#686663] pt-3 border-t border-[#151514]/[0.06]">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>B-REP VERIFIED</span>
                      </div>
                      <span className="text-[#151514] font-semibold">
                        {isCurrent ? 'Active' : 'Inspect'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Clean Typographic Detail */}
          <div className="lg:col-span-7 flex flex-col justify-between pl-0 lg:pl-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#151514]/[0.08] font-mono text-[10px] font-semibold mb-5 bg-[#EBE9E5] text-[#151514]">
                <span>{activeFormat.category}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold tracking-tightest text-[#151514] mb-4">
                {activeFormat.name}
              </h3>

              <p className="text-lg sm:text-xl font-normal text-[#151514] leading-relaxed mb-4">
                "{activeFormat.quote}"
              </p>

              <p className="text-sm text-[#686663] leading-relaxed mb-8">
                {activeFormat.description}
              </p>
            </div>

            {/* Specifications Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#151514]/[0.08] font-mono text-xs">
              {activeFormat.specs.map((s) => (
                <div key={s.label} className="p-3.5 rounded-2xl bg-[#EBE9E5]/70 border border-[#151514]/[0.06]">
                  <div className="text-[10px] text-[#8C8A85] uppercase tracking-wider mb-1">
                    {s.label}
                  </div>
                  <div className="font-bold text-[#151514]">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Deep-Dive Route Link */}
            {activeFormat.href && activeFormat.ctaText && (
              <div className="pt-6">
                <a
                  href={activeFormat.href}
                  onClick={(e) => {
                    if (onNavigate && activeFormat.href) {
                      e.preventDefault();
                      onNavigate(activeFormat.href);
                    }
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full bg-[#151514] text-[#EBE9E5] hover:bg-[#282826] transition-all cursor-pointer shadow-xs group"
                >
                  <span>{activeFormat.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
