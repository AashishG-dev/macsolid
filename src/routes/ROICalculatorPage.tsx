import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ROICalculator } from '../components/ROICalculator';
import { usePageSEO } from '../hooks/usePageSEO';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const ROICalculatorPage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  usePageSEO({
    title: 'CAD BOM Labor Savings & ROI Calculator | MacSolid',
    description: 'Calculate your exact annual engineering labor savings by automating SolidWorks and AutoCAD Bill of Materials extraction and raw stock bounding with MacSolid.',
    path: '/roi-calculator',
    breadcrumbName: 'ROI Calculator',
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
            ENGINEERING ECONOMICS // ROI MODEL
          </span>

          <button
            onClick={() => onOpenContactModal('MacSolid Standard (Full BOM & Raw Stock Engine)')}
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
          <span>ENGINEERING LABOR ANALYSIS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          CAD BOM Automation ROI Calculator.
        </h1>

        <p className="text-base sm:text-xl text-[#686663] max-w-2xl mx-auto leading-relaxed mb-8">
          Quantify the exact dollar value and engineering hours your organization saves every month by replacing manual SolidWorks drawing tables with automated C++ BOM extraction.
        </p>
      </header>

      {/* Main Interactive Calculator */}
      <main className="pb-20 px-6 max-w-6xl mx-auto">
        <ROICalculator
          onOpenContactModal={() => onOpenContactModal('MacSolid Standard (Full BOM & Raw Stock Engine)')}
        />

        {/* Methodology Ledger */}
        <section className="mt-16 border border-[#151514]/[0.08] rounded-3xl bg-[#F5F3EF] p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-[#8C8A85] uppercase">
              MODEL ASSUMPTIONS &amp; BENCHMARKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#151514] mt-2 mb-3">
              Calculation Methodology
            </h2>
            <p className="text-xs sm:text-sm text-[#686663] leading-relaxed">
              Our engineering economics model is parameterized directly from machine-shop drafting time logs and CNC raw stock cut-off waste rates:
            </p>
          </div>

          <div className="border-t border-[#151514]/15 divide-y divide-[#151514]/10 font-mono text-xs">
            <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
              <div className="md:col-span-4 text-[#8C8A85] font-semibold">
                01 // DRAWING TABLE BALLOONING
              </div>
              <div className="md:col-span-8 font-sans text-xs text-[#151514] leading-relaxed">
                Manual part tagging, sub-assembly hierarchy tracking, and drawing sheet table updates take an estimated 0.9 hours per 100 components in SolidWorks and AutoCAD.
              </div>
            </div>

            <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
              <div className="md:col-span-4 text-[#8C8A85] font-semibold">
                02 // RAW STOCK ENVELOPE MEASURING
              </div>
              <div className="md:col-span-8 font-sans text-xs text-[#151514] leading-relaxed">
                Estimators manually measuring rotated parts in 3D CAD to derive billet, plate, and bar dimensions incur substantial payroll hours and frequent oversizing scrap.
              </div>
            </div>

            <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
              <div className="md:col-span-4 text-[#8C8A85] font-semibold">
                03 // ECO REVISION PROPAGATION
              </div>
              <div className="md:col-span-8 font-sans text-xs text-[#151514] leading-relaxed">
                Engineering Change Orders (ECOs) require re-verifying BOM counts and dimensions across drawings. MacSolid runs sub-second re-extraction on revised assemblies.
              </div>
            </div>

            <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
              <div className="md:col-span-4 text-[#8C8A85] font-semibold">
                04 // ERP TRANSCRIPTION ERRORS
              </div>
              <div className="md:col-span-8 font-sans text-xs text-[#151514] leading-relaxed">
                Manual copy-paste into Excel generates human transcription mistakes. MacSolid direct .XLSX export guarantees 100% deterministic cut-list integrity.
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-16 text-center border-t border-[#151514]/[0.08] pt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#151514] mb-4">
            Ready to Reclaim These Engineering Hours?
          </h2>
          <p className="text-sm text-[#686663] max-w-lg mx-auto mb-8">
            Experience sub-second C++ BOM extraction with zero setup overhead and complete ITAR air-gapped security.
          </p>
          <button
            onClick={() => onOpenContactModal('MacSolid Standard (Full BOM & Raw Stock Engine)')}
            className="px-8 py-3.5 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#282826] transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
          >
            <span>Request Evaluation License</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default ROICalculatorPage;
