import React from 'react';
import { MessageSquare } from 'lucide-react';
import { LiquidNavbar, LiquidNavItem } from './ui/liquid-glass-navbar';

interface NavigationProps {
  activeStage?: number;
  onNavigateStage?: (stage: number) => void;
  onOpenContactModal?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeStage = 0,
  onNavigateStage,
  onOpenContactModal,
}) => {
  const navItems: LiquidNavItem[] = [
    {
      label: 'Overview',
      fx: 'glow',
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      label: 'CAD Studio',
      fx: 'spin',
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
    },
    {
      label: 'Formats',
      fx: 'drop',
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      label: 'Editions',
      fx: 'wave',
      icon: (
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
    },
  ];

  const brandLockup = (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        onNavigateStage?.(0);
      }}
      className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full transition-opacity hover:opacity-80 group cursor-pointer select-none"
    >
      <div className="w-5 h-5 rounded-full bg-[#151514] flex items-center justify-center text-[#EBE9E5]">
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>
      <span className="font-semibold text-xs tracking-tight text-[#151514]">MacSolid</span>
    </a>
  );

  const trialCta = (
    <button
      onClick={onOpenContactModal}
      className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-[#151514] text-[#EBE9E5] hover:bg-[#242422] transition-all shadow-xs group cursor-pointer"
    >
      <MessageSquare className="w-3.5 h-3.5 opacity-80" />
      <span>Contact for Trial</span>
    </button>
  );

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto">
        <LiquidNavbar
          items={navItems}
          active={Math.min(activeStage, navItems.length - 1)}
          onChange={(idx) => onNavigateStage?.(idx)}
          tone="light"
          sound={true}
          brand={brandLockup}
          rightCta={trialCta}
        />
      </div>
    </header>
  );
};
