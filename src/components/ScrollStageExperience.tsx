import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CADViewport3D } from './CADViewport3D';
import { FileSpreadsheet, Eye, Split, Box } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollStageExperienceProps {
  onStageChange?: (stage: number) => void;
}

export const ScrollStageExperience: React.FC<ScrollStageExperienceProps> = ({ onStageChange }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [explodeProgress, setExplodeProgress] = useState(0);
  const [cutProgress, setCutProgress] = useState(0);
  const [enableClipping, setEnableClipping] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;

        if (p < 0.25) {
          setCurrentStage(0);
          onStageChange?.(0);
          setExplodeProgress(0);
          setEnableClipping(false);
        } else if (p < 0.55) {
          setCurrentStage(1);
          onStageChange?.(1);
          const expP = (p - 0.25) / 0.3;
          setExplodeProgress(Math.min(1, Math.max(0, expP)));
          setEnableClipping(false);
        } else if (p < 0.8) {
          setCurrentStage(2);
          onStageChange?.(2);
          setExplodeProgress(0.35);
          setEnableClipping(true);
          const cutP = ((p - 0.55) / 0.25) * 1.6 - 0.8;
          setCutProgress(cutP);
        } else {
          setCurrentStage(3);
          onStageChange?.(3);
          setExplodeProgress(0.8);
          setEnableClipping(false);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [onStageChange]);

  const stages = [
    {
      num: '01',
      title: 'Mould Base Assembly',
      tagline: 'Instant Multi-Tier Tooling Ingestion',
      desc: 'Bypasses legacy OpenCASCADE CPU bottlenecks. Parses multi-plate tooling dies, core inserts, and cooling runners from SolidWorks and STEP in seconds with zero geometry degradation.',
      icon: Box,
    },
    {
      num: '02',
      title: 'Automated Decomposition',
      tagline: 'Precision Stock Bounds & Color Isolation',
      desc: 'Disassembles multi-layer die plates and ejector systems into isolated solid bodies. Automatically calculates CNC raw envelope sizes, pocket depths, and stock margins.',
      icon: Split,
    },
    {
      num: '03',
      title: '60 FPS Internal Cut',
      tagline: 'GPU Shader Level Inspection & Capping',
      desc: 'No expensive Boolean cuts that freeze your workstation. Scrub cut-planes across heavy core inserts with silky 60 FPS performance, color-capped solids, and instant hole-axis snapping.',
      icon: Eye,
    },
    {
      num: '04',
      title: 'Production Tooling BOM',
      tagline: 'Itemized Material & Sizing Data Table',
      desc: 'Generates standardized Bill of Materials with exact plate dimensions, calculated part weights, custom tooling steels, and automated 2D fabrication drawing views.',
      icon: FileSpreadsheet,
    },
  ];

  const activeData = stages[currentStage];

  return (
    <div
      ref={containerRef}
      id="stage-experience"
      className="relative w-full h-screen bg-[#FAFAFA] flex flex-col justify-center overflow-hidden z-20"
    >
      <div className="max-w-7xl w-full mx-auto px-6 h-[85vh] flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left Column: Minimal Text Focus (Only 1 idea in focus) */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          {/* Stage Counter */}
          <div className="flex items-center gap-3 font-mono text-xs text-blue-600 mb-4">
            <span className="font-bold text-sm tracking-widest">{activeData.num}</span>
            <div className="h-px w-8 bg-blue-300" />
            <span className="text-slate-400">04</span>
            <span className="uppercase tracking-widest text-[11px] text-slate-500 font-semibold ml-2">
              {activeData.tagline}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-4 leading-tight">
            {activeData.title}
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed mb-8 max-w-lg">
            {activeData.desc}
          </p>

          {/* Minimal Stage Selector Indicators */}
          <div className="flex items-center gap-2 font-mono text-xs">
            {stages.map((s, idx) => (
              <div
                key={s.num}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStage === idx ? 'w-10 bg-blue-600' : 'w-3 bg-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Stage 4 Dynamic BOM Preview Overlay Card matching Mould Assembly */}
          {currentStage === 3 && (
            <div className="mt-6 p-4 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs font-mono text-[11px] animate-fadeIn">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 text-slate-400">
                <span>ITEM / TOOLING COMPONENT</span>
                <span>STOCK (L×W×T)</span>
                <span>MATERIAL</span>
              </div>
              <div className="flex justify-between items-center py-1.5 text-slate-800">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  01 TOP-CLAMP-PLATE
                </span>
                <span>130 × 110 × 16 mm</span>
                <span className="text-slate-500">P20 Steel</span>
              </div>
              <div className="flex justify-between items-center py-1.5 text-slate-800 border-t border-slate-50">
                <span className="font-semibold text-blue-600 flex items-center gap-1.5">
                  02 CAVITY-INSERT-DIE
                </span>
                <span>100 × 85 × 24 mm</span>
                <span className="text-blue-600 font-medium">H13 Cobalt</span>
              </div>
              <div className="flex justify-between items-center py-1.5 text-slate-800 border-t border-slate-50">
                <span className="font-semibold text-amber-600 flex items-center gap-1.5">
                  03 EJECTOR-SYSTEM
                </span>
                <span>90 × 75 × 12 mm</span>
                <span className="text-amber-600">CuAl10 Bronze</span>
              </div>
              <div className="flex justify-between items-center py-1.5 text-slate-800 border-t border-slate-50">
                <span className="font-semibold text-sky-600 flex items-center gap-1.5">
                  04 RISER-BLOCKS (PAIR)
                </span>
                <span>110 × 34 × 22 mm</span>
                <span className="text-sky-600">Al 7075-T6</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-slate-500 text-[10px]">
                <span>TOTAL DIE WEIGHT: 14.65 kg</span>
                <span className="text-emerald-600 font-bold">100% CAD TOLERANCE CHECKED</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 3D CAD Stage with Model 2: Mould Assembly */}
        <div className="w-full lg:w-7/12 h-[380px] sm:h-[480px] lg:h-[580px] relative rounded-2xl border border-slate-200/80 bg-white/60 backdrop-blur-md overflow-hidden shadow-xs">
          <CADViewport3D
            modelType="mould_assembly"
            explodeProgress={explodeProgress}
            cutProgress={cutProgress}
            cutAxis="y"
            enableClipping={enableClipping}
            className="w-full h-full"
          />

          {/* Interactive instruction watermark */}
          <div className="absolute top-4 left-4 pointer-events-none font-mono text-[10px] text-slate-600 uppercase tracking-widest bg-white/70 px-2.5 py-1 rounded border border-slate-200/60 shadow-xs">
            TOOLING DIE EXPLODER · SCROLL TO ANIMATE
          </div>
        </div>
      </div>
    </div>
  );
};
