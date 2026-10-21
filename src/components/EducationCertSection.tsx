import React from 'react';
import { EDUCATION_LIST, CERTIFICATIONS } from '../data/portfolioData';
import { ThemeType } from '../types';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle } from 'lucide-react';

interface EducationCertSectionProps {
  currentTheme: ThemeType;
}

export const EducationCertSection: React.FC<EducationCertSectionProps> = ({ currentTheme }) => {
  const accentColor =
    currentTheme === 'cyberpunk'
      ? 'text-cyan-400'
      : currentTheme === 'midnight'
      ? 'text-amber-400'
      : 'text-sky-400';

  return (
    <section id="education" className="py-16 md:py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Education Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-code uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-2">
                <GraduationCap className={`w-3.5 h-3.5 ${accentColor}`} />
                <span>Academic Credentials</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
                Postgraduate & Engineering Education
              </h2>
            </div>

            <div className="space-y-6">
              {EDUCATION_LIST.map((edu) => (
                <div
                  key={edu.id}
                  className="p-6 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-code text-slate-400 mb-2">
                    <span className="text-white font-semibold">{edu.institution}</span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {edu.period}
                      </span>
                      {edu.score && (
                        <>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="text-cyan-300 font-medium">{edu.score}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <h3 className={`text-lg font-bold tracking-tight ${accentColor}`}>
                    {edu.degree}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-code text-slate-400 mt-1 mb-3">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{edu.location}</span>
                    {edu.status && (
                      <>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-emerald-400">{edu.status}</span>
                      </>
                    )}
                  </div>

                  {edu.highlights && (
                    <ul className="space-y-1.5 mt-3 border-t border-slate-800/60 pt-3">
                      {edu.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-code uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-2">
                <Award className={`w-3.5 h-3.5 ${accentColor}`} />
                <span>Industry Accreditations</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
                Certifications
              </h2>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                    <Award className={`w-5 h-5 ${accentColor}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs font-code text-slate-400 mb-1">
                      <span>{cert.tag}</span>
                      {cert.year && <span>{cert.year}</span>}
                    </div>
                    <h4 className="text-sm font-bold text-white tracking-tight">{cert.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Summary Box */}
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 leading-relaxed font-code">
              <div className="text-white font-semibold mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified Credentials</span>
              </div>
              All certifications and academic degrees are validated with official transcripts and repository records.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
