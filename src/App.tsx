/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Project, ThemeType, CustomThemeSettings, PersonalInfo } from './types';
import { getStoredProjects } from './utils/projectStorage';
import {
  getStoredThemeSettings,
  saveThemeSettings,
  resetThemeSettings,
  getStoredPersonalInfo,
  savePersonalInfo,
  resetPersonalInfo,
} from './utils/themeCustomizerStorage';

import { BackgroundEffects } from './components/BackgroundEffects';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectGallery } from './components/ProjectGallery';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationCertSection } from './components/EducationCertSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ProjectManagerModal } from './components/ProjectManagerModal';
import { ResumeModal } from './components/ResumeModal';
import { PortfolioStudioModal } from './components/PortfolioStudioModal';
import { Sliders, Sparkles, FolderKanban, PlusCircle } from 'lucide-react';

export default function App() {
  // Theme & Styling Customization State (defaults to elegant AI Neural Synapse & Latent Vector field)
  const [settings, setSettings] = useState<CustomThemeSettings>(() => {
    const s = getStoredThemeSettings();
    if (!s.motion || s.motion === 'cyber-tunnel' || s.motion === 'particles') {
      const updated = { ...s, motion: 'neural-synapse' as const };
      saveThemeSettings(updated);
      return updated;
    }
    return s;
  });

  // Personal Information & Profile Edit State (synced to https://github.com/barath2708 & LinkedIn)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const info = getStoredPersonalInfo();
    let updated = { ...info };
    let changed = false;
    if (!updated.github || updated.github === 'https://github.com/barathraj-b') {
      updated.github = 'https://github.com/barath2708';
      changed = true;
    }
    if (!updated.linkedIn || !updated.linkedIn.includes('barathraj-b-5203b7384')) {
      updated.linkedIn = 'https://www.linkedin.com/in/barathraj-b-5203b7384';
      changed = true;
    }
    if (changed) {
      savePersonalInfo(updated);
    }
    return updated;
  });

  // Projects State
  const [projects, setProjects] = useState<Project[]>(() => getStoredProjects());

  // Modal Dialog States
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectManagerOpen, setIsProjectManagerOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);
  const [studioInitialTab, setStudioInitialTab] = useState<'theme' | 'edit' | 'menu'>('theme');

  // Sync settings updates
  const handleUpdateSettings = (newSettings: CustomThemeSettings) => {
    setSettings(newSettings);
    saveThemeSettings(newSettings);
  };

  // Sync personal info updates
  const handleUpdatePersonalInfo = (newInfo: PersonalInfo) => {
    setPersonalInfo(newInfo);
    savePersonalInfo(newInfo);
  };

  // Quick Preset Theme Switcher
  const handleThemePresetChange = (preset: ThemeType) => {
    let partial: Partial<CustomThemeSettings> = { themePreset: preset };
    if (preset === 'cyberpunk') {
      partial = {
        ...partial,
        colorPalette: 'cyan',
        customAccentColor: '#00f2fe',
        wallpaper: 'grid',
        motion: 'neural-synapse',
        backgroundColor: 'cyber-navy',
        blur: 'medium',
      };
    } else if (preset === 'obsidian') {
      partial = {
        ...partial,
        colorPalette: 'sky',
        customAccentColor: '#38bdf8',
        wallpaper: 'circuit',
        motion: 'ambient-glow',
        backgroundColor: 'obsidian-slate',
        blur: 'ultra',
      };
    } else if (preset === 'midnight') {
      partial = {
        ...partial,
        colorPalette: 'amber',
        customAccentColor: '#f59e0b',
        wallpaper: 'starfield',
        motion: 'ambient-glow',
        backgroundColor: 'midnight-coal',
        blur: 'medium',
      };
    }
    handleUpdateSettings({ ...settings, ...partial });
  };

  // Reset Everything to Defaults
  const handleResetAll = () => {
    if (confirm('Reset all custom theme styles and personal information to original defaults?')) {
      const defSettings = resetThemeSettings();
      const defInfo = resetPersonalInfo();
      setSettings(defSettings);
      setPersonalInfo(defInfo);
      setIsStudioModalOpen(false);
    }
  };

  const handleOpenStudio = (tab: 'theme' | 'edit' | 'menu' = 'theme') => {
    setStudioInitialTab(tab);
    setIsStudioModalOpen(true);
  };

  // Compute active accent color hex for dynamic CSS variables
  const accentHex =
    settings.colorPalette === 'custom'
      ? settings.customAccentColor
      : settings.colorPalette === 'emerald'
      ? '#10b981'
      : settings.colorPalette === 'amber'
      ? '#f59e0b'
      : settings.colorPalette === 'violet'
      ? '#a855f7'
      : settings.colorPalette === 'rose'
      ? '#f43f5e'
      : settings.colorPalette === 'sky'
      ? '#38bdf8'
      : '#00f2fe';

  // Compute font family class
  const fontClass =
    settings.fontFamily === 'space'
      ? 'font-display'
      : settings.fontFamily === 'jetbrains'
      ? 'font-jetbrains'
      : settings.fontFamily === 'fira'
      ? 'font-code'
      : settings.fontFamily === 'syne'
      ? 'font-syne'
      : settings.fontFamily === 'orbitron'
      ? 'font-orbitron'
      : 'font-sans';

  // Sync theme-preset class to body
  useEffect(() => {
    document.body.className = `theme-${settings.themePreset} ${fontClass} antialiased text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200`;
  }, [settings.themePreset, fontClass]);

  return (
    <div
      className={`min-h-screen relative text-slate-100 transition-colors duration-300 ${fontClass}`}
      style={
        {
          '--accent-cyan': accentHex,
          '--accent-emerald': settings.colorPalette === 'amber' ? '#fbbf24' : '#10b981',
        } as React.CSSProperties
      }
    >
      {/* Dynamic Animated Motion & Wallpaper Canvas */}
      <BackgroundEffects settings={settings} />

      {/* Top Navigation Bar with Menu Studio & Theme Switcher */}
      <Navbar
        currentTheme={settings.themePreset}
        personalInfo={personalInfo}
        onThemeChange={handleThemePresetChange}
        onOpenProjectManager={() => setIsProjectManagerOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenStudioModal={handleOpenStudio}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          currentTheme={settings.themePreset}
          personalInfo={personalInfo}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onOpenProjectManager={() => setIsProjectManagerOpen(true)}
          onOpenStudioModal={handleOpenStudio}
        />

        {/* Dynamic Project Gallery & Systems */}
        <ProjectGallery
          projects={projects}
          currentTheme={settings.themePreset}
          onOpenDetails={(project) => setSelectedProject(project)}
          onOpenProjectManager={() => setIsProjectManagerOpen(true)}
        />

        {/* Experience & CodeWork Internship */}
        <ExperienceSection currentTheme={settings.themePreset} />

        {/* Technical Skills & Competencies */}
        <SkillsSection currentTheme={settings.themePreset} />

        {/* Education & Certifications */}
        <EducationCertSection currentTheme={settings.themePreset} />

        {/* Direct Recruiter Contact Composer */}
        <ContactSection
          currentTheme={settings.themePreset}
          personalInfo={personalInfo}
        />
      </main>

      {/* Footer */}
      <Footer currentTheme={settings.themePreset} personalInfo={personalInfo} />

      {/* Persistent Floating Controls Bar (Always visible on all screens) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3.5 py-2 rounded-full bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-md flex items-center gap-2 sm:gap-3">
        {/* Preset Theme Switcher */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleThemePresetChange('cyberpunk')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-all flex items-center gap-1.5 ${
              settings.themePreset === 'cyberpunk'
                ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Cyberpunk</span>
          </button>

          <button
            onClick={() => handleThemePresetChange('obsidian')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-all flex items-center gap-1.5 ${
              settings.themePreset === 'obsidian'
                ? 'bg-sky-500/20 text-sky-300 ring-1 ring-sky-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <span>Obsidian</span>
          </button>

          <button
            onClick={() => handleThemePresetChange('midnight')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-all flex items-center gap-1.5 ${
              settings.themePreset === 'midnight'
                ? 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Midnight</span>
          </button>
        </div>

        <div className="h-4 w-[1px] bg-slate-700 mx-1" />

        {/* MAIN MENU / STUDIO CONSOLE TRIGGER */}
        <button
          onClick={() => handleOpenStudio('theme')}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-[11px] font-bold hover:bg-cyan-400 transition-colors shadow-sm"
          title="Open Customizer Menu (Theme, Edit, and Menu options)"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Menu Console</span>
        </button>

        {/* Quick Add Project Button */}
        <button
          onClick={() => setIsProjectManagerOpen(true)}
          className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 text-slate-200 text-[11px] font-semibold hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
        >
          <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>+ Project</span>
        </button>
      </div>

      {/* 1. PORTFOLIO STUDIO & MENU MODAL (Theme, Edit, Menu sections) */}
      <PortfolioStudioModal
        isOpen={isStudioModalOpen}
        onClose={() => setIsStudioModalOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        personalInfo={personalInfo}
        onUpdatePersonalInfo={handleUpdatePersonalInfo}
        onOpenProjectManager={() => setIsProjectManagerOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onResetAll={handleResetAll}
      />

      {/* 2. PROJECT ARCHITECTURE DEEP-DIVE MODAL */}
      <ProjectModal
        project={selectedProject}
        currentTheme={settings.themePreset}
        onClose={() => setSelectedProject(null)}
      />

      {/* 3. PROJECT MANAGER MODAL (Add Project, Import/Export JSON, Catalog, Reset Defaults) */}
      <ProjectManagerModal
        isOpen={isProjectManagerOpen}
        currentTheme={settings.themePreset}
        projects={projects}
        onProjectsChange={(updatedProjects) => setProjects(updatedProjects)}
        onClose={() => setIsProjectManagerOpen(false)}
      />

      {/* 4. FULL RESUME VIEW & PRINT MODAL */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        personalInfo={personalInfo}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
