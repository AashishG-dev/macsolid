import React from 'react';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { CADViewport3D } from '../components/CADViewport3D';
import { usePageSEO } from '../hooks/usePageSEO';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const StepBOMPage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  usePageSEO({
    title: 'STEP File BOM Extractor & 3D Raw Stock Sizing | MacSolid',
    description: 'Multi-process ISO 10303 STEP AP203/214/242 assembly part separator. Calculates true raw stock envelopes and exports formatted Excel BOMs.',
    path: '/step-bom-extractor',
    breadcrumbName: 'STEP BOM Extractor',
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
            ISO STEP KERNEL ENGINE
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
        <div className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8C8A85] mb-4 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
          <span>MULTI-PROCESS ISO 10303 PROTOCOL</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          STEP File BOM Extractor &amp; Raw Stock Sizing.
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

      {/* Side-by-Side Architectural Benchmark */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#151514] mb-8 text-center">
          Legacy OpenCASCADE Wrappers vs. MacSolid Async Pool
        </h2>

        <div className="bg-white rounded-3xl border border-[#151514]/[0.08] overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#151514]/[0.08] bg-[#F5F3EF] p-4 text-xs font-mono font-bold text-[#151514]">
            <div>ASSEMBLY PARSING PARAMETER</div>
            <div className="text-[#8C8A85]">SINGLE-THREADED WRAPPERS</div>
            <div className="text-emerald-700">MACSOLID ASYNC WORKER POOL</div>
          </div>

          <div className="divide-y divide-[#151514]/[0.06] text-xs">
            {[
              {
                feat: 'Throughput (2.4 GB STEP Assembly)',
                old: '8 to 22 minutes (often locks UI)',
                neu: '< 3.6 seconds across worker pool',
              },
              {
                feat: 'Multi-Core Utilization',
                old: '1 Core active (25% on quad-core)',
                neu: '100% Core saturation via multi-process',
              },
              {
                feat: 'Degenerate B-Rep Surfaces',
                old: 'Fails with non-manifold error',
                neu: 'Automatic sewing & normal healing',
              },
              {
                feat: 'Rotated Part Stock Estimation',
                old: 'World coordinate axis AABB (+60% waste)',
                neu: 'PCA minimum bounding envelope (-35%)',
              },
              {
                feat: 'Data Privacy / Workstation Security',
                old: 'Requires cloud upload or license check',
                neu: '100% on-premises C++ compiled binary',
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
              HIGH-THROUGHPUT ASSEMBLY SPECIFICATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#151514] mt-2 mb-3">
              Automated STEP Decomposition &amp; Raw Stock Sizing
            </h2>
            <p className="text-sm text-[#686663] leading-relaxed">
              Designed specifically for manufacturing plants receiving complex multi-gigabyte client assemblies in STEP AP203, AP214, and AP242 standards.
            </p>
          </div>

          <div className="border-t border-[#151514]/15 divide-y divide-[#151514]/10 font-mono text-xs">
            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>01 // ASYNC WORKER POOL</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Utilizes dedicated C++ worker processes to import and isolate bodies in parallel, bypassing legacy single-thread CPU bottlenecks during STEP parsing.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#686663]">
                CONCURRENCY: 16+ WORKERS
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>02 // B-REP TOPOLOGY HEALING</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Repairs inverted face normals, closes non-manifold edge tolerances, and stitches free boundaries into watertight solid bodies ready for CNC cut-list extraction.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-emerald-700 font-bold">
                TOPOLOGY REPAIR: AUTO
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>03 // PCA PRINCIPAL AXES SIZING</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Computes tightest physical billet, block, or round bar stock dimensions for each individual body without excess waste, accommodating user-defined milling margins.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#686663]">
                AXIAL DOMINANCE: PCA
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>04 // AIR-GAPPED EXCEL EXPORT</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Outputs production Excel workbooks complete with part hierarchy, volumes, surface areas, material assignments, and stock callouts without network transmission.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#151514] font-semibold">
                NETWORK REQUIRED: NONE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#151514]/[0.08] py-16 px-6 text-center">
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
      </section>
    </div>
  );
};

export default StepBOMPage;
