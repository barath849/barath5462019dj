export type ThemeType = 'cyberpunk' | 'obsidian' | 'midnight';

export type ProjectCategory = 'All' | 'GenAI & RAG' | 'Computer Vision' | 'Data & LLM Ops' | 'Full Stack AI';

export type FontFamilyOption = 'inter' | 'space' | 'fira' | 'jetbrains' | 'syne' | 'orbitron';
export type ColorPaletteOption = 'cyan' | 'emerald' | 'amber' | 'violet' | 'rose' | 'sky' | 'custom';
export type BorderRadiusOption = 'sharp' | 'subtle' | 'rounded' | 'modern';
export type BorderLineStyleOption = 'solid' | 'dashed' | 'glowing';
export type BoxStyleOption = 'glass' | 'solid-dark' | 'card-border-glow' | 'minimal';
export type WallpaperOption = 'grid' | 'dots' | 'circuit' | 'mesh' | 'starfield' | 'none';
export type MotionOption = 'neural-synapse' | 'particles' | 'matrix-rain' | 'ambient-glow' | 'cyber-tunnel' | 'custom-video' | 'static';
export type BlurOption = 'none' | 'subtle' | 'medium' | 'ultra';
export type BackgroundColorOption = 'oled' | 'cyber-navy' | 'obsidian-slate' | 'midnight-coal' | 'custom';

export interface CustomThemeSettings {
  // Theme section properties
  themePreset: ThemeType;
  wallpaper: WallpaperOption;
  motion: MotionOption;
  backgroundColor: BackgroundColorOption;
  customBgColor: string;
  blur: BlurOption;

  // Custom Video / Motion Canvas upload properties
  customVideoUrl?: string;
  customVideoName?: string;
  videoOpacity?: number; // 0.05 to 0.6 (default ~0.25)
  videoFit?: 'cover' | 'contain';
  removeWatermark?: boolean; // Center watermark concealer / bloom mask

  // Edit / Styling section properties
  fontFamily: FontFamilyOption;
  codeFont: 'fira' | 'jetbrains';
  colorPalette: ColorPaletteOption;
  customAccentColor: string;
  lineStyle: BorderLineStyleOption;
  borderRadius: BorderRadiusOption;
  boxStyle: BoxStyleOption;
  borderGlowIntensity: 'none' | 'low' | 'high';
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phones: string[];
  linkedIn: string;
  github: string;
  location: string;
  status: string;
  resumeFileName?: string;
  resumeFileUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'GenAI & RAG' | 'Computer Vision' | 'Data & LLM Ops' | 'Full Stack AI';
  summary: string;
  bulletPoints: string[];
  techStack: string[];
  architecture?: {
    components: string[];
    diagramLabel?: string;
    flowSummary: string;
  };
  metrics?: { label: string; value: string }[];
  date: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  architectureImageUrl?: string;
  workflowSteps?: {
    step: number;
    title: string;
    subtitle?: string;
    badge?: string;
    items: string[];
    color?: string;
  }[];
  corePillars?: {
    title: string;
    description: string;
    icon?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  type: 'internship' | 'fulltime';
  responsibilities: string[];
  techUsed?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  score?: string;
  status?: string;
  highlights?: string[];
}

export interface SkillCategory {
  title: string;
  badge: string;
  description: string;
  skills: { name: string; tag?: string; level?: 'Advanced' | 'Proficient' | 'Core' }[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year?: string;
  tag: string;
}
