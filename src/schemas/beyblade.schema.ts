import { z } from 'zod';

const BladeStatsSchema = z.object({
  attack: z.number().int().min(0).max(100),
  defense: z.number().int().min(0).max(100),
  stamina: z.number().int().min(0).max(100),
});

const RatchetStatsSchema = z.object({
  attack: z.number().int().min(0).max(100),
  defense: z.number().int().min(0).max(100),
  stamina: z.number().int().min(0).max(100),
  height: z.number().int().min(0),
});

const BitStatsSchema = z.object({
  attack: z.number().int().min(0).max(100),
  defense: z.number().int().min(0).max(100),
  stamina: z.number().int().min(0).max(100),
  dash: z.number().int().min(0).max(100),
  burst: z.number().int().min(0).max(100),
});

const BeybladeTypeSchema = z.enum(['Attack', 'Defense', 'Stamina', 'Balance']);

const BeybladeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: BeybladeTypeSchema,
  bladeName: z.string().min(1),
  ratchetName: z.string().min(1),
  bitName: z.string().min(1),
  blade: BladeStatsSchema,
  ratchet: RatchetStatsSchema,
  bit: BitStatsSchema,
  image: z.string().min(1),
});

export const BeybladeDataSchema = z.object({
  beyblades: z.array(BeybladeSchema),
});
