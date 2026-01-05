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
import type { Beyblade, CompositionStrategy } from '@/types/beyblade';
import { calculateOptimalComposition } from '@/utils/composition';

export function ComposePage() {
  const { beyblades, isLoading, error } = useBeybladeData();
  const [selectedBeyblades, setSelectedBeyblades] = useState<Beyblade[]>([]);
  const [strategy, setStrategy] = useState<CompositionStrategy>('balanced');

  const selectedIds = selectedBeyblades.map((b) => b.id);
  const compositionResult = calculateOptimalComposition(selectedBeyblades, strategy);

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
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading beyblades...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center">
        {/* Strategy selector */}
        <div className="mb-6">
          <StrategySelector strategy={strategy} onStrategyChange={setStrategy} />
        </div>

        <div className="w-full max-w-5xl">
          {/* Consistent grid layout: selections on left, composition on right */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
            {/* Left side: Beyblade selections grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              {/* Render all selected beyblades */}
              {selectedBeyblades.map((beyblade) => (
                <div key={beyblade.id}>
                  <SelectableBeybladeCard beyblade={beyblade} onRemove={handleRemoveBeyblade} />
                </div>
              ))}

              {/* Show two placeholders at first loading, one placeholder after selections */}
              {selectedBeyblades.length === 0 && (
                <>
                  {/* First placeholder with search */}
                  <div className="flex flex-col gap-4">
                    <SelectableBeybladeCardPlaceholder />
                    <BeybladeSearch
                      beyblades={beyblades}
                      selectedId={null}
                      excludeIds={selectedIds}
                      onSelect={handleAddBeyblade}
                      placeholder="Type a Beyblade..."
                    />
                  </div>
                  {/* Second placeholder (no search) */}
                  <div className="hidden sm:flex flex-col gap-4">
                    <SelectableBeybladeCardPlaceholder />
                  </div>
                </>
              )}

              {/* Next selection placeholder with search (after at least one selection) */}
              {selectedBeyblades.length > 0 && (
                <div className="flex flex-col gap-4">
                  <SelectableBeybladeCardPlaceholder />
                  <BeybladeSearch
                    beyblades={beyblades}
                    selectedId={null}
                    excludeIds={selectedIds}
                    onSelect={handleAddBeyblade}
                    placeholder="Type a Beyblade..."
                  />
                </div>
              )}
            </div>

            {/* Right side: Composition result */}
            <div className="hidden md:flex items-start justify-center">
              {compositionResult ? (
                <CompositionResultCard result={compositionResult} />
              ) : (
                <CompositionResultPlaceholder />
              )}
            </div>
          </div>

          {/* Mobile: Composition result below cards */}
          <div className="flex md:hidden justify-center mt-4">
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
