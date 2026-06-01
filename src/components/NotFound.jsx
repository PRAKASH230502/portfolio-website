// NotFound component - Updated
import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 glass-card p-8 max-w-md w-full border-white/[0.08]"
      >
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <FiAlertCircle className="text-4xl text-violet-400" />
          </div>
        </div>
        
        <h1 className="font-heading text-6xl font-bold gradient-text mb-2">404</h1>
        <h2 className="text-xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-white/60 mb-8 text-sm">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-[1.02]"
        >
          <FiHome className="text-base" />
          Return to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
