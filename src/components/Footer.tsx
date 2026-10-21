import React from 'react';
import { PersonalInfo, ThemeType } from '../types';
import { Terminal, Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react';

interface FooterProps {
  currentTheme: ThemeType;
  personalInfo: PersonalInfo;
}

export const Footer: React.FC<FooterProps> = ({ currentTheme, personalInfo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const accentColor =
    currentTheme === 'cyberpunk'
      ? 'text-cyan-400'
      : currentTheme === 'midnight'
      ? 'text-amber-400'
      : 'text-sky-400';

  return (
    <footer className="border-t border-slate-800 bg-[#070b12] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Branding & Status */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className={`font-code font-bold text-sm ${accentColor}`}>[BB]</span>
              <span className="font-semibold text-white text-sm">{personalInfo.name}</span>
              <span className="text-slate-600">·</span>
              <span className="font-code text-slate-400 text-xs">{personalInfo.title}</span>
            </div>
            <p className="text-[11px] text-slate-500">
              M.Tech in Data Science & AI · SRM IST · AI Engineer Intern at CodeWork
            </p>
          </div>

          {/* Center: Direct Quick Channels */}
          <div className="flex items-center gap-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github className="w-4 h-4 text-white" />
              <span>GitHub</span>
            </a>

            <a
              href={personalInfo.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4 text-slate-300" />
              <span>Email</span>
            </a>

            <a
              href={`tel:${personalInfo.phones[0]}`}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Phone</span>
            </a>
          </div>

          {/* Right: Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-all text-xs"
            title="Scroll to top of page"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. All technical specifications & models documented.
          </div>
          <div className="font-code text-slate-400">
            Engineered with React · TypeScript · Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
};
