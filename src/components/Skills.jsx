import React, { useState } from 'react';
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiTailwindcss,
  SiPython, SiFlask, SiPhp,
  SiMysql, SiSqlite, SiSupabase,
  SiGit, SiGithub, SiVscodium, SiFigma,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { FiLayers, FiServer, FiDatabase, FiTool } from 'react-icons/fi';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { useInView } from 'react-intersection-observer';

const skillIcons = {
  'HTML5': SiHtml5, 'CSS3': SiCss, 'JavaScript': SiJavascript,
  'React': SiReact, 'Tailwind CSS': SiTailwindcss,
  'Python': SiPython, 'Flask': SiFlask, 'PHP': SiPhp, 'Java': FaJava,
  'MySQL': SiMysql, 'Supabase': SiSupabase, 'SQLite': SiSqlite,
  'Git & GitHub': SiGithub, 'VS Code': SiVscodium, 'Figma': SiFigma,
};

const categoryIcons = {
  'Frontend': FiLayers,
  'Backend': FiServer,
  'Database': FiDatabase,
  'Tools & DevOps': FiTool,
};

const categoryColors = {
  'Frontend': { bar: 'from-cyan-400 to-blue-500', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/20' },
  'Backend': { bar: 'from-violet-400 to-purple-600', border: 'border-violet-500/30', glow: 'shadow-violet-500/20' },
  'Database': { bar: 'from-amber-400 to-orange-500', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
  'Tools & DevOps': { bar: 'from-emerald-400 to-teal-500', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
};

const SkillBar = ({ name, level, barClass }) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const Icon = skillIcons[name];

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-slate-400 group-hover:text-white transition-colors text-sm" />}
          <span className="text-slate-300 text-sm font-medium">{name}</span>
        </div>
        <span className="text-slate-500 font-mono text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${barClass} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: inView ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const skillsData = [
    {
      category: 'Frontend',
      items: [
        { name: 'HTML5', level: 90 },
        { name: 'CSS3', level: 85 },
        { name: 'JavaScript', level: 78 },
        { name: 'React', level: 72 },
        { name: 'Tailwind CSS', level: 80 },
      ],
    },
    {
      category: 'Backend',
      items: [
        { name: 'Python', level: 85 },
        { name: 'Flask', level: 78 },
        { name: 'PHP', level: 75 },
        { name: 'Java', level: 80 },
      ],
    },
    {
      category: 'Database',
      items: [
        { name: 'MySQL', level: 82 },
        { name: 'Supabase', level: 65 },
        { name: 'SQLite', level: 70 },
      ],
    },
    {
      category: 'Tools & DevOps',
      items: [
        { name: 'Git & GitHub', level: 78 },
        { name: 'VS Code', level: 90 },
        { name: 'Figma', level: 65 },
      ],
    },
  ];

  return (
    <SectionWrapper id="skills" className="relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="// skills.map()"
          title="Skills & Technologies"
          subtitle="A comprehensive view of my technical expertise across the full development stack."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map(({ category, items }) => {
            const CatIcon = categoryIcons[category];
            const colors = categoryColors[category];
            const isActive = activeCategory === category;

            return (
              <div
                key={category}
                onClick={() => setActiveCategory(isActive ? null : category)}
                className={`glass-card rounded-2xl p-6 border transition-all duration-500 cursor-pointer
                  ${isActive
                    ? `${colors.border} shadow-lg ${colors.glow}`
                    : 'border-white/5 hover:border-white/15'
                  } hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl glass flex items-center justify-center border ${colors.border}`}>
                    <CatIcon className={`bg-gradient-to-r ${colors.bar} bg-clip-text`} style={{ color: 'inherit' }} size={18} />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{category}</h3>
                </div>

                <div className="space-y-4">
                  {items.map(skill => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      barClass={colors.bar}
                    />
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {items.map(skill => {
                    const Icon = skillIcons[skill.name];
                    return (
                      <span
                        key={skill.name}
                        className="flex items-center gap-1 px-2 py-1 rounded-md glass text-slate-400 text-xs hover:text-white transition-colors"
                      >
                        {Icon && <Icon size={10} />}
                        {skill.name.split(' ')[0]}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-8 glass-card rounded-3xl border border-white/5">
          <p className="text-center text-slate-500 font-mono text-xs mb-6 uppercase tracking-widest">
            Technologies I work with
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {Object.entries(skillIcons).map(([name, Icon]) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 group cursor-default"
                title={name}
              >
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/5 group-hover:border-cyan-500/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                  <Icon className="text-slate-400 group-hover:text-cyan-400 transition-colors text-lg" />
                </div>
                <span className="text-slate-600 group-hover:text-slate-400 transition-colors text-xs font-mono leading-none">
                  {name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;
