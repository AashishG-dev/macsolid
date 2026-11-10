import React from 'react';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { CADViewport3D } from '../components/CADViewport3D';
import { usePageSEO } from '../hooks/usePageSEO';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const SheetMetalNestingPage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  usePageSEO({
    title: 'Sheet Metal Part Separator & Automated Nesting | MacSolid',
    description: 'Automated 3D sheet metal thickness detection, flat blank sizing, and 2D nesting for laser cutting and CNC punch presses. Exports ERP-ready cut-lists in seconds.',
    path: '/sheet-metal-nesting',
    breadcrumbName: 'Sheet Metal Nesting',
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
            SHEET METAL &amp; LASER CUTTING PIPELINE
          </span>

          <button
            onClick={() => onOpenContactModal('MacSolid Pro (Sheet Metal Edition)')}
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
          <span>AUTOMATED FABRICATION &amp; ESTIMATING ENGINE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          Sheet Metal Blank Sizing &amp; Automated Part Nesting.
        </h1>

        <p className="text-base sm:text-xl text-[#686663] max-w-2xl mx-auto leading-relaxed mb-8">
          Accelerate your quoting and fabrication workflows. Decompose 3D assemblies into flat blank footprints, organize parts by alloy, and nest tightly onto raw sheet stock in seconds.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenContactModal('MacSolid Pro (Sheet Metal Edition)')}
            className="px-6 py-3 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#282826] transition-all cursor-pointer shadow-xs flex items-center gap-2"
          >
            <span>Request Sheet Metal Trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 3D Demo Container */}
      <section className="px-6 max-w-6xl mx-auto mb-20">
        <div className="w-full h-[400px] sm:h-[500px] rounded-3xl border border-[#151514]/[0.08] bg-[#F5F3EF]/70 backdrop-blur-md overflow-hidden relative shadow-xs">
          <CADViewport3D
            modelType="hydraulic_manifold"
            explodeProgress={0.4}
            cutProgress={0}
            cutAxis="z"
            enableClipping={false}
            className="w-full h-full"
          />
          <div className="absolute top-5 left-5 pointer-events-none font-mono text-[11px] bg-[#F5F3EF]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#151514]/[0.08] shadow-xs">
            <div className="text-[#151514] font-semibold">AUTOMATED PART RECOGNITION</div>
            <div className="text-[#686663] mt-0.5">GAUGE: 3.0 mm · SS304 STAINLESS</div>
            <div className="text-emerald-700 font-medium">STATUS: FLATTENED &amp; NEST-READY</div>
          </div>
        </div>
      </section>

      {/* Swiss Engineering Specification Ledger */}
      <section className="py-16 px-6 max-w-6xl mx-auto mb-16">
        <div className="border border-[#151514]/[0.08] rounded-3xl bg-[#F5F3EF] p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono font-semibold tracking-wider text-[#8C8A85] uppercase">
              FABRICATION SPECIFICATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#151514] mt-2 mb-3">
              Built for Laser Cutting &amp; Job Shop Estimators
            </h2>
            <p className="text-sm text-[#686663] leading-relaxed">
              Stop manually measuring drawings and typing dimensions. MacSolid turns complex 3D customer assemblies into verified fabrication cut-lists automatically.
            </p>
          </div>

          <div className="border-t border-[#151514]/15 divide-y divide-[#151514]/10 font-mono text-xs">
            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>01 // GAUGE RECOGNITION</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Scans 3D solid bodies for uniform wall thickness and bend relief radii. Automatically categorizes components by sheet metal gauge (e.g. 16 Ga, 10 Ga, 3mm Plate).
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#686663]">
                PRECISION: ±0.01 MM
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>02 // FLAT BLANK FOOTPRINT</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Calculates flat envelope dimensions [Length × Width] and true surface areas to calculate raw sheet material consumption and laser cut cycle times.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-emerald-700 font-bold">
                ENVELOPE: ORIENTED PCA
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>03 // ALLOY SORTING</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Groups parts by material grade (SS304, Aluminum 5052-H32, Mild Steel A36) into segregated job cut-lists so machine operators never mix sheet stacks.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#686663]">
                SORTING: AUTOMATIC
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>04 // 2D NESTING DISPATCH</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Generates tight bounding polygon layouts for standard 4×8 ft and 5×10 ft sheet sizes, maximizing sheet utilization and minimizing skeleton scrap.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-emerald-700 font-bold">
                SCRAP REDUCTION: UP TO 28%
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>05 // QUOTING &amp; ERP EXPORT</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Exports formatted Excel cut-lists with part numbers, quantities, material grades, pierces, and cut perimeters for immediate costing in job-shop ERP software.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#151514] font-semibold">
                EXPORT: 1-CLICK EXCEL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#151514]/[0.08] py-20 px-6 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#151514] mb-3">
          Accelerate your sheet metal quoting today.
        </h3>
        <p className="text-sm text-[#686663] mb-8 max-w-md mx-auto">
          Test MacSolid with your own 3D STEP or SolidWorks assemblies on an air-gapped workstation evaluation.
        </p>
        <button
          onClick={() => onOpenContactModal('MacSolid Pro (Sheet Metal Edition)')}
          className="px-8 py-3.5 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#282826] transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
        >
          <span>Request Evaluation License</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
};

export default SheetMetalNestingPage;
