import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import { FaFacebook } from 'react-icons/fa';
import { socialLinks, navLinks } from '../data/portfolioData';

const Footer = () => {
  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const socials = [
    { icon: FiGithub, href: socialLinks.github, label: 'GitHub' },
    { icon: FiLinkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: FaFacebook, href: socialLinks.facebook, label: 'Facebook' },
    { icon: FiMail, href: `mailto:${socialLinks.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 neon-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-mono text-dark-900 bg-gradient-to-br from-cyan-400 to-violet-500">
                KM
              </div>
              <div>
                <p className="text-white font-bold">Kent Michael Sulibaga</p>
                <p className="text-slate-500 text-xs font-mono">IT Student · Developer</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Building intelligent systems and crafting seamless digital experiences.
              Open for collaborations and opportunities.
            </p>
          </div>

          <div>
            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-4">Navigation</p>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-slate-400 hover:text-cyan-400 text-sm transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-4">Connect</p>
            <div className="space-y-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm group"
                >
                  <Icon size={14} className="group-hover:scale-110 transition-transform" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-mono text-center sm:text-left">
            © {new Date().getFullYear()} KMForge | Kent Michael Sulibaga. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs font-mono flex items-center gap-1">
            Built with <FiHeart size={10} className="text-red-500 mx-0.5" /> using React & Tailwind CSS
          </p>
          <div className="flex items-center gap-1 text-slate-600 text-xs font-mono">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
