import React, { useState } from 'react';
import { Project, ProjectCategory, ThemeType } from '../types';
import {
  X,
  Plus,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  FileCode,
  CheckCircle,
  AlertCircle,
  Edit2,
  Eye,
  Layers
} from 'lucide-react';
import {
  exportProjectsJson,
  importProjectsFromJson,
  resetProjectsToDefault,
  addProjectToStore,
  deleteProjectFromStore,
  updateProjectInStore
} from '../utils/projectStorage';

interface ProjectManagerModalProps {
  isOpen: boolean;
  currentTheme: ThemeType;
  projects: Project[];
  onProjectsChange: (projects: Project[]) => void;
  onClose: () => void;
}

export const ProjectManagerModal: React.FC<ProjectManagerModalProps> = ({
  isOpen,
  currentTheme,
  projects,
  onProjectsChange,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'add' | 'json' | 'manage'>('add');

  // Form State for Adding / Editing a Project
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<'GenAI & RAG' | 'Computer Vision' | 'Data & LLM Ops' | 'Full Stack AI'>('GenAI & RAG');
  const [date, setDate] = useState('2026');
  const [summary, setSummary] = useState('');
  const [techStackInput, setTechStackInput] = useState('');
  const [bulletPoints, setBulletPoints] = useState<string[]>(['']);
  const [flowSummary, setFlowSummary] = useState('');
  const [componentsInput, setComponentsInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [metricLabel, setMetricLabel] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [featured, setFeatured] = useState(false);

  // JSON Tab State
  const [jsonText, setJsonText] = useState('');
  const [jsonStatus, setJsonStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('');
    setCategory('GenAI & RAG');
    setDate('2026');
    setSummary('');
    setTechStackInput('');
    setBulletPoints(['']);
    setFlowSummary('');
    setComponentsInput('');
    setGithubUrl('');
    setLiveUrl('');
    setMetricLabel('');
    setMetricValue('');
    setFeatured(false);
  };

  const handleStartEdit = (p: Project) => {
    setEditingId(p.id);
    setTitle(p.title);
    setSubtitle(p.subtitle);
    setCategory(p.category);
    setDate(p.date);
    setSummary(p.summary);
    setTechStackInput(p.techStack.join(', '));
    setBulletPoints(p.bulletPoints.length > 0 ? p.bulletPoints : ['']);
    setFlowSummary(p.architecture?.flowSummary || '');
    setComponentsInput(p.architecture?.components.join(', ') || '');
    setGithubUrl(p.githubUrl || '');
    setLiveUrl(p.liveUrl || '');
    if (p.metrics && p.metrics.length > 0) {
      setMetricLabel(p.metrics[0].label);
      setMetricValue(p.metrics[0].value);
    } else {
      setMetricLabel('');
      setMetricValue('');
    }
    setFeatured(p.featured);
    setActiveTab('add');
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) {
      alert('Please fill in at least Project Title and Summary.');
      return;
    }

    const techStack = techStackInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const validBullets = bulletPoints.map((b) => b.trim()).filter(Boolean);

    const components = componentsInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const projectData: Project = {
      id: editingId || `custom-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'AI Architecture & Engineering',
      category,
      date: date.trim() || '2026',
      summary: summary.trim(),
      bulletPoints: validBullets.length > 0 ? validBullets : ['Engineered end-to-end AI workflow.'],
      techStack: techStack.length > 0 ? techStack : ['Python', 'FastAPI'],
      architecture: flowSummary.trim()
        ? {
            components: components.length > 0 ? components : ['Input Stream', 'Core Engine', 'Output Service'],
            flowSummary: flowSummary.trim(),
          }
        : undefined,
      metrics:
        metricLabel && metricValue
          ? [{ label: metricLabel.trim(), value: metricValue.trim() }]
          : undefined,
      featured,
      githubUrl: githubUrl.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
    };

    let updated: Project[];
    if (editingId) {
      updated = updateProjectInStore(projectData);
    } else {
      updated = addProjectToStore(projectData);
    }

    onProjectsChange(updated);
    resetForm();
    setActiveTab('manage');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to remove this project?')) {
      const updated = deleteProjectFromStore(id);
      onProjectsChange(updated);
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Reset to Barathraj’s verified resume projects? This will restore original entries.')) {
      const defaults = resetProjectsToDefault();
      onProjectsChange(defaults);
      resetForm();
      setActiveTab('manage');
    }
  };

  const handleExportJson = () => {
    const jsonStr = exportProjectsJson();
    setJsonText(jsonStr);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barathraj_portfolio_projects_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setJsonStatus({ type: 'success', message: 'Project schema exported and downloaded successfully!' });
  };

  const handleApplyJson = () => {
    if (!jsonText.trim()) return;
    const res = importProjectsFromJson(jsonText);
    if (res.success && res.projects) {
      onProjectsChange(res.projects);
      setJsonStatus({ type: 'success', message: `Successfully loaded ${res.projects.length} projects!` });
    } else {
      setJsonStatus({ type: 'error', message: res.error || 'Failed to parse JSON' });
    }
  };

  const accentColor =
    currentTheme === 'cyberpunk'
      ? 'text-cyan-400'
      : currentTheme === 'midnight'
      ? 'text-amber-400'
      : 'text-sky-400';

  const accentTabActive =
    currentTheme === 'cyberpunk'
      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
      : currentTheme === 'midnight'
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      : 'bg-sky-500/20 text-sky-300 border-sky-500/40';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-4xl rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl p-5 sm:p-7 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className={`w-5 h-5 ${accentColor}`} />
              <span>Project Manager & Customizer</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Add new projects, customize details, or import/export project collections.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (functional segmented buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg my-4 border border-slate-800 text-xs font-medium">
          <button
            onClick={() => {
              setActiveTab('add');
            }}
            className={`flex-1 py-1.5 rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'add'
                ? `${accentTabActive} border`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{editingId ? 'Edit Project' : 'Add New Project'}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('manage');
            }}
            className={`flex-1 py-1.5 rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'manage'
                ? `${accentTabActive} border`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Manage Catalog ({projects.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('json');
              setJsonText(exportProjectsJson());
            }}
            className={`flex-1 py-1.5 rounded-md transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'json'
                ? `${accentTabActive} border`
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>JSON Import / Export</span>
          </button>
        </div>

        {/* Body Container */}
        <div className="flex-1 overflow-y-auto pr-1">
          {/* TAB 1: ADD / EDIT PROJECT */}
          {activeTab === 'add' && (
            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Agentic Workflow Orchestrator"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Subtitle / Architectural Role</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Autonomous Task Routing with LangGraph"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="GenAI & RAG">GenAI & RAG</option>
                    <option value="Computer Vision">Computer Vision</option>
                    <option value="Data & LLM Ops">Data & LLM Ops</option>
                    <option value="Full Stack AI">Full Stack AI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Year / Timeline</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="2026"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-950 text-cyan-500"
                    />
                    <span>Mark as Featured Project</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Project Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="High-level engineering problem and your architectural solution..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Bullet Points */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-slate-300 font-medium">
                    Technical Implementation Bullets (Resume Format)
                  </label>
                  <button
                    type="button"
                    onClick={() => setBulletPoints([...bulletPoints, ''])}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Bullet</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {bulletPoints.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-slate-500 font-code text-[11px] w-4">{idx + 1}.</span>
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const updated = [...bulletPoints];
                          updated[idx] = e.target.value;
                          setBulletPoints(updated);
                        }}
                        placeholder="e.g. Integrated multi-provider key pooling to eliminate 429 rate limits..."
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                      />
                      {bulletPoints.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setBulletPoints(bulletPoints.filter((_, i) => i !== idx))}
                          className="p-1.5 text-slate-500 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="e.g. FastAPI, Pinecone, Neo4j, Groq, Docker, Python"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 font-code"
                />
              </div>

              {/* Architecture Details */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-semibold text-slate-200">Architecture Specification (Optional)</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Components (Comma-separated)</label>
                    <input
                      type="text"
                      value={componentsInput}
                      onChange={(e) => setComponentsInput(e.target.value)}
                      placeholder="e.g. Client, Ingestion API, Neo4j Graph, Gemini LLM"
                      className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-white font-code text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Pipeline Data Flow</label>
                    <input
                      type="text"
                      value={flowSummary}
                      onChange={(e) => setFlowSummary(e.target.value)}
                      placeholder="e.g. Document -> Chunking -> Vector Index -> Synthesizer"
                      className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-white font-code text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Metric Label</label>
                    <input
                      type="text"
                      value={metricLabel}
                      onChange={(e) => setMetricLabel(e.target.value)}
                      placeholder="e.g. Latency Cut"
                      className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Metric Value</label>
                    <input
                      type="text"
                      value={metricValue}
                      onChange={(e) => setMetricValue(e.target.value)}
                      placeholder="e.g. ~60%"
                      className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">GitHub Repo URL</label>
                    <input
                      type="text"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Live Demo URL</label>
                    <input
                      type="text"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
                  >
                    Cancel Editing
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition-colors"
                >
                  {editingId ? 'Update Project' : 'Add to Portfolio'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: MANAGE CATALOG */}
          {activeTab === 'manage' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs text-slate-400 font-code">
                  Showing {projects.length} loaded portfolio projects
                </span>
                <button
                  onClick={handleResetDefaults}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Resume Defaults</span>
                </button>
              </div>

              <div className="space-y-2">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[11px] font-code text-slate-400">
                        <span className="text-cyan-400">{p.category}</span>
                        <span>·</span>
                        <span>{p.date}</span>
                        {p.featured && <span className="text-emerald-400">· Featured</span>}
                      </div>
                      <h4 className="text-sm font-bold text-white truncate mt-0.5">{p.title}</h4>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{p.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleStartEdit(p)}
                        className="p-2 rounded bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                        title="Edit project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="p-2 rounded bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: JSON IMPORT / EXPORT */}
          {activeTab === 'json' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Export your project schema as JSON or paste an updated array to bulk import.
                </span>
                <button
                  onClick={handleExportJson}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download JSON</span>
                </button>
              </div>

              {jsonStatus && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                    jsonStatus.type === 'success'
                      ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                      : 'bg-rose-950/60 border border-rose-800 text-rose-300'
                  }`}
                >
                  {jsonStatus.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{jsonStatus.message}</span>
                </div>
              )}

              <textarea
                rows={12}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder="[ { id: '...', title: '...' } ]"
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 font-code text-xs text-cyan-200 focus:outline-none focus:border-cyan-500"
              />

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setJsonText(exportProjectsJson())}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Reload Current State
                </button>

                <button
                  onClick={handleApplyJson}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs hover:bg-cyan-400 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Apply & Save JSON</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
