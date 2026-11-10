import React, { useEffect } from 'react';
import { ArrowLeft, Check, Layers, Cpu, ArrowRight, Table, Sparkles } from 'lucide-react';
import { CADViewport3D } from '../components/CADViewport3D';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const AutoCADBOMPage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  useEffect(() => {
    document.title = 'AutoCAD Automatic BOM Generator | Replace DATAEXTRACTION | MacSolid';
    window.scrollTo(0, 0);
  }, []);

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#151514]/[0.08] font-mono text-xs font-semibold mb-6 bg-[#F5F3EF] text-[#151514]">
          <Table className="w-3.5 h-3.5 text-blue-600" />
          <span>REPLACE COMPLEX AUTOCAD DATAEXTRACTION</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          AutoCAD Automatic <br />
          <span className="font-serif italic font-normal">Bill of Materials Generator.</span>
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
          Why Engineers Replace <span className="font-serif italic font-normal">AutoCAD DATAEXTRACTION.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#151514]/[0.08] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center mb-4">
              <Table className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#151514] mb-2">No Broken Tables on Revisions</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              When blocks are renamed or modified, native AutoCAD tables lose attribute links. MacSolid creates persistent, verified parent-child hierarchies that update automatically.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#151514]/[0.08] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#151514] mb-2">Automatic Part Thumbnails</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              Plain AutoCAD cannot embed component preview images in exported Excel tables. MacSolid renders high-resolution isometric thumbnails directly inside your BOM sheets.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#151514]/[0.08] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#151514] mb-2">100% Standalone (No AutoCAD Seat)</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              Estimators and procurement teams can generate complete Bills of Materials without paying for expensive Autodesk subscriptions on every workstation.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Feature Callout */}
      <section className="px-6 mb-24 max-w-6xl mx-auto">
        <div className="border border-[#151514]/[0.08] rounded-3xl bg-[#F5F3EF] p-8 sm:p-12 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-[#8C8A85] uppercase">
              RELIABLE DRAWING DATA EXTRACTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#151514] mt-2 mb-2">
              Never Manually Type Drawing Tables Again
            </h2>
            <p className="text-xs sm:text-sm text-[#686663] leading-relaxed">
              Eliminate missing parts and human transcription errors when revising AutoCAD drawing revisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#EBE9E5]/60 border border-[#151514]/[0.06]">
              <div className="font-mono text-xs font-bold text-[#151514] mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>NESTED BLOCK HIERARCHY</span>
              </div>
              <p className="text-xs text-[#686663] leading-relaxed">
                Deconstructs deeply nested dynamic blocks, attributes, and 3D solid bodies without breaking references.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#EBE9E5]/60 border border-[#151514]/[0.06]">
              <div className="font-mono text-xs font-bold text-[#151514] mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>ACCURATE BILLET &amp; PLATE SIZING</span>
              </div>
              <p className="text-xs text-[#686663] leading-relaxed">
                Calculates true 3D solid bounding dimensions [L × W × H] for raw metal cut-lists and nesting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#EBE9E5]/60 border border-[#151514]/[0.06]">
              <div className="font-mono text-xs font-bold text-[#151514] mb-2 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>1-CLICK EXCEL &amp; CSV EXPORT</span>
              </div>
              <p className="text-xs text-[#686663] leading-relaxed">
                Instantly generates shop-floor Excel workbooks ready for purchasing, ERP importing, or machine cutting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#151514]/[0.08] py-16 px-6 text-center">
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
      </footer>
    </div>
  );
};

export default AutoCADBOMPage;

