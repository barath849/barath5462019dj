import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { ThemeType } from '../types';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';

interface ExperienceSectionProps {
  currentTheme: ThemeType;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ currentTheme }) => {
  const accentColor =
    currentTheme === 'cyberpunk'
      ? 'text-cyan-400'
      : currentTheme === 'midnight'
      ? 'text-amber-400'
      : 'text-sky-400';

  const accentBorder =
    currentTheme === 'cyberpunk'
      ? 'border-cyan-500/30'
      : currentTheme === 'midnight'
      ? 'border-amber-500/30'
      : 'border-sky-500/30';

  return (
    <section id="experience" className="py-16 md:py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-code uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-2">
            <Briefcase className={`w-3.5 h-3.5 ${accentColor}`} />
            <span>Professional Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Industry Experience & Internships
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Hands-on software development in production Generative AI, network operations, and corporate systems.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative pl-10 group">
              
              {/* Timeline marker */}
              <div
                className={`absolute left-0 top-1.5 w-7 h-7 rounded-full bg-slate-900 border ${
                  exp.isCurrent ? accentBorder : 'border-slate-700'
                } flex items-center justify-center shadow-md`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    exp.isCurrent ? (currentTheme === 'cyberpunk' ? 'bg-cyan-400' : currentTheme === 'midnight' ? 'bg-amber-400' : 'bg-sky-400') : 'bg-slate-600'
                  }`}
                />
              </div>

              {/* Card Container */}
              <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800/90 group-hover:border-slate-700 transition-all">
                
                {/* Meta Bar: Clean unboxed text with typographic separators */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-code text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{exp.company}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {exp.period}
                    </span>
                    {exp.isCurrent && (
                      <>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-emerald-400 font-medium">Current Role</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Role Title */}
                <h3 className={`text-xl font-bold tracking-tight ${accentColor}`}>
                  {exp.role}
                </h3>

                {/* Responsibilities list from resume */}
                <ul className="mt-4 space-y-2.5">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${accentColor} shrink-0 mt-0.5`} />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack used */}
                {exp.techUsed && exp.techUsed.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-code text-slate-400 mr-1">Technologies:</span>
                    {exp.techUsed.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-code px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
