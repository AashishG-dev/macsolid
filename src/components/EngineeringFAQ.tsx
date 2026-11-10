import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, ShieldCheck, Cpu, Layers } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

export const EngineeringFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How does MacSolid automate Bill of Materials (BOM) generation from SolidWorks files?',
      answer:
        'MacSolid directly parses native SolidWorks assemblies (.sldasm) and parts (.sldprt) using a high-throughput C++20 engine. It reads component hierarchies, suppressed states, custom metadata, and calculates optimal raw stock bounding dimensions in under 1.4 seconds per 500 parts without needing an active SolidWorks seat running in the background.',
      tag: 'SOLIDWORKS AUTOMATION',
    },
    {
      question: 'Can MacSolid replace the manual AutoCAD DATAEXTRACTION command?',
      answer:
        'Yes. AutoCAD users frequently experience broken parts lists when block names or drawing revisions change. MacSolid replaces the manual DATAEXTRACTION wizard with a 1-click automatic workflow that scans DWG, DXF, and neutral STEP/IGES models to export structured ERP-ready Excel (.xlsx) spreadsheets with live thumbnail previews.',
      tag: 'AUTOCAD ALTERNATIVE',
    },
    {
      question: 'How does MacSolid compare to cloud-based tools like OpenBOM or DriveWorks?',
      answer:
        'Unlike OpenBOM, which stores proprietary CAD geometry on third-party cloud servers and charges per-user SaaS subscriptions, MacSolid provides 100% on-premises, air-gapped security. Your proprietary aerospace and defense models never leave your workstation. MacSolid also includes 60 FPS GPU cross-section inspection and automated PCA raw stock calculation out of the box.',
      tag: 'ARCHITECTURE & SECURITY',
    },
    {
      question: 'How are raw stock bounding dimensions and sheet metal gauge thickness calculated?',
      answer:
        'MacSolid uses Principal Component Analysis (PCA) to calculate the true minimum bounding box for rotated or organic parts, eliminating wasteful rectangular stock over-allocation. For sheet metal components, it accurately identifies uniform gauge thickness, bend line counts, and flat blank dimensions.',
      tag: 'RAW STOCK SIZING',
    },
    {
      question: 'What neutral CAD file standards are supported for aerospace and CNC machining?',
      answer:
        'MacSolid fully supports ISO 10303 STEP standards (AP203, AP214, AP242), IGES, Parasolid (.x_t), and Siemens NX JT formats. Its asynchronous worker pool automatically heals degenerate surfaces and stitches non-manifold topology on assemblies with over 10,000 components.',
      tag: 'STANDARDS & KERNEL',
    },
  ];

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#151514] mb-3 font-semibold opacity-60">
          — TECHNICAL FREQUENTLY ASKED QUESTIONS
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tightest text-[#151514] mb-3">
          Engineering Intelligence &amp; FAQ.
        </h2>
        <p className="text-sm sm:text-base text-[#686663] max-w-lg leading-relaxed">
          Technical specifications, CAD kernel interoperability, and security compliance details.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white border-[#151514]/[0.18] shadow-sm'
                  : 'bg-[#F5F3EF]/80 border-[#151514]/[0.08] hover:border-[#151514]/[0.15]'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#8C8A85] font-semibold">
                    {faq.tag}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[#151514] tracking-tight">
                    {faq.question}
                  </span>
                </div>

                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                    isOpen
                      ? 'bg-[#151514] text-[#EBE9E5] border-[#151514]'
                      : 'bg-white text-[#686663] border-[#151514]/[0.1]'
                  }`}
                >
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#4A4844] leading-relaxed border-t border-[#151514]/[0.06] animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EngineeringFAQ;

