import React, { useState, useEffect } from 'react';
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaFacebook } from 'react-icons/fa';
import { socialLinks } from '../data/portfolioData';
import profileImg from '../image/image.png';
import { motion } from 'framer-motion';

const roles = [
  'IT Student',
  'Full-Stack Developer',
  'System Designer',
  'AI Enthusiast',
  'Problem Solver',
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/3 to-violet-500/3 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-8">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Available for opportunities
          </div>

          <p className="text-slate-400 font-mono text-sm tracking-widest mb-3 uppercase">
            Hello, World! 👋
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight">
            <span className="text-white">I'm </span>
            <span className="text-gradient">Kent Michael Sulibaga</span>
          </h1>

          <div className="h-12 mb-6 flex items-center justify-center lg:justify-start gap-2">
            <span className="text-xl sm:text-2xl font-semibold text-slate-300">
              {displayed}
            </span>
            <span className="w-0.5 h-6 bg-cyan-400 animate-pulse" />
          </div>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-10">
            Passionate about building <span className="text-cyan-400 font-semibold">intelligent systems</span> and
            crafting seamless digital experiences. Currently exploring the intersection of
            <span className="text-violet-400 font-semibold"> AI and full-stack development</span>.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
            <button onClick={() => handleScroll('#projects')} className="btn-primary text-sm">
              View Projects
              <span className="ml-2">→</span>
            </button>
            <button onClick={() => handleScroll('#contact')} className="btn-secondary text-sm">
              Contact Me
            </button>
          </div>

          <div className="flex items-center gap-6 justify-center lg:justify-start">
            <span className="text-slate-500 text-sm font-mono">Follow me:</span>
            <div className="flex items-center gap-4">
              {[
                { icon: FiGithub, href: socialLinks.github, label: 'GitHub' },
                { icon: FiLinkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
                { icon: FaFacebook, href: socialLinks.facebook, label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Profile Showcase ── */}
        <motion.div
          className="flex-shrink-0 w-full sm:max-w-md lg:w-[400px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative">
            {/* Ambient glow */}
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-violet-500/15 to-cyan-500/10 blur-3xl animate-pulse-slow pointer-events-none" />

            {/* Card */}
            <div className="relative animate-float glass-card rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">

              {/* ── Photo section ── */}
              <div className="relative overflow-hidden" style={{ height: '290px' }}>
                <img src={profileImg} alt="Kent Michael Sulibaga"
                  className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-900/30 via-transparent to-dark-900/30" />

                {/* Status pill */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-green-500/30 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-xs font-mono font-semibold">Available</span>
                  </div>
                </div>

                {/* Handle pill */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1.5 rounded-full glass border border-cyan-500/30 backdrop-blur-sm">
                    <span className="text-cyan-400 text-xs font-mono font-bold">@KMForge</span>
                  </div>
                </div>

                {/* Name over photo */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h2 className="text-2xl font-black text-white leading-tight">Kent Michael Sulibaga</h2>
                  <p className="text-cyan-400 font-mono text-sm mt-1">IT Student · Full-Stack Developer</p>
                </div>
              </div>

              {/* ── Card body ── */}
              <div className="p-5 space-y-4">

                {/* School row */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border"
                  style={{ background: 'rgba(0,245,255,0.04)', borderColor: 'rgba(0,245,255,0.12)' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border border-cyan-500/20"
                    style={{ background: 'rgba(0,245,255,0.08)' }}>
                    <span className="font-black font-mono text-cyan-400" style={{ fontSize: '10px' }}>ND</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold truncate">Notre Dame of Marbel University</p>
                    <p className="text-slate-500 text-xs font-mono mt-0.5">BSIT · 4th Year · ID: 2023670</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: '10+', label: 'Projects', color: 'text-cyan-400' },
                    { value: '15+', label: 'Skills',   color: 'text-violet-400' },
                    { value: '4th', label: 'Year',     color: 'text-amber-400' },
                  ].map(({ value, label, color }) => (
                    <div key={label}
                      className="text-center glass rounded-2xl py-3 border border-white/5 hover:border-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5 cursor-default">
                      <p className={`text-xl font-black ${color}`}>{value}</p>
                      <p className="text-slate-500 text-xs font-mono mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div>
                  <p className="text-slate-600 font-mono text-xs uppercase tracking-widest mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Python', 'MySQL', 'Java', 'Node.js', 'Tailwind', 'PHP'].map(tech => (
                      <span key={tech}
                        className="px-2.5 py-1 rounded-lg glass border border-cyan-500/20 text-cyan-400 text-xs font-mono hover:bg-cyan-500/10 hover:border-cyan-400/40 transition-all duration-200 cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social links */}
                <div className="flex gap-2 pt-1">
                  {[
                    { icon: FiGithub,   href: socialLinks.github,   label: 'GitHub' },
                    { icon: FiLinkedin, href: socialLinks.linkedin,  label: 'LinkedIn' },
                    { icon: FaFacebook, href: socialLinks.facebook,  label: 'Facebook' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      aria-label={label}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl glass border border-white/5 hover:border-cyan-500/30 text-slate-400 hover:text-cyan-400 transition-all duration-300 text-xs font-mono hover:-translate-y-0.5">
                      <Icon size={13} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={() => handleScroll('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-full text-slate-500 hover:text-cyan-400 transition-all duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <FiArrowDown size={24} />
      </button>
    </section>
  );
};

export default Hero;
