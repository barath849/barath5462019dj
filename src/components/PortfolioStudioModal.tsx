import React, { useState } from 'react';
import {
  CustomThemeSettings,
  PersonalInfo,
  FontFamilyOption,
  ColorPaletteOption,
  BorderRadiusOption,
  BorderLineStyleOption,
  BoxStyleOption,
  WallpaperOption,
  MotionOption,
  BlurOption,
  BackgroundColorOption,
  ThemeType
} from '../types';
import {
  X,
  Palette,
  Sliders,
  FolderKanban,
  FileUp,
  Type,
  Sparkles,
  Layers,
  Check,
  RotateCcw,
  Download,
  Upload,
  UserCheck,
  Eye,
  Settings,
  Flame,
  Radio,
  FileText,
  Video,
  Film,
  UploadCloud,
  Play,
  Trash2,
  ShieldCheck
} from 'lucide-react';

interface PortfolioStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CustomThemeSettings;
  onUpdateSettings: (newSettings: CustomThemeSettings) => void;
  personalInfo: PersonalInfo;
  onUpdatePersonalInfo: (newInfo: PersonalInfo) => void;
  onOpenProjectManager: () => void;
  onOpenResumeModal: () => void;
  onResetAll: () => void;
}

export const PortfolioStudioModal: React.FC<PortfolioStudioModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  personalInfo,
  onUpdatePersonalInfo,
  onOpenProjectManager,
  onOpenResumeModal,
  onResetAll,
}) => {
  // Main tabs matching user request: "Theme Section", "Edit Section", "Menu Option Section"
  const [activeTab, setActiveTab] = useState<'theme' | 'edit' | 'menu'>('theme');
  const [editSubTab, setEditSubTab] = useState<'styling' | 'content'>('styling');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Resume file upload local state
  const [uploadedResumeName, setUploadedResumeName] = useState<string>(
    personalInfo.resumeFileName || 'Barathraj_B_AI_Engineer_Resume.pdf'
  );

  // Temporary local copy for editing personal info
  const [tempProfile, setTempProfile] = useState<PersonalInfo>(personalInfo);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 2500);
  };

  const handleUpdate = (partial: Partial<CustomThemeSettings>) => {
    const updated = { ...settings, ...partial };
    onUpdateSettings(updated);
    showToast('Settings updated & applied live!');
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePersonalInfo(tempProfile);
    showToast('Personal info & resume details saved!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedResumeName(file.name);
      const url = URL.createObjectURL(file);
      const updated = {
        ...personalInfo,
        resumeFileName: file.name,
        resumeFileUrl: url,
      };
      onUpdatePersonalInfo(updated);
      showToast(`Resume "${file.name}" uploaded successfully!`);
    }
  };

  // Video Canvas File Upload Handler
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleUpdate({
        motion: 'custom-video',
        customVideoUrl: url,
        customVideoName: file.name,
        videoOpacity: settings.videoOpacity ?? 0.25,
      });
      showToast(`Uploaded video "${file.name}" & set as live canvas background!`);
    }
  };

  // Sample video loops for instant testing
  const sampleVideoLoops = [
    {
      name: 'Cyber Matrix Circuit',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-circuit-board-microchip-computer-network-31589-large.mp4',
    },
    {
      name: 'Screens With Code Stream',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-code-31910-large.mp4',
    },
    {
      name: 'Abstract Laser Grid',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-animation-42508-large.mp4',
    },
  ];

  // Color Palette Presets
  const palettes: { id: ColorPaletteOption; label: string; hex: string }[] = [
    { id: 'cyan', label: 'Electric Cyan', hex: '#00f2fe' },
    { id: 'emerald', label: 'Matrix Emerald', hex: '#10b981' },
    { id: 'amber', label: 'Amber Gold', hex: '#f59e0b' },
    { id: 'sky', label: 'Arctic Sky', hex: '#38bdf8' },
    { id: 'violet', label: 'Cyber Violet', hex: '#a855f7' },
    { id: 'rose', label: 'Crimson Neon', hex: '#f43f5e' },
  ];

  // Wallpaper choices
  const wallpapers: { id: WallpaperOption; label: string; desc: string }[] = [
    { id: 'grid', label: 'Matrix Tech Grid', desc: 'Precision engineering grid pattern' },
    { id: 'circuit', label: 'Cyber Circuit', desc: 'Hardware trace and node lines' },
    { id: 'starfield', label: 'Cosmos Starfield', desc: 'Ambient star micro-dots' },
    { id: 'mesh', label: 'Gradient Mesh', desc: 'Soft dual-radial neon wash' },
    { id: 'dots', label: 'Minimal Dots', desc: 'Refined technical dot grid' },
    { id: 'none', label: 'Plain Solid Dark', desc: 'Clean distraction-free dark' },
  ];

  // Motion choices
  const motions: { id: MotionOption; label: string; desc: string }[] = [
    { id: 'neural-synapse', label: 'AI Synapse & Latent Field (Recommended)', desc: 'Interactive floating neural nodes with real-time synaptic inference pulses & math tokens' },
    { id: 'particles', label: 'Interactive Neural Particles', desc: 'Clean connected floating neural network graph' },
    { id: 'ambient-glow', label: 'Ambient Pulse Waves', desc: 'Smooth breathing ambient gradient orbs' },
    { id: 'matrix-rain', label: 'Matrix Digital Rain', desc: 'Cascading AI math & code glyph streams' },
    { id: 'custom-video', label: 'Upload Animated Video / GIF', desc: 'Upload your own MP4, WebM, or GIF loop with anti-watermark concealer' },
    { id: 'cyber-tunnel', label: 'Neon Cyber Corridor', desc: 'Fast-paced 3D flight through cyan & magenta rectangular portals' },
    { id: 'static', label: 'Static (Disabled)', desc: 'Zero background motion for low battery / performance' },
  ];

  // Background color choices
  const bgColors: { id: BackgroundColorOption; label: string; hex: string }[] = [
    { id: 'cyber-navy', label: 'Cyber Navy', hex: '#070b12' },
    { id: 'obsidian-slate', label: 'Obsidian Slate', hex: '#090d16' },
    { id: 'midnight-coal', label: 'Midnight Amber', hex: '#0c0c10' },
    { id: 'oled', label: 'True OLED Black', hex: '#020408' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-5 sm:p-7 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Portfolio Customizer & Menu Console</span>
              </h2>
              <p className="text-xs text-slate-400">
                Configure Themes, Custom Wallpapers, Motion, Fonts, Palettes, Boxes, Content & Resume.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetAll}
              className="px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-rose-300 hover:bg-slate-800 transition-colors flex items-center gap-1"
              title="Reset all settings to initial defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save Toast notification */}
        {saveToast && (
          <div className="absolute top-20 right-8 z-30 px-3.5 py-2 rounded-lg bg-emerald-950 border border-emerald-600 text-emerald-200 text-xs font-medium flex items-center gap-2 shadow-xl animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Primary 3-Section Navigation Bar (Theme Section | Edit Section | Menu Option Section) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-950 rounded-xl my-4 border border-slate-800 shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'theme'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Theme Section</span>
          </button>

          <button
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'edit'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Palette className="w-4 h-4 text-emerald-400" />
            <span>Edit Section</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'menu'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-amber-400" />
            <span>Menu Option Section</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-6 text-xs">
          
          {/* ============================================================== */}
          {/* TAB 1: THEME SECTION (Wallpaper, Animated Motion, Background Color, Blur) */}
          {/* ============================================================== */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              
              {/* Preset Quick Theme Selector */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Preset Theme Aesthetics</span>
                  <span className="text-[11px] font-code text-slate-400">One-click style bundles</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => {
                      handleUpdate({
                        themePreset: 'cyberpunk',
                        colorPalette: 'cyan',
                        customAccentColor: '#00f2fe',
                        wallpaper: 'grid',
                        motion: 'particles',
                        backgroundColor: 'cyber-navy',
                        blur: 'medium',
                      });
                    }}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      settings.themePreset === 'cyberpunk'
                        ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500/40'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                      <span className="font-bold text-white">Cyberpunk Neon</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">High-contrast cyan & particle grid</p>
                  </button>

                  <button
                    onClick={() => {
                      handleUpdate({
                        themePreset: 'obsidian',
                        colorPalette: 'sky',
                        customAccentColor: '#38bdf8',
                        wallpaper: 'circuit',
                        motion: 'ambient-glow',
                        backgroundColor: 'obsidian-slate',
                        blur: 'ultra',
                      });
                    }}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      settings.themePreset === 'obsidian'
                        ? 'border-sky-500 bg-sky-950/30 ring-1 ring-sky-500/40'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                      <span className="font-bold text-white">Obsidian Slate</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Ultra frosted glass & sky blue</p>
                  </button>

                  <button
                    onClick={() => {
                      handleUpdate({
                        themePreset: 'midnight',
                        colorPalette: 'amber',
                        customAccentColor: '#f59e0b',
                        wallpaper: 'starfield',
                        motion: 'ambient-glow',
                        backgroundColor: 'midnight-coal',
                        blur: 'medium',
                      });
                    }}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      settings.themePreset === 'midnight'
                        ? 'border-amber-500 bg-amber-950/30 ring-1 ring-amber-500/40'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="font-bold text-white">Midnight Amber</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Warm executive gold & starfield</p>
                  </button>
                </div>
              </div>

              {/* Wallpaper Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white font-bold text-sm flex items-center gap-2">
                    <span>Wallpaper Pattern Selection</span>
                  </label>
                  <span className="text-[11px] font-code text-cyan-400">Current: {settings.wallpaper}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {wallpapers.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => handleUpdate({ wallpaper: w.id })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        settings.wallpaper === w.id
                          ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500/50 text-white'
                          : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="font-semibold">{w.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{w.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Animated Motion Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white font-bold text-sm flex items-center gap-2">
                    <Flame className="w-4 h-4 text-emerald-400" />
                    <span>Animated Motion & Video Canvas</span>
                  </label>
                  <span className="text-[11px] font-code text-emerald-400">Current: {settings.motion}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {motions.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => handleUpdate({ motion: m.id })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        settings.motion === m.id
                          ? 'border-emerald-500 bg-emerald-950/30 ring-1 ring-emerald-500/50 text-white'
                          : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="font-semibold flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {m.id === 'custom-video' ? (
                            <Video className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <Flame className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                          <span>{m.label}</span>
                        </div>
                        {settings.motion === m.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">{m.desc}</div>
                    </button>
                  ))}
                </div>

                {/* DEDICATED ANIMATED VIDEO UPLOAD & CONTROLS STUDIO */}
                <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold text-white text-xs">Video Canvas Uploader & Player Settings</span>
                    </div>
                    {settings.customVideoUrl && (
                      <span className="text-[10px] font-code px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Video Loaded & Active
                      </span>
                    )}
                  </div>

                  {/* Upload Drop Zone / Button */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <label className="sm:col-span-8 flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-slate-700 hover:border-cyan-500/60 bg-slate-900/60 cursor-pointer transition-all group">
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/ogg,video/quicktime,image/gif"
                        onChange={handleVideoFileUpload}
                        className="hidden"
                      />
                      <UploadCloud className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform mb-1.5" />
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                        Upload Your Animated Video or GIF
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 text-center">
                        Select MP4, WebM, MOV, or animated GIF loop from your device
                      </p>
                    </label>

                    {/* Quick Sample Presets */}
                    <div className="sm:col-span-4 space-y-1.5">
                      <div className="text-[11px] font-code text-slate-400 mb-1">Or Try Sample Loops:</div>
                      {sampleVideoLoops.map((sample, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            handleUpdate({
                              motion: 'custom-video',
                              customVideoUrl: sample.url,
                              customVideoName: sample.name,
                              videoOpacity: settings.videoOpacity ?? 0.25,
                            });
                            showToast(`Loaded sample video "${sample.name}"!`);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-white border border-slate-800 flex items-center justify-between"
                        >
                          <span className="truncate">{sample.name}</span>
                          <Play className="w-3 h-3 text-cyan-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Video Status & Controls */}
                  {settings.customVideoUrl && (
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <div className="text-[10px] font-code text-slate-400">Current Background Video:</div>
                          <div className="text-xs font-bold text-white truncate font-code mt-0.5">
                            {settings.customVideoName || 'Uploaded Video Canvas'}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            handleUpdate({
                              motion: 'particles',
                              customVideoUrl: undefined,
                              customVideoName: undefined,
                            });
                            showToast('Cleared custom video; restored particle motion.');
                          }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 text-[11px] flex items-center gap-1 transition-colors border border-slate-700"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>

                      {/* Video Opacity Controls */}
                      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="text-[11px] font-semibold text-slate-300">Video Canvas Opacity:</div>
                          <div className="text-[10px] text-slate-500">Lower opacity keeps portfolio text easy to read</div>
                        </div>

                        <div className="flex items-center gap-1">
                          {[
                            { label: '10%', val: 0.10 },
                            { label: '20%', val: 0.20 },
                            { label: '30%', val: 0.30 },
                            { label: '45%', val: 0.45 },
                            { label: '60%', val: 0.60 },
                          ].map((op) => {
                            const isCurrent = Math.abs((settings.videoOpacity ?? 0.25) - op.val) < 0.05;
                            return (
                              <button
                                key={op.label}
                                type="button"
                                onClick={() => handleUpdate({ videoOpacity: op.val, motion: 'custom-video' })}
                                className={`px-2 py-0.5 rounded text-[10px] font-code font-bold transition-all ${
                                  isCurrent
                                    ? 'bg-cyan-500 text-slate-950 shadow-sm ring-1 ring-white/20'
                                    : 'bg-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                {op.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Video Fit Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                        <span className="text-slate-400">Display Layout:</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleUpdate({ videoFit: 'cover' })}
                            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                              (settings.videoFit ?? 'cover') === 'cover'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Full Screen Cover
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdate({ videoFit: 'contain' })}
                            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                              settings.videoFit === 'contain'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Centered Contain
                          </button>
                        </div>
                      </div>

                      {/* Anti-Watermark Remover Filter Switch */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                        <div>
                          <div className="font-semibold text-white flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Remove Center Stock Watermark:</span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Dissolves iStock / Getty / Shutterstock watermarks via vanishing-point portal bloom & edge grading
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const nextState = !(settings.removeWatermark !== false);
                            handleUpdate({ removeWatermark: nextState });
                            showToast(nextState ? 'Anti-watermark filter ENABLED!' : 'Anti-watermark filter DISABLED.');
                          }}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                            settings.removeWatermark !== false
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm ring-1 ring-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {settings.removeWatermark !== false ? 'Watermark Concealed (ACTIVE)' : 'Original Watermark (OFF)'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Color Background Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white font-bold text-sm">
                    Background Base Color Selection
                  </label>
                  <span className="text-[11px] font-code text-slate-400">{settings.backgroundColor}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-2.5">
                  {bgColors.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => handleUpdate({ backgroundColor: bg.id })}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        settings.backgroundColor === bg.id
                          ? 'border-white bg-slate-800 text-white shadow-sm ring-1 ring-white/30'
                          : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-slate-600" style={{ backgroundColor: bg.hex }} />
                      <span className="font-semibold">{bg.label}</span>
                    </button>
                  ))}
                </div>

                {/* Custom Background Color Picker */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                  <span className="text-slate-300">Custom Background Hex</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.customBgColor}
                      onChange={(e) =>
                        handleUpdate({
                          backgroundColor: 'custom',
                          customBgColor: e.target.value,
                        })
                      }
                      className="w-8 h-8 rounded cursor-pointer border border-slate-700 bg-transparent"
                    />
                    <input
                      type="text"
                      value={settings.customBgColor}
                      onChange={(e) =>
                        handleUpdate({
                          backgroundColor: 'custom',
                          customBgColor: e.target.value,
                        })
                      }
                      className="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-code text-xs uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Blur Option */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white font-bold text-sm">
                    Backdrop Blur Glass Intensity
                  </label>
                  <span className="text-[11px] font-code text-cyan-400">{settings.blur}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(['none', 'subtle', 'medium', 'ultra'] as BlurOption[]).map((b) => (
                    <button
                      key={b}
                      onClick={() => handleUpdate({ blur: b })}
                      className={`py-2 rounded-lg border text-center font-medium capitalize transition-all ${
                        settings.blur === b
                          ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200 ring-1 ring-cyan-500/50'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: EDIT SECTION (Fonts, Live Content Edit, Color Palette, Lines, Boxes) */}
          {/* ============================================================== */}
          {activeTab === 'edit' && (
            <div className="space-y-6">
              
              {/* Sub-tabs: Styling vs Live Content Editing */}
              <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setEditSubTab('styling')}
                  className={`flex-1 py-1.5 rounded-md transition-all ${
                    editSubTab === 'styling'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Styling: Fonts, Palettes, Lines & Boxes
                </button>
                <button
                  onClick={() => setEditSubTab('content')}
                  className={`flex-1 py-1.5 rounded-md transition-all ${
                    editSubTab === 'content'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Edit Option: Profile & Resume Info
                </button>
              </div>

              {editSubTab === 'styling' ? (
                <div className="space-y-6">
                  
                  {/* 1. Fonts Customization */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        <Type className="w-4 h-4 text-cyan-400" />
                        <span>Fonts Customization</span>
                      </div>
                      <span className="text-[11px] font-code text-slate-400">{settings.fontFamily}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'inter', name: 'Inter (Clean / Modern)' },
                        { id: 'space', name: 'Space Grotesk (Tech)' },
                        { id: 'jetbrains', name: 'JetBrains (Monospace)' },
                        { id: 'fira', name: 'Fira Code (Code AI)' },
                        { id: 'syne', name: 'Syne (Avant-Garde)' },
                        { id: 'orbitron', name: 'Orbitron (Futuristic)' },
                      ].map((font) => (
                        <button
                          key={font.id}
                          onClick={() => handleUpdate({ fontFamily: font.id as FontFamilyOption })}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            settings.fontFamily === font.id
                              ? 'border-cyan-500 bg-cyan-950/30 text-white ring-1 ring-cyan-500/40'
                              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-semibold text-xs">{font.name}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Sample: Barathraj B 2026</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Colour Palette Customization */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        <Palette className="w-4 h-4 text-emerald-400" />
                        <span>Colour Palette Selection</span>
                      </div>
                      <span className="text-[11px] font-code text-emerald-400">{settings.colorPalette}</span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {palettes.map((p) => (
                        <button
                          key={p.id}
                          onClick={() =>
                            handleUpdate({
                              colorPalette: p.id,
                              customAccentColor: p.hex,
                            })
                          }
                          className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                            settings.colorPalette === p.id
                              ? 'border-white bg-slate-900 shadow-md ring-1 ring-white/30'
                              : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full" style={{ backgroundColor: p.hex }} />
                          <span className="text-[11px] font-medium text-slate-200">{p.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Custom Hex Picker */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-slate-400 text-xs">Custom Accent Color:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={settings.customAccentColor}
                          onChange={(e) =>
                            handleUpdate({
                              colorPalette: 'custom',
                              customAccentColor: e.target.value,
                            })
                          }
                          className="w-8 h-8 rounded cursor-pointer border border-slate-700 bg-transparent"
                        />
                        <input
                          type="text"
                          value={settings.customAccentColor}
                          onChange={(e) =>
                            handleUpdate({
                              colorPalette: 'custom',
                              customAccentColor: e.target.value,
                            })
                          }
                          className="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-code text-xs uppercase"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Lines & Borders Style */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="font-bold text-white text-sm">Lines & Border Style</div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'solid', label: 'Solid Clean Micro-Line' },
                        { id: 'dashed', label: 'Tech Dashed Grid Lines' },
                        { id: 'glowing', label: 'Glowing Neon Edge' },
                      ].map((line) => (
                        <button
                          key={line.id}
                          onClick={() => handleUpdate({ lineStyle: line.id as BorderLineStyleOption })}
                          className={`p-2.5 rounded-lg border text-center transition-all ${
                            settings.lineStyle === line.id
                              ? 'border-cyan-500 bg-cyan-950/30 text-white ring-1 ring-cyan-500/40'
                              : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="font-semibold text-xs">{line.label}</div>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <span className="text-slate-400">Border Glow Intensity:</span>
                      <div className="flex items-center gap-1.5">
                        {(['none', 'low', 'high'] as const).map((g) => (
                          <button
                            key={g}
                            onClick={() => handleUpdate({ borderGlowIntensity: g })}
                            className={`px-3 py-1 rounded text-[11px] font-semibold capitalize ${
                              settings.borderGlowIntensity === g
                                ? 'bg-cyan-500 text-slate-950'
                                : 'bg-slate-900 text-slate-400 hover:text-white'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 4. Box & Card Styling */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="font-bold text-white text-sm">Box & Card Customization</div>
                    
                    <div>
                      <div className="text-slate-400 text-[11px] mb-1.5">Corner Radius:</div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { id: 'sharp', label: 'Sharp (2px)' },
                          { id: 'subtle', label: 'Subtle (6px)' },
                          { id: 'rounded', label: 'Standard (12px)' },
                          { id: 'modern', label: 'Modern (20px)' },
                        ].map((r) => (
                          <button
                            key={r.id}
                            onClick={() => handleUpdate({ borderRadius: r.id as BorderRadiusOption })}
                            className={`py-1.5 rounded-lg border text-center font-medium transition-all ${
                              settings.borderRadius === r.id
                                ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200'
                                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                            }`}
                          >
                            {r.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <div className="text-slate-400 text-[11px] mb-1.5">Card Fill Aesthetic:</div>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'glass', label: 'Frosted Glass Card' },
                          { id: 'solid-dark', label: 'Solid Jet Black Card' },
                          { id: 'card-border-glow', label: 'Neon Bordered Card' },
                        ].map((box) => (
                          <button
                            key={box.id}
                            onClick={() => handleUpdate({ boxStyle: box.id as BoxStyleOption })}
                            className={`p-2 rounded-lg border text-center font-medium transition-all ${
                              settings.boxStyle === box.id
                                ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200'
                                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                            }`}
                          >
                            {box.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                /* LIVE CONTENT EDIT OPTION FORM */
                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800 text-cyan-200 text-xs flex items-center gap-2">
                    <UserCheck className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span>
                      Edit Option: Modify your name, headline, bio, and contact information. Updates appear live on the portfolio!
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        value={tempProfile.name}
                        onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Professional Title</label>
                      <input
                        type="text"
                        value={tempProfile.title}
                        onChange={(e) => setTempProfile({ ...tempProfile, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Tagline / Architecture Subtitle</label>
                    <input
                      type="text"
                      value={tempProfile.tagline}
                      onChange={(e) => setTempProfile({ ...tempProfile, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Bio / Career Objective</label>
                    <textarea
                      rows={3}
                      value={tempProfile.bio}
                      onChange={(e) => setTempProfile({ ...tempProfile, bio: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Primary Email</label>
                      <input
                        type="email"
                        value={tempProfile.email}
                        onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-code"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Primary Phone</label>
                      <input
                        type="text"
                        value={tempProfile.phones[0]}
                        onChange={(e) =>
                          setTempProfile({
                            ...tempProfile,
                            phones: [e.target.value, tempProfile.phones[1] || ''],
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-code"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Alternate Phone</label>
                      <input
                        type="text"
                        value={tempProfile.phones[1] || ''}
                        onChange={(e) =>
                          setTempProfile({
                            ...tempProfile,
                            phones: [tempProfile.phones[0], e.target.value],
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-code"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">GitHub Profile URL</label>
                      <input
                        type="text"
                        value={tempProfile.github || ''}
                        onChange={(e) => setTempProfile({ ...tempProfile, github: e.target.value })}
                        placeholder="https://github.com/barath2708"
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-code"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">LinkedIn URL</label>
                      <input
                        type="text"
                        value={tempProfile.linkedIn}
                        onChange={(e) => setTempProfile({ ...tempProfile, linkedIn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-code"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">Location</label>
                      <input
                        type="text"
                        value={tempProfile.location}
                        onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors shadow-sm"
                    >
                      Save Profile & Resume Updates
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: MENU OPTION SECTION (Resume Upload, Manage Projects, Backups) */}
          {/* ============================================================== */}
          {activeTab === 'menu' && (
            <div className="space-y-6">
              
              {/* 1. Resume Upload & Document Operations */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileUp className="w-5 h-5 text-cyan-400" />
                    <div>
                      <h3 className="font-bold text-white text-sm">Resume Upload & Document Center</h3>
                      <p className="text-[11px] text-slate-400">
                        Upload custom updated resumes or inspect verified credentials.
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-code px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Active
                  </span>
                </div>

                {/* Upload Box */}
                <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 flex flex-col items-center justify-center text-center">
                  <FileText className="w-8 h-8 text-cyan-400 mb-2" />
                  <p className="text-xs font-semibold text-white">Upload New Resume File</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Supports PDF, DOCX, or TXT format</p>
                  
                  <label className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose File to Upload</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  
                  <div className="mt-2 text-[11px] font-code text-slate-400">
                    Current Loaded Resume: <span className="text-cyan-300">{uploadedResumeName}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenResumeModal();
                    }}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-left text-xs font-semibold text-slate-200 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span>View & Print Full Resume Document</span>
                    </div>
                    <span>→</span>
                  </button>

                  <a
                    href={personalInfo.resumeFileUrl || '#'}
                    download={uploadedResumeName}
                    onClick={() => {
                      if (!personalInfo.resumeFileUrl) {
                        onClose();
                        onOpenResumeModal();
                      }
                    }}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-left text-xs font-semibold text-slate-200 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-emerald-400" />
                      <span>Download Resume File</span>
                    </div>
                    <span>↓</span>
                  </a>
                </div>
              </div>

              {/* 2. Manage Projects Quick Launcher */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderKanban className="w-5 h-5 text-amber-400" />
                    <div>
                      <h3 className="font-bold text-white text-sm">Manage Projects Gallery</h3>
                      <p className="text-[11px] text-slate-400">
                        Add new projects, customize architecture specs, edit, delete, or bulk-import.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenProjectManager();
                    }}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-left transition-all"
                  >
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>+ Add New Project</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Form with metrics, tech stack & bullets</div>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenProjectManager();
                    }}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-left transition-all"
                  >
                    <div className="font-bold text-white">JSON Import / Export</div>
                    <div className="text-[10px] text-slate-400 mt-1">Directly paste project schema array</div>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenProjectManager();
                    }}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-left transition-all"
                  >
                    <div className="font-bold text-white">Manage Catalog</div>
                    <div className="text-[10px] text-slate-400 mt-1">Edit or remove existing projects</div>
                  </button>
                </div>
              </div>

              {/* 3. Global System Configuration Backup */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-xs">Reset All Customizations</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Restore verified resume defaults and original dark styling.
                  </div>
                </div>
                <button
                  onClick={onResetAll}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-semibold text-rose-300 hover:bg-rose-950/40 hover:border-rose-700 transition-colors"
                >
                  Reset Defaults
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between shrink-0">
          <span className="text-[11px] font-code text-slate-500">
            Changes apply in real-time and persist in your browser.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
