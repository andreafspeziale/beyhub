import { useState } from 'react';
import {
  BeybladeCard,
  BeybladeCardPlaceholder,
  BeybladeCardSkeleton,
} from '@/components/comparison/BeybladeCard';
import { BeybladeSearch } from '@/components/comparison/BeybladeSearch';
import { WinProbability, WinProbabilityPlaceholder } from '@/components/comparison/WinProbability';
import { Layout } from '@/components/layout/Layout';
import { useBeybladeData } from '@/hooks/useBeybladeData';
import type { Beyblade } from '@/types/beyblade';

export function ComparePage() {
  const { beyblades, isLoading, error } = useBeybladeData();
  const [leftBeyblade, setLeftBeyblade] = useState<Beyblade | null>(null);
  const [rightBeyblade, setRightBeyblade] = useState<Beyblade | null>(null);

  const bothSelected = leftBeyblade && rightBeyblade;

  if (error) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 rounded-lg bg-destructive/10 max-w-md">
            <h2 className="text-lg font-semibold text-destructive mb-2">Error Loading Data</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4">
            <BeybladeCardSkeleton />
            <div className="hidden md:block" />
            <BeybladeCardSkeleton />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          {/* 3-column grid: left card | win probability | right card */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
            {/* Left column: card + search */}
            <div className="flex flex-col gap-4">
              {leftBeyblade ? (
                <BeybladeCard
                  beyblade={leftBeyblade}
                  comparisonBeyblade={rightBeyblade ?? undefined}
                  onRemove={() => setLeftBeyblade(null)}
                />
              ) : (
                <>
                  <BeybladeCardPlaceholder />
                  <BeybladeSearch
                    beyblades={beyblades}
                    selectedId={null}
                    excludeId={rightBeyblade?.id ?? null}
                    onSelect={setLeftBeyblade}
                    placeholder="Type a Beyblade"
                    enableShortcut
                  />
                </>
              )}
            </div>

            {/* Center column: Win probability */}
            <div className="hidden md:flex items-start justify-center">
              {bothSelected ? (
                <WinProbability beybladeA={leftBeyblade} beybladeB={rightBeyblade} />
              ) : (
                <WinProbabilityPlaceholder />
              )}
            </div>

            {/* Right column: card + search */}
            <div className="flex flex-col gap-4">
              {rightBeyblade ? (
                <BeybladeCard
                  beyblade={rightBeyblade}
                  comparisonBeyblade={leftBeyblade ?? undefined}
                  onRemove={() => setRightBeyblade(null)}
                />
              ) : (
                <>
                  <BeybladeCardPlaceholder />
                  {leftBeyblade && (
                    <BeybladeSearch
                      beyblades={beyblades}
                      selectedId={null}
                      excludeId={leftBeyblade?.id ?? null}
                      onSelect={setRightBeyblade}
                      placeholder="Type a Beyblade"
                      enableShortcut
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile: Win probability below cards */}
          <div className="flex md:hidden justify-center mt-4">
            {bothSelected ? (
              <WinProbability beybladeA={leftBeyblade} beybladeB={rightBeyblade} />
            ) : (
              <WinProbabilityPlaceholder />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
