import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { href: '#home',     label: 'Home' },
  { href: '#about',    label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills',   label: 'Skills' },
  { href: '#contact',  label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace('#', ''));
    const observers  = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#030712]/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.6)]'
          : 'bg-transparent'
      }`}
    >
      {/* Top scan-line accent */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      )}

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-[0_0_20px_rgba(124,58,237,0.6)] transition-all duration-300 group-hover:shadow-[0_0_36px_rgba(124,58,237,0.9)] group-hover:scale-110">
            <FaBrain className="text-white text-base animate-glow-breathe" />
            {/* Ping */}
            <span className="absolute inset-0 rounded-xl bg-violet-500/30 animate-ping-slow" />
          </div>
          <span className="text-xl font-bold gradient-text tracking-tight">Prakash.ai</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map(({ href, label }) => {
            const id = href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <li key={href}>
                <a
                  href={href}
                  className={`relative text-sm font-medium transition-colors duration-200 group ${
                    isActive ? 'text-white' : 'text-white/55 hover:text-white'
                  }`}
                >
                  {label}
                  {/* Underline indicator */}
                  <span
                    className={`absolute -bottom-1 left-0 h-px rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300 ${
                      isActive
                        ? 'w-full shadow-[0_0_8px_rgba(124,58,237,0.8)]'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                  {/* Active dot */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(124,58,237,0.9)]"
                    />
                  )}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#contact"
              className="btn-shimmer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(124,58,237,0.7)] hover:scale-105"
            >
              Hire Me ✦
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <motion.button
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.92 }}
        >
          {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/[0.06]"
          >
            <div className="bg-[#0a0f1e]/98 backdrop-blur-2xl px-6 pb-6 pt-4 flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={`text-sm font-medium py-1.5 transition-colors ${
                    activeSection === href.replace('#', '')
                      ? 'text-violet-300'
                      : 'text-white/65 hover:text-white'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-violet-500/60 font-mono mr-2">&gt;</span>
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 btn-shimmer inline-flex justify-center items-center rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                onClick={() => setMenuOpen(false)}
              >
                Hire Me ✦
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;