import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { FiGithub, FiEye, FiFolder, FiFilter } from 'react-icons/fi';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import ProjectModal from './ProjectModal';
import { projects } from '../data/portfolioData';

const categoryColors = {
  'AI / System': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  'Web App': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  'System': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

const ProjectCard = ({ project, onViewDetails }) => {
  const catColor = categoryColors[project.category] || 'text-slate-400 bg-white/5 border-white/10';

  return (
    <div className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col">
      <div className="relative h-44 bg-gradient-to-br from-dark-700 via-dark-800 to-dark-900 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <FiFolder className="text-slate-700 group-hover:text-slate-600 transition-colors mx-auto mb-2" size={40} />
            <p className="text-slate-600 font-mono text-xs">{project.category}</p>
          </div>
        </div>
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${catColor}`}>
          {project.category}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-base mb-2 group-hover:text-cyan-400 transition-colors leading-snug">
          {project.title}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md glass border border-white/5 text-slate-400 text-xs font-mono"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 rounded-md glass border border-white/5 text-slate-500 text-xs font-mono">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onViewDetails(project)}
            className="btn-primary flex items-center gap-2 text-xs flex-1 justify-center"
          >
            <FiEye size={12} />
            View Details
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary p-3 flex items-center justify-center"
              aria-label="GitHub"
            >
              <FiGithub size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(projects.map(p => p.category))];
    return cats;
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <SectionWrapper id="projects" className="relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-72 h-72 bg-cyan-500/3 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-72 h-72 bg-violet-500/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="// projects.filter()"
          title="My Projects"
          subtitle="A selection of systems and applications I've built during my studies and personal development."
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <FiFilter className="text-slate-500 mr-1" size={14} />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/40 text-cyan-400 shadow-lg shadow-cyan-500/10'
                  : 'glass border border-white/5 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
              <span className="ml-2 text-slate-600">
                ({cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={setSelectedProject}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500 font-mono">
            No projects in this category yet.
          </div>
        )}
      </div>

      {selectedProject && createPortal(
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />,
        document.body
      )}
    </SectionWrapper>
  );
};

export default Projects;
