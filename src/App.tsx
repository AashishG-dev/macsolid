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
import { EngineeringFAQ } from './components/EngineeringFAQ';
import { ContactTrialModal } from './components/ContactTrialModal';
import { Footer } from './components/Footer';
import { RawStockBOMPreview } from './components/RawStockBOMPreview';

// Programmatic SEO Routes
import { SolidWorksBOMPage } from './routes/SolidWorksBOMPage';
import { AutoCADBOMPage } from './routes/AutoCADBOMPage';
import { StepBOMPage } from './routes/StepBOMPage';
import { OpenBOMAlternativePage } from './routes/OpenBOMAlternativePage';
import { ROICalculatorPage } from './routes/ROICalculatorPage';
import { SecurityCompliancePage } from './routes/SecurityCompliancePage';
import { SheetMetalNestingPage } from './routes/SheetMetalNestingPage';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    return typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/' : '/';
  });

  const lenisRef = useRef<Lenis | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState('MacSolid Pro (Full BOM Engine)');
  const isNavigatingRef = useRef(false);

  // Client-side router history navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      setCurrentPath(path);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    const cleanPath = path.replace(/\/$/, '') || '/';
    window.history.pushState({}, '', cleanPath);
    setCurrentPath(cleanPath);
    window.scrollTo(0, 0);
  };

  // Lenis & ScrollTrigger effect — only active when on the homepage '/'
  useEffect(() => {
    if (currentPath !== '/') {
      return;
    }

    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.1,
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
  }, [currentPath]);

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

  // Route: SolidWorks BOM Automation
  if (currentPath === '/solidworks-bom-generator') {
    return (
      <>
        <SolidWorksBOMPage
          onBack={() => navigateTo('/')}
          onOpenContactModal={handleOpenContactModal}
        />
        <Footer onNavigate={navigateTo} />
        <ContactTrialModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          selectedEdition={selectedEdition}
        />
      </>
    );
  }

  // Route: AutoCAD BOM Automation
  if (currentPath === '/autocad-bom-generator') {
    return (
      <>
        <AutoCADBOMPage
          onBack={() => navigateTo('/')}
          onOpenContactModal={handleOpenContactModal}
        />
        <Footer onNavigate={navigateTo} />
        <ContactTrialModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          selectedEdition={selectedEdition}
        />
      </>
    );
  }

  // Route: STEP / STP AP203/214/242 Parser
  if (currentPath === '/step-bom-extractor') {
    return (
      <>
        <StepBOMPage
          onBack={() => navigateTo('/')}
          onOpenContactModal={handleOpenContactModal}
        />
        <Footer onNavigate={navigateTo} />
        <ContactTrialModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          selectedEdition={selectedEdition}
        />
      </>
    );
  }

  // Route: OpenBOM Alternative Comparison
  if (currentPath === '/openbom-alternative') {
    return (
      <>
        <OpenBOMAlternativePage
          onBack={() => navigateTo('/')}
          onOpenContactModal={handleOpenContactModal}
        />
        <Footer onNavigate={navigateTo} />
        <ContactTrialModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          selectedEdition={selectedEdition}
        />
      </>
    );
  }

  // Route: BOM ROI Calculator
  if (currentPath === '/roi-calculator') {
    return (
      <>
        <ROICalculatorPage
          onBack={() => navigateTo('/')}
          onOpenContactModal={handleOpenContactModal}
        />
        <Footer onNavigate={navigateTo} />
        <ContactTrialModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          selectedEdition={selectedEdition}
        />
      </>
    );
  }

  // Route: Security & ITAR Compliance
  if (currentPath === '/security') {
    return (
      <>
        <SecurityCompliancePage
          onBack={() => navigateTo('/')}
          onOpenContactModal={handleOpenContactModal}
        />
        <Footer onNavigate={navigateTo} />
        <ContactTrialModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          selectedEdition={selectedEdition}
        />
      </>
    );
  }

  // Route: Sheet Metal Blank Sizing & Multi-Part Nesting
  if (currentPath === '/sheet-metal-nesting') {
    return (
      <>
        <SheetMetalNestingPage
          onBack={() => navigateTo('/')}
          onOpenContactModal={handleOpenContactModal}
        />
        <Footer onNavigate={navigateTo} />
        <ContactTrialModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          selectedEdition={selectedEdition}
        />
      </>
    );
  }

  // Default: Homepage Overview
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

      {/* Main Flow: 4 Unified, Spacious Chapters + Engineering FAQ */}
      <main className="relative z-10">
        <HeroSection
          onExploreClick={handleHeroExplore}
          onOpenContactModal={() => handleOpenContactModal('MacSolid Pro (Full BOM Engine)')}
        />
        <InteractiveCADStudio />
        <RawStockBOMPreview />
        <AnimatedFormatStack onNavigate={navigateTo} />
        <CoverflowPricing onOpenContactModal={handleOpenContactModal} />
        <EngineeringFAQ />
      </main>

      {/* Minimalist Ink Footer with Categorized Topic Silos */}
      <Footer onNavigate={navigateTo} />

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
