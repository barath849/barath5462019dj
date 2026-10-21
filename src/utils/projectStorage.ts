import { Project } from '../types';
import { INITIAL_PROJECTS } from '../data/portfolioData';

const STORAGE_KEY = 'barathraj_portfolio_projects_v1';

export function getStoredProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const merged = parsed.map((p: Project) => {
        const init = INITIAL_PROJECTS.find((ip) => ip.id === p.id);
        if (init) {
          return {
            ...init,
            ...p,
            architectureImageUrl: init.architectureImageUrl,
            workflowSteps: init.workflowSteps,
            corePillars: init.corePillars,
            metrics: init.metrics || p.metrics,
            bulletPoints: init.bulletPoints || p.bulletPoints,
          };
        }
        return p;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (err) {
    console.error('Failed to load projects from storage:', err);
  }
  return INITIAL_PROJECTS;
}

export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save projects to storage:', err);
  }
}

export function addProjectToStore(newProject: Project): Project[] {
  const current = getStoredProjects();
  const updated = [newProject, ...current];
  saveProjects(updated);
  return updated;
}

export function updateProjectInStore(updatedProject: Project): Project[] {
  const current = getStoredProjects();
  const updated = current.map((p) => (p.id === updatedProject.id ? updatedProject : p));
  saveProjects(updated);
  return updated;
}

export function deleteProjectFromStore(id: string): Project[] {
  const current = getStoredProjects();
  const updated = current.filter((p) => p.id !== id);
  saveProjects(updated);
  return updated;
}

export function resetProjectsToDefault(): Project[] {
  saveProjects(INITIAL_PROJECTS);
  return INITIAL_PROJECTS;
}

export function exportProjectsJson(): string {
  const projects = getStoredProjects();
  return JSON.stringify(projects, null, 2);
}

export function importProjectsFromJson(jsonString: string): { success: boolean; projects?: Project[]; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, error: 'JSON payload must be an array of project objects' };
    }
    // Simple shape validation
    const valid = parsed.every(
      (p) => typeof p.id === 'string' && typeof p.title === 'string' && Array.isArray(p.bulletPoints)
    );
    if (!valid) {
      return { success: false, error: 'Every project must contain at least id, title, and bulletPoints array' };
    }
    saveProjects(parsed);
    return { success: true, projects: parsed };
  } catch (err: any) {
    return { success: false, error: err.message || 'Invalid JSON syntax' };
  }
}
