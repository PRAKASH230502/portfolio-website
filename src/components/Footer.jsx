// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';

const socials = [
  {
    icon: FiGithub,
    href: 'https://github.com/PRAKASH230502',
    label: 'GitHub',
    hoverColor: 'hover:text-violet-400 hover:border-violet-500/40 hover:bg-violet-600/10 hover:shadow-[0_0_16px_rgba(124,58,237,0.4)]',
  },
  {
    icon: FiLinkedin,
    href: 'https://www.linkedin.com/in/prakash-mani-181366275/',
    label: 'LinkedIn',
    hoverColor: 'hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-600/10 hover:shadow-[0_0_16px_rgba(34,211,238,0.4)]',
  },
  {
    icon: FiMail,
    href: 'mailto:prakashmanip2002@gmail.com',
    label: 'Email',
    hoverColor: 'hover:text-accent-400 hover:border-accent-500/40 hover:bg-accent-600/10 hover:shadow-[0_0_16px_rgba(249,115,22,0.4)]',
  },
];

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-[#030712] text-white overflow-hidden">
      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-32 w-80 rounded-full bg-violet-600/08 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 shadow-[0_0_12px_rgba(124,58,237,0.5)]">
                <FaBrain className="text-white text-xs" />
              </div>
              <span
                className="text-lg font-bold gradient-text"
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
              >
                Prakash.ai
              </span>
            </div>
            <p className="text-xs text-white/35 font-mono">
              Built with React + Vite • Deployed on Vercel
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label, hoverColor }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/50 transition-all duration-300 hover:scale-110 ${hoverColor}`}
              >
                <Icon className="text-base" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/30 text-center md:text-right">
            © {new Date().getFullYear()} Prakash Mani Patel
            <br />
            <span className="text-white/20">All rights reserved.</span>
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-8 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/30 bg-[#0a0f1e]/90 text-violet-400 backdrop-blur-sm shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-400 hover:bg-violet-600/20 hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-110 ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <FiArrowUp className="text-base" />
      </button>
    </footer>
  );
};

export default Footer;
