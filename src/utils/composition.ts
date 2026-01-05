import type {
  Beyblade,
  BitComponent,
  BladeComponent,
  CompositionResult,
  CompositionStrategy,
  RatchetComponent,
  TotalStats,
} from '@/types/beyblade';

function extractBlades(beyblades: Beyblade[]): BladeComponent[] {
  return beyblades.map((b) => ({
    name: b.bladeName,
    stats: b.blade,
    fromBeybladeId: b.id,
    fromBeybladeName: b.name,
  }));
}

function extractRatchets(beyblades: Beyblade[]): RatchetComponent[] {
  return beyblades.map((b) => ({
    name: b.ratchetName,
    stats: b.ratchet,
    fromBeybladeId: b.id,
    fromBeybladeName: b.name,
  }));
}

function extractBits(beyblades: Beyblade[]): BitComponent[] {
  return beyblades.map((b) => ({
    name: b.bitName,
    stats: b.bit,
    fromBeybladeId: b.id,
    fromBeybladeName: b.name,
  }));
}

function scoreBladeByStrategy(blade: BladeComponent, strategy: CompositionStrategy): number {
  const { attack, defense, stamina } = blade.stats;
  switch (strategy) {
    case 'attack':
      return attack;
    case 'defense':
      return defense;
    case 'stamina':
      return stamina;
    case 'balanced':
      return attack + defense + stamina;
  }
}

function scoreRatchetByStrategy(ratchet: RatchetComponent, strategy: CompositionStrategy): number {
  const { attack, defense, stamina } = ratchet.stats;
  switch (strategy) {
    case 'attack':
      return attack;
    case 'defense':
      return defense;
    case 'stamina':
      return stamina;
    case 'balanced':
      return attack + defense + stamina;
  }
}

function scoreBitByStrategy(bit: BitComponent, strategy: CompositionStrategy): number {
  const { attack, defense, stamina, dash, burst } = bit.stats;
  switch (strategy) {
    case 'attack':
      // For attack strategy, prioritize attack and dash
      return attack + dash * 0.5;
    case 'defense':
      // For defense strategy, prioritize defense and burst resistance
      return defense + burst * 0.5;
    case 'stamina':
      return stamina;
    case 'balanced':
      return attack + defense + stamina + dash * 0.3 + burst * 0.3;
  }
}

function findBestBlade(blades: BladeComponent[], strategy: CompositionStrategy): BladeComponent {
  return blades.reduce((best, current) =>
    scoreBladeByStrategy(current, strategy) > scoreBladeByStrategy(best, strategy) ? current : best,
  );
}

function findBestRatchet(
  ratchets: RatchetComponent[],
  strategy: CompositionStrategy,
): RatchetComponent {
  return ratchets.reduce((best, current) =>
    scoreRatchetByStrategy(current, strategy) > scoreRatchetByStrategy(best, strategy)
      ? current
      : best,
  );
}

function findBestBit(bits: BitComponent[], strategy: CompositionStrategy): BitComponent {
  return bits.reduce((best, current) =>
    scoreBitByStrategy(current, strategy) > scoreBitByStrategy(best, strategy) ? current : best,
  );
}

function calculateComposedTotalStats(
  blade: BladeComponent,
  ratchet: RatchetComponent,
  bit: BitComponent,
): TotalStats {
  return {
    attack: blade.stats.attack + ratchet.stats.attack + bit.stats.attack,
    defense: blade.stats.defense + ratchet.stats.defense + bit.stats.defense,
    stamina: blade.stats.stamina + ratchet.stats.stamina + bit.stats.stamina,
  };
}

export function calculateOptimalComposition(
  beyblades: Beyblade[],
  strategy: CompositionStrategy,
): CompositionResult | null {
  if (beyblades.length < 2) {
    return null;
  }

  const blades = extractBlades(beyblades);
  const ratchets = extractRatchets(beyblades);
  const bits = extractBits(beyblades);

  const bestBlade = findBestBlade(blades, strategy);
  const bestRatchet = findBestRatchet(ratchets, strategy);
  const bestBit = findBestBit(bits, strategy);

  return {
    blade: bestBlade,
    ratchet: bestRatchet,
    bit: bestBit,
    totalStats: calculateComposedTotalStats(bestBlade, bestRatchet, bestBit),
    strategy,
  };
}

export function getStrategyLabel(strategy: CompositionStrategy): string {
  switch (strategy) {
    case 'attack':
      return 'Attack';
    case 'defense':
      return 'Defense';
    case 'stamina':
      return 'Stamina';
    case 'balanced':
      return 'Balanced';
  }
}

export function getStrategyDescription(strategy: CompositionStrategy): string {
  switch (strategy) {
    case 'attack':
      return 'Maximize attack power and dash capability';
    case 'defense':
      return 'Maximize defense and burst resistance';
    case 'stamina':
      return 'Maximize stamina for longer battles';
    case 'balanced':
      return 'Optimize for overall performance';
  }
}
