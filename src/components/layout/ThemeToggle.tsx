import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-1 p-1 rounded-full bg-secondary border border-border transition-colors"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <span
        className={`p-1.5 rounded-full transition-colors ${
          !isDark ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
        }`}
      >
        <Sun className="h-4 w-4" />
      </span>
      <span
        className={`p-1.5 rounded-full transition-colors ${
          isDark ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
        }`}
      >
        <Moon className="h-4 w-4" />
      </span>
    </button>
  );
}
