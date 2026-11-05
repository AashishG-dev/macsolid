import React from 'react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="relative border-t border-[#151514]/[0.08] bg-[#F5F3EF]/70 pt-20 pb-32 px-6 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid: Brand & Structured SEO Silos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#151514]/[0.08]">
          {/* Column 1: Brand & Spec */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#151514] text-[#EBE9E5] flex items-center justify-center shrink-0">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <span className="font-bold text-sm tracking-tight text-[#151514]">MacSolid Systems</span>
            </div>
            <p className="text-xs text-[#686663] leading-relaxed">
              High-performance C++20 desktop CAD assembly analyzer and automated Bill of Materials generator. Built for high-throughput mechanical design and manufacturing teams.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#8C8A85] space-y-1">
              <div>Native Windows x64 Architecture</div>
              <div>OpenCASCADE 7.7.2 · ED25519 Signed</div>
            </div>
          </div>

          {/* Column 2: CAD Automation Engines */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#151514] uppercase">
              CAD Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="/solidworks-bom-generator"
                  onClick={(e) => handleLinkClick(e, '/solidworks-bom-generator')}
                  className="text-[#686663] hover:text-[#151514] transition-colors"
                >
                  SolidWorks BOM Generator
                </a>
              </li>
              <li>
                <a
                  href="/autocad-bom-generator"
                  onClick={(e) => handleLinkClick(e, '/autocad-bom-generator')}
                  className="text-[#686663] hover:text-[#151514] transition-colors"
                >
                  AutoCAD Automatic BOM
                </a>
              </li>
              <li>
                <a
                  href="/step-bom-extractor"
                  onClick={(e) => handleLinkClick(e, '/step-bom-extractor')}
                  className="text-[#686663] hover:text-[#151514] transition-colors"
                >
                  STEP AP203/214/242 Extractor
                </a>
              </li>
              <li>
                <span className="text-[#8C8A85] cursor-not-allowed">
                  Siemens NX & JT (Preview)
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools & Comparison */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#151514] uppercase">
              Tools & Comparison
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="/openbom-alternative"
                  onClick={(e) => handleLinkClick(e, '/openbom-alternative')}
                  className="text-[#686663] hover:text-[#151514] transition-colors font-medium text-[#151514]"
                >
                  OpenBOM Alternative (On-Prem)
                </a>
              </li>
              <li>
                <a
                  href="/roi-calculator"
                  onClick={(e) => handleLinkClick(e, '/roi-calculator')}
                  className="text-[#686663] hover:text-[#151514] transition-colors"
                >
                  BOM Labor ROI Calculator
                </a>
              </li>
              <li>
                <a
                  href="/#stage-experience"
                  className="text-[#686663] hover:text-[#151514] transition-colors"
                >
                  Interactive 60 FPS Cut-Plane
                </a>
              </li>
              <li>
                <a
                  href="/#formats"
                  className="text-[#686663] hover:text-[#151514] transition-colors"
                >
                  Supported CAD Specifications
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#151514] uppercase">
              Security & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="/security"
                  onClick={(e) => handleLinkClick(e, '/security')}
                  className="text-[#686663] hover:text-[#151514] transition-colors"
                >
                  Air-Gapped & ITAR Security
                </a>
              </li>
              <li>
                <span className="text-[#686663]">Zero Cloud Egress Architecture</span>
              </li>
              <li>
                <span className="text-[#686663]">On-Premises Data Sovereignty</span>
              </li>
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8C8A85] hover:text-[#151514] transition-colors font-mono text-[11px]"
                >
                  llms.txt (AI Reference Doc)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Trademark Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#8C8A85] font-mono text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span>© {new Date().getFullYear()} MacSolid Systems</span>
            <span>·</span>
            <span>All rights reserved</span>
            <span>·</span>
            <span>MacSolid Engine v2.4</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="px-2.5 py-1 rounded bg-[#EBE9E5] text-[#151514] font-semibold border border-[#151514]/[0.08]">
              ZERO TELEMETRY
            </span>
            <span className="px-2.5 py-1 rounded bg-[#EBE9E5] text-[#151514] font-semibold border border-[#151514]/[0.08]">
              100% AIR-GAPPED
            </span>
            <span className="px-2.5 py-1 rounded bg-[#EBE9E5] text-[#151514] font-semibold border border-[#151514]/[0.08]">
              60 FPS GPU KERNEL
            </span>
          </div>
        </div>

        {/* Legal & Trademark Compliance Notice */}
        <div className="pt-6 border-t border-[#151514]/[0.05] mt-6 text-[10px] text-[#8C8A85] font-mono leading-relaxed">
          <p>
            <strong className="text-[#686663]">Legal Notice &amp; Trademark Attribution:</strong> SolidWorks® is a registered trademark of Dassault Systèmes SolidWorks Corporation. AutoCAD® is a registered trademark of Autodesk, Inc. OpenBOM® is a trademark of Newman Cloud Inc. Siemens NX® is a registered trademark of Siemens AG. MacSolid is an independent desktop software platform developed by MacSolid Systems. MacSolid Systems is not affiliated with, sponsored by, or endorsed by Dassault Systèmes, Autodesk, Siemens, or Newman Cloud. All third-party trademarks are used solely for compatibility identification under nominative fair use.
          </p>
        </div>
      </div>
    </footer>
  );
};
