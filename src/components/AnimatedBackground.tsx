import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking with smooth inertial lerp
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    // Scroll metrics
    let scrollProgress = 0;
    let smoothScroll = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleScroll = () => {
      const sy = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgress = Math.min(1, Math.max(0, sy / maxScroll));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Engineering coordinate grid background
    const gridSize = 48;
    let gridOffset = 0;
    let time = 0;

    const render = () => {
      time += 0.016;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Smooth scroll lerp for landscape transitions
      smoothScroll += (scrollProgress - smoothScroll) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // 1. Base Warm Porcelain Canvas Fill (#EBE9E5)
      ctx.fillStyle = '#EBE9E5';
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle CAD Engineering Coordinate Grid
      gridOffset = (gridOffset + 0.08) % gridSize;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = -gridSize + gridOffset; x < width; x += gridSize) {
        const distFromMouse = Math.abs(x - mouseX);
        const alpha = Math.max(0.01, 0.032 - (distFromMouse / width) * 0.02);
        ctx.strokeStyle = `rgba(21, 21, 20, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < height; y += gridSize) {
        const distFromMouse = Math.abs(y - mouseY);
        const alpha = Math.max(0.01, 0.032 - (distFromMouse / height) * 0.02);
        ctx.strokeStyle = `rgba(21, 21, 20, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Datum Crosshairs `+`
      const crosshairSpacing = gridSize * 4;
      for (let cx = crosshairSpacing / 2; cx < width; cx += crosshairSpacing) {
        for (let cy = crosshairSpacing / 2; cy < height; cy += crosshairSpacing) {
          const dx = cx - mouseX;
          const dy = cy - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const crossAlpha = dist < 240 ? 0.16 : 0.035;
          ctx.strokeStyle = `rgba(21, 21, 20, ${crossAlpha})`;
          ctx.beginPath();
          ctx.moveTo(cx - 3, cy);
          ctx.lineTo(cx + 3, cy);
          ctx.moveTo(cx, cy - 3);
          ctx.lineTo(cx, cy + 3);
          ctx.stroke();
        }
      }

      // Subtle ambient cursor glow
      const radial = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 320);
      radial.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
      radial.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.98 }}
    />
  );
};

export default AnimatedBackground;
