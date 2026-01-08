import { X } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TYPE_COLORS, TYPE_ICONS } from '@/constants/beyblade.constants';
import type { Beyblade } from '@/types/beyblade';

interface SelectableBeybladeCardProps {
  beyblade: Beyblade;
  onRemove: (id: string) => void;
  compact?: boolean;
}

export function SelectableBeybladeCard({
  beyblade,
  onRemove,
  compact = false,
}: SelectableBeybladeCardProps) {
  const TypeIcon = TYPE_ICONS[beyblade.type];

  if (compact) {
    return (
      <Card className="w-full max-w-[200px] group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
        <button
          type="button"
          onClick={() => onRemove(beyblade.id)}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive hover:scale-110 shadow-lg cursor-pointer"
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
              className="w-full h-24"
            />
          </div>

          <div className="text-center space-y-1.5">
            <h4 className="font-medium text-sm leading-tight line-clamp-2">{beyblade.name}</h4>
            <Badge className={`${TYPE_COLORS[beyblade.type]} text-xs`}>
              <TypeIcon className="h-3 w-3" />
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full group relative overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col">
      {/* Remove button - appears on hover with a cool discard effect */}
      <button
        type="button"
        onClick={() => onRemove(beyblade.id)}
        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive hover:scale-110 shadow-lg cursor-pointer"
        aria-label={`Remove ${beyblade.name}`}
      >
        <X className="h-4 w-4" />
      </button>

      <CardContent className="p-4 space-y-4 flex-1 flex flex-col">
        <div className="text-center">
          <h3 className="font-semibold text-lg">{beyblade.name}</h3>
          <div className="flex justify-center gap-1 mt-2 flex-wrap">
            <Badge className={TYPE_COLORS[beyblade.type]}>
              <TypeIcon className="h-3.5 w-3.5" />
            </Badge>
            <Badge variant="outline">{beyblade.bladeName}</Badge>
            <Badge variant="outline">{beyblade.ratchetName}</Badge>
            <Badge variant="outline">{beyblade.bitName}</Badge>
          </div>
        </div>

        <div className="flex justify-center flex-1 items-center">
          <ImageWithFallback
            src={beyblade.image}
            alt={beyblade.name}
            name={beyblade.name}
            className="w-full h-48"
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface SelectableBeybladeCardPlaceholderProps {
  height?: number;
}

export function SelectableBeybladeCardPlaceholder({
  height,
}: SelectableBeybladeCardPlaceholderProps) {
  return (
    <div
      className="w-full rounded-lg border-2 border-dashed border-muted-foreground/30 bg-transparent flex flex-col"
      style={height ? { height } : undefined}
    >
      <div className="p-4 space-y-4 flex-1 flex flex-col">
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
        {/* Image placeholder - expands to fill available space */}
        <div className="flex-1 min-h-48 w-full rounded bg-muted-foreground/10" />
      </div>
    </div>
  );
}
