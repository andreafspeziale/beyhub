import type { Beyblade } from '@/types/beyblade';

export function createMockBeyblade(overrides: Partial<Beyblade> = {}): Beyblade {
  return {
    id: 'test_beyblade',
    name: 'Test Beyblade',
    type: 'Attack',
    bladeName: 'TestBlade',
    ratchetName: '3-60',
    bitName: 'F',
    blade: { attack: 50, defense: 30, stamina: 20 },
    ratchet: { attack: 10, defense: 10, stamina: 10, height: 60 },
    bit: { attack: 20, defense: 20, stamina: 20, dash: 30, burst: 50 },
    image: '/test.png',
    ...overrides,
  };
}
