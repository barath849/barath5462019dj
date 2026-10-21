import React, { useState } from 'react';
import { Project, ProjectCategory, ThemeType } from '../types';
import { ProjectCard } from './ProjectCard';
import { Search, PlusCircle, Filter, Sparkles, Database, Layers } from 'lucide-react';

interface ProjectGalleryProps {
  projects: Project[];
  currentTheme: ThemeType;
  onOpenDetails: (project: Project) => void;
  onOpenProjectManager: () => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  projects,
  currentTheme,
  onOpenDetails,
  onOpenProjectManager,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProjectCategory[] = [
    'All',
    'GenAI & RAG',
    'Computer Vision',
    'Data & LLM Ops',
    'Full Stack AI',
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.subtitle.toLowerCase().includes(query) ||
      project.summary.toLowerCase().includes(query) ||
      project.techStack.some((t) => t.toLowerCase().includes(query)) ||
      project.bulletPoints.some((b) => b.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const accentColor =
    currentTheme === 'cyberpunk'
      ? 'text-cyan-400'
      : currentTheme === 'midnight'
      ? 'text-amber-400'
      : 'text-sky-400';

  const accentBorder =
    currentTheme === 'cyberpunk'
      ? 'border-cyan-500/20'
      : currentTheme === 'midnight'
      ? 'border-amber-500/20'
      : 'border-sky-500/20';

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-code uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${currentTheme === 'cyberpunk' ? 'bg-cyan-400' : currentTheme === 'midnight' ? 'bg-amber-400' : 'bg-sky-400'}`} />
              <span>Production Systems & Research</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Featured AI Projects & Architectures
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Scalable generative systems, hybrid retrieval engines, deep learning computer vision pipelines, and multi-key LLM infrastructure.
            </p>
          </div>
        </div>

        {/* PROMINENT USER PROJECT MANAGEMENT CONSOLE BANNER */}
        <div className={`p-4 sm:p-5 rounded-xl bg-slate-900 border ${accentBorder} mb-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
          <div className="flex items-start gap-3.5">
            <div className={`w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 ${accentColor}`}>
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">Project Gallery Management</span>
                <span className="text-[11px] font-code px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {projects.length} Projects Live
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Need to add more projects or customize existing details? Click below to open the dynamic editor or import custom JSON schema.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={onOpenProjectManager}
              className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md ${
                currentTheme === 'cyberpunk'
                  ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 ring-2 ring-cyan-500/20'
                  : currentTheme === 'midnight'
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 ring-2 ring-amber-500/20'
                  : 'bg-sky-500 text-slate-950 hover:bg-sky-400 ring-2 ring-sky-500/20'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add New Project Detail</span>
            </button>

            <button
              onClick={onOpenProjectManager}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <span>Manage / Import JSON</span>
            </button>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
          {/* Interactive Category Segmented Tabs (buttons as required by design constitution) */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-white font-semibold shadow-sm ring-1 ring-white/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, Pinecone, CNN..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-slate-700"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                currentTheme={currentTheme}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-900/30">
            <Layers className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No projects found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No projects matched "{searchQuery}" under the "{selectedCategory}" category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-900 hover:bg-cyan-900/50 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
