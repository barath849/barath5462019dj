import React, { useState } from 'react';
import { Project, ThemeType } from '../types';
import { ArrowUpRight, ChevronDown, ChevronUp, Layers, Cpu, ExternalLink, Github, CheckCircle2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  currentTheme: ThemeType;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  currentTheme,
  onOpenDetails,
}) => {
  const [expanded, setExpanded] = useState(false);

  const accentColor =
    currentTheme === 'cyberpunk'
      ? 'text-cyan-400 group-hover:text-cyan-300'
      : currentTheme === 'midnight'
      ? 'text-amber-400 group-hover:text-amber-300'
      : 'text-sky-400 group-hover:text-sky-300';

  const accentBorder =
    currentTheme === 'cyberpunk'
      ? 'hover:border-cyan-500/40'
      : currentTheme === 'midnight'
      ? 'hover:border-amber-500/40'
      : 'hover:border-sky-500/40';

  return (
    <div
      className={`group relative rounded-xl bg-slate-900/70 border border-slate-800/80 p-6 flex flex-col justify-between transition-all duration-300 ${accentBorder} hover:shadow-xl hover:bg-slate-900/90`}
    >
      <div>
        {/* Zero-Pill Quiet 1-Line Kicker with Typographic Separator */}
        <div className="flex items-center justify-between text-xs font-code text-slate-400 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-medium">{project.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{project.date}</span>
            {project.featured && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-emerald-400">Featured System</span>
              </>
            )}
          </div>
          <button
            onClick={() => onOpenDetails(project)}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            title="Inspect system architecture"
          >
            <span>Architecture</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Primary Project Title */}
        <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
          {project.title}
        </h3>

        {/* Subtitle / Architectural Role */}
        <p className={`text-xs font-semibold mt-1 tracking-tight ${accentColor}`}>
          {project.subtitle}
        </p>

        {/* Summary Description */}
        <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
          {project.summary}
        </p>

        {/* 3D Workflow Architecture Diagram Preview */}
        {project.architectureImageUrl && (
          <div
            onClick={() => onOpenDetails(project)}
            className="mt-3.5 relative rounded-lg overflow-hidden border border-cyan-500/30 group/arch cursor-pointer bg-slate-950 shadow-md"
            title="Click to inspect 3D Workflow Architecture diagram"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={project.architectureImageUrl}
                alt={`${project.title} 3D Workflow Architecture`}
                className="w-full h-full object-cover object-top group-hover/arch:scale-105 transition-transform duration-300 opacity-90 group-hover/arch:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-code">
                <span className="px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  3D Workflow Architecture
                </span>
                <span className="text-slate-200 text-[10px] bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700 font-medium">
                  Inspect 10 Stages
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics Strip if available */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-950/50 rounded-lg p-2 border border-slate-800/50">
                <div className="text-[10px] text-slate-400 font-code uppercase tracking-wider">{m.label}</div>
                <div className="text-xs font-semibold text-white mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Expandable Technical Bullet Points */}
        <div className="mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <span>{expanded ? 'Hide Technical Implementations' : `View ${project.bulletPoints.length} Implementation Details`}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {expanded && (
            <ul className="mt-3 space-y-2 text-xs text-slate-300 leading-relaxed border-l-2 border-slate-800 pl-3">
              {project.bulletPoints.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer: Tech Stack Chips & Action Link */}
      <div className="mt-6 pt-4 border-t border-slate-800/80">
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-code px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => onOpenDetails(project)}
            className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Full System Architecture</span>
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="View repository on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="View live deployment"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
