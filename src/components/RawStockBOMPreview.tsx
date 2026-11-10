import React, { useState } from 'react';
import { Box, Layers, Check, Download, FileSpreadsheet, ArrowRight, ShieldCheck, TrendingDown } from 'lucide-react';

interface BOMRow {
  item: string;
  partName: string;
  stockType: 'Plate Stock' | 'Billet Block' | 'Round Bar' | 'Sheet Metal';
  dimensions: string;
  material: string;
  weight: string;
  qty: number;
}

export const RawStockBOMPreview: React.FC = () => {
  const [activeDataset, setActiveDataset] = useState<'mould' | 'manifold'>('mould');
  const [envelopeMode, setEnvelopeMode] = useState<'optimized' | 'standard'>('optimized');

  const mouldData: BOMRow[] = [
    { item: '01', partName: 'TOP-CLAMP-PLATE', stockType: 'Plate Stock', dimensions: '130.0 × 110.0 × 16.0 mm', material: 'P20 Tool Steel', weight: '1.79 kg', qty: 1 },
    { item: '02', partName: 'CAVITY-INSERT-DIE', stockType: 'Billet Block', dimensions: '95.0 × 80.0 × 32.0 mm', material: 'H13 Hardened', weight: '1.91 kg', qty: 2 },
    { item: '03', partName: 'GUIDE-PILLAR-BUSH', stockType: 'Round Bar', dimensions: 'Ø 22.0 × 85.0 mm', material: 'EN31 Ground', weight: '0.25 kg', qty: 4 },
    { item: '04', partName: 'CORE-BACKING-PLATE', stockType: 'Plate Stock', dimensions: '130.0 × 110.0 × 22.0 mm', material: 'AISI 1045', weight: '2.46 kg', qty: 1 },
    { item: '05', partName: 'EJECTOR-RETAINER-BAR', stockType: 'Billet Block', dimensions: '120.0 × 35.0 × 14.0 mm', material: 'Mild Steel', weight: '0.46 kg', qty: 2 },
    { item: '06', partName: 'STRIPPER-BAFFLE-SHROUD', stockType: 'Sheet Metal', dimensions: '140.0 × 120.0 × 2.0 mm', material: 'SS304 (2mm Gauge)', weight: '0.27 kg', qty: 1 },
  ];

  const manifoldData: BOMRow[] = [
    { item: '01', partName: 'HYD-MAIN-MANIFOLD', stockType: 'Billet Block', dimensions: '160.0 × 120.0 × 90.0 mm', material: 'AL 6061-T6', weight: '4.67 kg', qty: 1 },
    { item: '02', partName: 'CARTRIDGE-VALVE-BODY', stockType: 'Round Bar', dimensions: 'Ø 38.0 × 110.0 mm', material: '12L14 Steel', weight: '0.98 kg', qty: 2 },
    { item: '03', partName: 'FLANGE-MOUNT-ADAPTER', stockType: 'Plate Stock', dimensions: '140.0 × 85.0 × 12.0 mm', material: 'ASTM A36', weight: '1.12 kg', qty: 2 },
    { item: '04', partName: 'HEAT-SHIELD-BRACKET', stockType: 'Sheet Metal', dimensions: '95.0 × 60.0 × 1.5 mm', material: 'AL 5052 (1.5mm)', weight: '0.04 kg', qty: 4 },
    { item: '05', partName: 'ORIFICE-PLUG-HEX', stockType: 'Round Bar', dimensions: 'Ø 18.0 × 25.0 mm', material: 'Brass C360', weight: '0.05 kg', qty: 6 },
  ];

  const currentData = activeDataset === 'mould' ? mouldData : manifoldData;

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#151514] mb-3 font-semibold opacity-60">
          — AUTOMATED RAW STOCK &amp; BOM PIPELINE
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tightest text-[#151514] mb-4">
          Exact Bounding Envelopes. Direct to Excel in 1.4s.
        </h2>
        <p className="text-sm sm:text-base text-[#686663] max-w-xl leading-relaxed">
          Eliminate manual measurements. MacSolid calculates true minimum raw stock sizes for billet, plate, and round bar stock without excess material waste.
        </p>
      </div>

      {/* Part 1: Interactive Stock Sizing Comparison */}
      <div className="mb-14 p-6 sm:p-10 rounded-3xl sm:rounded-4xl border border-[#151514]/[0.08] bg-[#F5F3EF]/90 backdrop-blur-md shadow-xs">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#151514]/[0.08] font-mono text-[11px] font-semibold mb-3 bg-[#EBE9E5] text-[#151514]">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
              <span>MATERIAL COST REDUCTION</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#151514] mb-3">
              Optimized Stock Envelope vs. Standard Bounding Box
            </h3>
            <p className="text-xs sm:text-sm text-[#686663] leading-relaxed mb-6">
              Angled or rotated parts in CAD assemblies often cause generic bounding boxes to overestimate raw stock size by 30% to 50%. MacSolid automatically computes the true minimum physical billet size required for machining.
            </p>

            <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#EBE9E5] border border-[#151514]/[0.08] w-fit">
              <button
                onClick={() => setEnvelopeMode('optimized')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  envelopeMode === 'optimized'
                    ? 'bg-[#151514] text-[#EBE9E5] font-semibold shadow-xs'
                    : 'text-[#686663] hover:text-[#151514]'
                }`}
              >
                MacSolid Envelope (-34% Waste)
              </button>
              <button
                onClick={() => setEnvelopeMode('standard')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  envelopeMode === 'standard'
                    ? 'bg-[#151514] text-[#EBE9E5] font-semibold shadow-xs'
                    : 'text-[#686663] hover:text-[#151514]'
                }`}
              >
                Standard Axis Box
              </button>
            </div>
          </div>

          {/* Interactive Bounding Box Visualizer */}
          <div className="w-full lg:w-[420px] p-6 rounded-2xl bg-[#EBE9E5]/80 border border-[#151514]/[0.08] flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs font-mono text-[#686663] mb-4 pb-3 border-b border-[#151514]/[0.08]">
              <span>COMPONENT: BRACKET_ARM_45°</span>
              <span className="text-[#151514] font-semibold">AL 6061-T6</span>
            </div>

            {/* Diagram */}
            <div className="relative h-44 rounded-xl bg-white/70 border border-[#151514]/[0.08] flex items-center justify-center overflow-hidden p-4">
              <svg viewBox="0 0 300 160" className="w-full h-full">
                {/* Standard Bounding Box (Wasted Area) */}
                <rect
                  x="25"
                  y="15"
                  width="250"
                  height="130"
                  fill={envelopeMode === 'standard' ? 'rgba(239, 68, 68, 0.08)' : 'transparent'}
                  stroke={envelopeMode === 'standard' ? '#DC2626' : 'rgba(15, 23, 42, 0.15)'}
                  strokeWidth={envelopeMode === 'standard' ? '2' : '1'}
                  strokeDasharray={envelopeMode === 'standard' ? 'none' : '4 4'}
                  rx="6"
                  className="transition-all duration-300"
                />

                {/* Optimized Stock Envelope */}
                <g transform="translate(150, 80) rotate(-32) translate(-90, -40)">
                  <rect
                    x="0"
                    y="0"
                    width="180"
                    height="80"
                    fill={envelopeMode === 'optimized' ? 'rgba(5, 150, 105, 0.1)' : 'transparent'}
                    stroke={envelopeMode === 'optimized' ? '#059669' : 'transparent'}
                    strokeWidth="2.5"
                    rx="6"
                    className="transition-all duration-300"
                  />
                  {/* Angled Part Silhouette */}
                  <path
                    d="M 15 15 L 165 15 C 172 15 175 22 170 30 L 140 65 C 135 72 128 75 118 75 L 15 75 C 7 75 5 68 5 60 L 5 25 C 5 18 10 15 15 15 Z"
                    fill="#151514"
                    opacity="0.88"
                  />
                  <circle cx="35" cy="45" r="8" fill="#FFFFFF" />
                  <circle cx="125" cy="45" r="8" fill="#FFFFFF" />
                </g>
              </svg>

              <div className="absolute bottom-2.5 right-3 font-mono text-[10px] text-[#8C8A85]">
                {envelopeMode === 'optimized' ? (
                  <span className="text-emerald-700 font-semibold">TIGHT PHYSICAL ENVELOPE</span>
                ) : (
                  <span className="text-red-600 font-semibold">OVERSIZED RAW STOCK</span>
                )}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/80 border border-[#151514]/[0.06]">
                <div className="text-[10px] text-[#8C8A85] uppercase">RAW BILLET SIZE</div>
                <div className="font-bold text-[#151514] mt-0.5">
                  {envelopeMode === 'optimized' ? '180 × 80 × 35 mm' : '250 × 130 × 35 mm'}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 border border-[#151514]/[0.06]">
                <div className="text-[10px] text-[#8C8A85] uppercase">ESTIMATED BILLET WEIGHT</div>
                <div className="font-bold text-[#151514] mt-0.5">
                  {envelopeMode === 'optimized' ? (
                    <span className="text-emerald-700 font-bold">1.36 kg (-35%)</span>
                  ) : (
                    <span className="text-red-600 font-bold">3.07 kg (+55%)</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Interactive Shop-Floor Excel BOM Table */}
      <div className="rounded-3xl sm:rounded-4xl border border-[#151514]/[0.08] bg-[#F5F3EF]/90 backdrop-blur-md overflow-hidden shadow-xs">
        {/* Table Controls Header */}
        <div className="p-5 sm:p-6 border-b border-[#151514]/[0.08] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#ECEAE6]/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/10 text-emerald-800 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#151514]">
                Production BOM Export (.xlsx / ERP Preview)
              </div>
              <div className="text-[11px] font-mono text-[#8C8A85]">
                Exported directly from multi-part 3D CAD models
              </div>
            </div>
          </div>

          {/* Dataset Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#EBE9E5] border border-[#151514]/[0.08]">
            <button
              onClick={() => setActiveDataset('mould')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeDataset === 'mould'
                  ? 'bg-[#151514] text-[#EBE9E5] font-semibold'
                  : 'text-[#686663] hover:text-[#151514]'
              }`}
            >
              Mold Base Assembly
            </button>
            <button
              onClick={() => setActiveDataset('manifold')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeDataset === 'manifold'
                  ? 'bg-[#151514] text-[#EBE9E5] font-semibold'
                  : 'text-[#686663] hover:text-[#151514]'
              }`}
            >
              Hydraulic Manifold
            </button>
          </div>
        </div>

        {/* Scrollable Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-[#151514]/[0.08] bg-[#ECEAE6] text-[#686663]">
                <th className="py-3 px-4 font-semibold">ITEM</th>
                <th className="py-3 px-4 font-semibold">PART NAME</th>
                <th className="py-3 px-4 font-semibold">STOCK CLASSIFICATION</th>
                <th className="py-3 px-4 font-semibold">RAW STOCK DIMENSIONS</th>
                <th className="py-3 px-4 font-semibold">MATERIAL GRADE</th>
                <th className="py-3 px-4 font-semibold">UNIT WEIGHT</th>
                <th className="py-3 px-4 font-semibold text-center">QTY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#151514]/[0.06] bg-white/40">
              {currentData.map((row) => (
                <tr key={row.item} className="hover:bg-black/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#151514]">{row.item}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#151514]">{row.partName}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold border border-[#151514]/[0.08] bg-[#EBE9E5] text-[#151514]">
                      {row.stockType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#151514] font-medium">{row.dimensions}</td>
                  <td className="py-3.5 px-4 text-[#686663]">{row.material}</td>
                  <td className="py-3.5 px-4 text-[#686663]">{row.weight}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-[#151514]">{row.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 px-6 border-t border-[#151514]/[0.08] bg-[#ECEAE6]/40 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-mono text-[#8C8A85]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>EXPORTS STRAIGHT TO NATIVE .XLSX &amp; CUSTOM ERP SCHEMAS</span>
          </div>
          <div className="text-[11px] text-[#151514] font-semibold">
            SUB-1.4s GENERATION SPEED
          </div>
        </div>
      </div>
    </section>
  );
};

export default RawStockBOMPreview;
