import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { STRATEGIES, STRATEGY_COLORS } from '@/constants/strategy.constants';
import type { CompositionStrategy } from '@/types/beyblade';

interface StrategySelectorProps {
  strategy: CompositionStrategy;
  onStrategyChange: (strategy: CompositionStrategy) => void;
}

export function StrategySelector({ strategy, onStrategyChange }: StrategySelectorProps) {
  return (
    <Tabs
      value={strategy}
      onValueChange={(value) => onStrategyChange(value as CompositionStrategy)}
    >
      <TabsList className="grid grid-cols-4 w-fit h-12 p-2">
        {STRATEGIES.map(({ value, label, icon: Icon }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="gap-1.5 px-3 cursor-pointer data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=inactive]:hover:bg-accent"
          >
            <Badge className={STRATEGY_COLORS[value].badge}>
              <Icon className={`h-3.5 w-3.5 ${STRATEGY_COLORS[value].icon}`} />
            </Badge>
            <span className="hidden sm:inline text-base">{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
