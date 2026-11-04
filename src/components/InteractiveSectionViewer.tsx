import React, { useState } from 'react';
import { CADViewport3D } from './CADViewport3D';
import { Sliders, RotateCcw, Target, Sparkles, Layers } from 'lucide-react';

export const InteractiveSectionViewer: React.FC = () => {
  const [axis, setAxis] = useState<'x' | 'y' | 'z'>('x');
  const [sliderPos, setSliderPos] = useState<number>(0);

  const handleReset = () => {
    setSliderPos(0);
  };

  // Calculated real-time cross-section values based on slider position and axis
  const crossSectionArea = Math.round(2350 + Math.cos(sliderPos * Math.PI) * 580);
  const perimeter = Math.round(260 + Math.sin(sliderPos * Math.PI) * 45);

  return (
    <section id="stage-cut" className="relative py-28 px-6 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200/90 bg-white text-[11px] font-mono text-blue-600 mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REAL-TIME 60 FPS GPU SHADER INSPECTOR</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-4">
          Internal Cavity & Spool Inspection.
        </h2>

        <p className="text-base sm:text-lg text-slate-500 max-w-xl">
          Drag the section slider to slice through this high-pressure aerospace valve manifold.
          Inspect internal oil galleries, spool lands, and o-ring chamfers with instant color capping.
        </p>
      </div>

      {/* Main Interactive Stage & Controls with Model 3: Hydraulic Manifold */}
      <div className="flex flex-col lg:flex-row gap-8 items-center bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        {/* 3D Viewport */}
        <div className="w-full lg:w-2/3 h-[400px] sm:h-[480px] rounded-xl border border-slate-200/70 bg-[#FAFAFA] overflow-hidden relative">
          <CADViewport3D
            modelType="hydraulic_manifold"
            explodeProgress={0.08}
            cutProgress={sliderPos}
            cutAxis={axis}
            enableClipping={true}
            className="w-full h-full"
          />

          {/* Real-time HUD overlay */}
          <div className="absolute top-4 right-4 pointer-events-none font-mono text-[11px] text-slate-600 bg-white/85 backdrop-blur-md p-3.5 rounded-lg border border-slate-200/80 shadow-xs flex flex-col gap-1.5">
            <div className="text-slate-900 font-semibold flex items-center gap-1.5">
              <Target className="w-3 h-3 text-blue-600" />
              <span>SPOOL INSPECTION HUD</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span>VALVE BODY: SAPPHIRE 6061-T6</span>
            </div>
            <div>CUT NORMAL: [{axis.toUpperCase()} AXIS]</div>
            <div>AREA: {crossSectionArea} mm²</div>
            <div>PERIMETER: {perimeter} mm</div>
            <div className="text-emerald-600 font-semibold">GPU CAPPING: COLOR-MATCHED</div>
          </div>
        </div>

        {/* Physical Swiss Slider Controls */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between h-full p-2">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-6">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>Section Controls</span>
            </div>

            {/* Axis Selector */}
            <div className="mb-6">
              <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">
                Normal Plane Axis
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['x', 'y', 'z'] as const).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAxis(a)}
                    className={`py-2 px-4 rounded-lg font-mono text-xs font-semibold uppercase transition-all cursor-pointer ${
                      axis === a
                        ? 'bg-[#0F172A] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {a}-Axis
                  </button>
                ))}
              </div>
            </div>

            {/* Position Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-slate-500 uppercase tracking-wider">Plane Position</span>
                <span className="font-semibold text-blue-600">
                  {Math.round(sliderPos * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                value={sliderPos}
                onChange={(e) => setSliderPos(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>-100%</span>
                <span>0 (CENTER SPOOL)</span>
                <span>+100%</span>
              </div>
            </div>

            {/* Quick Snapping Presets */}
            <div className="mb-6">
              <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">
                Hole & Datum Snap
              </label>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setAxis('x');
                    setSliderPos(0);
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs text-slate-700 transition-colors flex justify-between items-center cursor-pointer"
                >
                  <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-slate-700" /> Snap: Main Spool Bore Center</span>
                  <span className="text-slate-400">X: 0%</span>
                </button>
                <button
                  onClick={() => {
                    setAxis('y');
                    setSliderPos(0.25);
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs text-slate-700 transition-colors flex justify-between items-center cursor-pointer"
                >
                  <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-slate-700" /> Snap: SAE Fluid Port Inlets</span>
                  <span className="text-slate-400">Y: +25%</span>
                </button>
                <button
                  onClick={() => {
                    setAxis('z');
                    setSliderPos(0.35);
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg border border-slate-200 hover:border-blue-400 bg-white font-mono text-xs text-slate-700 transition-colors flex justify-between items-center cursor-pointer"
                >
                  <span className="flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-slate-700" /> Snap: Sensor Cartridge Node</span>
                  <span className="text-slate-400">Z: +35%</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET SECTION VIEW</span>
          </button>
        </div>
      </div>
    </section>
  );
};
