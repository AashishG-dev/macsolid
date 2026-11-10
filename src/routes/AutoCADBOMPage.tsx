import React from 'react';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { CADViewport3D } from '../components/CADViewport3D';
import { usePageSEO } from '../hooks/usePageSEO';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const AutoCADBOMPage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  usePageSEO({
    title: 'AutoCAD Automatic BOM Generator | Replace DATAEXTRACTION | MacSolid',
    description: 'Fast 1-click bill of materials generator for AutoCAD DWG and DXF drawing blocks and 3D solids. Exports shop-floor ready Excel workbooks.',
    path: '/autocad-bom-generator',
    breadcrumbName: 'AutoCAD Automatic BOM',
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
            AUTOCAD BOM ENGINE
          </span>

          <button
            onClick={() => onOpenContactModal('MacSolid Standard (AutoCAD Engine)')}
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
          <span>AUTOCAD DRAWING PIPELINE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          AutoCAD Automatic Bill of Materials Generator.
        </h1>

        <p className="text-base sm:text-xl text-[#686663] max-w-2xl mx-auto leading-relaxed mb-8">
          The modern alternative to the manual AutoCAD DATAEXTRACTION wizard. Extract blocks, attributes, materials, and quantities to structured Excel spreadsheets in 1 click.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenContactModal('MacSolid Standard (AutoCAD Engine)')}
            className="px-6 py-3 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#282826] transition-all cursor-pointer shadow-xs flex items-center gap-2"
          >
            <span>Automate Your AutoCAD BOMs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 3D Demo Container */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="h-[440px] sm:h-[560px] rounded-4xl border border-[#151514]/[0.1] bg-[#F5F3EF]/80 backdrop-blur-md overflow-hidden relative shadow-lg">
          <CADViewport3D modelType="mould_assembly" interactive={true} className="w-full h-full" />
          <div className="absolute top-5 left-5 pointer-events-none font-mono text-[11px] bg-white/90 backdrop-blur-md p-3 rounded-xl border border-[#151514]/[0.08]">
            <div className="font-semibold text-[#151514]">DWG/DXF PROTOCOL INGESTION</div>
            <div className="text-[#686663]">AUTOMATIC PART REFERENCE TAGGING</div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#151514] mb-8 text-center">
          AutoCAD DATAEXTRACTION vs. MacSolid Engine
        </h2>

        <div className="bg-white rounded-3xl border border-[#151514]/[0.08] overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#151514]/[0.08] bg-[#F5F3EF] p-4 text-xs font-mono font-bold text-[#151514]">
            <div>EXTRACTION CRITERIA</div>
            <div className="text-[#8C8A85]">AUTOCAD DATAEXTRACTION WIZARD</div>
            <div className="text-emerald-700">MACSOLID STANDALONE ENGINE</div>
          </div>

          <div className="divide-y divide-[#151514]/[0.06] text-xs">
            {[
              {
                feat: 'Workflow Efficiency',
                old: '8-step modal wizard on every revision',
                neu: '1-click batch extraction (< 1.2s)',
              },
              {
                feat: 'Dynamic Block Stability',
                old: 'Breaks attribute mapping on renamed blocks',
                neu: 'Persistent GUID-based parent-child mapping',
              },
              {
                feat: 'Visual BOM Documentation',
                old: 'Text-only tables; no preview capability',
                neu: 'Renders embedded isometric part thumbnails',
              },
              {
                feat: '3D Solid Raw Stock Bounding',
                old: 'None (Requires manual measuring)',
                neu: 'Calculates true raw stock [L × W × H]',
              },
              {
                feat: 'License Dependency',
                old: 'Requires active AutoCAD subscription seat',
                neu: '100% standalone for estimators and buyers',
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

      {/* Swiss Technical Specification Ledger */}
      <section className="px-6 mb-24 max-w-6xl mx-auto">
        <div className="border border-[#151514]/[0.08] rounded-3xl bg-[#F5F3EF] p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl mb-10">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-[#8C8A85] uppercase">
              DRAWING EXTRACTION SPECIFICATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#151514] mt-2 mb-3">
              Direct Drawing Table &amp; Block Deconstruction
            </h2>
            <p className="text-sm text-[#686663] leading-relaxed">
              Eliminate missing parts and human transcription errors when revising multi-sheet AutoCAD drawings and dynamic block libraries.
            </p>
          </div>

          <div className="border-t border-[#151514]/15 divide-y divide-[#151514]/10 font-mono text-xs">
            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>01 // DYNAMIC BLOCK PARSING</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Deconstructs deeply nested dynamic blocks, attributes, and user-defined tags without breaking drawing references or requiring manual table balloon adjustments.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#686663]">
                SPEED: &lt; 1.2S / 1,000 BLOCKS
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>02 // BILLET &amp; PLATE SIZING</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Calculates true 3D solid bounding envelopes [L × W × H] for raw metal cut-lists, sheet thickness gauging, and manufacturing material utilization.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-emerald-700 font-bold">
                ENVELOPE ACCURACY: 100%
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>03 // ISOMETRIC PREVIEWS</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Renders crisp isometric component thumbnails directly into exported Excel spreadsheets, providing visual clarity for CNC operators and purchasing teams.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#686663]">
                EMBEDDED RASTER / SVG
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>04 // STANDALONE RUNTIME</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Runs entirely standalone on estimators' and buyers' workstations. No active AutoCAD license seat, server connection, or cloud upload required.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#151514] font-semibold">
                SEATS NEEDED: 0 AUTOCAD LICENSES
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#151514]/[0.08] py-16 px-6 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-[#151514] mb-3">
          Eliminate manual AutoCAD parts list entry today.
        </h3>
        <p className="text-sm text-[#686663] mb-6">
          Schedule a live demonstration with your own DWG/STEP files.
        </p>
        <button
          onClick={() => onOpenContactModal('MacSolid Standard')}
          className="px-6 py-3 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#282826] transition-all cursor-pointer"
        >
          Contact Our Engineering Team
        </button>
        <p className="text-[10px] font-mono text-[#8C8A85] mt-6 max-w-xl mx-auto">
          AutoCAD® is a registered trademark of Autodesk, Inc. MacSolid is an independent platform and is not affiliated with, endorsed by, or sponsored by Autodesk, Inc.
        </p>
      </section>
    </div>
  );
};

export default AutoCADBOMPage;
