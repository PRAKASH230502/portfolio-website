import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001
  });

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left scroll-progress-bar"
        style={{ scaleX }}
      />
      {/* Glow layer */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[59] origin-left blur-[4px]"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #7c3aed, #22d3ee, #f97316)',
          opacity: 0.6,
        }}
      />
    </>
  );
};

export default ScrollProgress;
