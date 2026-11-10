import React from 'react';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { CADViewport3D } from '../components/CADViewport3D';
import { usePageSEO } from '../hooks/usePageSEO';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const SolidWorksBOMPage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  usePageSEO({
    title: 'SolidWorks Automated Bill of Materials Generator | MacSolid',
    description: 'Extract SolidWorks .sldasm and .sldprt assembly hierarchies, cut-lists, and raw stock bounding dimensions to Excel without opening SolidWorks.',
    path: '/solidworks-bom-generator',
    breadcrumbName: 'SolidWorks BOM Generator',
  });

  return (
    <div className="min-h-screen bg-[#EBE9E5] text-[#151514] selection:bg-[#151514] selection:text-[#EBE9E5]">
      {/* Top Header */}
      <nav className="border-b border-[#151514]/[0.08] bg-[#F5F3EF]/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-mono font-semibold text-[#686663] hover:text-[#151514] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO OVERVIEW</span>
          </button>

          <span className="font-semibold text-xs text-[#151514] font-mono">
            SOLIDWORKS AUTOMATION ENGINE
          </span>

          <button
            onClick={() => onOpenContactModal('MacSolid Standard (SolidWorks Engine)')}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-[#151514] text-[#EBE9E5] hover:bg-[#242422] transition-all cursor-pointer shadow-xs"
          >
            Request Evaluation
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="py-20 px-6 max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8C8A85] mb-4 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
          <span>SOLIDWORKS COM &amp; PARASOLID PIPELINE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          SolidWorks Automated Bill of Materials Generator.
        </h1>

        <p className="text-base sm:text-xl text-[#686663] max-w-2xl mx-auto leading-relaxed mb-8">
          Eliminate manual SolidWorks drawing BOM tables. Automatically extract assembly hierarchies, cut-lists, and raw stock bounding dimensions to Excel in under 1.4 seconds.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenContactModal('MacSolid Standard (SolidWorks Engine)')}
            className="px-6 py-3 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#282826] transition-all cursor-pointer shadow-xs flex items-center gap-2"
          >
            <span>Request SolidWorks Evaluation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Interactive 3D Demonstration Container */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="h-[440px] sm:h-[560px] rounded-4xl border border-[#151514]/[0.1] bg-[#F5F3EF]/80 backdrop-blur-md overflow-hidden relative shadow-lg">
          <CADViewport3D modelType="hero_spindle" interactive={true} className="w-full h-full" />
          <div className="absolute top-5 left-5 pointer-events-none font-mono text-[11px] bg-white/90 backdrop-blur-md p-3 rounded-xl border border-[#151514]/[0.08]">
            <div className="font-semibold text-[#151514]">SOLIDWORKS ASSET: SPINDLE-ASM.SLDASM</div>
            <div className="text-[#686663]">74 SUB-COMPONENTS · 0 ERRORS</div>
          </div>
        </div>
      </section>

      {/* Detailed Technical Comparison Table */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#151514] mb-8 text-center">
          Manual SolidWorks BOMs vs. MacSolid Engine
        </h2>

        <div className="bg-white rounded-3xl border border-[#151514]/[0.08] overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#151514]/[0.08] bg-[#F5F3EF] p-4 text-xs font-mono font-bold text-[#151514]">
            <div>FEATURE / WORKFLOW</div>
            <div className="text-[#8C8A85]">NATIVE SOLIDWORKS TABLES</div>
            <div className="text-emerald-700">MACSOLID C++ ENGINE</div>
          </div>

          <div className="divide-y divide-[#151514]/[0.06] text-xs">
            {[
              {
                feat: 'Extraction Speed (500 Parts)',
                old: '4 to 12 minutes (often hangs)',
                neu: '< 1.4 seconds (instant multi-thread)',
              },
              {
                feat: 'Requires Running SolidWorks Seat',
                old: 'Yes (Requires active license & RAM)',
                neu: 'No (Standalone native executable)',
              },
              {
                feat: 'Automatic Raw Stock Envelope',
                old: 'Manual bounding box creation per part',
                neu: 'Automatic PCA principal axes bounding',
              },
              {
                feat: 'Sheet Metal Gauge Detection',
                old: 'Manual flat-pattern inspection',
                neu: 'Automatic thickness & bend count analysis',
              },
              {
                feat: 'Excel / ERP Workbook Export',
                old: 'Manual Copy/Paste or VBA Macro',
                neu: 'Direct 1-Click customer-branded .XLSX',
              },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 p-4 items-center gap-2">
                <div className="font-semibold text-[#151514]">{row.feat}</div>
                <div className="text-[#8C8A85]">{row.old}</div>
                <div className="font-bold text-[#151514] flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{row.neu}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Features Showcase */}
      <section className="px-6 mb-24 max-w-6xl mx-auto">
        <div className="border border-[#151514]/[0.08] rounded-3xl bg-[#F5F3EF] p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl mb-10">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-[#8C8A85] uppercase">
              DEEP TECHNICAL EXTRACTION
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#151514] mt-2 mb-3">
              Built for Real Machine Shops &amp; Estimators
            </h2>
            <p className="text-sm text-[#686663] leading-relaxed">
              MacSolid replaces hours of manual SolidWorks drawing table ballooning with automated multi-body decomposition and exact raw stock envelopes.
            </p>
          </div>

          {/* Swiss Technical Specification Ledger */}
          <div className="border-t border-[#151514]/15 divide-y divide-[#151514]/10 font-mono text-xs">
            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>01 // TOPOLOGY EXTRACTION</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Native parsing via SolidWorks Document Manager API and Parasolid binary stream extraction. Deconstructs deep multi-level sub-assembly trees and identifies weldment cut-lists without launching active SolidWorks GUI seats.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#686663]">
                BENCHMARK: &lt; 1.4s / 500 PARTS
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>02 // PCA BOUNDING ENVELOPE</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Computes principal component axes bounding boxes with Welzl minimum enclosing boundary verification. Eliminates wasteful rectangular oversizing for CNC billet, flat bar, and round bar raw stock.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-emerald-700 font-bold">
                STOCK SAVINGS: -35% AVG
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>03 // SHEET METAL GAUGE</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Automatically isolates sheet metal solid bodies, measures uniform wall gauge, and calculates flat blank dimensions for CNC laser profiling and press brake bending.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#686663]">
                TOLERANCE: ±0.01 MM
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>04 // ERP / EXCEL WORKBOOK</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Directly maps structured multi-body attributes into shop-floor ready Excel spreadsheets with custom part numbering, quantities, material grades, cut lengths, and weights.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#151514] font-semibold">
                EXPORT: 1-CLICK .XLSX / .CSV
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#151514]/[0.08] py-16 px-6 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-[#151514] mb-3">
          Ready to automate your SolidWorks BOM pipeline?
        </h3>
        <p className="text-sm text-[#686663] mb-6">
          Schedule a live demonstration with your own `.sldasm` files.
        </p>
        <button
          onClick={() => onOpenContactModal('MacSolid Standard')}
          className="px-6 py-3 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#282826] transition-all cursor-pointer"
        >
          Contact Our Engineering Team
        </button>
        <p className="text-[10px] font-mono text-[#8C8A85] mt-6 max-w-xl mx-auto">
          SolidWorks® is a registered trademark of Dassault Systèmes SolidWorks Corp. MacSolid is an independent platform and is not affiliated with, endorsed by, or sponsored by Dassault Systèmes.
        </p>
      </section>
    </div>
  );
};

export default SolidWorksBOMPage;

