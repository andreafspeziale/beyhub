import { ArrowRight, CircleDot, Disc3, Hexagon, Shield, Sparkles, Swords, Zap } from 'lucide-react';
import { StatBar } from '@/components/comparison/StatBar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { CompositionResult, CompositionStrategy } from '@/types/beyblade';
import { getStrategyLabel } from '@/utils/composition';

const strategyIcons: Record<CompositionStrategy, typeof Swords> = {
  balanced: Sparkles,
  attack: Swords,
  defense: Shield,
  stamina: Zap,
};

const strategyColors: Record<CompositionStrategy, { badge: string; icon: string }> = {
  attack: { badge: 'bg-mellow-red/20 text-mellow-red', icon: 'text-mellow-red' },
  defense: { badge: 'bg-mellow-blue/20 text-mellow-blue', icon: 'text-mellow-blue' },
  stamina: { badge: 'bg-mellow-green/20 text-mellow-green', icon: 'text-mellow-green' },
  balanced: { badge: 'bg-mellow-magenta/20 text-mellow-magenta', icon: 'text-mellow-magenta' },
};

interface CompositionResultCardProps {
  result: CompositionResult;
}

export function CompositionResultCard({ result }: CompositionResultCardProps) {
  const { blade, ratchet, bit, totalStats, strategy } = result;

  const StrategyIcon = strategyIcons[strategy];

  return (
    <Card className="w-full h-full">
      <CardContent className="p-4 space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Best Composition</h3>
          <div className="flex items-center justify-center gap-1.5">
            <Badge className={strategyColors[strategy].badge}>
              <StrategyIcon className={`h-3.5 w-3.5 ${strategyColors[strategy].icon}`} />
            </Badge>
            <span className="text-sm text-muted-foreground">{getStrategyLabel(strategy)}</span>
          </div>
        </div>

        {/* Components breakdown */}
        <div className="space-y-3">
          {/* Blade */}
          <div className="p-3 rounded-lg bg-muted/50 space-y-2">
            <div className="flex items-center gap-2">
              <Disc3 className="h-4 w-4 text-mellow-blue" />
              <span className="font-medium text-sm">Blade</span>
              <span className="text-sm text-muted-foreground">-</span>
              <span className="font-semibold">{blade.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3" />
              <span>from {blade.fromBeybladeName}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <span className="text-muted-foreground">ATK</span>
                <p className="font-semibold">{blade.stats.attack}</p>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground">DEF</span>
                <p className="font-semibold">{blade.stats.defense}</p>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground">STA</span>
                <p className="font-semibold">{blade.stats.stamina}</p>
              </div>
            </div>
          </div>

          {/* Ratchet */}
          <div className="p-3 rounded-lg bg-muted/50 space-y-2">
            <div className="flex items-center gap-2">
              <Hexagon className="h-4 w-4 text-mellow-green" />
              <span className="font-medium text-sm">Ratchet</span>
              <span className="text-sm text-muted-foreground">-</span>
              <span className="font-semibold">{ratchet.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3" />
              <span>from {ratchet.fromBeybladeName}</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="text-center">
                <span className="text-muted-foreground">ATK</span>
                <p className="font-semibold">{ratchet.stats.attack}</p>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground">DEF</span>
                <p className="font-semibold">{ratchet.stats.defense}</p>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground">STA</span>
                <p className="font-semibold">{ratchet.stats.stamina}</p>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground">HGT</span>
                <p className="font-semibold">{ratchet.stats.height}</p>
              </div>
            </div>
          </div>

          {/* Bit */}
          <div className="p-3 rounded-lg bg-muted/50 space-y-2">
            <div className="flex items-center gap-2">
              <CircleDot className="h-4 w-4 text-mellow-red" />
              <span className="font-medium text-sm">Bit</span>
              <span className="text-sm text-muted-foreground">-</span>
              <span className="font-semibold">{bit.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowRight className="h-3 w-3" />
              <span>from {bit.fromBeybladeName}</span>
            </div>
            <div className="grid grid-cols-5 gap-1 text-xs">
              <div className="text-center">
                <span className="text-muted-foreground">ATK</span>
                <p className="font-semibold">{bit.stats.attack}</p>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground">DEF</span>
                <p className="font-semibold">{bit.stats.defense}</p>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground">STA</span>
                <p className="font-semibold">{bit.stats.stamina}</p>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground">DSH</span>
                <p className="font-semibold">{bit.stats.dash}</p>
              </div>
              <div className="text-center">
                <span className="text-muted-foreground">BST</span>
                <p className="font-semibold">{bit.stats.burst}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Stats */}
        <div className="pt-4 border-t space-y-3">
          <h4 className="font-semibold text-center">Combined Stats</h4>
          <div className="space-y-2">
            <StatBar label="Attack" value={totalStats.attack} maxValue={300} />
            <StatBar label="Defense" value={totalStats.defense} maxValue={300} />
            <StatBar label="Stamina" value={totalStats.stamina} maxValue={300} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface CompositionResultPlaceholderProps {
  height?: number;
}

export function CompositionResultPlaceholder({ height }: CompositionResultPlaceholderProps) {
  return (
    <div
      className="w-full h-full rounded-lg border-2 border-dashed border-muted-foreground/30 bg-transparent"
      style={height ? { height } : undefined}
    >
      <div className="p-4 space-y-4 h-full flex flex-col">
        {/* Header - matches title + badges row */}
        <div className="text-center space-y-2">
          <div className="h-7 w-28 mx-auto rounded bg-muted-foreground/10" />
          <div className="h-5 w-20 mx-auto rounded-full bg-muted-foreground/10" />
        </div>

        {/* Content area - expands to fill available space */}
        <div className="flex-1 min-h-48 rounded bg-muted-foreground/5 p-4 flex flex-col justify-center space-y-3">
          {/* Blade */}
          <div className="flex items-center gap-3">
            <Disc3 className="h-5 w-5 text-muted-foreground/30" />
            <div className="h-4 flex-1 rounded bg-muted-foreground/10" />
          </div>
          {/* Ratchet */}
          <div className="flex items-center gap-3">
            <Hexagon className="h-5 w-5 text-muted-foreground/30" />
            <div className="h-4 flex-1 rounded bg-muted-foreground/10" />
          </div>
          {/* Bit */}
          <div className="flex items-center gap-3">
            <CircleDot className="h-5 w-5 text-muted-foreground/30" />
            <div className="h-4 flex-1 rounded bg-muted-foreground/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
