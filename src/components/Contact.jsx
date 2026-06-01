// src/components/Contact.jsx - Updated
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail, FiUser, FiMessageCircle, FiSend,
  FiGithub, FiLinkedin, FiMapPin, FiCheckCircle,
} from 'react-icons/fi';

// Social links panel data
const socials = [
  {
    icon: FiGithub,
    label: 'GitHub',
    handle: '@PRAKASH230502',
    href: 'https://github.com/PRAKASH230502',
    color: 'hover:border-violet-500/40 hover:bg-violet-600/10 hover:text-violet-300',
    iconColor: 'text-white/60',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    handle: 'Prakash Mani',
    href: 'https://www.linkedin.com/in/prakash-mani-181366275/',
    color: 'hover:border-cyan-500/40 hover:bg-cyan-600/10 hover:text-cyan-300',
    iconColor: 'text-white/60',
  },
  {
    icon: FiMail,
    label: 'Email',
    handle: 'prakashmanipatel7@gmail.com',
    href: 'mailto:prakashmanipatel7@gmail.com',
    color: 'hover:border-accent-500/40 hover:bg-accent-600/10 hover:text-accent-300',
    iconColor: 'text-white/60',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    handle: 'India 🇮🇳',
    href: null,
    color: 'cursor-default',
    iconColor: 'text-white/40',
  },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]     = useState(null);

  // Dynamic redirect — works on any domain (localhost, Vercel, custom)
  const redirectUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/thank-you`
    : '/thank-you';

  const inputBase =
    'w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 backdrop-blur-sm';

  return (
    <section
      id="contact"
      className="relative bg-[#030712] text-white section-padding overflow-hidden scroll-mt-20"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-500/08 blur-[80px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-violet mb-4 inline-flex">Get In Touch</span>
          <h2 className="section-title centered">Contact Me</h2>
          <p className="mt-4 mx-auto max-w-lg text-white/55 text-sm leading-relaxed">
            Have a project idea, collaboration, or just want to say hi? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── Left: Social Links Panel ── */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs text-white/35 uppercase tracking-widest font-mono mb-5">Find me on</p>

            {socials.map(({ icon: Icon, label, handle, href, color, iconColor }) => (
              <div key={label}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className={`group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 transition-all duration-300 ${color}`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors duration-300">
                      <Icon className={`text-lg transition-colors duration-300 ${iconColor} group-hover:text-current`} />
                    </div>
                    <div>
                      <div className="text-xs text-white/40 font-mono">{label}</div>
                      <div className="text-sm font-medium text-white/75 group-hover:text-current transition-colors">{handle}</div>
                    </div>
                    <FiSend className="ml-auto text-xs opacity-0 group-hover:opacity-60 transition-all -translate-x-1 group-hover:translate-x-0" />
                  </a>
                ) : (
                  <div className={`flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 ${color}`}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Icon className={`text-lg ${iconColor}`} />
                    </div>
                    <div>
                      <div className="text-xs text-white/40 font-mono">{label}</div>
                      <div className="text-sm font-medium text-white/50">{handle}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Availability chip */}
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </div>
          </motion.div>

          {/* ── Right: Contact Form ── */}
          <motion.div
            className="lg:col-span-3 glass-card p-6 md:p-8"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              /* Success state */
              <motion.div
                className="flex flex-col items-center justify-center py-16 text-center gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="h-16 w-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <FiCheckCircle className="text-3xl text-emerald-400" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white">Message Sent! 🎉</h3>
                <p className="text-white/55 text-sm max-w-xs">
                  Thanks for reaching out! I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-violet-400 hover:text-violet-300 underline underline-offset-2"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                action="https://formsubmit.co/prakashmanipatel7@gmail.com"
                method="POST"
                className="space-y-5"
                onSubmit={() => setSubmitted(true)}
              >
                {/* Dynamic redirect — fixes localhost hardcode */}
                <input type="hidden" name="_next" value={redirectUrl} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="Portfolio Contact Form Submission" />

                {/* Name */}
                <div>
                  <label className="block text-xs text-white/40 font-mono uppercase tracking-wider mb-2">Your Name</label>
                  <div className={`flex items-center gap-3 rounded-xl border ${focused === 'name' ? 'border-violet-500/50 bg-violet-600/5' : 'border-white/[0.07] bg-white/[0.04]'} px-4 py-3 transition-all duration-300`}>
                    <FiUser className={`shrink-0 transition-colors ${focused === 'name' ? 'text-violet-400' : 'text-white/30'}`} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Prakash Mani"
                      required
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-white/40 font-mono uppercase tracking-wider mb-2">Email Address</label>
                  <div className={`flex items-center gap-3 rounded-xl border ${focused === 'email' ? 'border-violet-500/50 bg-violet-600/5' : 'border-white/[0.07] bg-white/[0.04]'} px-4 py-3 transition-all duration-300`}>
                    <FiMail className={`shrink-0 transition-colors ${focused === 'email' ? 'text-violet-400' : 'text-white/30'}`} />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      required
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-white/40 font-mono uppercase tracking-wider mb-2">Message</label>
                  <div className={`flex items-start gap-3 rounded-xl border ${focused === 'message' ? 'border-violet-500/50 bg-violet-600/5' : 'border-white/[0.07] bg-white/[0.04]'} px-4 py-3 transition-all duration-300`}>
                    <FiMessageCircle className={`mt-0.5 shrink-0 transition-colors ${focused === 'message' ? 'text-violet-400' : 'text-white/30'}`} />
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="I'd love to collaborate on..."
                      required
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.7)] hover:scale-[1.01]"
                >
                  <FiSend className="transition-transform duration-300 group-hover:translate-x-1" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
