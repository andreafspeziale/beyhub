import { Shield, Sparkles, Swords, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CompositionStrategy } from '@/types/beyblade';

interface StrategySelectorProps {
  strategy: CompositionStrategy;
  onStrategyChange: (strategy: CompositionStrategy) => void;
}

const strategyColors: Record<CompositionStrategy, { badge: string; icon: string }> = {
  balanced: { badge: 'bg-mellow-magenta/20 text-mellow-magenta', icon: 'text-mellow-magenta' },
  attack: { badge: 'bg-mellow-red/20 text-mellow-red', icon: 'text-mellow-red' },
  defense: { badge: 'bg-mellow-blue/20 text-mellow-blue', icon: 'text-mellow-blue' },
  stamina: { badge: 'bg-mellow-green/20 text-mellow-green', icon: 'text-mellow-green' },
};

const strategies: { value: CompositionStrategy; label: string; icon: typeof Swords }[] = [
  { value: 'balanced', label: 'Balance', icon: Sparkles },
  { value: 'attack', label: 'Attack', icon: Swords },
  { value: 'defense', label: 'Defense', icon: Shield },
  { value: 'stamina', label: 'Stamina', icon: Zap },
];

export function StrategySelector({ strategy, onStrategyChange }: StrategySelectorProps) {
  return (
    <Tabs
      value={strategy}
      onValueChange={(value) => onStrategyChange(value as CompositionStrategy)}
    >
      <TabsList className="grid grid-cols-4 w-fit h-12 p-2">
        {strategies.map(({ value, label, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="gap-1.5 px-3 cursor-pointer data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=inactive]:hover:bg-accent"
          >
            <Badge className={strategyColors[value].badge}>
              <Icon className={`h-3.5 w-3.5 ${strategyColors[value].icon}`} />
            </Badge>
            <span className="hidden sm:inline text-base">{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
