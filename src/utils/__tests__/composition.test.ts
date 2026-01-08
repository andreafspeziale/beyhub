import { describe, expect, it } from 'vitest';
import { calculateOptimalComposition, getStrategyLabel } from '../composition';
import { createMockBeyblade } from './fixtures';

describe('calculateOptimalComposition', () => {
  it('returns null for less than 2 beyblades', () => {
    const result = calculateOptimalComposition([createMockBeyblade()], 'balanced');
    expect(result).toBeNull();
  });

  it('returns null for empty array', () => {
    const result = calculateOptimalComposition([], 'balanced');
    expect(result).toBeNull();
  });

  it('returns composition for 2 beyblades', () => {
    const beyblades = [
      createMockBeyblade({ id: '1', name: 'Beyblade 1' }),
      createMockBeyblade({ id: '2', name: 'Beyblade 2' }),
    ];
    const result = calculateOptimalComposition(beyblades, 'balanced');
    expect(result).not.toBeNull();
    expect(result?.blade).toBeDefined();
    expect(result?.ratchet).toBeDefined();
    expect(result?.bit).toBeDefined();
  });

  it('selects best blade for attack strategy', () => {
    const beyblades = [
      createMockBeyblade({
        id: '1',
        name: 'Weak Attack',
        bladeName: 'WeakBlade',
        blade: { attack: 10, defense: 50, stamina: 50 },
      }),
      createMockBeyblade({
        id: '2',
        name: 'Strong Attack',
        bladeName: 'StrongBlade',
        blade: { attack: 100, defense: 10, stamina: 10 },
      }),
    ];
    const result = calculateOptimalComposition(beyblades, 'attack');
    expect(result?.blade.name).toBe('StrongBlade');
    expect(result?.blade.fromBeybladeName).toBe('Strong Attack');
  });

  it('selects best blade for defense strategy', () => {
    const beyblades = [
      createMockBeyblade({
        id: '1',
        name: 'Strong Defense',
        bladeName: 'DefenseBlade',
        blade: { attack: 10, defense: 100, stamina: 10 },
      }),
      createMockBeyblade({
        id: '2',
        name: 'Weak Defense',
        bladeName: 'AttackBlade',
        blade: { attack: 100, defense: 10, stamina: 10 },
      }),
    ];
    const result = calculateOptimalComposition(beyblades, 'defense');
    expect(result?.blade.name).toBe('DefenseBlade');
  });

  it('selects best blade for stamina strategy', () => {
    const beyblades = [
      createMockBeyblade({
        id: '1',
        name: 'Strong Stamina',
        bladeName: 'StaminaBlade',
        blade: { attack: 10, defense: 10, stamina: 100 },
      }),
      createMockBeyblade({
        id: '2',
        name: 'Weak Stamina',
        bladeName: 'OtherBlade',
        blade: { attack: 50, defense: 50, stamina: 10 },
      }),
    ];
    const result = calculateOptimalComposition(beyblades, 'stamina');
    expect(result?.blade.name).toBe('StaminaBlade');
  });

  it('selects best blade for balanced strategy (highest total)', () => {
    const beyblades = [
      createMockBeyblade({
        id: '1',
        name: 'Balanced',
        bladeName: 'BalancedBlade',
        blade: { attack: 50, defense: 50, stamina: 50 },
      }),
      createMockBeyblade({
        id: '2',
        name: 'Specialized',
        bladeName: 'SpecializedBlade',
        blade: { attack: 100, defense: 10, stamina: 10 },
      }),
    ];
    const result = calculateOptimalComposition(beyblades, 'balanced');
    expect(result?.blade.name).toBe('BalancedBlade');
  });

  it('calculates correct total stats for composition', () => {
    const beyblades = [
      createMockBeyblade({
        id: '1',
        blade: { attack: 50, defense: 30, stamina: 20 },
        ratchet: { attack: 10, defense: 10, stamina: 10, height: 60 },
        bit: { attack: 20, defense: 20, stamina: 20, dash: 30, burst: 50 },
      }),
      createMockBeyblade({
        id: '2',
        blade: { attack: 50, defense: 30, stamina: 20 },
        ratchet: { attack: 10, defense: 10, stamina: 10, height: 60 },
        bit: { attack: 20, defense: 20, stamina: 20, dash: 30, burst: 50 },
      }),
    ];
    const result = calculateOptimalComposition(beyblades, 'balanced');
    expect(result?.totalStats.attack).toBe(80);
    expect(result?.totalStats.defense).toBe(60);
    expect(result?.totalStats.stamina).toBe(50);
  });

  it('can mix components from different beyblades', () => {
    const beyblades = [
      createMockBeyblade({
        id: '1',
        name: 'Best Blade Source',
        bladeName: 'BestBlade',
        blade: { attack: 80, defense: 80, stamina: 80 }, // Total: 240 (best)
        ratchetName: 'WeakRatchet',
        ratchet: { attack: 10, defense: 10, stamina: 10, height: 60 },
        bitName: 'WeakBit',
        bit: { attack: 10, defense: 10, stamina: 10, dash: 10, burst: 10 },
      }),
      createMockBeyblade({
        id: '2',
        name: 'Best Parts Source',
        bladeName: 'WeakBlade',
        blade: { attack: 20, defense: 20, stamina: 20 }, // Total: 60 (weak)
        ratchetName: 'BestRatchet',
        ratchet: { attack: 50, defense: 50, stamina: 50, height: 80 }, // Total: 150 (best)
        bitName: 'BestBit',
        bit: { attack: 40, defense: 40, stamina: 40, dash: 40, burst: 40 }, // Best
      }),
    ];
    const result = calculateOptimalComposition(beyblades, 'balanced');

    // Should mix: best blade from #1, best ratchet and bit from #2
    expect(result?.blade.fromBeybladeId).toBe('1');
    expect(result?.blade.name).toBe('BestBlade');
    expect(result?.ratchet.fromBeybladeId).toBe('2');
    expect(result?.ratchet.name).toBe('BestRatchet');
    expect(result?.bit.fromBeybladeId).toBe('2');
    expect(result?.bit.name).toBe('BestBit');
  });
});

describe('getStrategyLabel', () => {
  it('returns correct labels', () => {
    expect(getStrategyLabel('attack')).toBe('Attack');
    expect(getStrategyLabel('defense')).toBe('Defense');
    expect(getStrategyLabel('stamina')).toBe('Stamina');
    expect(getStrategyLabel('balanced')).toBe('Balance');
  });
});
