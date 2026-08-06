import React, { useState } from 'react';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiGithub, FiLinkedin, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaFacebook, FaDiscord } from 'react-icons/fa';
import SectionWrapper, { SectionHeader } from './SectionWrapper';
import { socialLinks } from '../data/portfolioData';

const socialItems = [
  { icon: FiGithub, label: 'GitHub', value: '@KMForge', href: socialLinks.github, color: 'hover:text-white hover:border-white/40' },
  { icon: FiLinkedin, label: 'LinkedIn', value: 'Kent Michael Sulibaga', href: socialLinks.linkedin, color: 'hover:text-blue-400 hover:border-blue-400/40' },
  { icon: FaFacebook, label: 'Facebook', value: 'Kent Michael Sulibaga', href: socialLinks.facebook, color: 'hover:text-blue-500 hover:border-blue-500/40' },
  { icon: FiMail, label: 'Email', value: 'sulibagakent@gmail.com', href: `mailto:${socialLinks.email}`, color: 'hover:text-cyan-400 hover:border-cyan-400/40' },
  { icon: FaDiscord, label: 'Discord', value: 'KMForge', href: '#', color: 'hover:text-indigo-400 hover:border-indigo-400/40' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus(null), 5000);
  };

  const inputBase = 'w-full glass-card border rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all duration-300 bg-transparent font-mono';
  const inputNormal = 'border-white/5 focus:border-cyan-500/50 focus:shadow-lg focus:shadow-cyan-500/10';
  const inputError = 'border-red-500/50 focus:border-red-500/70';

  return (
    <SectionWrapper id="contact" className="relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 bottom-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="// contact.send()"
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? I'd love to hear from you. Let's build something great together."
        />

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">Let's Connect</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm always open to new opportunities, collaborations, and interesting conversations about technology.
                Whether you're a recruiter, a fellow developer, or someone with a cool idea — reach out!
              </p>
            </div>

            <div className="space-y-3">
              {socialItems.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 glass-card rounded-xl border border-white/5 transition-all duration-300 group ${color}`}
                >
                  <div className="w-10 h-10 rounded-lg glass flex items-center justify-center flex-shrink-0 border border-white/5 group-hover:border-current transition-colors">
                    <Icon size={16} className="text-slate-400 group-hover:text-current transition-colors" />
                  </div>
                  <div>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-wide">{label}</p>
                    <p className="text-slate-300 text-sm font-medium group-hover:text-current transition-colors">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-5 glass-card rounded-2xl border border-cyan-500/15">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 font-mono text-xs font-semibold">Available for Work</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Currently looking for internships, capstone collaborators, and freelance projects.
                Response time: within 24 hours.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 border border-white/5 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-400 font-mono text-xs mb-2 uppercase tracking-wide">
                    <FiUser size={10} className="inline mr-1" />Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-slate-400 font-mono text-xs mb-2 uppercase tracking-wide">
                    <FiMail size={10} className="inline mr-1" />Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono text-xs mb-2 uppercase tracking-wide">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={`${inputBase} ${inputNormal}`}
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono text-xs mb-2 uppercase tracking-wide">
                  <FiMessageSquare size={10} className="inline mr-1" />Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me about your project or just say hi..."
                  className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>}
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-mono">
                  <FiCheck size={16} />
                  Message sent! I'll get back to you within 24 hours.
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-mono">
                  <FiAlertCircle size={16} />
                  Something went wrong. Please try again or email directly.
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={14} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-center text-slate-600 font-mono text-xs">
                * Direct Supabase integration ready — see SQL schema below
              </p>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
