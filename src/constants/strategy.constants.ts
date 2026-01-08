import { Shield, Sparkles, Swords, Zap } from 'lucide-react';
import type { CompositionStrategy } from '@/types/beyblade';

export const STRATEGY_ICONS: Record<CompositionStrategy, typeof Swords> = {
  balanced: Sparkles,
  attack: Swords,
  defense: Shield,
  stamina: Zap,
};

export const STRATEGY_COLORS: Record<CompositionStrategy, { badge: string; icon: string }> = {
  balanced: { badge: 'bg-mellow-magenta/20 text-mellow-magenta', icon: 'text-mellow-magenta' },
  attack: { badge: 'bg-mellow-red/20 text-mellow-red', icon: 'text-mellow-red' },
  defense: { badge: 'bg-mellow-blue/20 text-mellow-blue', icon: 'text-mellow-blue' },
  stamina: { badge: 'bg-mellow-green/20 text-mellow-green', icon: 'text-mellow-green' },
};

export const STRATEGIES: { value: CompositionStrategy; label: string; icon: typeof Swords }[] = [
  { value: 'balanced', label: 'Balance', icon: Sparkles },
  { value: 'attack', label: 'Attack', icon: Swords },
  { value: 'defense', label: 'Defense', icon: Shield },
  { value: 'stamina', label: 'Stamina', icon: Zap },
];
