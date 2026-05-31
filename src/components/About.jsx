// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiEye, FiHeart, FiStar, FiCode, FiCpu, FiTerminal } from 'react-icons/fi';

// Achievement cards
const achievements = [
  {
    icon: FiAward,
    title: 'GATE DA 2026',
    value: 'AIR 6574',
    desc: 'Qualified Graduate Aptitude Test in Engineering — Data Science & AI',
    color: 'from-violet-600/15 to-violet-900/10',
    border: 'border-violet-500/25',
    iconColor: 'text-violet-400',
    glow: '0 0 30px rgba(124,58,237,0.15)',
    hoverGlow: '0 0 40px rgba(124,58,237,0.35)',
    accent: '#7c3aed',
  },
  {
    icon: FiEye,
    title: 'Computer Vision',
    value: 'Specialist',
    desc: 'Real-time hand tracking, air writing, gesture recognition with OpenCV & MediaPipe',
    color: 'from-cyan-600/15 to-cyan-900/10',
    border: 'border-cyan-500/25',
    iconColor: 'text-cyan-400',
    glow: '0 0 30px rgba(34,211,238,0.15)',
    hoverGlow: '0 0 40px rgba(34,211,238,0.35)',
    accent: '#22d3ee',
  },
  {
    icon: FiHeart,
    title: 'Healthcare AI',
    value: 'Deep Learning',
    desc: 'CNN-based medical image classification for skin disease & pneumonia detection',
    color: 'from-rose-600/15 to-rose-900/10',
    border: 'border-rose-500/25',
    iconColor: 'text-rose-400',
    glow: '0 0 30px rgba(244,63,94,0.15)',
    hoverGlow: '0 0 40px rgba(244,63,94,0.35)',
    accent: '#f43f5e',
  },
  {
    icon: FiStar,
    title: 'RecSys',
    value: 'AI-Powered',
    desc: 'Content-based & collaborative filtering for personalized food recommendations',
    color: 'from-amber-600/15 to-amber-900/10',
    border: 'border-amber-500/25',
    iconColor: 'text-amber-400',
    glow: '0 0 30px rgba(245,158,11,0.15)',
    hoverGlow: '0 0 40px rgba(245,158,11,0.35)',
    accent: '#f59e0b',
  },
];

// Timeline milestones
const timeline = [
  {
    year: '2026',
    title: 'GATE DA Qualified',
    desc: 'All India Rank 6574 in Graduate Aptitude Test — Data Science & AI',
    icon: FiAward,
    color: 'bg-violet-600',
    glow: 'shadow-[0_0_16px_rgba(124,58,237,0.9)]',
    lineColor: 'rgba(124,58,237,0.5)',
  },
  {
    year: '2025',
    title: 'AI Medical System',
    desc: 'Built CNN-based multi-disease detection (Skin + Pneumonia) with TensorFlow/Keras',
    icon: FiCpu,
    color: 'bg-cyan-500',
    glow: 'shadow-[0_0_16px_rgba(34,211,238,0.9)]',
    lineColor: 'rgba(34,211,238,0.5)',
  },
  {
    year: '2024',
    title: 'Air Writing Recognition',
    desc: 'Real-time hand gesture system converting air movements to digital text with OpenCV',
    icon: FiEye,
    color: 'bg-orange-500',
    glow: 'shadow-[0_0_16px_rgba(249,115,22,0.9)]',
    lineColor: 'rgba(249,115,22,0.5)',
  },
  {
    year: '2023',
    title: 'CS Undergraduate',
    desc: 'Started B.Tech in Computer Science — focused on algorithms, ML fundamentals & competitive programming',
    icon: FiCode,
    color: 'bg-emerald-500',
    glow: 'shadow-[0_0_16px_rgba(16,185,129,0.9)]',
    lineColor: 'rgba(16,185,129,0.5)',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  }),
};

// Terminal line component
function TerminalLine({ prompt = false, comment = false, children }) {
  if (comment) return (
    <p className="terminal-comment">// {children}</p>
  );
  if (prompt) return (
    <p className="terminal-text terminal-prompt">{children}</p>
  );
  return <p className="terminal-text">{children}</p>;
}

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-[#030712] text-white section-padding overflow-hidden scroll-mt-20"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/08 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/08 blur-[100px]" />
        <div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-orange-500/05 blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-violet mb-4 inline-flex">
            <FiTerminal className="text-xs" /> About Me
          </span>
          <h2 className="section-title centered">
            Building Intelligent Systems
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-white/55 leading-relaxed">
            CS student turned AI builder — transforming complex problems into smart, elegant solutions.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: Terminal Bio + Achievement Cards ── */}
          <div className="space-y-6">
            {/* Terminal window bio card */}
            <motion.div
              className="terminal-window"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              {/* Title bar */}
              <div className="terminal-titlebar">
                <span className="terminal-dot bg-rose-500 shadow-[0_0_6px_rgba(239,68,68,0.7)]" />
                <span className="terminal-dot bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.7)]" />
                <span className="terminal-dot bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                <span className="ml-3 text-xs text-white/30 font-mono">~/about/prakash.md</span>
                <span className="ml-auto text-xs text-white/20 font-mono">AI Engineer</span>
              </div>

              {/* Terminal content */}
              <div className="p-5 space-y-1.5 font-mono text-sm">
                <TerminalLine comment>Who is Prakash?</TerminalLine>
                <TerminalLine prompt>cat profile.json</TerminalLine>
                <div className="mt-2 pl-2 border-l-2 border-violet-500/40 space-y-1">
                  <p className="terminal-text">
                    <span className="terminal-keyword">name</span>
                    <span className="text-white/40">: </span>
                    <span className="terminal-string">"Prakash Mani Patel"</span>
                  </p>
                  <p className="terminal-text">
                    <span className="terminal-keyword">role</span>
                    <span className="text-white/40">: </span>
                    <span className="terminal-string">"AI/ML Engineer"</span>
                  </p>
                  <p className="terminal-text">
                    <span className="terminal-keyword">gate_rank</span>
                    <span className="text-white/40">: </span>
                    <span className="terminal-value">6574</span>
                  </p>
                  <p className="terminal-text">
                    <span className="terminal-keyword">focus</span>
                    <span className="text-white/40">: </span>
                    <span className="text-white/50">{"["}</span>
                    <span className="terminal-string">"ComputerVision"</span>
                    <span className="text-white/50">, </span>
                    <span className="terminal-string">"HealthcareAI"</span>
                    <span className="text-white/50">, </span>
                    <span className="terminal-string">"RecSys"</span>
                    <span className="text-white/50">{"]"}</span>
                  </p>
                  <p className="terminal-text">
                    <span className="terminal-keyword">passion</span>
                    <span className="text-white/40">: </span>
                    <span className="terminal-string">"Building real-world AI"</span>
                  </p>
                  <p className="terminal-text">
                    <span className="terminal-keyword">status</span>
                    <span className="text-white/40">: </span>
                    <span className="text-emerald-400 animate-flicker">"open_to_work"</span>
                  </p>
                </div>
                <div className="pt-2">
                  <TerminalLine prompt>
                    echo <span className="text-amber-400">"CS student passionate about intelligent systems"</span>
                  </TerminalLine>
                  <p className="text-white/55 pl-4 text-xs mt-1 leading-6">
                    CS student deeply passionate about building intelligent<br />
                    systems that solve complex, real-world problems.<br />
                    <span className="text-violet-400">GATE DA 2026</span> qualified with AIR{' '}
                    <span className="text-violet-400">6574</span>, always exploring<br />
                    new frontiers in AI and machine learning.
                  </p>
                </div>
                <TerminalLine comment>Specializations</TerminalLine>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Computer Vision', 'Healthcare AI', 'Recommendation Systems', 'Deep Learning', 'Competitive Programming'].map(tag => (
                    <span key={tag} className="badge-violet text-[10px] font-mono">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Achievement cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.title}
                  className={`scan-on-hover relative rounded-2xl border p-5 bg-gradient-to-br ${a.color} ${a.border} transition-all duration-400 hover:scale-[1.03] cursor-default overflow-hidden group`}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  style={{ boxShadow: a.glow }}
                  whileHover={{ boxShadow: a.hoverGlow }}
                >
                  {/* Radial spotlight */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${a.accent}22, transparent 70%)` }} />
                  <a.icon className={`text-2xl ${a.iconColor} mb-3 animate-glow-breathe`} />
                  <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-1">{a.title}</div>
                  <div className={`text-lg font-bold font-heading ${a.iconColor}`}>{a.value}</div>
                  <p className="text-xs text-white/45 mt-1.5 leading-relaxed">{a.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right: Animated Timeline ── */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <p className="text-xs text-white/35 uppercase tracking-[0.2em] font-mono flex items-center gap-2">
              <span className="h-px flex-1 bg-gradient-to-r from-violet-500/40 to-transparent" />
              Timeline
              <span className="h-px flex-1 bg-gradient-to-l from-violet-500/40 to-transparent" />
            </p>

            <div className="relative">
              {/* Animated vertical connector */}
              <motion.div
                className="absolute left-5 top-0 w-px"
                style={{ background: 'linear-gradient(to bottom, #7c3aed, #22d3ee, #f97316, rgba(16,185,129,0))' }}
                initial={{ height: '0%' }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              />

              <div className="space-y-6">
                {timeline.map((milestone, i) => (
                  <motion.div
                    key={milestone.year}
                    className="relative flex gap-6 group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.18, duration: 0.55 }}
                  >
                    {/* Icon dot */}
                    <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${milestone.color} ${milestone.glow} transition-all duration-300 group-hover:scale-110`}>
                      <milestone.icon className="text-white text-sm" />
                    </div>

                    {/* Content */}
                    <div className="glass-card flex-1 p-4 transition-all duration-300 group-hover:border-violet-500/30 group-hover:shadow-[0_0_24px_rgba(124,58,237,0.1)]">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-heading font-semibold text-white text-sm group-hover:text-violet-200 transition-colors">{milestone.title}</h3>
                        <span className="font-mono text-[10px] text-white/35 bg-white/5 border border-white/[0.06] px-2 py-0.5 rounded-md">{milestone.year}</span>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">{milestone.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Code comment quote */}
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-[#0d1117]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {/* Title bar mini */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.05] bg-white/[0.02]">
                <span className="h-2 w-2 rounded-full bg-rose-500/70" />
                <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                <span className="ml-2 text-[10px] text-white/25 font-mono">philosophy.js</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-1">
                <p className="text-white/25">{'/**'}</p>
                <p className="text-white/25">{' * @quote'}</p>
                <p className="text-white/55 leading-7 pl-2">
                  {' * "The goal of AI is not to replace human'}
                </p>
                <p className="text-white/55 leading-7 pl-2">
                  {' *  intelligence, but to augment it —'}
                </p>
                <p className="text-white/55 leading-7 pl-2">
                  {' *  building tools that make the impossible,'}
                </p>
                <p className="text-cyan-400 font-semibold leading-7 pl-2">
                  {' *  possible."'}
                </p>
                <p className="text-violet-400 text-xs pl-2">{' * @author Prakash Mani Patel'}</p>
                <p className="text-white/25">{' */'}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;