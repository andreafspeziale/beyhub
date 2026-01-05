import { describe, expect, it } from 'vitest';
import type { Beyblade } from '@/types/beyblade';
import { calculateTotalStats, calculateWinProbability, searchBeyblades } from '../calculations';

const createMockBeyblade = (overrides: Partial<Beyblade> = {}): Beyblade => ({
  id: 'test_beyblade',
  name: 'Test Beyblade',
  type: 'Attack',
  bladeName: 'Test',
  ratchetName: '3-60',
  bitName: 'F',
  blade: { attack: 50, defense: 30, stamina: 20 },
  ratchet: { attack: 10, defense: 10, stamina: 10, height: 60 },
  bit: { attack: 20, defense: 20, stamina: 20, dash: 30, burst: 50 },
  image: '/test.png',
  ...overrides,
});

describe('calculateTotalStats', () => {
  it('correctly calculates total attack', () => {
    const beyblade = createMockBeyblade();
    const result = calculateTotalStats(beyblade);
    expect(result.attack).toBe(80); // 50 + 10 + 20
  });

  it('correctly calculates total defense', () => {
    const beyblade = createMockBeyblade();
    const result = calculateTotalStats(beyblade);
    expect(result.defense).toBe(60); // 30 + 10 + 20
  });

  it('correctly calculates total stamina', () => {
    const beyblade = createMockBeyblade();
    const result = calculateTotalStats(beyblade);
    expect(result.stamina).toBe(50); // 20 + 10 + 20
  });

  it('handles zero values', () => {
    const beyblade = createMockBeyblade({
      blade: { attack: 0, defense: 0, stamina: 0 },
      ratchet: { attack: 0, defense: 0, stamina: 0, height: 60 },
      bit: { attack: 0, defense: 0, stamina: 0, dash: 0, burst: 0 },
    });
    const result = calculateTotalStats(beyblade);
    expect(result.attack).toBe(0);
    expect(result.defense).toBe(0);
    expect(result.stamina).toBe(0);
  });
});

describe('calculateWinProbability', () => {
  it('returns 50% for identical beyblades', () => {
    const beyblade = createMockBeyblade();
    const result = calculateWinProbability(beyblade, beyblade);
    expect(result).toBe(50);
  });

  it('returns higher probability for stronger beyblade', () => {
    const strong = createMockBeyblade({
      blade: { attack: 100, defense: 100, stamina: 100 },
      ratchet: { attack: 50, defense: 50, stamina: 50, height: 60 },
      bit: { attack: 50, defense: 50, stamina: 50, dash: 50, burst: 50 },
    });
    const weak = createMockBeyblade({
      blade: { attack: 10, defense: 10, stamina: 10 },
      ratchet: { attack: 5, defense: 5, stamina: 5, height: 60 },
      bit: { attack: 5, defense: 5, stamina: 5, dash: 5, burst: 5 },
    });
    const result = calculateWinProbability(strong, weak);
    expect(result).toBeGreaterThan(50);
  });

  it('clamps probability between 5% and 95%', () => {
    const maxStats = createMockBeyblade({
      blade: { attack: 100, defense: 100, stamina: 100 },
      ratchet: { attack: 100, defense: 100, stamina: 100, height: 100 },
      bit: { attack: 100, defense: 100, stamina: 100, dash: 100, burst: 100 },
    });
    const minStats = createMockBeyblade({
      blade: { attack: 1, defense: 1, stamina: 1 },
      ratchet: { attack: 1, defense: 1, stamina: 1, height: 1 },
      bit: { attack: 1, defense: 1, stamina: 1, dash: 1, burst: 1 },
    });
    const result = calculateWinProbability(maxStats, minStats);
    expect(result).toBeLessThanOrEqual(95);
    expect(result).toBeGreaterThanOrEqual(5);
  });
});

describe('searchBeyblades', () => {
  const beyblades: Beyblade[] = [
    createMockBeyblade({ id: '1', name: 'Impact Drake 9-60LR' }),
    createMockBeyblade({ id: '2', name: 'Hover Wyvern 3-85N' }),
    createMockBeyblade({ id: '3', name: 'Sword Dran 3-60F' }),
  ];

  it('returns all beyblades for empty query', () => {
    const result = searchBeyblades(beyblades, '');
    expect(result).toHaveLength(3);
  });

  it('returns all beyblades for whitespace query', () => {
    const result = searchBeyblades(beyblades, '   ');
    expect(result).toHaveLength(3);
  });

  it('filters by partial name match', () => {
    const result = searchBeyblades(beyblades, 'drake');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Impact Drake 9-60LR');
  });

  it('is case insensitive', () => {
    const result = searchBeyblades(beyblades, 'WYVERN');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Hover Wyvern 3-85N');
  });

  it('returns empty array for no matches', () => {
    const result = searchBeyblades(beyblades, 'xyz');
    expect(result).toHaveLength(0);
  });

  it('matches multiple beyblades', () => {
    const result = searchBeyblades(beyblades, '3-');
    expect(result).toHaveLength(2);
  });
});
