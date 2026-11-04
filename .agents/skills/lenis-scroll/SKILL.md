---
name: lenis-scroll
description: Integration guide and best practices for Lenis smooth scrolling with GSAP ScrollTrigger, React, and vanilla JavaScript for modern web experiences.
---

# Lenis Smooth Scroll Integration

[Lenis](https://github.com/darkroomengineering/lenis) is a lightweight, robust smooth scrolling library designed by Darkroom Engineering that provides fluid inertial scrolling without hijacking standard browser accessibility.

---

## 1. Installation

```bash
npm install lenis
# Or include via CDN for standalone/vanilla setups:
# <script src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js"></script>
```

---

## 2. Core Setup & GSAP ScrollTrigger Synchronization

When combining Lenis with GSAP ScrollTrigger, synchronize their rendering tickers to avoid jitter and frame desynchronization.

### Canonical Vanilla JS Integration

```javascript
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Initialize Lenis with smooth inertial damping
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 2.0,
  infinite: false,
});

// 2. Synchronize Lenis scroll position with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// 3. Drive Lenis via GSAP ticker so both run in the exact same render frame
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// 4. Disable GSAP lag smoothing to keep scroll animations instant
gsap.ticker.lagSmoothing(0);
```

---

## 3. React / Next.js Implementation

```tsx
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export function useLenis() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);
}
```

---

## 4. Key Attributes & Troubleshooting

- **Preventing Nested Scroll Lock**:
  Add `data-lenis-prevent` to modal dialogs, code blocks, or scrollable tables to allow native scrolling inside them without triggering page scroll:
  ```html
  <div class="overflow-y-auto max-h-96" data-lenis-prevent>
    <!-- Code or Table content -->
  </div>
  ```
- **Programmatic Scrolling**:
  ```javascript
  // Scroll to section with offset and callback
  lenis.scrollTo('#features', {
    offset: -80,
    duration: 1.5,
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });
  ```

