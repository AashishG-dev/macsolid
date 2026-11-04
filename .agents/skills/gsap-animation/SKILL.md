---
name: gsap-animation
description: Advanced web motion, timeline orchestration, ScrollTrigger scrubbed animations, pinning, and text reveals using GSAP.
---

# GSAP Animation & ScrollTrigger

A comprehensive guide for building high-performance motion, scroll-scrubbed interactive stages, and seamless pinning with GreenSock (GSAP).

---

## 1. Installation & Imports

```bash
npm install gsap
```

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

---

## 2. Core Motion Patterns

### 1. Pinned Scrub Showcase (Exploded Assembly / 3D Stage)
Pin a container in place while the user scrolls, driving an internal transformation:

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.pin-stage-container',
    start: 'top top',
    end: '+=250%',
    pin: true,
    scrub: 1, // 1-second lag smoothing for natural feel
    anticipatePin: 1,
  }
});

tl.to('.part-top', { y: -150, opacity: 1, duration: 1 })
  .to('.part-middle', { scale: 1.05, duration: 1 }, '<')
  .to('.part-bottom', { y: 150, opacity: 1, duration: 1 }, '<')
  .to('.dimension-callouts', { opacity: 1, stagger: 0.2, duration: 0.5 });
```

### 2. Scroll-Triggered Stagger Reveals
Reveal lists of cards or feature badges when they scroll into view:

```javascript
gsap.from('.feature-card', {
  scrollTrigger: {
    trigger: '.features-grid',
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.12,
  ease: 'power3.out',
});
```

### 3. Text Split / Character Line Reveal
```javascript
gsap.from('.headline-line', {
  scrollTrigger: {
    trigger: '.hero-headline',
    start: 'top 90%',
  },
  y: '100%',
  opacity: 0,
  duration: 1.0,
  ease: 'expo.out',
  stagger: 0.1,
});
```

---

## 3. Best Practices & Performance Checklist

- **Hardware Acceleration**: Target `x`, `y`, `scale`, `rotation`, and `autoAlpha` (which combines `opacity` and `visibility: hidden` for cleaner DOM cleanup).
- **Cleanup**: In React, wrap animations in `gsap.context()`:
  ```tsx
  useEffect(() => {
    const ctx = gsap.context(() => {
      // All GSAP code here
    }, containerRef);
    return () => ctx.revert(); // Automatically kills triggers and resets styles
  }, []);
  ```

