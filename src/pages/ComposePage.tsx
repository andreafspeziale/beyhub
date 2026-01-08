import { useState } from 'react';
import { BeybladeSearch } from '@/components/comparison/BeybladeSearch';
import {
  CompositionResultCard,
  CompositionResultPlaceholder,
} from '@/components/compose/CompositionResultCard';
import {
  SelectableBeybladeCard,
  SelectableBeybladeCardPlaceholder,
} from '@/components/compose/SelectableBeybladeCard';
import { StrategySelector } from '@/components/compose/StrategySelector';
import { Layout } from '@/components/layout/Layout';
import { useBeybladeData } from '@/hooks/useBeybladeData';
import { useElementHeight } from '@/hooks/useElementHeight';
import type { Beyblade, CompositionStrategy } from '@/types/beyblade';
import { calculateOptimalComposition } from '@/utils/composition';

const GAP_PX = 16; // gap-4 = 16px
const DEFAULT_CARD_HEIGHT = 348; // Default card height in pixels

export function ComposePage() {
  const { beyblades, isLoading, error } = useBeybladeData();
  const [selectedBeyblades, setSelectedBeyblades] = useState<Beyblade[]>([]);
  const [strategy, setStrategy] = useState<CompositionStrategy>('balanced');
  const { ref: measureRef, height: cardHeight } = useElementHeight<HTMLDivElement>({
    defaultHeight: DEFAULT_CARD_HEIGHT,
  });

  const selectedIds = selectedBeyblades.map((b) => b.id);
  const compositionResult = calculateOptimalComposition(selectedBeyblades, strategy);

  // Height for composition result: 2 cards + 1 gap
  const compositionHeight = cardHeight * 2 + GAP_PX;

  const handleAddBeyblade = (beyblade: Beyblade) => {
    if (!selectedIds.includes(beyblade.id)) {
      setSelectedBeyblades((prev) => [...prev, beyblade]);
    }
  };

  const handleRemoveBeyblade = (id: string) => {
    setSelectedBeyblades((prev) => prev.filter((b) => b.id !== id));
  };

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
    return <Layout>{null}</Layout>;
  }

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center">
        {/* Strategy selector */}
        <div className="mb-6">
          <StrategySelector strategy={strategy} onStrategyChange={setStrategy} />
        </div>

        <div className="w-full max-w-6xl">
          {/* 3-column layout: 2 beyblade columns + 1 composition column */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left 2 columns: Beyblade selections */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 items-start content-start">
              {/* Render all selected beyblades - first one is measured */}
              {selectedBeyblades.map((beyblade, index) => (
                <div key={beyblade.id} ref={index === 0 ? measureRef : undefined}>
                  <SelectableBeybladeCard beyblade={beyblade} onRemove={handleRemoveBeyblade} />
                </div>
              ))}

              {/* Show two placeholders at first loading, one placeholder after selections */}
              {selectedBeyblades.length === 0 && (
                <>
                  {/* First placeholder with search */}
                  <div className="flex flex-col gap-4">
                    <SelectableBeybladeCardPlaceholder height={cardHeight} />
                    <BeybladeSearch
                      beyblades={beyblades}
                      selectedId={null}
                      excludeIds={selectedIds}
                      onSelect={handleAddBeyblade}
                      placeholder="Type a Beyblade"
                      enableShortcut
                    />
                  </div>
                  {/* Second placeholder (no search) */}
                  <div className="hidden sm:flex flex-col gap-4">
                    <SelectableBeybladeCardPlaceholder height={cardHeight} />
                  </div>
                </>
              )}

              {/* Next selection placeholder with search (after at least one selection) */}
              {selectedBeyblades.length > 0 && (
                <div className="flex flex-col gap-4">
                  <SelectableBeybladeCardPlaceholder height={cardHeight} />
                  <BeybladeSearch
                    beyblades={beyblades}
                    selectedId={null}
                    excludeIds={selectedIds}
                    onSelect={handleAddBeyblade}
                    placeholder="Type a Beyblade"
                    enableShortcut
                  />
                </div>
              )}
            </div>

            {/* Right column: Composition result (desktop) */}
            <div
              className="hidden lg:block self-start"
              style={compositionResult ? { height: compositionHeight } : undefined}
            >
              {compositionResult ? (
                <CompositionResultCard result={compositionResult} />
              ) : (
                <CompositionResultPlaceholder height={cardHeight} />
              )}
            </div>
          </div>

          {/* Mobile/Tablet: Composition result below cards */}
          <div className="flex lg:hidden justify-center mt-4">
            {compositionResult ? (
              <CompositionResultCard result={compositionResult} />
            ) : (
              <CompositionResultPlaceholder />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
