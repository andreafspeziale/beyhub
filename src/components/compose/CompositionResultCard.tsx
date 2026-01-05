import { ArrowRight, CircleDot, Disc3, Hexagon } from 'lucide-react';
import { StatBar } from '@/components/comparison/StatBar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { CompositionResult } from '@/types/beyblade';
import { getStrategyLabel } from '@/utils/composition';

interface CompositionResultCardProps {
  result: CompositionResult;
}

export function CompositionResultCard({ result }: CompositionResultCardProps) {
  const { blade, ratchet, bit, totalStats, strategy } = result;

  const strategyColors: Record<string, string> = {
    attack: 'bg-mellow-red/20 text-mellow-red',
    defense: 'bg-mellow-blue/20 text-mellow-blue',
    stamina: 'bg-mellow-green/20 text-mellow-green',
    balanced: 'bg-mellow-magenta/20 text-mellow-magenta',
  };

  return (
    <Card className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Optimal Composition</h3>
          <Badge className={strategyColors[strategy]}>{getStrategyLabel(strategy)}</Badge>
        </div>

        {/* Composition Name */}
        <div className="flex items-center justify-center gap-2 text-xl font-bold">
          <span>{blade.name}</span>
          <span className="text-muted-foreground">+</span>
          <span>{ratchet.name}</span>
          <span className="text-muted-foreground">+</span>
          <span>{bit.name}</span>
        </div>

        {/* Components breakdown */}
        <div className="space-y-4">
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

export function CompositionResultPlaceholder() {
  return (
    <div className="w-full max-w-md min-w-80 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-transparent">
      <div className="p-4 space-y-4">
        {/* Header placeholder */}
        <div className="text-center space-y-1.5">
          <div className="h-5 w-32 mx-auto rounded bg-muted-foreground/10" />
          <div className="h-4 w-16 mx-auto rounded-full bg-muted-foreground/10" />
        </div>

        {/* Composition name placeholder */}
        <div className="flex items-center justify-center gap-1.5">
          <div className="h-5 w-14 rounded bg-muted-foreground/10" />
          <span className="text-muted-foreground/30">+</span>
          <div className="h-5 w-10 rounded bg-muted-foreground/10" />
          <span className="text-muted-foreground/30">+</span>
          <div className="h-5 w-6 rounded bg-muted-foreground/10" />
        </div>

        {/* Components breakdown - compact with stats inline */}
        <div className="space-y-2">
          {/* Blade */}
          <div className="p-2 rounded-lg bg-muted-foreground/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Disc3 className="h-4 w-4 text-muted-foreground/20" />
              <div className="h-4 w-16 rounded bg-muted-foreground/10" />
            </div>
            <div className="flex gap-1.5">
              <div className="h-4 w-8 rounded bg-muted-foreground/10" />
              <div className="h-4 w-8 rounded bg-muted-foreground/10" />
              <div className="h-4 w-8 rounded bg-muted-foreground/10" />
            </div>
          </div>

          {/* Ratchet */}
          <div className="p-2 rounded-lg bg-muted-foreground/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hexagon className="h-4 w-4 text-muted-foreground/20" />
              <div className="h-4 w-12 rounded bg-muted-foreground/10" />
            </div>
            <div className="flex gap-1.5">
              <div className="h-4 w-6 rounded bg-muted-foreground/10" />
              <div className="h-4 w-6 rounded bg-muted-foreground/10" />
              <div className="h-4 w-6 rounded bg-muted-foreground/10" />
              <div className="h-4 w-6 rounded bg-muted-foreground/10" />
            </div>
          </div>

          {/* Bit */}
          <div className="p-2 rounded-lg bg-muted-foreground/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CircleDot className="h-4 w-4 text-muted-foreground/20" />
              <div className="h-4 w-10 rounded bg-muted-foreground/10" />
            </div>
            <div className="flex gap-1">
              <div className="h-4 w-5 rounded bg-muted-foreground/10" />
              <div className="h-4 w-5 rounded bg-muted-foreground/10" />
              <div className="h-4 w-5 rounded bg-muted-foreground/10" />
              <div className="h-4 w-5 rounded bg-muted-foreground/10" />
              <div className="h-4 w-5 rounded bg-muted-foreground/10" />
            </div>
          </div>
        </div>

        {/* Total Stats placeholder */}
        <div className="pt-3 border-t border-muted-foreground/10 space-y-2">
          <div className="h-4 w-24 mx-auto rounded bg-muted-foreground/10" />
          <div className="space-y-1.5">
            <div className="h-4 w-full rounded bg-muted-foreground/10" />
            <div className="h-4 w-full rounded bg-muted-foreground/10" />
            <div className="h-4 w-full rounded bg-muted-foreground/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
