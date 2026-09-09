'use client';

import { Sun, Moon, ToggleLeft, ToggleRight } from 'lucide-react';
import { useTheme } from '@/app/theme-context';
import { JSX } from 'react/jsx-runtime';

export default function ThemeToggle() {
  const { theme, setTheme, isDarkMode } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  // Get appropriate icon based on current theme
  let icon: JSX.Element;
  let label: string;

  if (theme === 'system') {
    icon = <ToggleLeft className="h-4 w-4" />;
    label = 'System';
  } else if (theme === 'dark') {
    icon = <Moon className="h-4 w-4" />;
    label = 'Dark';
  } else {
    icon = <Sun className="h-4 w-4" />;
    label = 'Light';
  }

  return (
    <div className="relative inline-flex items-center space-x-2">
      <button
        onClick={() => {
          const next =
            theme === 'system'
              ? 'light'
              : theme === 'light'
                ? 'dark'
                : 'system';
          handleThemeChange(next);
        }}
        className="p-2 rounded-full hover:bg-surface-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        aria-label="Toggle theme"
      >
        {icon}
      </button>
      <span className="text-xs font-mono text-foreground/70">{label}</span>
    </div>
  );
}