import React from 'react';
import { ArrowLeft, Check, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const OpenBOMAlternativePage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  usePageSEO({
    title: 'OpenBOM Alternative | Air-Gapped Desktop CAD BOM Software | MacSolid',
    description: 'Looking for an OpenBOM alternative? MacSolid runs 100% locally on your engineering workstation. Zero cloud uploads, no monthly per-user fees, instant C++ STEP parsing.',
    path: '/openbom-alternative',
    breadcrumbName: 'OpenBOM Alternative',
  });

  const comparisonRows = [
    {
      feature: 'Data Hosting & Privacy',
      macsolid: '100% On-Premises / Air-Gapped Local Workstation',
      openbom: 'Public Multi-Tenant Cloud (AWS US-East)',
      macsolidAdvantage: true,
    },
    {
      feature: 'CAD Geometry Upload Required',
      macsolid: 'Never leaves RAM / Zero outbound network sockets',
      openbom: 'Full 3D model uploaded to cloud servers',
      macsolidAdvantage: true,
    },
    {
      feature: 'Export Speed (1,000+ Parts)',
      macsolid: '< 1.4 seconds (Multi-Process C++20)',
      openbom: '45 to 180 seconds (Network upload + cloud queue)',
      macsolidAdvantage: true,
    },
    {
      feature: 'PCA Minimum Stock Envelope',
      macsolid: 'Included (Billet, plate, round bar & sheet metal)',
      openbom: 'Requires third-party manual custom formulas',
      macsolidAdvantage: true,
    },
    {
      feature: 'Pricing Model',
      macsolid: 'Predictable Workstation or Floating LAN deployment',
      openbom: '$2,400 to $5,000+ per user/year recurring SaaS',
      macsolidAdvantage: true,
    },
    {
      feature: 'Offline / Defense Facility Use',
      macsolid: 'Certified for offline SCIF & defense plants',
      openbom: 'Impossible (Hard requirement for live internet)',
      macsolidAdvantage: true,
    },
    {
      feature: 'Direct SolidWorks API & DWG Blocks',
      macsolid: 'Native COM / Document Manager & DXF deconstruction',
      openbom: 'Cloud CAD add-in wrapper',
      macsolidAdvantage: true,
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
            COMPETITIVE ANALYSIS // MACSOLID VS OPENBOM
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
        <div className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8C8A85] mb-4 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
          <span>ZERO CLOUD UPLOADS // 100% AIR-GAPPED ON-PREMISES</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          The On-Premises Alternative to OpenBOM.
        </h1>

        <p className="text-base sm:text-xl text-[#686663] max-w-2xl mx-auto leading-relaxed mb-8">
          Tired of recurring monthly SaaS seat fees and uploading confidential CAD assemblies to third-party cloud servers? MacSolid delivers instant C++ Bill of Materials extraction directly on your local workstation.
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

      {/* Why Teams Migrate - Swiss Engineering Specification Ledger */}
      <section className="py-12 px-6 max-w-6xl mx-auto mb-16">
        <div className="border border-[#151514]/[0.08] rounded-3xl bg-[#F5F3EF] p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-[#8C8A85] uppercase">
              MIGRATION RATIONALE
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#151514] mt-2 mb-3">
              Why Machine Shops &amp; Defense Contractors Migrate
            </h2>
            <p className="text-sm text-[#686663] leading-relaxed">
              Eliminate recurring per-user SaaS licenses and the security vulnerabilities of third-party multi-tenant cloud storage.
            </p>
          </div>

          <div className="border-t border-[#151514]/15 divide-y divide-[#151514]/10 font-mono text-xs">
            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>01 // ITAR &amp; DEFENSE READY</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                OpenBOM requires CAD geometry to leave your internal network. MacSolid executes 100% locally with zero internet access, satisfying stringent aerospace, defense, and trade-secret isolation requirements.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-emerald-700 font-bold">
                COMPLIANCE: AIR-GAPPED SCIF
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>02 // 40X FASTER PROCESSING</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Instead of browser-based cloud queueing and upload bottlenecks, MacSolid uses native multi-process C++ workers to parse 10,000+ component assemblies in under 2 seconds.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#686663]">
                THROUGHPUT: &lt; 2S / 10K PARTS
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>03 // PREDICTABLE SEAT PRICING</span>
              </div>
              <div className="md:col-span-6 font-sans text-xs text-[#151514] leading-relaxed">
                Stop paying recurring $2,400–$5,000/seat annual subscriptions for every draftsman. MacSolid offers simple perpetual or transparent team workstation deployments.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#151514] font-semibold">
                ANNUAL SAVINGS: UP TO 75%
              </div>
            </div>
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
                        {row.macsolidAdvantage ? (
                          <X className="w-4 h-4 text-red-500 shrink-0" />
                        ) : (
                          <span className="w-4 h-4 shrink-0" />
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
          <span>Request MacSolid Trial &amp; Evaluation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
};

export default OpenBOMAlternativePage;
