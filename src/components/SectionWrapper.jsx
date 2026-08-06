import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const SectionWrapper = ({ id, children, className = '' }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id={id} ref={ref} className={`py-24 ${className}`}>
      <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {children}
      </div>
    </section>
  );
};

export const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <div className="text-center mb-16">
    {eyebrow && (
      <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-3">{eyebrow}</p>
    )}
    <h2 className="section-title">
      <span className="text-gradient">{title}</span>
    </h2>
    <div className="neon-line w-24 mx-auto mt-4 mb-4" />
    {subtitle && (
      <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed mt-4">{subtitle}</p>
    )}
  </div>
);

export default SectionWrapper;
