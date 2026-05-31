// src/components/Skills.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaCode, FaDatabase, FaRobot, FaTools,
  FaPython, FaJava, FaReact, FaGitAlt, FaDocker,
} from 'react-icons/fa';
import {
  SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn,
  SiPandas, SiNumpy, SiMongodb, SiMysql, SiStreamlit,
  SiJavascript, SiCplusplus, SiPostman, SiVercel,
  SiJupyter, SiVisualstudiocode,
} from 'react-icons/si';

// ─── Skill Data ───────────────────────────────────────────────────────────────
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
      { name: 'Pandas',        icon: SiPandas,      level: 92, color: '#150458' },
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
      { name: 'React',     icon: FaReact,     level: 80, color: '#61DAFB' },
      { name: 'Git',       icon: FaGitAlt,    level: 88, color: '#F05032' },
      { name: 'VS Code',   icon: SiVisualstudiocode, level: 95, color: '#007ACC' },
      { name: 'Postman',   icon: SiPostman,   level: 78, color: '#FF6C37' },
      { name: 'Vercel',    icon: SiVercel,    level: 75, color: '#FFFFFF' },
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
  violet:  { badge: 'badge-violet',  bar: 'from-violet-600 to-violet-400', glow: 'rgba(124,58,237,0.5)',   icon: 'text-violet-400',  border: 'border-violet-500/30',  bg: 'bg-violet-600/10'  },
  cyan:    { badge: 'badge-cyan',    bar: 'from-cyan-500 to-cyan-400',     glow: 'rgba(34,211,238,0.5)',   icon: 'text-cyan-400',    border: 'border-cyan-500/30',    bg: 'bg-cyan-600/10'    },
  orange:  { badge: 'badge-orange',  bar: 'from-accent-500 to-amber-400',  glow: 'rgba(249,115,22,0.5)',   icon: 'text-accent-400',  border: 'border-accent-500/30',  bg: 'bg-accent-600/10'  },
  emerald: { badge: 'badge',         bar: 'from-emerald-500 to-teal-400',  glow: 'rgba(16,185,129,0.5)',  icon: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-600/10' },
};

// ─── Skill Bar ────────────────────────────────────────────────────────────────
function SkillBar({ skill, colorKey, index }) {
  const c = colorMap[colorKey];
  return (
    <motion.div
      className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-200"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      {/* Icon */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5"
        style={{ color: skill.color }}
      >
        <skill.icon className="text-base" />
      </div>

      {/* Name + bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-white/80 truncate">{skill.name}</span>
          <span className="text-xs font-mono text-white/40 ml-2">{skill.level}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${c.bar}`}
            style={{ boxShadow: `0 0 8px ${c.glow}` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.08, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Skills Component ─────────────────────────────────────────────────────────
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
        <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-500/08 blur-[80px]" />
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
          <span className="badge-violet mb-4 inline-flex">Tech Arsenal</span>
          <h2 className="section-title centered">Skills &amp; Tools</h2>
          <p className="mt-4 mx-auto max-w-xl text-white/55 text-sm leading-relaxed">
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
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? `${catColor.bg} ${catColor.border} ${catColor.icon} shadow-[0_0_20px_${catColor.glow}]`
                    : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white'
                }`}
              >
                <cat.icon className="text-base" />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Active category content */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 md:p-8"
        >
          {/* Category header */}
          <div className="flex items-start gap-4 mb-8 pb-6 border-b border-white/[0.06]">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.bg} ${c.border} border`}>
              <activeCat.icon className={`text-2xl ${c.icon}`} />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-white">{activeCat.label}</h3>
              <p className="text-sm text-white/50 mt-1">{activeCat.description}</p>
            </div>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeCat.skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} colorKey={activeCat.color} index={i} />
            ))}
          </div>
        </motion.div>

        {/* All skills cloud */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-center text-xs text-white/30 uppercase tracking-widest font-mono mb-5">All Technologies</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.flatMap(cat =>
              cat.skills.map(s => (
                <span
                  key={s.name + cat.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.04] px-3 py-1 text-xs text-white/60 hover:border-white/15 hover:text-white/80 transition-colors cursor-default"
                >
                  <s.icon style={{ color: s.color }} className="text-sm" />
                  {s.name}
                </span>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
