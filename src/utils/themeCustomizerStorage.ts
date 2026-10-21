import { CustomThemeSettings, PersonalInfo } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

const THEME_SETTINGS_KEY = 'barathraj_portfolio_theme_settings_v2';
const PERSONAL_INFO_KEY = 'barathraj_portfolio_personal_info_v2';

export const DEFAULT_THEME_SETTINGS: CustomThemeSettings = {
  themePreset: 'cyberpunk',
  wallpaper: 'grid',
  motion: 'neural-synapse',
  backgroundColor: 'cyber-navy',
  customBgColor: '#070b12',
  blur: 'medium',
  removeWatermark: true,
  videoOpacity: 0.28,

  fontFamily: 'inter',
  codeFont: 'fira',
  colorPalette: 'cyan',
  customAccentColor: '#00f2fe',
  lineStyle: 'solid',
  borderRadius: 'rounded',
  boxStyle: 'glass',
  borderGlowIntensity: 'high',
};

export function getStoredThemeSettings(): CustomThemeSettings {
  try {
    const raw = localStorage.getItem(THEME_SETTINGS_KEY);
    if (raw) {
      return { ...DEFAULT_THEME_SETTINGS, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error('Failed to parse theme settings:', err);
  }
  return DEFAULT_THEME_SETTINGS;
}

export function saveThemeSettings(settings: CustomThemeSettings): void {
  try {
    localStorage.setItem(THEME_SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save theme settings:', err);
  }
}

export function resetThemeSettings(): CustomThemeSettings {
  saveThemeSettings(DEFAULT_THEME_SETTINGS);
  return DEFAULT_THEME_SETTINGS;
}

export function getStoredPersonalInfo(): PersonalInfo {
  try {
    const raw = localStorage.getItem(PERSONAL_INFO_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      let changed = false;
      if (!parsed.github || parsed.github === 'https://github.com/barathraj-b') {
        parsed.github = PERSONAL_INFO.github;
        changed = true;
      }
      if (!parsed.linkedIn || !parsed.linkedIn.includes('barathraj-b-5203b7384')) {
        parsed.linkedIn = PERSONAL_INFO.linkedIn;
        changed = true;
      }
      if (changed) {
        localStorage.setItem(PERSONAL_INFO_KEY, JSON.stringify({ ...PERSONAL_INFO, ...parsed }));
      }
      return { ...PERSONAL_INFO, ...parsed };
    }
  } catch (err) {
    console.error('Failed to parse personal info:', err);
  }
  return PERSONAL_INFO;
}

export function savePersonalInfo(info: PersonalInfo): void {
  try {
    localStorage.setItem(PERSONAL_INFO_KEY, JSON.stringify(info));
  } catch (err) {
    console.error('Failed to save personal info:', err);
  }
}

export function resetPersonalInfo(): PersonalInfo {
  savePersonalInfo(PERSONAL_INFO);
  return PERSONAL_INFO;
}
