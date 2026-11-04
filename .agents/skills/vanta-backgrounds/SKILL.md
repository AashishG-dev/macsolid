---
name: vanta-backgrounds
description: 3D WebGL and Canvas animated backgrounds (Topology, Net, Waves, Halo, Globe) tailored for high-performance minimal light and dark themes using Vanta.js and Three.js.
---

# Vanta.js Animated Backgrounds

[Vanta.js](https://github.com/tengbao/vanta) provides ready-to-use 3D animated WebGL backgrounds powered by Three.js.

---

## 1. Minimal Light-Theme Palettes for Vanta

For an ultra-minimal light theme, avoid heavy, saturated 3D meshes. Instead, configure muted pastel / wireframe parameters with high transparency:

### Recommended Vanta Effect: `NET` (Light Engineering Blueprint)

```javascript
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

// Initialize on container element
const vantaEffect = NET({
  el: '#vanta-bg',
  THREE: THREE,
  mouseControls: true,
  touchControls: false,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x3b82f6,          // Clean technical blue (points/lines)
  backgroundColor: 0xfafafa,// Alabaster canvas
  points: 9.00,             // Sparse and clean
  maxDistance: 20.00,       // Shorter line connections
  spacing: 18.00,           // Relaxed grid spacing
  showDots: true,
});

// Always destroy on unmount to prevent WebGL context leaks
// vantaEffect.destroy();
```

### Recommended Vanta Effect: `TOPOLOGY` (Precision Elevation Contour)

```javascript
import TOPOLOGY from 'vanta/dist/vanta.topology.min';
import * as p5 from 'p5';

const vantaEffect = TOPOLOGY({
  el: '#vanta-bg',
  p5: p5,
  color: 0x94a3b8,          // Subtle slate line contour
  backgroundColor: 0xffffff,// Crisp white
});
```

---

## 2. React Hook Integration

```tsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// @ts-ignore
import NET from 'vanta/dist/vanta.net.min';

export function useVantaNet(color = 0x2563eb, bgColor = 0xfafafa) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    if (!effectRef.current && vantaRef.current) {
      effectRef.current = NET({
        el: vantaRef.current,
        THREE,
        color,
        backgroundColor: bgColor,
        points: 8.0,
        maxDistance: 22.0,
        spacing: 18.0,
      });
    }

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, [color, bgColor]);

  return vantaRef;
}
```

