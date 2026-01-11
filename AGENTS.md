# AGENTS.md - BeyHub Coding Agent Guidelines

## Project Overview

BeyHub is a React 19 + TypeScript SPA built with Vite for comparing Beyblade stats.

- **Runtime**: Bun
- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS 4 + shadcn/ui (new-york style)
- **Validation**: Zod
- **Linting/Formatting**: Biome
- **Testing**: Vitest

## Build/Lint/Test Commands

```bash
bun run dev              # Start Vite dev server
bun run build            # TypeScript check + Vite production build
bun run build:check      # TypeScript type checking (no emit)
bun run lint             # Run Biome linter on ./src
bun run format           # Format code with Biome
bun run check            # Biome check with auto-fix (pre-commit hook)

# Testing
bun test                 # Run all tests
bun test --watch         # Watch mode
bun test --coverage      # Coverage report
bun test src/utils/__tests__/calculations.test.ts  # Single file
bun test -t "calculateTotalStats"                  # Pattern match

# Release (CI only)
bun run release          # Run release-it (automated via GitHub Actions)
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared utility components (ImageWithFallback, etc.)
│   ├── comparison/      # Compare page feature components (BeybladeCard, Search, etc.)
│   ├── compose/         # Compose page feature components (SelectableBeybladeCard, etc.)
│   ├── error/           # ErrorBoundary, ErrorFallback
│   ├── layout/          # Header, Footer, Navigation, Layout
│   └── ui/              # shadcn/ui components (do not modify)
├── constants/           # Shared constants (beyblade.constants.ts, strategy.constants.ts)
├── hooks/               # Custom React hooks (useBeybladeData, useElementHeight, useTheme)
├── lib/                 # Utility functions (cn helper)
├── pages/               # Page components
├── schemas/             # Zod validation schemas
├── types/               # TypeScript type definitions
├── utils/               # Business logic functions
│   └── __tests__/       # Unit tests colocated with utils (including fixtures.ts)
├── App.tsx              # Root component with routing
└── main.tsx             # Entry point
```

## Git Workflow

### Branch Structure

| Branch | Purpose |
|--------|---------|
| `main` | Stable, production-ready code. Deployed automatically by Vercel. |
| `develop` | Integration branch for ongoing development. **Default branch.** |
| `<type>/<description>` | Feature/fix branches created from `develop` |

### Branch Naming Convention

Use conventional commit types as branch prefixes:

```
feat/add-dark-mode
fix/search-not-working
docs/update-readme
refactor/extract-utils
chore/update-dependencies
```

### Branch Rules for Agents

- **NEVER commit directly to `main` or `develop`**
- Always create a feature branch from `develop` following the naming convention: `<type>/<description>`
- Push the branch and create a PR targeting `develop`
- Even for small changes like config files, follow the full PR flow

### GitHub CLI (`gh`) Authentication

Before creating PRs, issues, or any GitHub operations:

1. **Verify active account**: Run `gh auth status`
2. **Ensure `andreafspeziale` is active** for this repository
3. If wrong account is active, switch: `gh auth switch --user andreafspeziale`

### Starting a New Task

Before starting any new feature, fix, or task:

1. **Check for uncommitted changes**: Run `git status` to ensure working directory is clean
   - If there are uncommitted changes, ask the user for clarification before proceeding
2. **Switch to develop**: `git checkout develop`
3. **Pull latest changes with rebase and prune**: `git pull --rebase && git fetch --prune`
4. **Create feature branch**: `git checkout -b <type>/<description>`
5. Proceed with the task

### Development Flow

1. Create a new branch from `develop`: `git checkout -b feat/my-feature`
2. Develop and commit following conventional commits
3. Push to remote: `git push -u origin <branch-name>`
4. Create PR using GitHub CLI: `gh pr create --title "type: description" --body "..."`
5. CI runs automatically (lint, types, tests)
6. Merge when CI passes

### Commit Convention

Format: `type(scope): description`

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`

**Rules**: Type/scope lowercase, subject not empty, no trailing period, max 100 chars

```
feat(comparison): add win probability calculation
fix(search): correct fuzzy matching logic
```

### Pre-commit Hooks

- `pre-commit`: Runs `bun run check` (Biome check with auto-fix)
- `commit-msg`: Runs commitlint to validate commit message

Always run `bun run check` before committing.

### Release Flow

1. Create a PR from `develop` to `main`
2. CI runs automatically
3. Merge when CI passes
4. Release workflow automatically:
   - Bumps version based on conventional commits
   - Updates `CHANGELOG.md`
   - Creates git tag and GitHub release
   - Rebases `develop` from `main`
5. Vercel deploys the new version

## Code Style Guidelines

### Formatting (Biome enforced)

- Single quotes, semicolons required
- 2-space indentation, 100 char line width
- Trailing commas, arrow parentheses always
- LF line endings

### Import Order & Path Aliases

Use `@/` to reference the `src/` directory. Import order:

1. External packages first
2. Aliased imports (`@/`) second
3. Relative imports last
4. Use `type` keyword for type-only imports

```typescript
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { TYPE_COLORS } from '@/constants/beyblade.constants';
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
- Use shared mock factories from `fixtures.ts`
- Naming: `<source-file>.test.ts`

```typescript
import { describe, expect, it } from 'vitest';
import { createMockBeyblade } from './fixtures';

describe('calculateTotalStats', () => {
  it('correctly calculates total attack', () => {
    expect(calculateTotalStats(createMockBeyblade()).attack).toBe(80);
  });
});
```

## Exports and Dependencies Hygiene

### Unused Exports

Biome cannot detect unused exports across files (it's a single-file linter). To keep the codebase clean:

- **Only export what is consumed** - avoid speculative exports "just in case"
- **Internal helpers should not be exported** - if a function/schema/type is only used within the same file or module, keep it private (no `export` keyword)
- **Exception: `src/components/ui/`** - shadcn/ui components export many symbols by design for library flexibility; these are acceptable

```typescript
// Good: internal schema, only export the composed one
const PartSchema = z.object({ ... });
export const WholeSchema = z.object({ part: PartSchema });

// Bad: exporting internal schemas that are never imported elsewhere
export const PartSchema = z.object({ ... });
export const WholeSchema = z.object({ part: PartSchema });
```

### Unused Dependencies

- **Only add dependencies that are actually used** in code
- **Peer dependencies** (like `@testing-library/dom` for `@testing-library/react`) should be added only if the parent package is used
- **devDependencies** used only by scripts (e.g., coverage tools) must still be listed explicitly


## Styling Patterns

### Conditional Classes

Always use the `cn()` utility from `@/lib/utils` for conditional class composition:

```typescript
className={cn(
  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
  isActive
    ? 'bg-primary text-primary-foreground'
    : 'text-muted-foreground hover:text-foreground'
)}
```

### Constants

Shared UI constants (icons, colors) are in `src/constants/`:

- `beyblade.constants.ts` - `TYPE_ICONS`, `TYPE_COLORS`, `TYPE_ICON_COLORS`
- `strategy.constants.ts` - `STRATEGY_ICONS`, `STRATEGY_COLORS`, `STRATEGIES`

### Common Components

Reusable utility components live in `src/components/common/`:

- `ImageWithFallback` - Image with placeholder fallback on error
