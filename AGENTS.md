# AGENTS.md - BeyHub Coding Agent Guidelines

## Project Overview

BeyHub is a React 19 + TypeScript SPA built with Vite for comparing Beyblade stats.

- **Runtime**: Bun
- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS 4 + shadcn/ui (new-york style)
- **Validation**: Zod
- **Linting/Formatting**: Biome
- **Testing**: Vitest + React Testing Library

## Build/Lint/Test Commands

```bash
bun run dev              # Start Vite dev server
bun run build            # TypeScript check + Vite production build
bun run lint             # Run Biome linter on ./src
bun run format           # Format code with Biome
bun run check            # Biome check with auto-fix (pre-commit hook)

# Testing
bun test                 # Run all tests
bun test --watch         # Watch mode
bun test --coverage      # Coverage report
bun test src/utils/__tests__/calculations.test.ts  # Single file
bun test -t "calculateTotalStats"                  # Pattern match
```

## Project Structure

```
src/
├── components/
│   ├── comparison/      # Feature components (BeybladeCard, Search, etc.)
│   ├── error/           # ErrorBoundary, ErrorFallback
│   ├── layout/          # Header, Footer, Navigation, Layout
│   └── ui/              # shadcn/ui components (do not modify)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions (cn helper)
├── pages/               # Page components
├── schemas/             # Zod validation schemas
├── types/               # TypeScript type definitions
├── utils/               # Business logic functions
│   └── __tests__/       # Unit tests colocated with utils
├── App.tsx              # Root component with routing
└── main.tsx             # Entry point
```

## Code Style Guidelines

### Formatting (Biome enforced)

- Single quotes, semicolons required
- 2-space indentation, 100 char line width
- Trailing commas, arrow parentheses always
- LF line endings

### Import Order

1. External packages first
2. Aliased imports (`@/`) second
3. Relative imports last
4. Use `type` keyword for type-only imports

```typescript
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import type { Beyblade } from '@/types/beyblade';
import { calculateTotalStats } from '../calculations';
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `BeybladeCard` |
| Component files | PascalCase.tsx | `BeybladeCard.tsx` |
| Utility files | camelCase.ts | `calculations.ts` |
| Hooks | use prefix | `useBeybladeData` |
| Schemas | Schema suffix | `BeybladeSchema` |
| Types/Interfaces | PascalCase | `Beyblade`, `TotalStats` |
| Props interfaces | Props suffix | `BeybladeCardProps` |

### TypeScript Guidelines

- Strict mode enabled, no implicit any
- `noExplicitAny: "error"` - never use `any`
- All unused variables/parameters are errors
- Use Zod schemas for runtime validation alongside TypeScript types
- Define interfaces above the component

```typescript
interface BeybladeCardProps {
  beyblade: Beyblade;
  comparisonBeyblade?: Beyblade;
}

export function BeybladeCard({ beyblade, comparisonBeyblade }: BeybladeCardProps) {
  // ...
}
```

### Component Patterns

- Functional components with hooks (except ErrorBoundary)
- Multiple related components can share a file
- Named exports preferred (except App.tsx)
- Use shadcn/ui components from `@/components/ui/`

### Error Handling

1. ErrorBoundary for React component errors
2. Zod `safeParse` for runtime data validation
3. `instanceof Error` check for error messages
4. Console logging in development

```typescript
const result = Schema.safeParse(data);
if (!result.success) {
  console.error('Validation errors:', result.error.issues);
  throw new Error('Invalid data format');
}
// In catch blocks:
const message = err instanceof Error ? err.message : 'Unknown error';
```

### Testing

- Test files in `__tests__` directories alongside source
- Use `describe`/`it` blocks from Vitest
- Create mock factory functions for test data
- Naming: `<source-file>.test.ts`

```typescript
import { describe, expect, it } from 'vitest';
const createMockBeyblade = (overrides: Partial<Beyblade> = {}): Beyblade => ({
  id: 'test_beyblade', name: 'Test Beyblade', ...overrides,
});
describe('calculateTotalStats', () => {
  it('correctly calculates total attack', () => {
    expect(calculateTotalStats(createMockBeyblade()).attack).toBe(80);
  });
});
```

## Commit Convention

Format: `type(scope): description`

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`

**Rules**: Type/scope lowercase, subject not empty, no trailing period, max 100 chars

```
feat(comparison): add win probability calculation
fix(search): correct fuzzy matching logic
```

## Pre-commit Hooks

- `pre-commit`: Runs `bun run check` (Biome check with auto-fix)
- `commit-msg`: Runs commitlint to validate commit message

Always run `bun run check` before committing.

## Path Aliases

Use `@/` to reference the `src/` directory:

```typescript
import { Button } from '@/components/ui/button';
import type { Beyblade } from '@/types/beyblade';
```
