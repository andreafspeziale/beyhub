import { cn } from '@/lib/utils';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  comparisonValue?: number;
  className?: string;
}

export function StatBar({
  label,
  value,
  maxValue = 100,
  comparisonValue,
  className,
}: StatBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100);

  const isHigher = comparisonValue !== undefined && value > comparisonValue;
  const isLower = comparisonValue !== undefined && value < comparisonValue;

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span
          className={cn('font-medium tabular-nums', {
            'text-mellow-green': isHigher,
            'text-mellow-red': isLower,
          })}
        >
          {value}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-300', {
            'bg-mellow-green': isHigher,
            'bg-mellow-red': isLower,
            'bg-mellow-blue': !isHigher && !isLower,
          })}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
