import React, { useEffect } from 'react';
import { ArrowLeft, Check, Layers, Cpu, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { CADViewport3D } from '../components/CADViewport3D';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const StepBOMPage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  useEffect(() => {
    document.title = 'STEP File BOM Extractor & 3D Raw Stock Calculator | MacSolid';
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
            STEP PROTOCOL ENGINE (AP203 / AP214 / AP242)
          </span>

          <button
            onClick={() => onOpenContactModal('MacSolid Standard (STEP Engine)')}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-[#151514] text-[#EBE9E5] hover:bg-[#242422] transition-all cursor-pointer shadow-xs"
          >
            Request Evaluation
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="py-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#151514]/[0.08] font-mono text-xs font-semibold mb-6 bg-[#F5F3EF] text-[#151514]">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>MULTI-THREADED ISO 10303 ASYNC WORKER POOL</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          STEP File BOM Extractor & <br />
          <span className="font-serif italic font-normal">Raw Stock Calculator.</span>
        </h1>

        <p className="text-base sm:text-xl text-[#686663] max-w-2xl mx-auto leading-relaxed mb-8">
          Parse gigabyte aerospace and industrial STEP (.step, .stp) assemblies in seconds. Automatically heal degenerate B-Rep geometry and calculate true raw stock bounding boxes.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenContactModal('MacSolid Standard (STEP Engine)')}
            className="px-6 py-3 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#282826] transition-all cursor-pointer shadow-xs flex items-center gap-2"
          >
            <span>Request STEP Benchmark Evaluation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 3D Demo Container */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="h-[440px] sm:h-[560px] rounded-4xl border border-[#151514]/[0.1] bg-[#F5F3EF]/80 backdrop-blur-md overflow-hidden relative shadow-lg">
          <CADViewport3D modelType="hydraulic_manifold" interactive={true} className="w-full h-full" />
          <div className="absolute top-5 left-5 pointer-events-none font-mono text-[11px] bg-white/90 backdrop-blur-md p-3 rounded-xl border border-[#151514]/[0.08]">
            <div className="font-semibold text-[#151514]">ISO 10303 AP242 B-REP ENGINE</div>
            <div className="text-[#686663]">REAL-TIME 60 FPS GPU CAPPED CUT-PLANE</div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#151514] mb-8 text-center">
          Engineered for Heavy <span className="font-serif italic font-normal">Multi-Gigabyte Assemblies.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#151514]/[0.08] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#151514] mb-2">Bypasses CPU Bottlenecks</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              Standard OpenCASCADE wrappers single-thread STEP parsing, causing lengthy freezes. MacSolid uses an asynchronous worker pool that divides models across all CPU cores.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#151514]/[0.08] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#151514] mb-2">Automatic B-Rep Surface Healing</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              Imported files from third-party suppliers often contain inverted normals and unstitched edges. MacSolid automatically repairs topology to ensure exact BOM counts.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#151514]/[0.08] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#151514] mb-2">PCA Principal Axes Sizing</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              Eliminates inaccurate bounding boxes on rotated parts. Calculates true minimum envelope dimensions for bar, plate, and billet stock with custom machining offsets.
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Engineering Showcase */}
      <section className="px-6 mb-24 max-w-6xl mx-auto">
        <div className="border border-[#151514]/[0.08] rounded-3xl bg-[#F5F3EF] p-8 sm:p-12 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-[#8C8A85] uppercase">
              HIGH-THROUGHPUT ASSEMBLY PARSING
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#151514] mt-2 mb-2">
              Automated STEP Decomposition &amp; Raw Stock Sizing
            </h2>
            <p className="text-xs sm:text-sm text-[#686663] leading-relaxed">
              Designed specifically for manufacturing plants receiving complex multi-gigabyte client assemblies in STEP AP203/214/242.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#EBE9E5]/60 border border-[#151514]/[0.06]">
              <div className="font-mono text-xs font-bold text-[#151514] mb-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>MULTI-PROCESS WORKER POOL</span>
              </div>
              <p className="text-xs text-[#686663] leading-relaxed">
                Utilizes dedicated C++ worker processes to import and isolate bodies in parallel, bypassing single-core bottlenecks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#EBE9E5]/60 border border-[#151514]/[0.06]">
              <div className="font-mono text-xs font-bold text-[#151514] mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600" />
                <span>PCA MINIMUM BOUNDING BOX</span>
              </div>
              <p className="text-xs text-[#686663] leading-relaxed">
                Computes tightest physical billet, block, or round bar stock dimensions for each individual body without excess waste.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#EBE9E5]/60 border border-[#151514]/[0.06]">
              <div className="font-mono text-xs font-bold text-[#151514] mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>SURFACE HEALING &amp; B-REP STITCH</span>
              </div>
              <p className="text-xs text-[#686663] leading-relaxed">
                Automatically repairs degenerate faces, closes non-manifold gaps, and ensures watertight solid bodies for export.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#151514]/[0.08] py-16 px-6 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-[#151514] mb-3">
          Process your largest STEP models in seconds.
        </h3>
        <p className="text-sm text-[#686663] mb-6">
          Submit a sample STEP assembly for a benchmark run.
        </p>
        <button
          onClick={() => onOpenContactModal('MacSolid Standard')}
          className="px-6 py-3 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#282826] transition-all cursor-pointer"
        >
          Contact Our Engineering Team
        </button>
      </footer>
    </div>
  );
};

export default StepBOMPage;

