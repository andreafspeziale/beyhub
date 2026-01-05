import { Shield, Sparkles, Swords, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { Beyblade, BeybladeType } from '@/types/beyblade';

const typeIcons: Record<BeybladeType, typeof Swords> = {
  Attack: Swords,
  Defense: Shield,
  Stamina: Zap,
  Balance: Sparkles,
};

interface SelectableBeybladeCardProps {
  beyblade: Beyblade;
  onRemove: (id: string) => void;
  compact?: boolean;
}

function ImageWithFallback({
  src,
  alt,
  name,
  compact,
}: {
  src: string;
  alt: string;
  name: string;
  compact?: boolean;
}) {
  const [error, setError] = useState(false);
  const fallbackUrl = `https://placehold.co/400x400?text=${encodeURIComponent(name)}`;

  return (
    <img
      src={error ? fallbackUrl : src}
      alt={alt}
      className={compact ? 'w-full h-24 object-contain' : 'w-full h-48 object-contain'}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}

export function SelectableBeybladeCard({
  beyblade,
  onRemove,
  compact = false,
}: SelectableBeybladeCardProps) {
  const typeColors: Record<BeybladeType, string> = {
    Attack: 'bg-mellow-red/20 text-mellow-red',
    Defense: 'bg-mellow-blue/20 text-mellow-blue',
    Stamina: 'bg-mellow-green/20 text-mellow-green',
    Balance: 'bg-mellow-magenta/20 text-mellow-magenta',
  };

  const TypeIcon = typeIcons[beyblade.type];

  if (compact) {
    return (
      <Card className="w-full max-w-[200px] group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
        <button
          type="button"
          onClick={() => onRemove(beyblade.id)}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive hover:scale-110 shadow-lg"
          aria-label={`Remove ${beyblade.name}`}
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <CardContent className="p-3 space-y-2">
          <div className="flex justify-center">
            <ImageWithFallback
              src={beyblade.image}
              alt={beyblade.name}
              name={beyblade.name}
              compact
            />
          </div>

          <div className="text-center space-y-1.5">
            <h4 className="font-medium text-sm leading-tight line-clamp-2">{beyblade.name}</h4>
            <Badge className={`${typeColors[beyblade.type]} text-xs`}>
              <TypeIcon className="h-3 w-3" />
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full group relative overflow-hidden transition-all duration-200 hover:shadow-lg">
      {/* Remove button - appears on hover with a cool discard effect */}
      <button
        type="button"
        onClick={() => onRemove(beyblade.id)}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive hover:scale-110 shadow-lg"
        aria-label={`Remove ${beyblade.name}`}
      >
        <X className="h-4 w-4" />
      </button>

      <CardContent className="p-4 space-y-4">
        <div className="text-center">
          <h3 className="font-semibold text-lg">{beyblade.name}</h3>
          <div className="flex justify-center gap-1 mt-2 flex-wrap">
            <Badge className={typeColors[beyblade.type]}>
              <TypeIcon className="h-3.5 w-3.5" />
            </Badge>
            <Badge variant="outline">{beyblade.bladeName}</Badge>
            <Badge variant="outline">{beyblade.ratchetName}</Badge>
            <Badge variant="outline">{beyblade.bitName}</Badge>
          </div>
        </div>

        <div className="flex justify-center">
          <ImageWithFallback src={beyblade.image} alt={beyblade.name} name={beyblade.name} />
        </div>
      </CardContent>
    </Card>
  );
}

export function SelectableBeybladeCardSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <div className="text-center space-y-2">
          <div className="h-6 w-48 mx-auto rounded bg-muted animate-pulse" />
          <div className="flex justify-center gap-1">
            <div className="h-5 w-6 rounded bg-muted animate-pulse" />
            <div className="h-5 w-16 rounded bg-muted animate-pulse" />
            <div className="h-5 w-12 rounded bg-muted animate-pulse" />
            <div className="h-5 w-8 rounded bg-muted animate-pulse" />
          </div>
        </div>
        <div className="h-48 w-full rounded bg-muted animate-pulse" />
      </CardContent>
    </Card>
  );
}

export function SelectableBeybladeCardPlaceholder() {
  return (
    <div className="w-full rounded-lg border-2 border-dashed border-muted-foreground/30 bg-transparent">
      <div className="p-4 space-y-4">
        {/* Title placeholder - matches h-7 (text-lg font-semibold) */}
        <div className="text-center space-y-2">
          <div className="h-7 w-40 mx-auto rounded bg-muted-foreground/10" />
          {/* Badges placeholder - matches 4 badges with gap-1 mt-2 */}
          <div className="flex justify-center gap-1 flex-wrap">
            <div className="h-5 w-6 rounded-full bg-muted-foreground/10" />
            <div className="h-5 w-16 rounded-full bg-muted-foreground/10" />
            <div className="h-5 w-12 rounded-full bg-muted-foreground/10" />
            <div className="h-5 w-8 rounded-full bg-muted-foreground/10" />
          </div>
        </div>
        {/* Image placeholder - matches h-48 */}
        <div className="h-48 w-full rounded bg-muted-foreground/10" />
      </div>
    </div>
  );
}
