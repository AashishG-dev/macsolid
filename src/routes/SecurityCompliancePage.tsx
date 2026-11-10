import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, Server, FileCheck, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { usePageSEO } from '../hooks/usePageSEO';

interface PageProps {
  onBack: () => void;
  onOpenContactModal: (edition?: string) => void;
}

export const SecurityCompliancePage: React.FC<PageProps> = ({ onBack, onOpenContactModal }) => {
  usePageSEO({
    title: 'Air-Gapped CAD Security & ITAR Compliance | MacSolid',
    description: 'Zero cloud egress CAD assembly viewer and BOM generator for defense and aerospace engineers. ED25519 verified, ephemeral memory processing.',
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
            ENTERPRISE SECURITY & COMPLIANCE ARCHITECTURE
          </span>

          <button
            onClick={() => onOpenContactModal('MacSolid Enterprise (Air-Gapped)')}
            className="text-xs font-semibold px-4 py-2 rounded-full bg-[#151514] text-[#EBE9E5] hover:bg-[#242422] transition-all cursor-pointer shadow-xs"
          >
            Request Security Whitepaper
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="py-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#151514]/[0.08] font-mono text-xs font-semibold mb-6 bg-[#F5F3EF] text-[#151514]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>ZERO EXTERNAL NETWORK EGRESS · 100% AIR-GAPPED</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tightest text-[#151514] mb-6 leading-tight">
          Air-Gapped Security & <br />
          <span className="font-serif italic font-normal">ITAR CAD Compliance.</span>
        </h1>

        <p className="text-base sm:text-xl text-[#686663] max-w-2xl mx-auto leading-relaxed mb-8">
          Your 3D CAD models and proprietary geometry represent millions in intellectual property. MacSolid is engineered specifically for defense, aerospace, and medical teams who cannot upload CAD models to third-party cloud servers.
        </p>
      </header>

      {/* 4 Pillars of Architecture */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl border border-[#151514]/[0.08] bg-[#F5F3EF]/60">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mb-5">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#151514] mb-2">Zero Network Egress (Air-Gapped)</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              MacSolid contains zero telemetry, zero analytics scripts, and zero outbound network calls. You can run the executable inside a completely disconnected, air-gapped SCIF environment without missing features or authorization timeouts.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#151514]/[0.08] bg-[#F5F3EF]/60">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center mb-5">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#151514] mb-2">ITAR & EAR Export Control Ready</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              Because no data is transferred across geographical regions or stored on cloud multi-tenant infrastructure, MacSolid fully aligns with International Traffic in Arms Regulations (ITAR 22 CFR §§ 120-130) and Export Administration Regulations (EAR).
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#151514]/[0.08] bg-[#F5F3EF]/60">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center mb-5">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#151514] mb-2">ED25519 Cryptographic Verification</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              Every MacSolid binary is digitally signed with high-entropy ED25519 signatures and Microsoft Authenticode certificates, preventing supply-chain tampering and enabling deterministic zero-trust installation.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-[#151514]/[0.08] bg-[#F5F3EF]/60">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#151514] mb-2">Ephemeral In-Memory Processing</h3>
            <p className="text-xs text-[#686663] leading-relaxed">
              CAD geometries are loaded into volatile system RAM strictly during the parsing operation and immediately wiped upon export completion. No temporary geometry cache is left behind on disk unencrypted.
            </p>
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
          <span>Contact Security Team</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
};

