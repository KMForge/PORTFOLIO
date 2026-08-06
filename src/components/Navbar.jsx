import React, { useState, useEffect } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { navLinks } from '../data/portfolioData';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map(l => l.href.replace('#', ''));
      let current = 'home';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) current = id;
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled ? 'glass shadow-lg shadow-black/30 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <button
          onClick={() => handleNavClick('#home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold font-mono text-dark-900 bg-gradient-to-br from-cyan-400 to-violet-500 shadow-lg group-hover:shadow-cyan-500/40 transition-all duration-300">
            KM
          </div>
          <span className="text-lg font-bold hidden sm:block">
            <span className="text-white">KM</span>
            <span className="text-gradient">Forge</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                activeSection === link.href.replace('#', '')
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
              <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full transition-all duration-300 ${
                activeSection === link.href.replace('#', '') ? 'w-4/5' : 'w-0 group-hover:w-4/5'
              }`} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button
            onClick={() => handleNavClick('#contact')}
            className="hidden md:flex btn-primary text-xs"
          >
            Hire Me
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-500 overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="glass mx-4 mt-2 rounded-xl p-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeSection === link.href.replace('#', '')
                  ? 'text-cyan-400 bg-cyan-400/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="btn-primary mt-2 text-center"
          >
            Hire Me
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
