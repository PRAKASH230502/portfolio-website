// Projects component - Updated
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiSearch, FiX, FiFilter } from 'react-icons/fi';

// ── Proper ES imports (work in production build) ──────────────────────────────
import airWritingImg  from '../assets/project_air_writing.png';
import medicalAIImg   from '../assets/project_medical_ai.png';
import flavorMatchImg from '../assets/project_flavormatch.png';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// ── Helpers ───────────────────────────────────────────────────────────────────
function TechBadge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-600/10 px-3 py-1 text-xs font-medium text-violet-300">
      {children}
    </span>
  );
}

// ── Glow Particles ────────────────────────────────────────────────────────────
function GlowParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/12 blur-3xl" />
      <div className="absolute top-1/4 -left-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent-500/08 blur-3xl" />
      <div className="absolute inset-0 opacity-80">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-violet-400/60"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
            animate={{ opacity: [0.05, 0.7, 0.05], scale: [0.6, 1.3, 0.6] }}
            transition={{ duration: 3.5 + (i % 5) * 0.4, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Project Modal ─────────────────────────────────────────────────────────────
function Modal({ open, onClose, project }) {
  const reduced = usePrefersReducedMotion();
  if (!project) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/75 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          <motion.div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f1e]/95 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={reduced ? { scale: 0.98 } : { scale: 0.88, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={reduced ? { scale: 0.98 } : { scale: 0.88, y: 16, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/8 via-transparent to-cyan-500/8 pointer-events-none" />

            {/* Project thumbnail */}
            <div className="relative h-40 md:h-52 overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0f1e]/80" />
              <div className="absolute top-3 right-3">
                <span className={`badge text-xs font-semibold ${
                  project.category === 'Computer Vision' ? 'badge-cyan' :
                  project.category === 'Healthcare AI' ? 'text-rose-300 border-rose-500/30 bg-rose-500/10' :
                  'badge-orange'
                }`}>
                  {project.category}
                </span>
              </div>
            </div>

            <div className="relative p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-heading text-xl md:text-2xl font-bold text-white leading-tight">{project.title}</h3>
                <button onClick={onClose} className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/60 hover:text-white hover:bg-white/10 transition shrink-0" aria-label="Close">
                  <FiX size={18} />
                </button>
              </div>

              <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6">{project.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider font-mono mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((f, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-white/70">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0 shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                  <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider font-mono mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((s, idx) => <TechBadge key={idx}>{s}</TechBadge>)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={project.github || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
                  onClick={project.github ? undefined : (e) => e.preventDefault()}
                >
                  <FiGithub /> GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, onOpen }) {
  const reduced = usePrefersReducedMotion();
  const categoryColor = {
    'Computer Vision':  { border: 'hover:border-cyan-500/40',   dot: 'bg-cyan-400',    label: 'text-cyan-400'   },
    'Healthcare AI':    { border: 'hover:border-rose-500/40',   dot: 'bg-rose-400',    label: 'text-rose-400'   },
    'Recommendation':   { border: 'hover:border-accent-500/40', dot: 'bg-accent-400',  label: 'text-accent-400' },
  }[project.category] ?? { border: 'hover:border-violet-500/40', dot: 'bg-violet-400', label: 'text-violet-400' };

  return (
    <motion.article
      className={`group relative rounded-3xl border border-white/[0.07] bg-white/[0.03] overflow-hidden cursor-pointer animated-border ${categoryColor.border} transition-all duration-300`}
      onClick={onOpen}
      initial={reduced ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      onMouseMove={(e) => {
        if (reduced) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        e.currentTarget.style.transform = `perspective(1200px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 14}deg)`;
        e.currentTarget.style.setProperty('--x', `${px * 100}%`);
      }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
    >
      {/* Radial hover spotlight */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-400">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_50%,rgba(124,58,237,0.15),transparent_60%)]" />
      </div>

      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030712]/80" />
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className={`flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-xs font-medium ${categoryColor.label}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${categoryColor.dot} shadow-[0_0_6px_currentColor]`} />
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5">
        <h3 className="font-heading text-lg font-bold text-white leading-tight mb-2 group-hover:text-violet-200 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.slice(0, 4).map((s, idx) => (
            <TechBadge key={idx}>{s}</TechBadge>
          ))}
          {project.stack.length > 4 && (
            <span className="text-xs text-white/40 self-center">+{project.stack.length - 4}</span>
          )}
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-600/10 px-4 py-2 text-sm text-violet-300 hover:bg-violet-600/20 hover:border-violet-400/50 transition group/btn"
          onClick={(e) => { e.stopPropagation(); onOpen(); }}
        >
          <FiSearch className="text-xs" />
          View Details
        </button>
      </div>
    </motion.article>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] overflow-hidden">
      <div className="h-44 shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 rounded shimmer" />
        <div className="h-4 w-full rounded shimmer" />
        <div className="h-4 w-4/5 rounded shimmer" />
        <div className="flex gap-2 mt-2">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-6 w-16 rounded-full shimmer" />)}
        </div>
        <div className="h-9 w-28 rounded-xl shimmer mt-2" />
      </div>
    </div>
  );
}

// ── All filter tabs ───────────────────────────────────────────────────────────
const FILTERS = ['All', 'Computer Vision', 'Healthcare AI', 'Recommendation'];

// ── Projects Component ────────────────────────────────────────────────────────
const Projects = () => {
  const [loading, setLoading]         = useState(true);
  const [openProjectId, setOpenProject] = useState(null);
  const [activeFilter, setFilter]     = useState('All');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const projects = useMemo(() => [
    {
      id: 'air-writing',
      title: 'Air Writing Recognition Using Hand Gestures',
      category: 'Computer Vision',
      description: 'Real-time air writing system using Computer Vision and hand gesture recognition. Captures hand movements through webcam input and converts virtual writing into digital text.',
      image: airWritingImg,
      github: 'https://github.com/PRAKASH230502',
      demo: null,
      features: [
        'Real-time hand tracking with MediaPipe',
        'Gesture recognition & air drawing',
        'Character prediction pipeline',
        'Webcam-based interaction (zero hardware)',
        'OpenCV-powered frame processing',
      ],
      stack: ['Python', 'OpenCV', 'MediaPipe', 'Machine Learning', 'Computer Vision'],
    },
    {
      id: 'medical-detection',
      title: 'AI-Based Medical Disease Detection System',
      category: 'Healthcare AI',
      description: 'AI-powered healthcare diagnosis system detecting Skin Diseases and Pneumonia using Deep Learning and Medical Image Processing. Provides disease prediction assistance for early diagnosis.',
      image: medicalAIImg,
      github: 'https://github.com/PRAKASH230502',
      demo: null,
      features: [
        'Skin disease detection from images',
        'Pneumonia detection via Chest X-rays',
        'CNN-based multi-disease classification',
        'Image preprocessing & augmentation',
        'Accuracy & performance visualization',
      ],
      stack: ['Python', 'TensorFlow', 'Keras', 'CNN', 'Deep Learning', 'Medical Imaging'],
    },
    {
      id: 'flavormatch',
      title: 'FlavorMatch – AI-Powered Food Recommendation System',
      category: 'Recommendation',
      description: 'Intelligent food recommendation platform suggesting personalized recipes based on user preferences, cuisine interests, dietary choices, and cooking time using AI-powered filtering.',
      image: flavorMatchImg,
      github: 'https://github.com/PRAKASH230502',
      demo: null,
      features: [
        'Personalized food & recipe recommendations',
        'Content-based + collaborative filtering',
        'Cuisine and dietary preference analysis',
        'AI-powered suggestion engine',
        'Interactive Streamlit UI',
      ],
      stack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'React', 'Tailwind CSS'],
    },
  ], []);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const openProject = projects.find(p => p.id === openProjectId);

  return (
    <section id="projects" className="relative bg-[#030712] text-white section-padding overflow-hidden scroll-mt-20">
      <GlowParticles />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-violet mb-4 inline-flex">Featured Work</span>
          <h2 className="section-title centered">Projects</h2>
          <p className="mt-4 mx-auto max-w-2xl text-white/55 leading-relaxed">
            Real-world AI/ML applications focused on Computer Vision, Healthcare AI, and Intelligent Recommendation Systems.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === f
                  ? 'border-violet-500/50 bg-violet-600/15 text-violet-300 shadow-[0_0_16px_rgba(124,58,237,0.3)]'
                  : 'border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <ProjectCard project={p} onOpen={() => setOpenProject(p.id)} />
                </motion.div>
              ))
          }
        </div>

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-white/40">
            No projects in this category yet.
          </div>
        )}
      </div>

      <Modal
        open={!!openProject}
        onClose={() => setOpenProject(null)}
        project={openProject}
      />
    </section>
  );
};

export default Projects;
