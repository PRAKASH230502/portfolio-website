import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import profileImg from '../assets/img.jpeg';
import { useTypewriter } from '../hooks/useTypewriter';

// ─── Mouse-Reactive Neural Canvas ─────────────────────────────────────────────
function NeuralCanvas() {
  const canvasRef = useRef(null);
  const mouse     = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrameId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const PARTICLE_COUNT = 70;
    const CONNECTION_DIST = 150;
    const MOUSE_ATTRACT_DIST = 180;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r:  Math.random() * 2 + 1,
      baseVx: 0,
      baseVy: 0,
    }));
    particles.forEach(p => { p.baseVx = p.vx; p.baseVy = p.vy; });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mouse attract
      particles.forEach(p => {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_ATTRACT_DIST) {
          const force = (MOUSE_ATTRACT_DIST - dist) / MOUSE_ATTRACT_DIST * 0.012;
          p.vx += dx * force;
          p.vy += dy * force;
        }
        // Dampen back to base
        p.vx += (p.baseVx - p.vx) * 0.04;
        p.vy += (p.baseVy - p.vy) * 0.04;

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height)  p.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.4;
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(124, 58, 237, ${opacity})`);
            gradient.addColorStop(1, `rgba(34, 211, 238, ${opacity * 0.5})`);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      particles.forEach(p => {
        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, 'rgba(167, 139, 250, 0.8)');
        grd.addColorStop(1, 'rgba(124, 58, 237, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200, 180, 255, 0.9)';
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-55"
    />
  );
}

// ─── Matrix Rain ──────────────────────────────────────────────────────────────
function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const FONT_SIZE = 14;
    const cols = Math.floor(canvas.width / FONT_SIZE);
    const drops = Array(cols).fill(1).map(() => Math.random() * -50);
    const chars = 'アイウエオカキクケコABCDEF0123456789ΩΨΦΞΛΣΔΓΘabcdefghijklmnop∑∫∂∇'.split('');

    const draw = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * FONT_SIZE;

        // Bright head
        ctx.fillStyle = 'rgba(34, 211, 238, 0.9)';
        ctx.font = `bold ${FONT_SIZE}px "JetBrains Mono", monospace`;
        ctx.fillText(char, x, y * FONT_SIZE);

        // Trailing glow (random green/violet)
        ctx.fillStyle = Math.random() > 0.5
          ? `rgba(124, 58, 237, ${0.25 + Math.random() * 0.25})`
          : `rgba(0, 255, 65, ${0.1 + Math.random() * 0.15})`;
        ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;
        const trail = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(trail, x, (y - 1) * FONT_SIZE);

        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]"
    />
  );
}

// ─── Counting Stat ────────────────────────────────────────────────────────────
function CountingStat({ value, label }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const numericMatch = value.match(/(\d+)/);
    if (!numericMatch) { setDisplay(value); return; }

    const numeric = parseInt(numericMatch[1], 10);
    const prefix  = value.slice(0, value.indexOf(numericMatch[1]));
    const suffix  = value.slice(value.indexOf(numericMatch[1]) + numericMatch[1].length);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1400;
        const start    = performance.now();
        const easeOut  = (t) => 1 - Math.pow(1 - t, 3);

        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const current  = Math.round(easeOut(progress) * numeric);
          setDisplay(`${prefix}${current}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="glass-card px-4 py-3 text-center min-w-[88px] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="font-heading text-lg font-bold gradient-text-violet font-mono">{display}</div>
      <div className="text-[10px] text-white/40 leading-tight mt-0.5 uppercase tracking-wider">{label}</div>
    </div>
  );
}

// ─── Typewriter Roles ─────────────────────────────────────────────────────────
const ROLES = [
  'AI/ML Engineer',
  'Computer Vision Dev',
  'Deep Learning Builder',
  'Data Science Enthusiast',
];

const stats = [
  { value: '3+',    label: 'AI/ML Projects'  },
  { value: '6574',  label: 'GATE DA AIR'      },
  { value: 'CV+DL', label: 'Specialization'   },
];

// ─── Hero Component ───────────────────────────────────────────────────────────
const Hero = () => {
  const role = useTypewriter(ROLES);
  const [glitched, setGlitched] = useState(false);

  // Trigger glitch on mount
  useEffect(() => {
    const t = setTimeout(() => setGlitched(true), 900);
    const t2 = setTimeout(() => setGlitched(false), 1300);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]"
    >
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-40" />

      {/* Matrix rain — right side */}
      <div className="absolute right-0 top-0 w-1/3 h-full">
        <MatrixRain />
      </div>

      {/* Neural network canvas */}
      <NeuralCanvas />

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/12 blur-[120px]" />
        <div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-accent-500/08 blur-[80px]" />
        <div className="absolute bottom-1/4 right-0 h-72 w-72 rounded-full bg-violet-800/10 blur-[100px]" />
      </div>

      {/* Horizontal scan line */}
      <div
        className="pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        style={{ animation: 'scan-line 8s linear infinite', top: 0 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col md:flex-row items-center justify-between gap-16">

        {/* ── Left: Text Content ── */}
        <motion.div
          className="flex-1 text-center md:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Terminal status badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 mb-6">
            <span className="badge-green font-mono text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              <span className="text-emerald-400">$</span>
              <span className="text-white/70"> status:</span>
              <span className="text-emerald-300"> Open to Opportunities</span>
              <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-1 animate-cursor-blink" />
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={item} className="text-white/50 font-mono text-xs mb-2 tracking-[0.2em] uppercase">
            <span className="text-violet-400">//</span> Hey there 👋 I'm
          </motion.p>

          {/* Name with glitch effect */}
          <motion.h1
            variants={item}
            className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4"
          >
            <span className="text-white">Prakash </span>
            <span
              className="glitch-text gradient-text"
              data-text="Mani Patel"
            >
              Mani Patel
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div variants={item} className="flex items-center gap-2 mb-6 justify-center md:justify-start">
            <span className="font-mono text-base text-white/40 mr-1">&gt;_</span>
            <span className="font-mono text-xl sm:text-2xl text-cyan-400 font-medium neon-cyan">
              {role}
            </span>
            <span className="h-7 w-0.5 bg-cyan-400 animate-cursor-blink rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={item}
            className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mb-8 mx-auto md:mx-0"
          >
            CS student passionate about building intelligent systems that solve real-world problems.
            Specializing in{' '}
            <span className="text-violet-400 font-medium neon-violet">Computer Vision</span>,{' '}
            <span className="text-cyan-400 font-medium">Healthcare AI</span>, and{' '}
            <span className="text-accent-400 font-medium">Recommendation Systems</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center md:justify-start mb-10">
            <a
              href="#projects"
              className="btn-shimmer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.5)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(124,58,237,0.85)] hover:scale-105"
            >
              View Projects <FiArrowRight className="text-base transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/resume.pdf"
              download
              target="_blank"
              rel="noreferrer"
              className="btn-shimmer inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)] hover:scale-105"
            >
              <FiDownload className="text-base" /> Download Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex gap-3 justify-center md:justify-start">
            {[
              { href: 'https://github.com/PRAKASH230502', icon: FiGithub, label: 'GitHub', hoverClass: 'hover:border-violet-500/60 hover:text-violet-300 hover:bg-violet-600/15 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]' },
              { href: 'https://www.linkedin.com/in/prakash-mani-181366275/', icon: FiLinkedin, label: 'LinkedIn', hoverClass: 'hover:border-cyan-500/60 hover:text-cyan-300 hover:bg-cyan-600/15 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]' },
              { href: 'mailto:prakashmanip2002@gmail.com', icon: FiMail, label: 'Email', hoverClass: 'hover:border-accent-500/60 hover:text-accent-300 hover:bg-accent-600/15 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]' },
            ].map(({ href, icon: Icon, label, hoverClass }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={label}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/55 transition-all duration-300 ${hoverClass} hover:scale-110`}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Profile Image ── */}
        <motion.div
          className="flex-shrink-0 flex flex-col items-center gap-8"
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        >
          {/* Profile with multi-ring */}
          <div className="relative">
            {/* Ping pulse */}
            <div className="absolute inset-0 rounded-full bg-violet-600/20 animate-ping-slow" />

            {/* Outer rotating gradient ring */}
            <div
              className="absolute -inset-5 rounded-full animate-spin-slow"
              style={{
                background: 'conic-gradient(from 0deg, #7c3aed, #22d3ee, #f97316, #00ff41, #7c3aed)',
                borderRadius: '50%',
                padding: '2px',
                filter: 'blur(0px)',
              }}
            >
              <div className="h-full w-full rounded-full bg-[#030712]" />
            </div>

            {/* Inner counter-rotating ring */}
            <div
              className="absolute -inset-2.5 rounded-full animate-spin-slow-reverse opacity-50"
              style={{
                background: 'conic-gradient(from 180deg, #22d3ee, #a78bfa, #00ff41, #22d3ee)',
                borderRadius: '50%',
                padding: '1.5px',
              }}
            >
              <div className="h-full w-full rounded-full bg-[#030712]" />
            </div>

            {/* Profile image */}
            <div className="relative h-56 w-56 sm:h-64 sm:w-64 overflow-hidden rounded-full border-2 border-violet-600/40 shadow-[0_0_80px_rgba(124,58,237,0.5)] animate-float">
              <img
                src={profileImg}
                alt="Prakash Mani Patel — AI/ML Engineer"
                className="h-full w-full object-cover"
              />
              {/* Overlay shimmer */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-transparent to-violet-900/30" />
              {/* Scan line on photo */}
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-scan-line pointer-events-none" />
            </div>

            {/* Glow pulse behind */}
            <div className="absolute inset-0 rounded-full bg-violet-600/25 blur-3xl animate-pulse-glow -z-10" />
          </div>

          {/* Stats row — counting numbers */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            {stats.map(({ value, label }) => (
              <CountingStat key={label} value={value} label={label} />
            ))}
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-[10px] text-white/25 tracking-[0.3em] uppercase font-mono">Scroll</span>
        <div className="h-10 w-5 rounded-full border border-white/15 flex items-start justify-center p-1">
          <motion.div
            className="h-2 w-1 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
