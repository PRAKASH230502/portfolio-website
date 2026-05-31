// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Deep Space palette
        space: {
          950: '#030712',
          900: '#0a0f1e',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
        },
        // Electric violet
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        // Neon cyan
        neon: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        // Hot orange accent
        accent: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'neural-mesh': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.8), 0 0 80px rgba(34, 211, 238, 0.3)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-bar': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--skill-width)' },
        },
        /* NEW — techy upgrades */
        glitch: {
          '0%':   { clipPath: 'inset(0 0 100% 0)', transform: 'translate(0)' },
          '10%':  { clipPath: 'inset(10% 0 80% 0)', transform: 'translate(-4px, 2px)' },
          '20%':  { clipPath: 'inset(40% 0 50% 0)', transform: 'translate(4px, -2px)' },
          '30%':  { clipPath: 'inset(60% 0 30% 0)', transform: 'translate(-2px, 1px)' },
          '40%':  { clipPath: 'inset(20% 0 60% 0)', transform: 'translate(3px, -1px)' },
          '50%':  { clipPath: 'inset(80% 0 10% 0)', transform: 'translate(-3px, 2px)' },
          '60%':  { clipPath: 'inset(5% 0 85% 0)',  transform: 'translate(4px, -2px)' },
          '70%':  { clipPath: 'inset(45% 0 45% 0)', transform: 'translate(-1px, 1px)' },
          '80%':  { clipPath: 'inset(70% 0 20% 0)', transform: 'translate(2px, -1px)' },
          '90%':  { clipPath: 'inset(30% 0 60% 0)', transform: 'translate(-4px, 2px)' },
          '100%': { clipPath: 'inset(0 0 100% 0)', transform: 'translate(0)' },
        },
        'scan-line': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'border-spin': {
          '0%':   { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
        'ping-slow': {
          '0%':   { transform: 'scale(1)', opacity: '0.8' },
          '80%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'matrix-fall': {
          '0%':   { transform: 'translateY(-100%)', opacity: '1' },
          '80%':  { opacity: '0.6' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'glow-breathe': {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(124,58,237,0.6))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(34,211,238,0.8)) drop-shadow(0 0 40px rgba(124,58,237,0.4))' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '41%': { opacity: '1' },
          '42%': { opacity: '0.6' },
          '43%': { opacity: '1' },
          '74%': { opacity: '1' },
          '75%': { opacity: '0.3' },
          '76%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%':   { transform: 'translateX(60px)', opacity: '0' },
          '100%': { transform: 'translateX(0)',    opacity: '1' },
        },
        'count-up': {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'cursor-blink': 'cursor-blink 1s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'spin-slow': 'spin-slow 10s linear infinite',
        'spin-slow-reverse': 'spin-slow 14s linear infinite reverse',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        /* NEW */
        'glitch': 'glitch 0.4s steps(1) 1',
        'scan-line': 'scan-line 6s linear infinite',
        'ping-slow': 'ping-slow 2.5s cubic-bezier(0,0,0.2,1) infinite',
        'matrix-fall': 'matrix-fall 3s linear infinite',
        'glow-breathe': 'glow-breathe 3s ease-in-out infinite',
        'flicker': 'flicker 4s linear infinite',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'count-up': 'count-up 0.5s ease-out forwards',
      },
      boxShadow: {
        'neon-violet': '0 0 20px rgba(124, 58, 237, 0.5)',
        'neon-cyan': '0 0 20px rgba(34, 211, 238, 0.5)',
        'neon-orange': '0 0 20px rgba(249, 115, 22, 0.5)',
        'glow-sm': '0 0 10px rgba(124, 58, 237, 0.3)',
        'glow-md': '0 0 30px rgba(124, 58, 237, 0.4)',
        'glow-lg': '0 0 60px rgba(124, 58, 237, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}