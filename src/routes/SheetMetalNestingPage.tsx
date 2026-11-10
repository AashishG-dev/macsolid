import React, { useEffect } from 'react';
import { ArrowLeft, Check, Layers, Zap, ArrowRight, ShieldCheck, FileSpreadsheet, Box, Scissors } from 'lucide-react';
import { CADViewport3D } from '../components/CADViewport3D';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const SheetMetalNestingPage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  useEffect(() => {
    document.title = 'Sheet Metal Blank Sizing & Multi-Part Nesting Software | MacSolid';
    window.scrollTo(0, 0);
  }, []);

  const capabilities = [
    {
      title: 'Automatic Gauge & Thickness Detection',
      desc: 'Instantly identifies uniform sheet metal bodies across assemblies. Detects material thickness from 0.5 mm to 25 mm without manual measurement.',
    },
    {
      title: 'Flat Blank Boundary Extraction',
      desc: 'Computes flat blank perimeter dimensions, overall envelope, and surface area directly from 3D CAD files for laser and plasma cutting estimators.',
    },
    {
      title: 'Multi-Part Sheet Stock Nesting',
      desc: 'Groups components by material grade (SS304, Mild Steel, Aluminum) and arranges parts efficiently on standard sheet sizes with live utilization percentages.',
    },
    {
      title: 'Cut Length & Pierce Estimating',
      desc: 'Calculates total outer perimeter cut lengths and internal cutout counts, providing estimators with exact machine run-time metrics for job quoting.',
    },
    {
      title: '1-Click Shop-Floor Excel Export',
      desc: 'Outputs customer-ready fabrication workbooks complete with part numbers, quantities, material grades, sheet sizes, and scrap ratios.',
    },
    {
      title: '100% Air-Gapped Workstation Security',
      desc: 'Runs entirely on your local Windows PC. Proprietary client drawings and sheet metal assemblies never leave your internal network.',
    },
  ];

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#151514]/[0.08] font-mono text-xs font-semibold mb-6 bg-[#F5F3EF] text-[#151514]">
          <Scissors className="w-3.5 h-3.5 text-blue-600" />
          <span>AUTOMATED FABRICATION &amp; ESTIMATING ENGINE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          Sheet Metal Blank Sizing &amp; <br />
          <span className="font-serif italic font-normal">Automated Part Nesting.</span>
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

      {/* 6 Core Capabilities */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-semibold tracking-wider text-[#8C8A85] uppercase">
            FABRICATION INTELLIGENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#151514] mt-2">
            Built for Laser Cutting &amp; Job Shop Estimators
          </h2>
          <p className="text-sm text-[#686663] mt-2 max-w-xl mx-auto">
            Stop manually measuring drawings and typing dimensions. MacSolid turns complex 3D customer files into verified fabrication cut-lists automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-[#151514]/[0.08] bg-[#F5F3EF]/70 hover:bg-[#F5F3EF] transition-all shadow-xs"
            >
              <div className="w-8 h-8 rounded-xl bg-[#151514]/5 text-[#151514] flex items-center justify-center mb-4">
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-bold text-sm text-[#151514] mb-2">{cap.title}</h3>
              <p className="text-xs text-[#686663] leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <footer className="border-t border-[#151514]/[0.08] py-20 px-6 text-center max-w-4xl mx-auto">
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
      </footer>
    </div>
  );
};

export default SheetMetalNestingPage;
