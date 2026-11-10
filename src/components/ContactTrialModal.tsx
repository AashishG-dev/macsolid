import React, { useState, useEffect } from 'react';
import { X, Check, Mail, Calendar, Building2, User, Send } from 'lucide-react';

interface ContactTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEdition?: string;
}

export const ContactTrialModal: React.FC<ContactTrialModalProps> = ({
  isOpen,
  onClose,
  selectedEdition = 'MacSolid Standard (Full BOM & Raw Stock Engine)',
}) => {
  const [edition, setEdition] = useState(selectedEdition);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    cadSystem: 'SolidWorks',
    timeline: 'Immediate (Next 7 days)',
    notes: '',
  });

  useEffect(() => {
    if (selectedEdition) setEdition(selectedEdition);
  }, [selectedEdition]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const existing = JSON.parse(localStorage.getItem('macsolid_trial_inquiries') || '[]');
      existing.push({
        ...formData,
        edition,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('macsolid_trial_inquiries', JSON.stringify(existing));
    } catch {
      // Fallback if localStorage quota is exceeded or unavailable
    }
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-[#F5F3EF] rounded-3xl sm:rounded-4xl border border-[#151514]/[0.1] p-6 sm:p-10 shadow-[0_30px_70px_-15px_rgba(21,21,20,0.2)] max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#EBE9E5] hover:bg-[#E5E3DD] flex items-center justify-center text-[#151514] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#151514] mb-2">
              Trial Request Received
            </h3>
            <p className="text-sm text-[#686663] max-w-sm mb-6 leading-relaxed">
              We have received your request for <strong>{edition}</strong>. We'll reach out within a
              few hours to set up your evaluation key and schedule a brief meeting.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#151514] text-[#EBE9E5] text-xs font-semibold hover:bg-[#242422] transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8C8A85] mb-3 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#151514]" />
                <span>EVALUATION &amp; DISCOVERY</span>
              </div>
              <h3 id="modal-title" className="text-2xl font-bold tracking-tight text-[#151514] mb-1">
                Contact for Trial & Consultation
              </h3>
              <p className="text-xs text-[#686663] leading-relaxed">
                Connect with our engineering team for an evaluation license. Pricing is timeline-based
                and easily tailored in a quick introductory meeting.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Edition Selector */}
              <div>
                <label className="block text-[11px] font-mono font-medium text-[#151514] uppercase tracking-wider mb-1.5">
                  Edition of Interest
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setEdition('MacSolid Lite (Visual CAD Analysis & Measurement)')}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      edition.includes('Lite')
                        ? 'border-[#151514] bg-white text-[#151514] font-semibold shadow-xs'
                        : 'border-[#151514]/[0.1] bg-[#EBE9E5]/60 text-[#686663] hover:border-[#151514]/[0.2]'
                    }`}
                  >
                    <div className="font-semibold text-[#151514] text-[11px]">Lite</div>
                    <div className="text-[9px] text-[#686663]">3D Studio & View</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEdition('MacSolid Standard (Full BOM & Raw Stock Engine)')}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      edition.includes('Standard')
                        ? 'border-[#151514] bg-white text-[#151514] font-semibold shadow-xs'
                        : 'border-[#151514]/[0.1] bg-[#EBE9E5]/60 text-[#686663] hover:border-[#151514]/[0.2]'
                    }`}
                  >
                    <div className="font-semibold text-[#151514] text-[11px]">Standard</div>
                    <div className="text-[9px] text-[#151514] font-medium">Auto BOM Engine</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEdition('MacSolid Professional (Custom Workflow Tailoring)')}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      edition.includes('Professional') || edition.includes('Pro')
                        ? 'border-[#151514] bg-white text-[#151514] font-semibold shadow-xs'
                        : 'border-[#151514]/[0.1] bg-[#EBE9E5]/60 text-[#686663] hover:border-[#151514]/[0.2]'
                    }`}
                  >
                    <div className="font-semibold text-[#151514] text-[11px]">Professional</div>
                    <div className="text-[9px] text-[#686663]">Custom Shop & ERP</div>
                  </button>
                </div>
              </div>

              {/* Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#686663] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#151514]/[0.12] bg-white text-xs text-[#151514] focus:outline-none focus:border-[#151514] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#686663] mb-1">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#151514]/[0.12] bg-white text-xs text-[#151514] focus:outline-none focus:border-[#151514] transition-colors"
                  />
                </div>
              </div>

              {/* Company & CAD System */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#686663] mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Precision Engineering Ltd"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#151514]/[0.12] bg-white text-xs text-[#151514] focus:outline-none focus:border-[#151514] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#686663] mb-1">
                    Primary CAD Software
                  </label>
                  <select
                    value={formData.cadSystem}
                    onChange={(e) => setFormData({ ...formData, cadSystem: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#151514]/[0.12] text-xs text-[#151514] bg-white focus:outline-none focus:border-[#151514] transition-colors"
                  >
                    <option value="SolidWorks">SolidWorks (.sldasm, .sldprt)</option>
                    <option value="Siemens NX">Siemens NX (.prt, JT)</option>
                    <option value="STEP">STEP Neutral Protocol</option>
                    <option value="Inventor">Autodesk Inventor</option>
                    <option value="Creo">PTC Creo</option>
                    <option value="Multiple">Multiple CAD Platforms</option>
                  </select>
                </div>
              </div>

              {/* Submission Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 rounded-full bg-[#151514] text-[#EBE9E5] font-medium text-xs tracking-tight hover:bg-[#242422] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Trial & Schedule Quick Chat</span>
              </button>

              {/* Mailto fallback */}
              <div className="text-center pt-2">
                <span className="text-[11px] text-[#8C8A85]">Prefer direct email? </span>
                <a
                  href="mailto:contact@macsolid.cad?subject=MacSolid%20Trial%20Request"
                  className="text-[11px] font-medium text-[#151514] hover:underline"
                >
                  contact@macsolid.cad
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

