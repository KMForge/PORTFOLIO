import React, { useEffect } from 'react';
import { FiX, FiGithub, FiExternalLink, FiCheckCircle } from 'react-icons/fi';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal card — flex-col so header never gets pushed off screen */}
      <div className="relative z-10 w-full max-w-2xl max-h-[88vh] flex flex-col glass rounded-3xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 animate-slide-up">

        {/* Header — never shrinks, always on top */}
        <div className="flex-shrink-0 flex items-center justify-between p-5 sm:p-6 border-b border-white/5 rounded-t-3xl glass">
          <div>
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">{project.category}</span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300 flex-shrink-0 ml-4"
            aria-label="Close modal"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="w-full h-40 rounded-2xl bg-gradient-to-br from-dark-700 via-dark-800 to-dark-900 border border-white/5 flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <div className="text-5xl font-black font-mono text-gradient opacity-30 leading-none">
                {project.title.charAt(0)}
              </div>
              <p className="text-slate-600 font-mono text-xs mt-2">{project.category}</p>
            </div>
          </div>

          <div>
            <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-3">Overview</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{project.fullDescription}</p>
          </div>

          <div>
            <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-3">Key Features</h3>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <FiCheckCircle className="text-cyan-400 mt-0.5 flex-shrink-0" size={14} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-lg glass border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pb-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 text-xs flex-1 justify-center">
                <FiGithub size={14} />
                View on GitHub
              </a>
            )}
            {project.demo && project.demo !== '#' && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 text-xs flex-1 justify-center">
                <FiExternalLink size={14} />
                Live Demo
              </a>
            )}
            {!project.github && !project.demo && (
              <div className="text-center w-full py-3 glass rounded-xl text-slate-500 text-xs font-mono border border-white/5">
                Private / Capstone Project
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
