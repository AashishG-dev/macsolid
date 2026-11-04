import React, { useState } from 'react';
import { Download, Check, Shield, KeyRound, ExternalLink } from 'lucide-react';

export const PricingTrialSection: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <section id="pricing" className="relative py-28 px-6 max-w-7xl mx-auto z-10">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-blue-600 mb-3">
          14-DAY FULL EVALUATION
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-4">
          Begin Extraction in Minutes.
        </h2>
        <p className="text-base text-slate-500">
          Standalone Windows executable. No cloud accounts, no subscriptions, no forced updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
        {/* Trial Card */}
        <div className="p-8 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Evaluation</div>
            <div className="text-2xl font-bold text-slate-900 mb-2">14-Day Free Trial</div>
            <div className="text-sm text-slate-500 mb-6">Fully uncapped C++ kernel features for 14 days.</div>
            <div className="text-3xl font-bold font-mono text-slate-900 mb-6">
              $0 <span className="text-xs font-normal text-slate-400">/ 14 days</span>
            </div>

            <ul className="space-y-3 text-xs font-mono text-slate-600 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Unlimited STEP & SLDASM imports</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>60 FPS GPU Section View</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Excel BOM Export</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Automatic Hardware ID generation</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleDownload}
            className="w-full py-3 px-4 rounded-xl border border-slate-900 bg-slate-900 text-white hover:bg-slate-800 font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Setup Initiated</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Installer (.exe)</span>
              </>
            )}
          </button>
        </div>

        {/* Commercial Full Edition (Featured) */}
        <div className="p-8 rounded-2xl border-2 border-blue-600 bg-white shadow-md relative flex flex-col justify-between">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-xs">
            RECOMMENDED FOR ENGINEERING SHOPS
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold mb-2">
              Enterprise Perpetual
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-2">Full Edition</div>
            <div className="text-sm text-slate-500 mb-6">Perpetual offline hardware-locked license per machine.</div>
            <div className="text-3xl font-bold font-mono text-slate-900 mb-6">
              Perpetual <span className="text-xs font-normal text-slate-400">One-time buy</span>
            </div>

            <ul className="space-y-3 text-xs font-mono text-slate-600 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Permanent lifetime license key</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Full SolidWorks & NX Macro API</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Custom Excel ERP templates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Automated 2D Drawing Generator</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>100% Air-Gapped Machine Support</span>
              </li>
            </ul>
          </div>

          <a
            href="mailto:contact@autobom.cad?subject=Enterprise%20License%20Inquiry"
            className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <KeyRound className="w-4 h-4" />
            <span>Request Permanent Key</span>
          </a>
        </div>

        {/* Security & Air-Gap Info */}
        <div className="p-8 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">Architecture</div>
            <div className="text-2xl font-bold text-slate-900 mb-2">Hardware-Locked Ed25519</div>
            <div className="text-sm text-slate-500 mb-6">Asymmetric public-key cryptography bound to PC motherboard & CPU ID.</div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 font-mono text-[11px] text-slate-600 mb-6 space-y-2">
              <div className="text-slate-900 font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Cloud Leakage</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                CAD assemblies contain confidential IP. AutoBOM never opens internet sockets. All B-Rep geometry and BOM values remain strictly local.
              </p>
            </div>
          </div>

          <div className="font-mono text-[11px] text-slate-400">
            COMPLIANT WITH DEFENSE & AEROSPACE DATA RESIDENCY
          </div>
        </div>
      </div>
    </section>
  );
};

