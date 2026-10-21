import React, { useState } from 'react';
import { PersonalInfo, ThemeType } from '../types';
import { ArrowRight, Copy, Check, Mail, Phone, Linkedin, Github, ExternalLink, Terminal, Cpu, Database, Network, Sliders } from 'lucide-react';

interface HeroSectionProps {
  currentTheme: ThemeType;
  personalInfo: PersonalInfo;
  onOpenResumeModal: () => void;
  onOpenProjectManager: () => void;
  onOpenStudioModal: (initialTab?: 'theme' | 'edit' | 'menu') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentTheme,
  personalInfo,
  onOpenResumeModal,
  onOpenProjectManager,
  onOpenStudioModal,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const accentColor =
    currentTheme === 'cyberpunk'
      ? 'text-cyan-400'
      : currentTheme === 'midnight'
      ? 'text-amber-400'
      : 'text-sky-400';

  const accentGlowBorder =
    currentTheme === 'cyberpunk'
      ? 'border-cyan-500/30 shadow-[0_0_20px_rgba(0,242,254,0.12)]'
      : currentTheme === 'midnight'
      ? 'border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.12)]'
      : 'border-sky-500/30 shadow-[0_0_20px_rgba(56,189,248,0.12)]';

  const accentBgBadge =
    currentTheme === 'cyberpunk'
      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
      : currentTheme === 'midnight'
      ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
      : 'bg-sky-500/10 text-sky-300 border-sky-500/20';

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6">
            
            {/* Status indicator bar (zero pill anti-slop: clean text with bullet) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-code text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Active AI Engineer Intern @ CodeWork
              </span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span>Chennai, India</span>
              <span aria-hidden="true" className="text-slate-600">/</span>
              <span className="text-slate-300">Open to Full-time Opportunities</span>
            </div>

            {/* Name & Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
                {personalInfo.name}
              </h1>
              <p className={`mt-2 text-xl sm:text-2xl font-semibold tracking-tight ${accentColor}`}>
                {personalInfo.title}
              </p>
              {personalInfo.tagline && (
                <p className="mt-1 text-sm text-slate-400 font-code">
                  {personalInfo.tagline}
                </p>
              )}
            </div>

            {/* Resume Summary */}
            <p className="text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              {personalInfo.bio}
            </p>

            {/* Architectural Highlights Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-code mb-1">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Hybrid GenAI</span>
                </div>
                <div className="text-xs font-semibold text-white">RAG + KAG + CAG</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-code mb-1">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>High Availability</span>
                </div>
                <div className="text-xs font-semibold text-white">Multi-Key Pooling</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-code mb-1">
                  <Network className="w-3.5 h-3.5 text-purple-400" />
                  <span>Dual Indexing</span>
                </div>
                <div className="text-xs font-semibold text-white">Pinecone & Neo4j</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-code mb-1">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Computer Vision</span>
                </div>
                <div className="text-xs font-semibold text-white">CNN MRI Classifier</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-colors shadow-sm`}
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border border-slate-700 bg-slate-900/80 text-white hover:bg-slate-800 transition-colors`}
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact Recruiter Desk</span>
              </a>

              <button
                onClick={() => onOpenStudioModal('theme')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-900/30 transition-colors shadow-sm`}
                title="Customize Theme, Wallpaper, Motion, and Profile"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Customize Menu</span>
              </button>

              <button
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900/60 transition-colors"
              >
                <span>View Full Resume</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Contact & Verified Channels */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-code text-slate-300">{personalInfo.email}</span>
                <button
                  onClick={() => copyToClipboard(personalInfo.email, 'email')}
                  className="p-1 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-code text-slate-300">{personalInfo.phones[0]}</span>
                <button
                  onClick={() => copyToClipboard(personalInfo.phones[0], 'phone1')}
                  className="p-1 hover:text-white transition-colors"
                  title="Copy primary phone"
                >
                  {copiedField === 'phone1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <a
                href={personalInfo.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
                title="View GitHub Repositories (barath2708)"
              >
                <Github className="w-3.5 h-3.5 text-white" />
                <span>GitHub (barath2708)</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };
