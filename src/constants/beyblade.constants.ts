import { Shield, Sparkles, Swords, Zap } from 'lucide-react';
import type { BeybladeType } from '@/types/beyblade';

export const TYPE_ICONS: Record<BeybladeType, typeof Swords> = {
  Attack: Swords,
  Defense: Shield,
  Stamina: Zap,
  Balance: Sparkles,
};

export const TYPE_COLORS: Record<BeybladeType, string> = {
  Attack: 'bg-mellow-red/20 text-mellow-red',
  Defense: 'bg-mellow-blue/20 text-mellow-blue',
  Stamina: 'bg-mellow-green/20 text-mellow-green',
  Balance: 'bg-mellow-magenta/20 text-mellow-magenta',
};

export const TYPE_ICON_COLORS: Record<BeybladeType, string> = {
  Attack: 'text-mellow-red',
  Defense: 'text-mellow-blue',
  Stamina: 'text-mellow-green',
  Balance: 'text-mellow-magenta',
};
