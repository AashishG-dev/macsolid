import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { AnimatedBackground } from './components/AnimatedBackground';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { InteractiveCADStudio } from './components/InteractiveCADStudio';
import { AnimatedFormatStack } from './components/AnimatedFormatStack';
import { CoverflowPricing } from './components/CoverflowPricing';
import { ContactTrialModal } from './components/ContactTrialModal';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState('MacSolid Pro (Full BOM Engine)');
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });
    lenisRef.current = lenis;

    // 2. Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Single Unified RAF Loop via GSAP Ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // 4. Bidirectional Scroll-Spy: Auto-switch navbar liquid tabs on scroll
    const sections = [
      { id: '#hero', index: 0 },
      { id: '#stage-experience', index: 1 },
      { id: '#formats', index: 2 },
      { id: '#pricing', index: 3 },
    ];

    const triggers: ScrollTrigger[] = [];

    const timeout = setTimeout(() => {
      sections.forEach(({ id, index }) => {
        const el = document.querySelector(id);
        if (!el) return;

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: index === 0 ? 'top top' : 'top 55%',
          end: index === sections.length - 1 ? 'bottom bottom' : 'bottom 55%',
          onEnter: () => {
            if (!isNavigatingRef.current) setActiveStage(index);
          },
          onEnterBack: () => {
            if (!isNavigatingRef.current) setActiveStage(index);
          },
        });
        triggers.push(trigger);
      });

      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timeout);
      triggers.forEach((t) => t.kill());
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const handleNavigateStage = (stageIndex: number) => {
    setActiveStage(stageIndex);
    isNavigatingRef.current = true;
    const targets = ['#hero', '#stage-experience', '#formats', '#pricing'];
    const targetSelector = targets[stageIndex] || '#hero';
    const el = document.querySelector(targetSelector);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, {
        offset: -70,
        duration: 1.2,
        onComplete: () => {
          isNavigatingRef.current = false;
        },
      });
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 1300);
    }
  };

  const handleHeroExplore = () => {
    handleNavigateStage(1);
  };

  const handleOpenContactModal = (editionName?: string) => {
    if (editionName) {
      setSelectedEdition(editionName);
    }
    setIsContactModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#EBE9E5] text-[#151514] selection:bg-[#151514] selection:text-[#EBE9E5] font-sans antialiased">
      {/* Precision Dotted Engineering Grid Background */}
      <AnimatedBackground />

      {/* Floating Capsule Glass Navigation */}
      <Navigation
        activeStage={activeStage}
        onNavigateStage={handleNavigateStage}
        onOpenContactModal={() => handleOpenContactModal('MacSolid Pro (Full BOM Engine)')}
      />

      {/* Main Flow: 4 Unified, Spacious Chapters */}
      <main className="relative z-10">
        <HeroSection
          onExploreClick={handleHeroExplore}
          onOpenContactModal={() => handleOpenContactModal('MacSolid Pro (Full BOM Engine)')}
        />
        <InteractiveCADStudio />
        <AnimatedFormatStack />
        <CoverflowPricing onOpenContactModal={handleOpenContactModal} />
      </main>

      {/* Minimalist Ink Footer */}
      <Footer />

      {/* Contact for Trial & Schedule Meeting Modal */}
      <ContactTrialModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        selectedEdition={selectedEdition}
      />
    </div>
  );
}

export default App;
