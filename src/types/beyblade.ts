export interface BladeStats {
  attack: number;
  defense: number;
  stamina: number;
}

export interface RatchetStats {
  attack: number;
  defense: number;
  stamina: number;
  height: number;
}

export interface BitStats {
  attack: number;
  defense: number;
  stamina: number;
  dash: number;
  burst: number;
}

export type BeybladeType = 'Attack' | 'Defense' | 'Stamina' | 'Balance';

export interface Beyblade {
  id: string;
  name: string;
  type: BeybladeType;
  bladeName: string;
  ratchetName: string;
  bitName: string;
  blade: BladeStats;
  ratchet: RatchetStats;
  bit: BitStats;
  image: string;
}

export interface BeybladeData {
  beyblades: Beyblade[];
}

export interface TotalStats {
  attack: number;
  defense: number;
  stamina: number;
}

export type CompositionStrategy = 'balanced' | 'attack' | 'defense' | 'stamina';

export interface BladeComponent {
  name: string;
  stats: BladeStats;
  fromBeybladeId: string;
  fromBeybladeName: string;
}

export interface RatchetComponent {
  name: string;
  stats: RatchetStats;
  fromBeybladeId: string;
  fromBeybladeName: string;
}

export interface BitComponent {
  name: string;
  stats: BitStats;
  fromBeybladeId: string;
  fromBeybladeName: string;
}

export interface CompositionResult {
  blade: BladeComponent;
  ratchet: RatchetComponent;
  bit: BitComponent;
  totalStats: TotalStats;
  strategy: CompositionStrategy;
}
