---
name: react-bits
description: Curated creative UI components, background animations (Squares, Waves, Hyperspeed, Grid), text animations (SplitText, BlurText), and interactive physics from react-bits.
---

# React Bits Component Library & Patterns

[React Bits](https://github.com/DavidHDev/react-bits) is a curated collection of lightweight, copy-pasteable React animations, background shaders, text effects, and interactive micro-components.

---

## 1. Signature Background Effects

### A. Animated Squares Grid (Light Theme CAD Aesthetic)
A minimal geometric canvas background with interactive cursor lighting:

```tsx
import React, { useRef, useEffect } from 'react';

interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'down' | 'left' | 'right';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
}

export const Squares: React.FC<SquaresProps> = ({
  direction = 'right',
  speed = 0.5,
  borderColor = 'rgba(0, 0, 0, 0.04)',
  squareSize = 40,
  hoverFillColor = 'rgba(37, 99, 235, 0.05)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let gridOffset = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      gridOffset.x = (gridOffset.x + speed) % squareSize;

      const startX = -squareSize + gridOffset.x;
      for (let x = startX; x < canvas.width; x += squareSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += squareSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};
```

---

## 2. Text Animations

### BlurText (Ethereal Headline Reveal)
```tsx
import { motion } from 'framer-motion';

export const BlurText = ({ text, className = '' }: { text: string; className?: string }) => {
  const words = text.split(' ');
  return (
    <h1 className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 15 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.08, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
};
```

---

## 3. Micro-Interactive Components

### Spotlight Card
Reveals a soft radial glow matching cursor coordinates:
```tsx
import React, { useRef, useState } from 'react';

export const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-6 transition-all ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(37, 99, 235, 0.08), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
```

