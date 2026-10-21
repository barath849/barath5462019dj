import React from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { ThemeType } from '../types';
import { Cpu, Terminal, Database, Cloud, ShieldCheck } from 'lucide-react';

interface SkillsSectionProps {
  currentTheme: ThemeType;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ currentTheme }) => {
  const accentColor =
    currentTheme === 'cyberpunk'
      ? 'text-cyan-400'
      : currentTheme === 'midnight'
      ? 'text-amber-400'
      : 'text-sky-400';

  const categoryIcons = [
    <Terminal className="w-5 h-5 text-cyan-400" />,
    <Database className="w-5 h-5 text-emerald-400" />,
    <Cpu className="w-5 h-5 text-purple-400" />,
    <Cloud className="w-5 h-5 text-amber-400" />,
  ];

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-code uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-2">
            <ShieldCheck className={`w-3.5 h-3.5 ${accentColor}`} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Skills & Architectural Specializations
          </h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Competencies synthesized from postgraduate AI coursework and production engineering internships.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.title}
              className="p-6 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    {categoryIcons[idx % categoryIcons.length]}
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="text-xs font-code text-slate-400">{cat.badge}</span>
                </div>

                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {cat.description}
                </p>

                {/* Skills Grid within Category */}
                <div className="space-y-2.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/70 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="font-medium text-slate-200">{skill.name}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-code">
                        {skill.tag && (
                          <span className="text-slate-400 hidden sm:inline">{skill.tag}</span>
                        )}
                        <span
                          className={`font-semibold ${
                            skill.level === 'Advanced'
                              ? accentColor
                              : skill.level === 'Proficient'
                              ? 'text-emerald-400'
                              : 'text-slate-400'
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-code text-slate-500">
                <span>Verified in Production & Academic Lab</span>
                <span>{cat.skills.length} Competencies</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
