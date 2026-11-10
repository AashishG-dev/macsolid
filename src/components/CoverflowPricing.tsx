import React, { useState, useEffect } from 'react';
import {
  Check,
  X,
  List,
  Info,
  Monitor,
  Cpu,
  ShieldCheck,
} from 'lucide-react';

interface PricingTier {
  id: string;
  title: string;
  subtitle: string;
  statusBadge: string;
  statusDescription: string;
  isPopular?: boolean;
  editionKey: string;
  features: {
    text: string;
    isHeader?: boolean;
    isExcluded?: boolean;
    tooltip?: string;
  }[];
  primaryCta: string;
  secondaryCta: string;
}

interface CoverflowPricingProps {
  onOpenContactModal?: (editionName: string) => void;
}

export const CoverflowPricing: React.FC<CoverflowPricingProps> = ({ onOpenContactModal }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    if (!activeTooltip) return;
    const handleOutsideClick = () => setActiveTooltip(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [activeTooltip]);

  const tiers: PricingTier[] = [
    {
      id: 'lite',
      title: 'MacSolid Lite',
      subtitle: '3D CAD Studio & Precision Measurement',
      statusBadge: 'Demo & Evaluation',
      statusDescription: 'Available via live walkthrough or trial',
      editionKey: 'MacSolid Lite (Visual CAD Analysis & Measurement)',
      primaryCta: 'Book a Demo',
      secondaryCta: 'Or request 14-day evaluation',
      features: [
        {
          text: '3D assembly orbit, pan & orthographic views',
          tooltip: 'Smooth 6-DOF CAD orbit with view cubes and standard projection views.',
        },
        {
          text: '60 FPS GPU cross-section cutting',
          tooltip: 'Interactive cut-plane slicing along cardinal axes with real-time capped solids.',
        },
        {
          text: 'Precision CAD measurement tools',
          tooltip: 'Point-to-point, face clearances, coordinate delta [X, Y, Z] readouts.',
        },
        {
          text: 'Cylinder axis & hole center snapping',
          tooltip: 'Exact diameter detection, concentricity verification, and center distance snapping.',
        },
        {
          text: 'Exploded assembly tree inspection',
          tooltip: 'Explode multi-body models with hierarchy component isolation and visibility masks.',
        },
        {
          text: 'Multi-format STEP (.step, .stp) & IGES',
          tooltip: 'Imports complex geometry with tens of thousands of faces without mesh conversion.',
        },
        {
          text: 'Automated Bill of Materials (BOM)',
          isExcluded: true,
          tooltip: 'Automatic component tree extraction is reserved for MacSolid Standard and above.',
        },
        {
          text: 'Raw stock envelope & bounding sizing',
          isExcluded: true,
          tooltip: 'Raw stock calculation is reserved for MacSolid Standard and above.',
        },
      ],
    },
    {
      id: 'standard',
      title: 'MacSolid Standard',
      subtitle: 'Full Automated BOM & Raw Stock Engine',
      statusBadge: 'Flexible Licensing',
      statusDescription: 'Tailored to team size & production volume',
      isPopular: true,
      editionKey: 'MacSolid Standard (Full BOM & Raw Stock Engine)',
      primaryCta: 'Get in Touch',
      secondaryCta: 'Or submit sample STEP assembly',
      features: [
        {
          text: 'Everything in MacSolid Lite included',
          isHeader: true,
        },
        {
          text: '1-Click automated Bill of Materials (BOM)',
          tooltip: 'Multi-threaded C++ engine extracts the complete parent-child assembly hierarchy in seconds.',
        },
        {
          text: 'Intelligent raw stock sizing',
          tooltip: 'Calculates optimal bounding envelopes for bar, plate, block, and round stock.',
        },
        {
          text: 'Sheet metal gauge thickness detection',
          tooltip: 'Identifies uniform sheet metal thickness, bend counts, and flat boundary dimensions.',
        },
        {
          text: 'Machined vs. hardware part classification',
          tooltip: 'Differentiates custom machined bodies from off-the-shelf fasteners, bearings, and pins.',
        },
        {
          text: 'Formatted Excel (.xlsx) & CSV ERP exports',
          tooltip: 'Generates clean manufacturing spreadsheets with thumbnails, quantities, and material specs.',
        },
        {
          text: 'High-throughput multi-threaded parsing',
          tooltip: 'Processes complex STEP files with hundreds of unique bodies without CAD license overhead.',
        },
      ],
    },
    {
      id: 'professional',
      title: 'MacSolid Professional',
      subtitle: 'All Features + Custom Engineering Requirements',
      statusBadge: 'Custom Tailored',
      statusDescription: 'Built around your shop floor ERP & machinery',
      editionKey: 'MacSolid Professional (Custom Workflow Tailoring)',
      primaryCta: 'Consult with Engineers',
      secondaryCta: 'Discuss custom shop requirements',
      features: [
        {
          text: 'Everything in MacSolid Standard included',
          isHeader: true,
        },
        {
          text: 'Custom Excel & ERP export templates',
          tooltip: 'Tailored column schemas, ERP headers (SAP, Epicor, Infor), and formula macros.',
        },
        {
          text: 'Customizable raw stock allowances',
          tooltip: 'Adjust saw cutoffs, machining facing margins, and laser kerf offsets to your machinery.',
        },
        {
          text: 'Custom feature adaptation & rules',
          tooltip: 'Suggest and implement proprietary algorithmic rules tailored to your unique parts.',
        },
        {
          text: 'Dedicated manufacturing applications engineer',
          tooltip: 'Direct collaboration with senior engineers for smooth shop floor onboarding.',
        },
        {
          text: 'Central LAN network floating pool',
          tooltip: 'Share floating license seats dynamically across internal design and production teams.',
        },
        {
          text: '100% air-gapped offline workstation support',
          tooltip: 'Fully functional on secure, isolated internal networks without external telemetry.',
        },
      ],
    },
  ];

  const handleCta = (editionKey: string) => {
    if (onOpenContactModal) {
      onOpenContactModal(editionKey);
    } else {
      window.location.href = `mailto:contact@macsolid.cad?subject=Inquiry%20for%20${encodeURIComponent(
        editionKey
      )}`;
    }
  };

  return (
    <section
      id="pricing"
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto z-10 overflow-hidden"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8C8A85] mb-3 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
          <span>SEC. 04 — DEPLOYMENT ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-[#151514] mb-3 sm:mb-4">
          Tailored to Your Production Workflow.
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-[#686663] max-w-xl leading-relaxed">
          Predictable engineering licenses designed for individual estimators, machine shops, and multi-facility manufacturing enterprises.
        </p>
      </div>

      {/* Swiss Precision Engineering Backdrop Container */}
      <div className="relative rounded-[28px] sm:rounded-[40px] p-4 sm:p-7 lg:p-10 bg-[#F5F3EF]/95 border border-[#151514]/[0.08] shadow-[0_24px_70px_-20px_rgba(21,21,20,0.06)] backdrop-blur-md overflow-hidden bg-cad-grid">
        
        {/* Responsive 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {tiers.map((tier) => {
            const isStandard = tier.id === 'standard';

            return (
              <div
                key={tier.id}
                className={`relative bg-[#FFFFFF] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group ${
                  isStandard
                    ? 'border-2 border-[#151514] shadow-[0_18px_45px_-12px_rgba(21,21,20,0.12)]'
                    : 'border border-[#151514]/[0.09] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.04)] hover:border-[#151514]/[0.18]'
                }`}
              >
                <div>
                  {/* Top Badge & Flagship Marker */}
                  <div className="flex items-center justify-between min-h-[30px] mb-3">
                    <span
                      className={`font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${
                        isStandard
                          ? 'bg-[#151514] text-[#EBE9E5]'
                          : 'bg-[#EBE9E5] text-[#686663] border border-[#151514]/[0.06]'
                      }`}
                    >
                      {isStandard ? 'FLAGSHIP EDITION' : tier.statusBadge}
                    </span>

                    {isStandard && (
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold tracking-wider text-[#151514] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        <span>PRIMARY CHOICE</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-3xl sm:text-[34px] font-normal text-[#151514] tracking-tight mb-2">
                    {tier.title}
                  </h3>
                  <p className="text-xs text-[#686663] mb-6 leading-relaxed min-h-[36px]">
                    {tier.subtitle}
                  </p>

                  {/* Availability / Engagement Status Block (No random prices) */}
                  <div className="mb-6 pb-6 border-b border-[#151514]/[0.07]">
                    <div className="font-serif text-[28px] sm:text-[32px] font-normal text-[#151514] leading-tight mb-1">
                      {tier.statusBadge}
                    </div>
                    <div className="text-[11px] text-[#8C8A85] tracking-tight">
                      {tier.statusDescription}
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <ul className="space-y-3 mb-8 text-[12px] text-[#151514]">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 relative">
                        {feat.isHeader ? (
                          <List className="w-4 h-4 text-[#151514] shrink-0 mt-0.5" />
                        ) : feat.isExcluded ? (
                          <div className="w-4 h-4 rounded-full border border-[#8C8A85]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#8C8A85]">
                            <X className="w-2.5 h-2.5 stroke-[2.2]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-[#151514]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#151514]">
                            <Check className="w-2.5 h-2.5 stroke-[2.4]" />
                          </div>
                        )}

                        <span
                          className={`leading-snug ${
                            feat.isHeader
                              ? 'font-semibold text-[#151514]'
                              : feat.isExcluded
                              ? 'text-[#8C8A85]/75 line-through'
                              : 'text-[#4A4844]'
                          }`}
                        >
                          {feat.text}
                        </span>

                        {/* Interactive Info Icon & Tooltip */}
                        {feat.tooltip && (
                          <div className="relative inline-flex items-center ml-auto pl-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTooltip(
                                  activeTooltip === `${tier.id}-${i}` ? null : `${tier.id}-${i}`
                                );
                              }}
                              onMouseEnter={() => setActiveTooltip(`${tier.id}-${i}`)}
                              onMouseLeave={() => setActiveTooltip(null)}
                              className="text-[#8C8A85] hover:text-[#151514] transition-colors p-0.5 cursor-pointer"
                              aria-label="Feature explanation"
                            >
                              <Info className="w-3.5 h-3.5 opacity-50 hover:opacity-100" />
                            </button>

                            {activeTooltip === `${tier.id}-${i}` && (
                              <div className="absolute bottom-full right-0 mb-2 w-56 p-2.5 bg-[#151514] text-[#EBE9E5] text-[11px] rounded-xl shadow-xl z-50 pointer-events-none leading-relaxed text-left animate-in fade-in zoom-in-95 duration-150">
                                {feat.tooltip}
                                <div className="absolute top-full right-3 border-4 border-transparent border-t-[#151514]" />
                              </div>
                            )}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Block */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleCta(tier.editionKey)}
                    className={`w-full py-3.5 px-4 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-xs active:scale-[0.98] ${
                      isStandard
                        ? 'bg-[#151514] text-[#EBE9E5] hover:bg-[#282826] hover:shadow-md'
                        : 'bg-white text-[#151514] border border-[#151514] hover:bg-[#F5F3EF]'
                    }`}
                  >
                    {tier.primaryCta}
                  </button>

                  <div className="text-center mt-3">
                    <button
                      type="button"
                      onClick={() => handleCta(tier.editionKey)}
                      className="text-[11px] text-[#686663] hover:text-[#151514] underline underline-offset-3 transition-colors cursor-pointer"
                    >
                      {tier.secondaryCta}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Feature Inclusions Banner ("All MacSolid editions include") */}
        <div className="mt-14 pt-10 border-t border-[#151514]/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Left Header */}
            <div>
              <h4 className="font-serif text-2xl sm:text-3xl font-normal text-[#151514] leading-tight tracking-tight">
                All MacSolid <br className="hidden sm:inline" />
                editions include
              </h4>
            </div>

            {/* Feature 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#151514]/[0.08] flex items-center justify-center shrink-0 text-[#151514] shadow-2xs mt-0.5">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#151514] mb-1">
                  Native Multi-Threaded C++ Engine
                </h5>
                <p className="text-[12px] text-[#686663] leading-relaxed">
                  Imports complex multi-part STEP assemblies with thousands of bodies in seconds without crashing.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#151514]/[0.08] flex items-center justify-center shrink-0 text-[#151514] shadow-2xs mt-0.5">
                <Monitor className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#151514] mb-1">
                  60 FPS GPU Section Studio
                </h5>
                <p className="text-[12px] text-[#686663] leading-relaxed">
                  Hardware-accelerated cut-planes, solid capped interiors, and instant face-to-face clearance checks.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#151514]/[0.08] flex items-center justify-center shrink-0 text-[#151514] shadow-2xs mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-[#151514] mb-1">
                  100% Air-Gapped Licensing Available
                </h5>
                <p className="text-[12px] text-[#686663] leading-relaxed">
                  Zero external data telemetry. Your proprietary CAD geometry never leaves your local workstation.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CoverflowPricing;
