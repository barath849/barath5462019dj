import React, { useState } from 'react';
import { ThemeType, PersonalInfo } from '../types';
import { ThemeSelector } from './ThemeSelector';
import { FileText, PlusCircle, Menu, X, Sliders, Palette, Sparkles, FolderKanban, Github, Linkedin } from 'lucide-react';

interface NavbarProps {
  currentTheme: ThemeType;
  personalInfo: PersonalInfo;
  onThemeChange: (theme: ThemeType) => void;
  onOpenProjectManager: () => void;
  onOpenResumeModal: () => void;
  onOpenStudioModal: (initialTab?: 'theme' | 'edit' | 'menu') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  personalInfo,
  onThemeChange,
  onOpenProjectManager,
  onOpenResumeModal,
  onOpenStudioModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const accentColorClass =
    currentTheme === 'cyberpunk'
      ? 'text-cyan-400'
      : currentTheme === 'midnight'
      ? 'text-amber-400'
      : 'text-sky-400';

  const accentBorderClass =
    currentTheme === 'cyberpunk'
      ? 'border-cyan-500/20'
      : currentTheme === 'midnight'
      ? 'border-amber-500/20'
      : 'border-sky-500/20';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070b11]/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className={`w-9 h-9 rounded-lg bg-slate-900 border ${accentBorderClass} flex items-center justify-center font-code font-bold text-sm tracking-wider shadow-inner group-hover:scale-105 transition-transform`}>
            <span className={accentColorClass}>BB</span>
          </div>
          <div>
            <div className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
              <span>{personalInfo.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Available for roles" />
            </div>
            <p className="text-[11px] text-slate-400 font-code tracking-wide truncate max-w-[200px] sm:max-w-none">
              {personalInfo.title}
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-current after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Island */}
        <div className="flex items-center gap-2">
          {/* Quick Theme Selector (Preset dark themes) */}
          <div className="hidden sm:flex items-center">
            <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
          </div>

          {/* MAIN MENU / STUDIO CONSOLE BUTTON (Requested by user) */}
          <button
            onClick={() => onOpenStudioModal('theme')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border ${accentBorderClass} bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md group`}
            title="Open Customizer Menu (Theme, Edit, and Menu options)"
          >
            <Sliders className={`w-3.5 h-3.5 ${accentColorClass} group-hover:rotate-45 transition-transform`} />
            <span>Menu Console</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </button>

          {/* Manage Projects CTA */}
          <button
            onClick={onOpenProjectManager}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border ${accentBorderClass} bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all shadow-sm`}
            title="Add or manage projects"
          >
            <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Manage Projects</span>
          </button>

          {/* View Resume Button */}
          <button
            onClick={onOpenResumeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-950 hover:bg-white transition-all shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span>
          </button>

          {/* LinkedIn Profile Button */}
          <a
            href={personalInfo.linkedIn.startsWith('http') ? personalInfo.linkedIn : `https://${personalInfo.linkedIn}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-800 bg-slate-900 text-sky-400 hover:text-white hover:border-slate-700 transition-all shadow-sm"
            title="LinkedIn: barathraj-b-5203b7384"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">LinkedIn</span>
          </a>

          {/* GitHub Profile Button */}
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-all shadow-sm"
            title="GitHub: barath2708"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">GitHub</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white ml-1"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#090d16] px-4 pt-3 pb-6 space-y-4">
          <div className="py-2 border-b border-slate-800/60">
            <p className="text-[11px] text-slate-400 uppercase font-code tracking-wider mb-2">Preset Dark Themes</p>
            <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
          </div>

          <div className="grid grid-cols-3 gap-2 py-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudioModal('theme');
              }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center text-xs font-medium text-slate-200 hover:text-white"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <span>Theme Studio</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudioModal('edit');
              }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center text-xs font-medium text-slate-200 hover:text-white"
            >
              <Palette className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span>Edit Styling</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudioModal('menu');
              }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center text-xs font-medium text-slate-200 hover:text-white"
            >
              <FolderKanban className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span>Resume & Projects</span>
            </button>
          </div>

          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={personalInfo.linkedIn.startsWith('http') ? personalInfo.linkedIn : `https://${personalInfo.linkedIn}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 text-sky-400"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
              <span>LinkedIn (barathraj-b-5203b7384)</span>
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-800 text-white"
            >
              <Github className="w-4 h-4 text-white" />
              <span>GitHub (barath2708)</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectManager();
              }}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium rounded-lg border border-slate-700 bg-slate-900 text-slate-200"
            >
              <PlusCircle className="w-4 h-4 text-cyan-400" />
              <span>Manage Projects Gallery</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
