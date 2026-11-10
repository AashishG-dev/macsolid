import React from 'react';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const SecurityCompliancePage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  usePageSEO({
    title: 'ITAR CAD Compliance & Air-Gapped Security | MacSolid',
    description: '100% on-premises CAD parsing for defense, aerospace, and medical engineering. Zero network egress, zero cloud uploads, ITAR and EAR data isolation ready.',
    path: '/security',
    breadcrumbName: 'Security & Compliance',
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
            SECURITY PROTOCOL // AIR-GAPPED DESKTOP ARCHITECTURE
          </span>

          <button
            onClick={() => onOpenContactModal('MacSolid Enterprise (Air-Gapped)')}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-[#151514] text-[#EBE9E5] hover:bg-[#242422] transition-all cursor-pointer shadow-xs"
          >
            Security Package
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="py-20 px-6 max-w-5xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8C8A85] mb-4 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
          <span>ZERO EXTERNAL NETWORK EGRESS // 100% AIR-GAPPED</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          Air-Gapped Security &amp; ITAR CAD Compliance.
        </h1>

        <p className="text-base sm:text-xl text-[#686663] max-w-2xl mx-auto leading-relaxed mb-8">
          Your 3D CAD models and proprietary geometry represent millions in intellectual property. MacSolid is engineered specifically for defense, aerospace, and precision tooling teams who cannot upload CAD models to third-party cloud servers.
        </p>
      </header>

      {/* 4 Pillars of Architecture - Swiss Specification Ledger */}
      <section className="py-12 px-6 max-w-6xl mx-auto mb-16">
        <div className="border border-[#151514]/[0.08] rounded-3xl bg-[#F5F3EF] p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-[11px] font-mono font-semibold tracking-wider text-[#8C8A85] uppercase">
              SECURITY SPECIFICATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#151514] mt-2 mb-3">
              Four Pillars of Air-Gapped Data Isolation
            </h2>
            <p className="text-sm text-[#686663] leading-relaxed">
              Engineered from the ground up to operate on isolated, classified, and non-networked workstation environments.
            </p>
          </div>

          <div className="border-t border-[#151514]/15 divide-y divide-[#151514]/10 font-mono text-xs">
            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-4 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>01 // ZERO NETWORK EGRESS</span>
              </div>
              <div className="md:col-span-5 font-sans text-xs text-[#151514] leading-relaxed">
                Contains zero telemetry scripts, zero analytics pings, and zero outbound network sockets. Fully functional in offline SCIF defense laboratories without authorization timeouts.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-emerald-700 font-bold">
                NETWORK SOCKETS: 0
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-4 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>02 // ITAR &amp; EAR COMPLIANCE</span>
              </div>
              <div className="md:col-span-5 font-sans text-xs text-[#151514] leading-relaxed">
                Because no geometry leaves your physical local network, data processing complies with ITAR (22 CFR §§ 120-130) and Export Administration Regulations (EAR) protocols.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#686663]">
                DATA TRANSFERS: LOCAL ONLY
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-4 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>03 // ED25519 SIGNED BINARIES</span>
              </div>
              <div className="md:col-span-5 font-sans text-xs text-[#151514] leading-relaxed">
                Every release binary is cryptographically signed with high-entropy ED25519 signatures and Microsoft Authenticode certificates, ensuring verifiable software supply-chain integrity.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-[#686663]">
                SIGNATURE: AUTHENTICODE
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-4 text-[#8C8A85] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>04 // VOLATILE RAM PROCESSING</span>
              </div>
              <div className="md:col-span-5 font-sans text-xs text-[#151514] leading-relaxed">
                CAD models are decoded in volatile system RAM only during active parsing and securely purged from memory upon export. No unencrypted cached geometry remains on workstation disks.
              </div>
              <div className="md:col-span-3 md:text-right font-mono text-[11px] text-emerald-700 font-bold">
                PERSISTENT DISK CACHE: 0 BYTES
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Checklist */}
      <section className="py-16 px-6 max-w-4xl mx-auto border-t border-[#151514]/[0.08]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#151514] text-center mb-10">
          Security Specification Checklist
        </h2>

        <div className="space-y-4">
          {[
            { title: 'Air-Gapped Operation', desc: 'No active internet connection required during execution or license validation.' },
            { title: 'Local File System Only', desc: 'Reads directly from local or internal SMB/NFS secure file shares only.' },
            { title: 'Zero Telemetry & Tracking', desc: 'Does not transmit usage metrics, IP addresses, or metadata to external servers.' },
            { title: 'On-Premises ERP Integration', desc: 'Exports straight into native .xlsx or .csv formats on internal networks.' },
            { title: 'Windows Group Policy & MSI Deployment', desc: 'Supports automated enterprise deployment via Microsoft Intune or GPO.' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3.5 p-4 rounded-xl border border-[#151514]/[0.06] bg-[#F5F3EF]">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-[#151514]">{item.title}</h4>
                <p className="text-xs text-[#686663] mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center border-t border-[#151514]/[0.08]">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#151514] mb-4">
          Request Enterprise Security Package
        </h2>
        <p className="text-sm text-[#686663] max-w-lg mx-auto mb-8">
          Contact our compliance engineers for our detailed ITAR Whitepaper, SHA-256 checksums, and air-gapped evaluation installation media.
        </p>
        <button
          onClick={() => onOpenContactModal('MacSolid Enterprise (Air-Gapped)')}
          className="px-8 py-3.5 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#282826] transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
        >
          <span>Request Security Documentation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
};

export default SecurityCompliancePage;
