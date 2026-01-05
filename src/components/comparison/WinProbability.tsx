import { Swords } from 'lucide-react';
import type { Beyblade } from '@/types/beyblade';
import { calculateWinProbability } from '@/utils/calculations';

interface WinProbabilityProps {
  beybladeA: Beyblade;
  beybladeB: Beyblade;
}

export function WinProbability({ beybladeA, beybladeB }: WinProbabilityProps) {
  const probabilityA = calculateWinProbability(beybladeA, beybladeB);
  const probabilityB = 100 - probabilityA;

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-4 rounded-lg bg-card border">
      {/* Swords icon at top */}
      <div className="p-2 rounded-full bg-muted">
        <Swords className="h-5 w-5 text-mellow-magenta" />
      </div>

      {/* Probabilities stacked */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-lg font-bold tabular-nums text-mellow-blue">{probabilityA}%</span>
        <span className="text-xs text-muted-foreground">vs</span>
        <span className="text-lg font-bold tabular-nums text-mellow-cyan">{probabilityB}%</span>
      </div>

      {/* Vertical progress bar */}
      <div className="w-2 h-24 bg-muted rounded-full overflow-hidden flex flex-col">
        <div
          className="w-full bg-mellow-blue transition-all duration-300"
          style={{ height: `${probabilityA}%` }}
        />
        <div
          className="w-full bg-mellow-cyan transition-all duration-300"
          style={{ height: `${probabilityB}%` }}
        />
      </div>

      {/* Label at bottom */}
      <span className="text-xs text-muted-foreground whitespace-nowrap">Win Rate</span>
    </div>
  );
}

export function WinProbabilityPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-4 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-transparent">
      {/* Swords icon placeholder */}
      <div className="p-2 rounded-full bg-muted-foreground/10">
        <Swords className="h-5 w-5 text-muted-foreground/30" />
      </div>

      {/* Probabilities placeholder */}
      <div className="flex flex-col items-center gap-1">
        <div className="h-6 w-10 rounded bg-muted-foreground/10" />
        <span className="text-xs text-muted-foreground/30">vs</span>
        <div className="h-6 w-10 rounded bg-muted-foreground/10" />
      </div>

      {/* Vertical bar placeholder */}
      <div className="w-2 h-24 bg-muted-foreground/10 rounded-full" />

      {/* Label */}
      <span className="text-xs text-muted-foreground/30 whitespace-nowrap">Win Rate</span>
    </div>
  );
}
