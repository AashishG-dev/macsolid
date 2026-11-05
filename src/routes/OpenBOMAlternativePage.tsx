import React, { useEffect } from 'react';
import { ArrowLeft, Check, X, ShieldCheck, Zap, HardDrive, DollarSign, Lock, ArrowRight, Activity, Cpu } from 'lucide-react';
import { ROICalculator } from '../components/ROICalculator';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const OpenBOMAlternativePage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  useEffect(() => {
    document.title = 'OpenBOM Alternative: 100% On-Premises CAD BOM Extractor | MacSolid';
    window.scrollTo(0, 0);
  }, []);

  const comparisonRows = [
    {
      feature: 'Data Hosting & Architecture',
      macsolid: '100% Local On-Premises (Air-gapped desktop)',
      macsolidAdvantage: true,
      openbom: 'Public Cloud (AWS multi-tenant SaaS)',
      openbomAdvantage: false,
    },
    {
      feature: 'CAD Security & IP Privacy',
      macsolid: 'Zero network calls. ITAR & proprietary IP safe.',
      macsolidAdvantage: true,
      openbom: 'Requires uploading full 3D models to cloud',
      openbomAdvantage: false,
    },
    {
      feature: 'Extraction Speed (5,000+ parts)',
      macsolid: '1.2s to 1.8s (Multi-threaded C++20 engine)',
      macsolidAdvantage: true,
      openbom: '45s to 3+ minutes (Cloud sync & network lag)',
      openbomAdvantage: false,
    },
    {
      feature: 'Pricing Model',
      macsolid: 'Fixed transparent workstation or team license',
      macsolidAdvantage: true,
      openbom: '$250 - $450/user/month recurring SaaS',
      openbomAdvantage: false,
    },
    {
      feature: 'Real-Time 3D Capped Cross-Section',
      macsolid: 'Included (60 FPS local GPU OpenGL shader)',
      macsolidAdvantage: true,
      openbom: 'Limited / basic browser-based viewer',
      openbomAdvantage: false,
    },
    {
      feature: 'Offline Field / Shop Floor Usage',
      macsolid: 'Works 100% without internet connection',
      macsolidAdvantage: true,
      openbom: 'Inoperable during internet/cloud outages',
      openbomAdvantage: false,
    },
    {
      feature: 'ERP / Excel / CSV Export',
      macsolid: 'Instant one-click direct Excel (.xlsx) & CSV',
      macsolidAdvantage: true,
      openbom: 'Export via cloud dashboard',
      openbomAdvantage: true,
    },
    {
      feature: 'Memory Footprint',
      macsolid: 'Under 140 MB RAM (C++20 Zero-copy parser)',
      macsolidAdvantage: true,
      openbom: 'Heavy browser tab (1.2+ GB RAM)',
      openbomAdvantage: false,
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
            COMPETITIVE ANALYSIS · MACSOLID VS OPENBOM
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
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>ZERO CLOUD UPLOADS · 100% AIR-GAPPED ON-PREMISES</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          The On-Premises <br />
          <span className="font-serif italic font-normal">Alternative to OpenBOM.</span>
        </h1>

        <p className="text-base sm:text-xl text-[#686663] max-w-2xl mx-auto leading-relaxed mb-8">
          Tired of recurring monthly SaaS seat fees and uploading confidential CAD assemblies to third-party cloud servers? MacSolid delivers instant C++20 Bill of Materials extraction directly on your local workstation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onOpenContactModal('MacSolid Enterprise (Air-Gapped)')}
            className="px-6 py-3 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#282826] transition-all cursor-pointer shadow-xs flex items-center gap-2"
          >
            <span>Switch to MacSolid</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <a
            href="#comparison-matrix"
            className="px-6 py-3 rounded-full border border-[#151514]/[0.15] bg-[#F5F3EF] text-[#151514] text-xs font-semibold hover:bg-[#EBE9E5] transition-all cursor-pointer"
          >
            View Feature Matrix
          </a>
        </div>
      </header>

      {/* Why Teams Migrate Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl border border-[#151514]/[0.08] bg-[#F5F3EF]/60 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-5">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#151514] mb-2">ITAR & Defense Ready</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              OpenBOM requires CAD models to leave your network. MacSolid executes 100% locally with zero internet access, satisfying stringent aerospace, defense, and trade secret requirements.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#151514]/[0.08] bg-[#F5F3EF]/60 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center mb-5">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#151514] mb-2">40x Faster Processing</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              Instead of browser-based cloud queueing, MacSolid uses native SIMD and multi-core C++20 parsing to digest assemblies with 10,000+ parts in under 2 seconds.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#151514]/[0.08] bg-[#F5F3EF]/60 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-5">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#151514] mb-2">Predictable Licensing</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              Stop paying recurring $2,400–$5,000/seat annual subscriptions for every draftsman. MacSolid offers simple perpetual or transparent team workstation deployments.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section id="comparison-matrix" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-semibold tracking-wider text-[#8C8A85] uppercase">
            SIDE-BY-SIDE EVALUATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#151514] mt-2">
            MacSolid vs. OpenBOM
          </h2>
          <p className="text-sm text-[#686663] mt-2 max-w-xl mx-auto">
            See how native desktop engineering software outperforms cloud-based subscription tools.
          </p>
        </div>

        <div className="border border-[#151514]/[0.08] rounded-2xl bg-[#F5F3EF] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#151514]/[0.08] bg-[#ECEAE6]">
                  <th className="py-4 px-6 font-mono font-semibold text-[#686663]">FEATURE / CAPABILITY</th>
                  <th className="py-4 px-6 font-mono font-bold text-[#151514] bg-[#E3E0DA]/50">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      MACSOLID
                    </span>
                  </th>
                  <th className="py-4 px-6 font-mono font-semibold text-[#8C8A85]">OPENBOM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#151514]/[0.06]">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#ECEAE6]/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#151514]">{row.feature}</td>
                    <td className="py-4 px-6 font-mono font-semibold text-[#151514] bg-[#E3E0DA]/20">
                      <div className="flex items-center gap-2">
                        {row.macsolidAdvantage ? (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <span className="w-4 h-4 shrink-0" />
                        )}
                        <span>{row.macsolid}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-[#686663]">
                      <div className="flex items-center gap-2">
                        {row.openbomAdvantage ? (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-red-500 shrink-0" />
                        )}
                        <span>{row.openbom}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Nominative Fair Use & Trademark Attribution */}
        <p className="text-[11px] font-mono text-[#8C8A85] text-center mt-4">
          * OpenBOM® is a trademark of Newman Cloud Inc. MacSolid is an independent platform developed by MacSolid Systems with no sponsorship or affiliation with Newman Cloud Inc. Comparison data is accurate as of November 2026 based on public software specifications.
        </p>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto border-t border-[#151514]/[0.08]">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-semibold tracking-wider text-[#8C8A85] uppercase">
            COST COMPARISON ESTIMATOR
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#151514] mt-2">
            Calculate Your Savings vs. Cloud SaaS
          </h2>
          <p className="text-sm text-[#686663] mt-2 max-w-lg mx-auto">
            Discover how much your engineering department saves every year by eliminating manual drawing BOMs and recurring seat subscriptions.
          </p>
        </div>

        <ROICalculator />
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center border-t border-[#151514]/[0.08]">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#151514] mb-4">
          Ready to Keep Your CAD Data Safe?
        </h2>
        <p className="text-sm sm:text-base text-[#686663] max-w-xl mx-auto mb-8">
          Deploy MacSolid in your engineering environment today. Tested on Windows 10/11 x64 with full SolidWorks, AutoCAD, and STEP AP203/214/242 support.
        </p>
        <button
          onClick={() => onOpenContactModal('MacSolid Enterprise (Air-Gapped)')}
          className="px-8 py-3.5 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#282826] transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
        >
          <span>Request MacSolid Trial & Evaluation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
};

