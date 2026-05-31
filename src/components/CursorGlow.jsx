// src/components/CursorGlow.jsx
import { useEffect, useRef, useState } from 'react';

const CursorGlow = () => {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const pos      = useRef({ x: -100, y: -100 });
  const ring     = useRef({ x: -100, y: -100 });
  const rafId    = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterClickable = () => setIsHover(true);
    const onLeaveClickable = () => setIsHover(false);
    const onDown = () => setIsClick(true);
    const onUp   = () => setIsClick(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    // Detect hover on interactive elements
    const clickables = () => document.querySelectorAll('a, button, [role="button"], input, textarea, select, label, [data-hover]');

    const attach = () => {
      clickables().forEach(el => {
        el.addEventListener('mouseenter', onEnterClickable);
        el.addEventListener('mouseleave', onLeaveClickable);
      });
    };
    attach();

    // Animate the trailing ring with lerp
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.14;
      ring.current.y += (pos.current.y - ring.current.y) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      clickables().forEach(el => {
        el.removeEventListener('mouseenter', onEnterClickable);
        el.removeEventListener('mouseleave', onLeaveClickable);
      });
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[99999] -translate-x-1/2 -translate-y-1/2"
        style={{ top: 0, left: 0, willChange: 'transform' }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isClick
              ? 'h-2 w-2 bg-cyan-400 shadow-[0_0_12px_4px_rgba(34,211,238,0.9)]'
              : isHover
              ? 'h-3 w-3 bg-violet-400 shadow-[0_0_16px_6px_rgba(124,58,237,0.8)]'
              : 'h-2 w-2 bg-white shadow-[0_0_8px_3px_rgba(255,255,255,0.6)]'
          }`}
        />
      </div>

      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[99998] -translate-x-1/2 -translate-y-1/2"
        style={{ top: 0, left: 0, willChange: 'transform' }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isHover
              ? 'h-12 w-12 border-violet-400/60 shadow-[0_0_20px_rgba(124,58,237,0.4)]'
              : 'h-8 w-8 border-white/30'
          }`}
        />
      </div>
    </>
  );
};

export default CursorGlow;
