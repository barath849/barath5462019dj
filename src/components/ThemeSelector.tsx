import React from 'react';
import { ThemeType } from '../types';
import { Terminal, Shield, Sparkles } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const themes: { id: ThemeType; label: string; icon: React.ReactNode; colorPreview: string }[] = [
    {
      id: 'cyberpunk',
      label: 'Cyberpunk Neon',
      icon: <Terminal className="w-3.5 h-3.5 text-cyan-400" />,
      colorPreview: 'bg-cyan-500',
    },
    {
      id: 'obsidian',
      label: 'Obsidian Slate',
      icon: <Shield className="w-3.5 h-3.5 text-sky-400" />,
      colorPreview: 'bg-sky-500',
    },
    {
      id: 'midnight',
      label: 'Midnight Amber',
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
      colorPreview: 'bg-amber-500',
    },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shadow-sm">
      <span className="text-[10px] text-slate-400 font-code px-1.5 hidden sm:inline uppercase tracking-wider font-semibold">
        Theme
      </span>
      {themes.map((t) => {
        const isActive = currentTheme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onThemeChange(t.id)}
            className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-all ${
              isActive
                ? 'bg-slate-800 text-white shadow-sm ring-1 ring-white/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
            title={`Switch theme to ${t.label}`}
          >
            <span className={`w-2 h-2 rounded-full ${t.colorPreview} ${isActive ? 'ring-2 ring-white/50' : 'opacity-60'}`} />
            <span className="text-[11px]">{t.id.charAt(0).toUpperCase() + t.id.slice(1)}</span>
          </button>
        );
      })}
    </div>
  );
};
