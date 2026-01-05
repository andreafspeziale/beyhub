import { Shield, Sparkles, Swords, Zap } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CompositionStrategy } from '@/types/beyblade';

interface StrategySelectorProps {
  strategy: CompositionStrategy;
  onStrategyChange: (strategy: CompositionStrategy) => void;
}

const strategies: { value: CompositionStrategy; label: string; icon: typeof Swords }[] = [
  { value: 'balanced', label: 'Balanced', icon: Sparkles },
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
      <TabsList className="grid grid-cols-4 w-fit h-11 p-1.5">
        {strategies.map(({ value, label, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="gap-1.5 px-3 cursor-pointer data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=inactive]:hover:bg-accent"
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
