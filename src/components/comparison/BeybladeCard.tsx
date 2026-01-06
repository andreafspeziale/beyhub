import { CircleDot, Disc3, Hexagon, Shield, Sparkles, Swords, X, Zap } from 'lucide-react';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Beyblade, BeybladeType, TotalStats } from '@/types/beyblade';
import { calculateTotalStats } from '@/utils/calculations';
import { StatBar } from './StatBar';

const typeIcons: Record<BeybladeType, typeof Swords> = {
  Attack: Swords,
  Defense: Shield,
  Stamina: Zap,
  Balance: Sparkles,
};

interface BeybladeCardProps {
  beyblade: Beyblade;
  comparisonBeyblade?: Beyblade;
  onRemove?: (id: string) => void;
}

function ImageWithFallback({ src, alt, name }: { src: string; alt: string; name: string }) {
  const [error, setError] = useState(false);
  const fallbackUrl = `https://placehold.co/400x400?text=${encodeURIComponent(name)}`;

  return (
    <img
      src={error ? fallbackUrl : src}
      alt={alt}
      className="w-full h-48 object-contain"
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}

function TotalStatsDisplay({
  stats,
  comparisonStats,
}: {
  stats: TotalStats;
  comparisonStats?: TotalStats;
}) {
  return (
    <div className="space-y-2">
      <StatBar
        label="Attack"
        value={stats.attack}
        maxValue={300}
        comparisonValue={comparisonStats?.attack}
      />
      <StatBar
        label="Defense"
        value={stats.defense}
        maxValue={300}
        comparisonValue={comparisonStats?.defense}
      />
      <StatBar
        label="Stamina"
        value={stats.stamina}
        maxValue={300}
        comparisonValue={comparisonStats?.stamina}
      />
    </div>
  );
}

export function BeybladeCard({ beyblade, comparisonBeyblade, onRemove }: BeybladeCardProps) {
  const totalStats = calculateTotalStats(beyblade);
  const comparisonTotalStats = comparisonBeyblade
    ? calculateTotalStats(comparisonBeyblade)
    : undefined;

  const typeColors: Record<BeybladeType, string> = {
    Attack: 'bg-mellow-red/20 text-mellow-red',
    Defense: 'bg-mellow-blue/20 text-mellow-blue',
    Stamina: 'bg-mellow-green/20 text-mellow-green',
    Balance: 'bg-mellow-magenta/20 text-mellow-magenta',
  };

  const TypeIcon = typeIcons[beyblade.type];

  return (
    <Card className="w-full group relative">
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(beyblade.id)}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-destructive hover:scale-110 shadow-lg"
          aria-label={`Remove ${beyblade.name}`}
        >
          <X className="h-4 w-4" />
        </button>
      )}
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

        <TotalStatsDisplay stats={totalStats} comparisonStats={comparisonTotalStats} />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details" className="border-none">
            <AccordionTrigger className="hover:no-underline py-2 justify-end gap-2 [&>svg]:ml-0 cursor-pointer">
              <span className="text-sm text-muted-foreground">Details</span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Disc3 className="h-4 w-4 text-mellow-blue" />
                  Blade - {beyblade.bladeName}
                </h4>
                <div className="space-y-2">
                  <StatBar
                    label="Attack"
                    value={beyblade.blade.attack}
                    comparisonValue={comparisonBeyblade?.blade.attack}
                  />
                  <StatBar
                    label="Defense"
                    value={beyblade.blade.defense}
                    comparisonValue={comparisonBeyblade?.blade.defense}
                  />
                  <StatBar
                    label="Stamina"
                    value={beyblade.blade.stamina}
                    comparisonValue={comparisonBeyblade?.blade.stamina}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Hexagon className="h-4 w-4 text-mellow-green" />
                  Ratchet - {beyblade.ratchetName}
                </h4>
                <div className="space-y-2">
                  <StatBar
                    label="Attack"
                    value={beyblade.ratchet.attack}
                    comparisonValue={comparisonBeyblade?.ratchet.attack}
                  />
                  <StatBar
                    label="Defense"
                    value={beyblade.ratchet.defense}
                    comparisonValue={comparisonBeyblade?.ratchet.defense}
                  />
                  <StatBar
                    label="Stamina"
                    value={beyblade.ratchet.stamina}
                    comparisonValue={comparisonBeyblade?.ratchet.stamina}
                  />
                  <StatBar
                    label="Height"
                    value={beyblade.ratchet.height}
                    maxValue={100}
                    comparisonValue={comparisonBeyblade?.ratchet.height}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <CircleDot className="h-4 w-4 text-mellow-red" />
                  Bit - {beyblade.bitName}
                </h4>
                <div className="space-y-2">
                  <StatBar
                    label="Attack"
                    value={beyblade.bit.attack}
                    comparisonValue={comparisonBeyblade?.bit.attack}
                  />
                  <StatBar
                    label="Defense"
                    value={beyblade.bit.defense}
                    comparisonValue={comparisonBeyblade?.bit.defense}
                  />
                  <StatBar
                    label="Stamina"
                    value={beyblade.bit.stamina}
                    comparisonValue={comparisonBeyblade?.bit.stamina}
                  />
                  <StatBar
                    label="Dash"
                    value={beyblade.bit.dash}
                    comparisonValue={comparisonBeyblade?.bit.dash}
                  />
                  <StatBar
                    label="Burst"
                    value={beyblade.bit.burst}
                    comparisonValue={comparisonBeyblade?.bit.burst}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export function BeybladeCardSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-48 mx-auto" />
          <div className="flex justify-center gap-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
        <Skeleton className="h-48 w-full" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export function BeybladeCardPlaceholder() {
  return (
    <div className="w-full rounded-lg border-2 border-dashed border-muted-foreground/30 bg-transparent">
      <div className="p-4 space-y-4">
        {/* Title placeholder */}
        <div className="text-center space-y-2">
          <div className="h-6 w-48 mx-auto rounded bg-muted-foreground/10" />
          <div className="flex justify-center gap-1">
            <div className="h-5 w-16 rounded bg-muted-foreground/10" />
            <div className="h-5 w-20 rounded bg-muted-foreground/10" />
            <div className="h-5 w-12 rounded bg-muted-foreground/10" />
          </div>
        </div>
        {/* Image placeholder */}
        <div className="h-48 w-full rounded bg-muted-foreground/10" />
        {/* Stats placeholder */}
        <div className="space-y-3">
          <div className="h-6 w-full rounded bg-muted-foreground/10" />
          <div className="h-6 w-full rounded bg-muted-foreground/10" />
          <div className="h-6 w-full rounded bg-muted-foreground/10" />
        </div>
        {/* Details placeholder */}
        <div className="h-8 w-full rounded bg-muted-foreground/10" />
      </div>
    </div>
  );
}
