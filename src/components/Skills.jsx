// src/components/Skills.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCode, FaDatabase, FaRobot, FaTools,
  FaPython, FaJava, FaReact, FaGitAlt, FaDocker,
} from 'react-icons/fa';
import {
  SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn,
  SiPandas, SiNumpy, SiMongodb, SiMysql, SiStreamlit,
  SiJavascript, SiCplusplus, SiPostman, SiVercel,
  SiJupyter,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

// ─── Skill Data ────────────────────────────────────────────────────────────────
const categories = [
  {
    id: 'ml',
    label: 'AI / ML',
    icon: FaRobot,
    color: 'violet',
    description: 'Deep learning, computer vision, and intelligent systems',
    skills: [
      { name: 'TensorFlow',    icon: SiTensorflow,  level: 85, color: '#FF6F00' },
      { name: 'PyTorch',       icon: SiPytorch,     level: 75, color: '#EE4C2C' },
      { name: 'OpenCV',        icon: SiOpencv,      level: 88, color: '#5C3EE8' },
      { name: 'Scikit-learn',  icon: SiScikitlearn, level: 90, color: '#F89939' },
      { name: 'Pandas',        icon: SiPandas,      level: 92, color: '#7C3AED' },
      { name: 'NumPy',         icon: SiNumpy,       level: 90, color: '#4DABCF' },
      { name: 'Streamlit',     icon: SiStreamlit,   level: 80, color: '#FF4B4B' },
      { name: 'Jupyter',       icon: SiJupyter,     level: 88, color: '#F37626' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: FaCode,
    color: 'cyan',
    description: 'Programming languages for algorithms and system building',
    skills: [
      { name: 'Python',      icon: FaPython,      level: 95, color: '#3776AB' },
      { name: 'C++',         icon: SiCplusplus,   level: 82, color: '#00599C' },
      { name: 'Java',        icon: FaJava,        level: 75, color: '#ED8B00' },
      { name: 'JavaScript',  icon: SiJavascript,  level: 78, color: '#F7DF1E' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend & Tools',
    icon: FaTools,
    color: 'orange',
    description: 'UI development, tooling, and deployment infrastructure',
    skills: [
      { name: 'React',     icon: FaReact,    level: 80, color: '#61DAFB' },
      { name: 'Git',       icon: FaGitAlt,   level: 88, color: '#F05032' },
      { name: 'VS Code',   icon: VscVscode,  level: 95, color: '#007ACC' },
      { name: 'Postman',   icon: SiPostman,  level: 78, color: '#FF6C37' },
      { name: 'Vercel',    icon: SiVercel,   level: 75, color: '#a78bfa' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: FaDatabase,
    color: 'emerald',
    description: 'Relational and NoSQL data storage solutions',
    skills: [
      { name: 'MySQL',    icon: SiMysql,    level: 80, color: '#4479A1' },
      { name: 'MongoDB',  icon: SiMongodb,  level: 72, color: '#47A248' },
    ],
  },
];

const colorMap = {
  violet:  {
    badge: 'badge-violet', bar: 'from-violet-600 to-violet-400',
    glow: 'rgba(124,58,237,0.6)', icon: 'text-violet-400',
    border: 'border-violet-500/30', bg: 'bg-violet-600/10',
    tipGlow: '0 0 12px 4px rgba(124,58,237,0.7)',
    scanColor: 'rgba(124,58,237,0.08)',
  },
  cyan:    {
    badge: 'badge-cyan', bar: 'from-cyan-500 to-cyan-300',
    glow: 'rgba(34,211,238,0.6)', icon: 'text-cyan-400',
    border: 'border-cyan-500/30', bg: 'bg-cyan-600/10',
    tipGlow: '0 0 12px 4px rgba(34,211,238,0.7)',
    scanColor: 'rgba(34,211,238,0.08)',
  },
  orange:  {
    badge: 'badge-orange', bar: 'from-orange-500 to-amber-400',
    glow: 'rgba(249,115,22,0.6)', icon: 'text-orange-400',
    border: 'border-orange-500/30', bg: 'bg-orange-600/10',
    tipGlow: '0 0 12px 4px rgba(249,115,22,0.7)',
    scanColor: 'rgba(249,115,22,0.08)',
  },
  emerald: {
    badge: 'badge', bar: 'from-emerald-500 to-teal-300',
    glow: 'rgba(16,185,129,0.6)', icon: 'text-emerald-400',
    border: 'border-emerald-500/30', bg: 'bg-emerald-600/10',
    tipGlow: '0 0 12px 4px rgba(16,185,129,0.7)',
    scanColor: 'rgba(16,185,129,0.08)',
  },
};

// ─── Skill Bar ─────────────────────────────────────────────────────────────────
function SkillBar({ skill, colorKey, index }) {
  const c = colorMap[colorKey];

  return (
    <motion.div
      className="group flex items-center gap-4 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Icon */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-300 group-hover:scale-110"
        style={{ color: skill.color, boxShadow: `0 0 0 0 ${skill.color}40` }}
      >
        <skill.icon className="text-base" />
      </div>

      {/* Name + bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white/80 truncate font-mono">{skill.name}</span>
          <span className="text-xs font-mono text-white/40 ml-2 tabular-nums">{skill.level}%</span>
        </div>
        {/* Bar track */}
        <div className="relative h-1.5 w-full rounded-full bg-white/[0.06] overflow-visible">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${c.bar} relative`}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: index * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Glowing tip */}
            <span
              className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${skill.color}, #fff)`,
                boxShadow: c.tipGlow,
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Skills Component ──────────────────────────────────────────────────────────
const Skills = () => {
  const [active, setActive] = useState('ml');
  const activeCat = categories.find(c => c.id === active);
  const c = colorMap[activeCat.color];

  return (
    <section
      id="skills"
      className="relative bg-[#030712] text-white section-padding overflow-hidden scroll-mt-20"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-violet-600/08 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-500/06 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-violet mb-4 inline-flex">
            <FaRobot className="text-xs" /> Tech Arsenal
          </span>
          <h2 className="section-title centered">Skills & Tools</h2>
          <p className="mt-4 mx-auto max-w-xl text-white/50 text-sm leading-relaxed">
            From ML frameworks to system programming — the tools I use to build intelligent systems.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((cat) => {
            const isActive = active === cat.id;
            const catColor = colorMap[cat.color];
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`relative inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 overflow-hidden ${
                  isActive
                    ? `${catColor.bg} ${catColor.border} ${catColor.icon}`
                    : 'border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:text-white'
                }`}
                style={isActive ? { boxShadow: `0 0 24px ${catColor.glow}40` } : {}}
              >
                {/* Active shimmer sweep */}
                {isActive && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
                  />
                )}
                <cat.icon className="text-base relative z-10" />
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active category panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-card relative overflow-hidden p-6 md:p-8"
          >
            {/* Radial scan background */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse at 50% -10%, ${c.scanColor} 0%, transparent 70%)` }}
            />

            {/* Category header */}
            <div className={`flex items-start gap-4 mb-8 pb-6 border-b border-white/[0.06]`}>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.bg} border ${c.border} transition-all duration-300`}
                style={{ boxShadow: `0 0 20px ${c.glow}30` }}>
                <activeCat.icon className={`text-2xl ${c.icon}`} />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white">{activeCat.label}</h3>
                <p className="text-sm text-white/45 mt-1">{activeCat.description}</p>
              </div>
              {/* Skill count badge */}
              <div className="ml-auto">
                <span className={`${c.badge} text-xs font-mono`}>{activeCat.skills.length} skills</span>
              </div>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeCat.skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} colorKey={activeCat.color} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* All skills cloud */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-center text-[10px] text-white/25 uppercase tracking-[0.25em] font-mono mb-5">
            All Technologies
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.flatMap(cat =>
              cat.skills.map(s => (
                <motion.span
                  key={s.name + cat.id}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-xs text-white/55 hover:border-white/15 hover:text-white/85 transition-colors cursor-default"
                  style={{ '--hover-color': s.color }}
                >
                  <s.icon style={{ color: s.color }} className="text-sm" />
                  {s.name}
                </motion.span>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
