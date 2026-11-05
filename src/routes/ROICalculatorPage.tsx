import React, { useEffect } from 'react';
import { ArrowLeft, Calculator, TrendingUp, DollarSign, Clock, Users, ArrowRight } from 'lucide-react';
import { ROICalculator } from '../components/ROICalculator';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const ROICalculatorPage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  useEffect(() => {
    document.title = 'BOM Automation ROI Calculator | Engineering Cost Savings | MacSolid';
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
            ENGINEERING FINANCIAL METRICS & LABOR SAVINGS
          </span>

          <button
            onClick={() => onOpenContactModal('MacSolid Pro (Full BOM Engine)')}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-[#151514] text-[#EBE9E5] hover:bg-[#242422] transition-all cursor-pointer shadow-xs"
          >
            Request Evaluation
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="py-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#151514]/[0.08] font-mono text-xs font-semibold mb-6 bg-[#F5F3EF] text-[#151514]">
          <Calculator className="w-3.5 h-3.5 text-blue-600" />
          <span>REAL-TIME ENGINEERING ECONOMICS MODEL</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          CAD BOM Automation <br />
          <span className="font-serif italic font-normal">ROI Calculator.</span>
        </h1>

        <p className="text-base sm:text-xl text-[#686663] max-w-2xl mx-auto leading-relaxed mb-8">
          Quantify the exact dollar value and engineering hours your organization wastes every month manually drafting Bill of Materials tables in SolidWorks and AutoCAD.
        </p>
      </header>

      {/* Main Interactive Calculator */}
      <main className="pb-20 px-6 max-w-6xl mx-auto">
        <ROICalculator />

        {/* Methodology Breakdown */}
        <section className="mt-16 p-8 rounded-2xl border border-[#151514]/[0.08] bg-[#F5F3EF]/60">
          <h3 className="text-base font-bold text-[#151514] mb-3">
            Calculation Methodology & Assumptions
          </h3>
          <p className="text-xs text-[#686663] leading-relaxed mb-4">
            Our return-on-investment model is grounded in real-world benchmark data from over 400 manufacturing and mechanical design operations. The baseline manual workflow includes:
          </p>
          <ul className="space-y-2 text-xs text-[#686663] font-mono list-disc list-inside">
            <li>Manual ballooning and drawing table verification in SolidWorks / AutoCAD (avg 3.5 hrs / assembly).</li>
            <li>Typing part numbers, material specs, and stock bounding dimensions into Excel spreadsheets.</li>
            <li>Revising BOM tables when engineering change orders (ECOs) alter component dimensions or quantities.</li>
            <li>Purchasing and supply chain scrap caused by human transcription errors in ERP imports.</li>
          </ul>
        </section>

        {/* Bottom CTA */}
        <div className="mt-16 text-center border-t border-[#151514]/[0.08] pt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#151514] mb-4">
            Ready to Reclaim These Engineering Hours?
          </h2>
          <p className="text-sm text-[#686663] max-w-lg mx-auto mb-8">
            Experience sub-second C++20 BOM extraction with zero setup overhead and complete ITAR air-gapped security.
          </p>
          <button
            onClick={() => onOpenContactModal('MacSolid Pro (Full BOM Engine)')}
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

