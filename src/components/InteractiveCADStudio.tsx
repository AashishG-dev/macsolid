import React, { useState } from 'react';
import { CADViewport3D } from './CADViewport3D';
import { Sliders, RotateCcw, Target, Sparkles, Layers, Box, Eye, FileSpreadsheet } from 'lucide-react';
import { LiquidNavbar, LiquidNavItem } from './ui/liquid-glass-navbar';

export const InteractiveCADStudio: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'assembly' | 'explode' | 'cut' | 'bom'>('explode');
  const [cutAxis, setCutAxis] = useState<'x' | 'y' | 'z'>('x');
  const [cutPos, setCutPos] = useState<number>(0);
  const [explodeSlider, setExplodeSlider] = useState<number>(0.75);

  const modes = [
    { id: 'assembly', label: '01 Assembly', icon: <Box className="w-3.5 h-3.5" /> },
    { id: 'explode', label: '02 Exploded', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'cut', label: '03 Cut Plane', icon: <Eye className="w-3.5 h-3.5" /> },
    { id: 'bom', label: '04 Auto BOM', icon: <FileSpreadsheet className="w-3.5 h-3.5" /> },
  ] as const;

  return (
    <section id="stage-experience" className="relative py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Antigravity Minimalist Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#151514] mb-3 font-semibold opacity-60">
          — CAD KERNEL STUDIO
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-[#151514] mb-3 sm:mb-4">
          Interactive <span className="font-serif italic font-normal">Architecture.</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-[#686663] font-normal max-w-xl">
          Toggle between assembly states or drag the cutting plane in real time.
        </p>

        {/* Responsive Swiss CAD Mode Selector */}
        <div className="mt-6 sm:mt-8 w-full max-w-md sm:max-w-fit mx-auto">
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 p-1.5 rounded-2xl sm:rounded-full bg-[#F5F3EF]/90 border border-[#151514]/[0.08] shadow-xs backdrop-blur-md">
            {modes.map((m) => {
              const isActive = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMode(m.id)}
                  className={`flex items-center justify-center gap-2 px-3.5 py-2 sm:py-1.5 rounded-xl sm:rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#151514] text-[#EBE9E5] font-semibold shadow-xs'
                      : 'text-[#686663] hover:text-[#151514] hover:bg-black/[0.04]'
                  }`}
                >
                  {m.icon}
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 3D Interactive Canvas */}
      <div className="relative w-full h-[440px] sm:h-[540px] lg:h-[600px] rounded-3xl sm:rounded-4xl border border-[#151514]/[0.08] bg-[#F5F3EF]/70 backdrop-blur-md overflow-hidden shadow-[0_20px_50px_-15px_rgba(21,21,20,0.06)] flex flex-col justify-between">
        {/* Viewport 3D Canvas */}
        <div className="w-full h-full relative">
          <CADViewport3D
            modelType={activeMode === 'cut' ? 'hydraulic_manifold' : 'mould_assembly'}
            explodeProgress={
              activeMode === 'assembly'
                ? 0
                : activeMode === 'explode'
                ? explodeSlider
                : activeMode === 'bom'
                ? 0.8
                : 0.1
            }
            cutProgress={cutPos}
            cutAxis={cutAxis}
            enableClipping={activeMode === 'cut'}
            className="w-full h-full"
          />

          {/* Dynamic HUD Overlays */}
          {activeMode === 'cut' && (
            <div className="absolute top-5 right-5 pointer-events-none font-mono text-[11px] text-[#686663] bg-[#F5F3EF]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#151514]/[0.08] shadow-xs flex flex-col gap-1">
              <div className="text-[#151514] font-semibold flex items-center gap-1.5">
                <Target className="w-3 h-3 text-[#151514]" />
                <span>60 FPS SHADER HUD</span>
              </div>
              <div>NORMAL: [{cutAxis.toUpperCase()} AXIS]</div>
              <div>POSITION: {Math.round(cutPos * 100)}%</div>
              <div className="text-emerald-700 font-medium">CAP: SOLID CAPPED</div>
            </div>
          )}

          {activeMode === 'bom' && (
            <div className="absolute top-5 left-5 pointer-events-none font-mono text-[11px] bg-[#F5F3EF]/95 backdrop-blur-md p-4 rounded-2xl border border-[#151514]/[0.08] shadow-xs max-w-sm hidden sm:block">
              <div className="text-[#151514] font-semibold mb-2">ITEMIZED TOOLING BOM</div>
              <div className="space-y-1 text-[#151514]/80">
                <div className="flex justify-between">
                  <span>01 TOP-CLAMP-PLATE</span>
                  <span className="text-[#686663]">130×110×16 mm</span>
                </div>
                <div className="flex justify-between text-[#151514] font-medium">
                  <span>02 CAVITY-INSERT-DIE</span>
                  <span>100×85×24 mm</span>
                </div>
                <div className="flex justify-between text-[#686663]">
                  <span>03 EJECTOR-SYSTEM</span>
                  <span>90×75×12 mm</span>
                </div>
                <div className="flex justify-between text-[#686663]">
                  <span>04 RISER-BLOCKS</span>
                  <span>110×34×22 mm</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Interactive Toolbar (Appears dynamically based on active mode) */}
        <div className="relative z-20 border-t border-[#151514]/[0.08] bg-[#F5F3EF]/90 backdrop-blur-md p-3.5 sm:p-4 px-4 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs">
          {activeMode === 'cut' ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3">
              {/* Axis Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[#686663]">PLANE AXIS:</span>
                {(['x', 'y', 'z'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setCutAxis(a)}
                    className={`w-7 h-7 rounded-lg uppercase font-bold text-[10px] transition-all cursor-pointer ${
                      cutAxis === a
                        ? 'bg-[#151514] text-[#EBE9E5] shadow-xs'
                        : 'bg-[#E5E3DD] text-[#686663] hover:bg-[#DEDCD5]'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>

              {/* Real-time Slider */}
              <div className="flex items-center gap-3 w-full sm:max-w-md">
                <span className="text-[#686663] shrink-0">POSITION:</span>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.01"
                  value={cutPos}
                  onChange={(e) => setCutPos(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#E5E3DD] rounded-lg appearance-none cursor-pointer accent-[#151514]"
                />
                <span className="w-10 text-right font-semibold text-[#151514]">
                  {Math.round(cutPos * 100)}%
                </span>
              </div>

              {/* Reset */}
              <button
                onClick={() => setCutPos(0)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#151514]/[0.1] hover:bg-black/[0.04] text-[#686663] cursor-pointer self-end sm:self-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET</span>
              </button>
            </div>
          ) : activeMode === 'explode' ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 sm:gap-4">
              <span className="text-[#686663] shrink-0">SEPARATION FACTOR:</span>
              <div className="flex items-center gap-3 w-full sm:max-w-md">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodeSlider}
                  onChange={(e) => setExplodeSlider(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#E5E3DD] rounded-lg appearance-none cursor-pointer accent-[#151514]"
                />
                <span className="w-10 text-right font-semibold text-[#151514]">
                  {Math.round(explodeSlider * 100)}%
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between w-full text-[#8C8A85] gap-1 text-center sm:text-left text-[11px] sm:text-xs">
              <span>DRAG OR SWIPE TO ORBIT CAD MODEL IN 3D SPACE</span>
              <span>OPEN CASCADE ENGINE 7.7.2</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

