import React, { useState, useRef } from 'react';
import { Cpu, ShieldCheck, Zap, Layers, Lock, Sparkles, Activity } from 'lucide-react';
import { AnimatedFormatStack } from './AnimatedFormatStack';

interface MetricSpotlightCardProps {
  metric: string;
  label: string;
  desc: string;
  icon: React.ElementType;
  interactiveBadge: string;
}

const MetricSpotlightCard: React.FC<MetricSpotlightCardProps> = ({
  metric,
  label,
  desc,
  icon: Icon,
  interactiveBadge,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-8 rounded-2xl border border-slate-200/90 bg-white/70 backdrop-blur-md shadow-xs hover:border-blue-400/80 transition-all duration-300 flex flex-col justify-between overflow-hidden group select-none"
    >
      {/* Spotlight Cursor Gradient Glow (21st.dev pattern) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.09), transparent 70%)`,
        }}
      />

      {/* Engineering Corner Crosshairs */}
      <span className="absolute top-2 left-2 text-[10px] font-mono text-slate-300 pointer-events-none group-hover:text-blue-500 transition-colors">
        +
      </span>
      <span className="absolute top-2 right-2 text-[10px] font-mono text-slate-300 pointer-events-none group-hover:text-blue-500 transition-colors">
        +
      </span>
      <span className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-300 pointer-events-none group-hover:text-blue-500 transition-colors">
        +
      </span>
      <span className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-300 pointer-events-none group-hover:text-blue-500 transition-colors">
        +
      </span>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100/90 border border-slate-200/60 flex items-center justify-center text-slate-800 group-hover:scale-105 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200/60 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
            {interactiveBadge}
          </span>
        </div>

        <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0F172A] font-mono mb-2 group-hover:text-blue-600 transition-colors">
          {metric}
        </div>
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-800 mb-3">
          {label}
        </div>
      </div>

      <p className="relative z-10 text-xs text-slate-500 leading-relaxed pt-4 border-t border-slate-100">
        {desc}
      </p>
    </div>
  );
};

export const FlagshipSpecs: React.FC = () => {
  const specs = [
    {
      metric: '0.001s',
      label: 'Extraction Latency',
      desc: 'Multi-threaded C++ OpenCASCADE kernel isolates parts in microsecond bursts.',
      icon: Zap,
      interactiveBadge: '1.2ms / body',
    },
    {
      metric: '10,000+',
      label: 'Assembly Scale',
      desc: 'Tested on massive automotive and aerospace tooling assemblies without UI lockups.',
      icon: Layers,
      interactiveBadge: '~142 MB RAM',
    },
    {
      metric: '60 FPS',
      label: 'GPU Clipping',
      desc: 'Direct GPU shader clip planes with instant solid material color capping.',
      icon: Cpu,
      interactiveBadge: '16.6ms / frame',
    },
    {
      metric: '100%',
      label: 'Offline & Private',
      desc: 'Ed25519 hardware-locked licensing. Zero cloud telemetry. Air-gapped ready.',
      icon: Lock,
      interactiveBadge: 'Ed25519 Signed',
    },
  ];

  return (
    <section id="specs" className="relative py-28 px-6 max-w-7xl mx-auto z-10">
      {/* Section Title */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-blue-600 mb-3 font-semibold">
          HARDWARE & ENGINE SPECIFICATIONS
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] mb-4">
          Engineered for Extreme CAD Assemblies.
        </h2>
        <p className="text-sm text-slate-500 font-mono">
          Interactive telemetry from high-performance industrial benchmark runs.
        </p>
      </div>

      {/* Upgraded 4-Metric Grid with 21st.dev Spotlight Lighting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {specs.map((item) => (
          <MetricSpotlightCard
            key={item.label}
            metric={item.metric}
            label={item.label}
            desc={item.desc}
            icon={item.icon}
            interactiveBadge={item.interactiveBadge}
          />
        ))}
      </div>

      {/* Upgraded CAD Format Interoperability: Animated 3D Stack (from @manuarora700/animated-testimonials) */}
      <AnimatedFormatStack />
    </section>
  );
};
