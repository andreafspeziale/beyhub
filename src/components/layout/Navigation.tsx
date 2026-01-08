import { NavLink } from 'react-router';
import { cn } from '@/lib/utils';

export function Navigation() {
  return (
    <nav className="flex items-center gap-1">
      <NavLink
        to="/compare"
        className={({ isActive }) =>
          cn(
            'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent',
          )
        }
      >
        Compare
      </NavLink>
      <NavLink
        to="/compose"
        className={({ isActive }) =>
          cn(
            'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent',
          )
        }
      >
        Compose
      </NavLink>
    </nav>
  );
}
