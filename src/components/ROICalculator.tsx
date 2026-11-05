import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, Sparkles } from 'lucide-react';

interface ROICalculatorProps {
  onOpenContactModal?: () => void;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ onOpenContactModal }) => {
  const [assembliesPerMonth, setAssembliesPerMonth] = useState(15);
  const [partsPerAssembly, setPartsPerAssembly] = useState(350);
  const [hourlyRate, setHourlyRate] = useState(75);

  // Math benchmarks:
  // Manual BOM creation (identifying hardware, measuring raw stock, typing cut-lists): ~3.5 hours per 350-part assembly
  // With MacSolid: < 1.5 seconds per assembly
  const hoursPerAssemblyManual = Math.max(0.5, (partsPerAssembly / 100) * 0.9);
  const totalHoursWastedMonthly = Math.round(assembliesPerMonth * hoursPerAssemblyManual);
  const totalCostWastedMonthly = Math.round(totalHoursWastedMonthly * hourlyRate);
  const totalCostWastedAnnual = totalCostWastedMonthly * 12;
  const timeSavedPercent = 99.4;

  return (
    <div className="rounded-3xl sm:rounded-4xl border border-[#151514]/[0.1] bg-white p-6 sm:p-10 shadow-[0_20px_50px_-15px_rgba(21,21,20,0.08)] max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#151514] font-semibold opacity-60">
          — BOM COST & EFFICIENCY MODEL
        </span>
      </div>

      <h3 className="text-2xl sm:text-4xl font-bold tracking-tightest text-[#151514] mb-3">
        Calculate Your Annual <span className="font-serif italic font-normal">CAD Labor Savings.</span>
      </h3>
      <p className="text-sm text-[#686663] mb-8 max-w-xl">
        See how much engineering time and payroll your team currently burns on manual Excel BOM extraction and raw stock measurement.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Slider 1: Assemblies per Month */}
          <div>
            <div className="flex justify-between items-center mb-2 font-mono text-xs">
              <span className="text-[#686663]">Assemblies Processed / Month:</span>
              <span className="font-bold text-[#151514] bg-[#F5F3EF] px-2.5 py-1 rounded-md border border-[#151514]/[0.08]">
                {assembliesPerMonth} assemblies
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="60"
              step="1"
              value={assembliesPerMonth}
              onChange={(e) => setAssembliesPerMonth(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-[#E5E3DD] rounded-lg appearance-none cursor-pointer accent-[#151514]"
            />
          </div>

          {/* Slider 2: Average Parts Count */}
          <div>
            <div className="flex justify-between items-center mb-2 font-mono text-xs">
              <span className="text-[#686663]">Average Components / Assembly:</span>
              <span className="font-bold text-[#151514] bg-[#F5F3EF] px-2.5 py-1 rounded-md border border-[#151514]/[0.08]">
                {partsPerAssembly} parts
              </span>
            </div>
            <input
              type="range"
              min="25"
              max="1500"
              step="25"
              value={partsPerAssembly}
              onChange={(e) => setPartsPerAssembly(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-[#E5E3DD] rounded-lg appearance-none cursor-pointer accent-[#151514]"
            />
          </div>

          {/* Slider 3: Estimator / Engineer Hourly Cost */}
          <div>
            <div className="flex justify-between items-center mb-2 font-mono text-xs">
              <span className="text-[#686663]">Engineering / Estimator Rate:</span>
              <span className="font-bold text-[#151514] bg-[#F5F3EF] px-2.5 py-1 rounded-md border border-[#151514]/[0.08]">
                ${hourlyRate}/hr
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="150"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-[#E5E3DD] rounded-lg appearance-none cursor-pointer accent-[#151514]"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 rounded-2xl bg-[#151514] text-[#EBE9E5] p-6 flex flex-col justify-between shadow-lg">
          <div>
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#EBE9E5]/60 block mb-2">
              ESTIMATED ANNUAL RETURN
            </span>
            <div className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-white mb-1">
              ${totalCostWastedAnnual.toLocaleString()}
            </div>
            <div className="font-mono text-[11px] text-emerald-400 font-semibold mb-6 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{timeSavedPercent}% Faster BOM Extraction</span>
            </div>

            <div className="space-y-3 font-mono text-xs border-t border-white/[0.1] pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-[#EBE9E5]/70 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Monthly Hours Saved:
                </span>
                <span className="font-bold text-white">{totalHoursWastedMonthly} hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#EBE9E5]/70 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" /> Monthly Cost Saved:
                </span>
                <span className="font-bold text-white">${totalCostWastedMonthly.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenContactModal}
            className="w-full py-3 px-4 rounded-full bg-white text-[#151514] font-semibold text-xs hover:bg-[#EBE9E5] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95"
          >
            <span>Claim Your Time Back</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;

