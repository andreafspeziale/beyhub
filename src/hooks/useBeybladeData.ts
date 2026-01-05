import { useEffect, useState } from 'react';
import { BeybladeDataSchema } from '@/schemas/beyblade.schema';
import type { Beyblade } from '@/types/beyblade';

interface UseBeybladeDataResult {
  beyblades: Beyblade[];
  isLoading: boolean;
  error: string | null;
}

export function useBeybladeData(): UseBeybladeDataResult {
  const [beyblades, setBeyblades] = useState<Beyblade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/data/beyblades.json');
        if (!response.ok) {
          throw new Error(`Failed to load beyblade data: ${response.statusText}`);
        }

        const data: unknown = await response.json();
        const result = BeybladeDataSchema.safeParse(data);

        if (!result.success) {
          console.error('Beyblade data validation errors:', result.error.issues);
          throw new Error('Invalid beyblade data format. Check console for details.');
        }

        setBeyblades(result.data.beyblades);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error loading data';
        setError(message);
        console.error('Error loading beyblade data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  return { beyblades, isLoading, error };
}
