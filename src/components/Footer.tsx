import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-[#151514]/[0.08] bg-transparent pt-16 pb-36 px-6 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#686663] font-mono">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-[#151514] text-[#EBE9E5] flex items-center justify-center">
            <svg
              width="9"
              height="9"
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
          <span className="font-semibold text-[#151514]">MacSolid Systems</span>
          <span className="text-[#8C8A85]">·</span>
          <span>v2.4.0 (Windows Native x64)</span>
        </div>

        <div className="flex items-center gap-6 text-[#8C8A85]">
          <span>C++20 KERNEL</span>
          <span>·</span>
          <span>OPEN CASCADE 7.7.2</span>
          <span>·</span>
          <span>ED25519 VERIFIED</span>
        </div>

        <div className="text-[#8C8A85]">
          © {new Date().getFullYear()} MacSolid Systems. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
