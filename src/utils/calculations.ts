import type { Beyblade, TotalStats } from '@/types/beyblade';

export function calculateTotalStats(beyblade: Beyblade): TotalStats {
  return {
    attack: beyblade.blade.attack + beyblade.ratchet.attack + beyblade.bit.attack,
    defense: beyblade.blade.defense + beyblade.ratchet.defense + beyblade.bit.defense,
    stamina: beyblade.blade.stamina + beyblade.ratchet.stamina + beyblade.bit.stamina,
  };
}

export function calculateWinProbability(beybladeA: Beyblade, beybladeB: Beyblade): number {
  const statsA = calculateTotalStats(beybladeA);
  const statsB = calculateTotalStats(beybladeB);

  // Weighted scoring based on stat importance
  // Attack: 35%, Defense: 30%, Stamina: 25%, Dash: 5%, Burst: 5%
  const weightedScoreA =
    statsA.attack * 0.35 +
    statsA.defense * 0.3 +
    statsA.stamina * 0.25 +
    beybladeA.bit.dash * 0.05 +
    beybladeA.bit.burst * 0.05;

  const weightedScoreB =
    statsB.attack * 0.35 +
    statsB.defense * 0.3 +
    statsB.stamina * 0.25 +
    beybladeB.bit.dash * 0.05 +
    beybladeB.bit.burst * 0.05;

  // Calculate probability using a simple ratio
  const total = weightedScoreA + weightedScoreB;
  if (total === 0) {
    return 50;
  }

  const probability = (weightedScoreA / total) * 100;

  // Clamp between 5% and 95% to avoid showing absolutes
  return Math.max(5, Math.min(95, Math.round(probability)));
}

export function searchBeyblades(beyblades: Beyblade[], query: string): Beyblade[] {
  if (!query.trim()) {
    return beyblades;
  }

  const lowerQuery = query.toLowerCase();
  return beyblades.filter((beyblade) => beyblade.name.toLowerCase().includes(lowerQuery));
}
