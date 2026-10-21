import React, { useEffect, useState } from 'react';
import { Project, ThemeType } from '../types';
import {
  X,
  ExternalLink,
  Github,
  Cpu,
  Network,
  Database,
  CheckCircle,
  Activity,
  Maximize2,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Layers,
  Bot,
  ZoomIn
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  currentTheme: ThemeType;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  currentTheme,
  onClose,
}) => {
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedStageTab, setSelectedStageTab] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isImageZoomed) {
          setIsImageZoomed(false);
        } else {
          onClose();
        }
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, isImageZoomed]);

  if (!project) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-5xl rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata (zero-pill text) */}
        <div className="text-xs font-code text-slate-400 mb-2 flex items-center gap-2">
          <span>{project.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{project.date}</span>
          {project.featured && (
            <>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400">Featured System</span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {project.title}
        </h2>
        <p className={`text-sm font-semibold mt-1 ${accentColor}`}>
          {project.subtitle}
        </p>

        {/* Primary Description */}
        <div className="mt-4 text-sm text-slate-300 leading-relaxed">
          {project.summary}
        </div>

        {/* 3D Workflow Architecture Diagram Infographic */}
        {project.architectureImageUrl && (
          <div className="mt-6 rounded-xl bg-slate-950 border border-cyan-500/30 overflow-hidden shadow-2xl">
            <div className="p-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h3 className="text-xs font-bold text-white font-code uppercase tracking-wider">
                  FAQ Chatbot Project – 3D Workflow Architecture (RAG + KAG + CAG)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsImageZoomed(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-code font-semibold text-cyan-300 transition-colors border border-cyan-500/30 shadow-sm"
                title="Expand architecture diagram full screen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full-Screen Zoom</span>
              </button>
            </div>

            <div
              className="relative cursor-zoom-in group/archimg bg-slate-950 p-2 sm:p-4 overflow-hidden"
              onClick={() => setIsImageZoomed(true)}
            >
              <img
                src={project.architectureImageUrl}
                alt={`${project.title} 3D Workflow Architecture`}
                className="w-full h-auto object-contain max-h-[500px] mx-auto rounded-lg transition-transform duration-300 group-hover/archimg:scale-[1.01]"
              />
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-slate-900/95 text-xs font-code text-cyan-300 border border-cyan-500/30 shadow-xl flex items-center gap-1.5 backdrop-blur-md">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Click diagram to inspect full high-resolution</span>
              </div>
            </div>
          </div>
        )}

        {/* Core Architectural Pillars */}
        {project.corePillars && project.corePillars.length > 0 && (
          <div className="mt-6">
            <h4 className="text-xs font-code uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Core Architectural Pillars</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {project.corePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="text-xs font-bold text-white">{pillar.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10-Stage 3D Workflow Breakdown */}
        {project.workflowSteps && project.workflowSteps.length > 0 && (
          <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-2 text-xs font-code text-white">
                <Network className={`w-4 h-4 ${accentColor}`} />
                <span className="font-bold uppercase tracking-wider">10-Stage Pipeline Breakdown</span>
              </div>
              <span className="text-[11px] font-code text-slate-400">Automated & Self-Healing</span>
            </div>

            <div className="space-y-3">
              {project.workflowSteps.map((ws) => (
                <div
                  key={ws.step}
                  className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/90 text-xs transition-colors hover:border-slate-700"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-code font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        {ws.badge || `Stage ${ws.step < 10 ? `0${ws.step}` : ws.step}`}
                      </span>
                      <span className="font-bold text-white">{ws.title}</span>
                    </div>
                    {ws.subtitle && (
                      <span className="text-[11px] font-code text-slate-400">{ws.subtitle}</span>
                    )}
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px] text-slate-300">
                    {ws.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 font-bold shrink-0 mt-0.5">›</span>
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Architecture & Flow Diagram */}
        {project.architecture && (
          <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-code text-slate-300 mb-3">
              <Network className={`w-4 h-4 ${accentColor}`} />
              <span className="font-semibold uppercase tracking-wider">Data Pipeline Path</span>
            </div>

            {/* Architecture Node Sequence */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {project.architecture.components.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-code text-slate-200 flex items-center gap-2"
                >
                  <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-cyan-400' : idx === project.architecture!.components.length - 1 ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                  <span className="truncate">{comp}</span>
                </div>
              ))}
            </div>

            {/* Pipeline Data Flow string */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 font-code text-xs text-slate-300">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Execution Summary</div>
              <div className="leading-relaxed text-cyan-200/90">{project.architecture.flowSummary}</div>
            </div>
          </div>
        )}

        {/* Metrics Section */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 font-code uppercase tracking-wider">{m.label}</div>
                <div className="text-base sm:text-lg font-bold text-white mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Implementation Highlights (Direct from Resume) */}
        <div className="mt-6">
          <h4 className="text-xs font-code uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Key Engineering Implementations</span>
          </h4>
          <ul className="space-y-2.5">
            {project.bulletPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <div className="text-xs font-code uppercase tracking-wider text-slate-400 mb-2">
            Technologies & Frameworks
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-code px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Close Overview
          </button>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-slate-800 text-white hover:bg-slate-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Repository</span>
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Interactive Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Full-Screen High-Resolution Image Lightbox Modal */}
      {isImageZoomed && project.architectureImageUrl && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col p-3 sm:p-6 animate-fade-in"
          onClick={() => setIsImageZoomed(false)}
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 text-white shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-bold text-sm tracking-tight font-display text-cyan-200">
                FAQ Chatbot Project – 3D Workflow Architecture (High Resolution)
              </span>
            </div>
            <button
              onClick={() => setIsImageZoomed(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold border border-slate-700"
            >
              <X className="w-4 h-4" />
              <span>Close Fullscreen (Esc)</span>
            </button>
          </div>

          <div className="flex-1 overflow-auto flex items-center justify-center p-1 sm:p-4">
            <img
              src={project.architectureImageUrl}
              alt="FAQ Chatbot 3D Workflow Architecture High Resolution"
              className="max-w-full max-h-[88vh] object-contain rounded-xl border border-cyan-500/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
