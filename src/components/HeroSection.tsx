import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SculptureHero from './ui/liquid-sculpture-hero';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenContactModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenContactModal,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // As user scrolls past the hero, text gently recedes, leaving the sculpture sand to flow freely
    const content = el.querySelector('.sh-content');
    const backdrop = el.querySelector('.sh-backdrop');
    const targets = [content, backdrop].filter(Boolean);

    if (targets.length > 0) {
      const tween = gsap.to(targets, {
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom 40%',
          scrub: true,
        },
        opacity: 0,
        y: -40,
        ease: 'none',
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100svh] overflow-visible"
    >
      <SculptureHero
        src="/sculpture.webp"
        darkSrc="/sculpture-dark.webp"
        background="#EBE9E5"
        darkBackground="#111110"
        imageBackground="#EAE9E7"
        textColor="#151514"
        accentColor="#151514"
        headingFont="'Geist', 'Plus Jakarta Sans', sans-serif"
        accentFont="'Instrument Serif', 'Times New Roman', serif"
        bodyFont="'Geist', 'Plus Jakarta Sans', sans-serif"
        height="100svh"
        showNav={false}
        showCredit={false}
        backdropText="macsolid"
        eyebrow="INDEPENDENT CAD ENGINE — 60 FPS ANALYSIS & EXTRACTION"
        headline={"Every component.\nAccounted for."}
        headlineAccent="Accounted for."
        body="Instant multi-threaded Bill of Materials extraction, exact raw stock calculations, and ERP-ready spreadsheets directly from your 3D CAD files."
        primaryCta={{ label: "Contact for Trial", href: "#trial" }}
        secondaryCta={{ label: "Explore 3D Stage", href: "#stage-experience" }}
        onPrimaryClick={onOpenContactModal}
        onSecondaryClick={onExploreClick}
        hint=""
        hintTouch=""
        sculptureScale={1.04}
        particleDensity={1.05}
        dotSize={1.0}
        turbulence={1.0}
        liquid={1.15}
        strength={1.05}
        radius={80}
        speed={1.0}
        streaks={true}
        restStyle="particles"
        className="w-full"
      />
    </section>
  );
};

export default HeroSection;
