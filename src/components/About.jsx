import React from 'react';
import { FiCode, FiDatabase, FiCpu, FiBookOpen } from 'react-icons/fi';
import { SiPython, SiPhp, SiMysql, SiReact, SiFlask } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { aboutStats } from '../data/portfolioData';

const techStack = [
  { icon: SiPython, name: 'Python', color: 'text-yellow-400' },
  { icon: FaJava, name: 'Java', color: 'text-red-400' },
  { icon: SiPhp, name: 'PHP', color: 'text-violet-400' },
  { icon: SiMysql, name: 'MySQL', color: 'text-orange-400' },
  { icon: SiReact, name: 'React', color: 'text-cyan-400' },
  { icon: SiFlask, name: 'Flask', color: 'text-slate-300' },
];

const highlights = [
  {
    icon: FiCode,
    title: 'Full-Stack Development',
    desc: 'Building end-to-end web and desktop applications from UI design to database architecture.',
    color: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: FiCpu,
    title: 'AI & Automation',
    desc: 'Integrating machine learning models and automation scripts into real-world systems.',
    color: 'from-violet-500/20 to-violet-500/5 border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: FiDatabase,
    title: 'Database Design',
    desc: 'Designing normalized relational databases with MySQL, ensuring data integrity and performance.',
    color: 'from-amber-500/20 to-amber-500/5 border-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    icon: FiBookOpen,
    title: 'Continuous Learning',
    desc: 'Always exploring new technologies — currently diving deep into React, Supabase, and AI APIs.',
    color: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
];

const About = () => {
  return (
    <SectionWrapper id="about" className="relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="// about.me"
          title="About Me"
          subtitle="Get to know who I am, what I do, and what drives me forward in the world of technology."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-6">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              IT Student · 4th Year
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Building Solutions,{' '}
              <span className="text-gradient">One Line at a Time</span>
            </h3>

            <div className="space-y-4 text-slate-400 leading-relaxed text-sm">
              <p>
                I'm <span className="text-white font-semibold">Kent Michael Sulibaga</span>, a 4th-year IT student at{' '}
                <span className="text-violet-400 font-medium">Notre Dame of Marbel University</span>, with a deep
                passion for creating robust digital systems that solve real-world problems. My journey in technology
                started with curiosity and has evolved into a full-on pursuit of mastery.
              </p>
              <p>
                I specialize in <span className="text-cyan-400 font-medium">full-stack web development</span>,
                <span className="text-violet-400 font-medium"> AI-integrated systems</span>, and
                <span className="text-amber-400 font-medium"> database-driven applications</span>. I've built
                projects ranging from facial recognition attendance systems to e-learning platforms.
              </p>
              <p>
                When I'm not coding, I'm studying new frameworks, contributing to projects, or planning my next
                big capstone system. I believe great software is born from equal parts logic and creativity.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-slate-500 font-mono text-xs mb-4 uppercase tracking-widest">Tech Stack</p>
              <div className="flex flex-wrap gap-3">
                {techStack.map(({ icon: Icon, name, color }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 cursor-default"
                  >
                    <Icon className={`${color} text-lg`} />
                    <span className="text-slate-300 text-sm font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, title, desc, color, iconColor }) => (
              <div
                key={title}
                className={`p-5 rounded-2xl bg-gradient-to-br ${color} border glass-card hover:-translate-y-2 transition-all duration-300 group cursor-default`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 glass`}>
                  <Icon className={`${iconColor} text-lg`} />
                </div>
                <h4 className="text-white font-semibold text-sm mb-2 leading-tight">{title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {aboutStats.map(({ label, value }) => (
            <div
              key={label}
              className="glass-card rounded-2xl p-6 text-center border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-3xl font-black text-gradient mb-2 group-hover:animate-glow">
                {value}
              </div>
              <div className="text-slate-400 text-xs font-mono tracking-wide uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
