# BeyHub

> Compare beyblades and create optimal combinations

A web application for comparing beyblades. Built for kids and the beyblade community with a clean, minimal interface optimized for mobile-first usage.

## Overview

BeyHub allows you to:
- **Compare Beyblades**: Select two beyblades and compare their stats side-by-side
- **View Win Probability**: See estimated win percentages based on stats
- **Explore Stats**: View detailed blade, ratchet, and bit statistics

### Key Features
- Search-based beyblade selection with autocomplete
- Side-by-side stat comparison with visual bars
- Light and dark theme support
- Mobile-responsive design
- Expandable component details (Blade, Ratchet, Bit stats)

## Prerequisites

- **Bun** >= 1.x (latest LTS recommended)
- **Git**

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd beyhub
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build locally |
| `bun run lint` | Run Biome linter |
| `bun run format` | Format code with Biome |
| `bun run check` | Run linter and formatter checks (used in pre-commit) |
| `bun test` | Run unit tests with Vitest |
| `bun test --coverage` | Run tests with coverage report |

## Project Structure

```
beyhub/
├── public/
│   ├── assets/beyblades/    # Beyblade images
│   └── data/
│       └── beyblades.json   # Beyblade data
├── src/
│   ├── components/          # React components
│   │   ├── comparison/      # Comparison feature components
│   │   ├── error/           # Error boundaries
│   │   ├── layout/          # Layout components (Header, Nav, etc.)
│   │   └── ui/              # shadcn/ui components
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   ├── schemas/             # Zod validation schemas
│   ├── types/               # TypeScript types
│   ├── utils/               # Utility functions
│   └── App.tsx              # Main app component
└── ...config files
```

## Beyblade Data

### JSON Structure

Beyblades are stored in `/public/data/beyblades.json`:

```json
{
  "beyblades": [
    {
      "id": "impact_drake_9_60LR",
      "name": "Impact Drake 9-60LR",
      "type": "Attack",
      "bladeName": "Impact Drake",
      "ratchetName": "9-60",
      "bitName": "LR",
      "blade": {
        "attack": 75,
        "defense": 25,
        "stamina": 10
      },
      "ratchet": {
        "attack": 13,
        "defense": 10,
        "stamina": 7,
        "height": 60
      },
      "bit": {
        "attack": 45,
        "defense": 5,
        "stamina": 15,
        "dash": 35,
        "burst": 80
      },
      "image": "/assets/beyblades/impact_drake_9_60LR.png"
    }
  ]
}
```

### Stat Ranges
- **Blade**: attack, defense, stamina (0-100)
- **Ratchet**: attack, defense, stamina (0-100), height (variable, e.g., 55-85)
- **Bit**: attack, defense, stamina, dash, burst (0-100)

### Beyblade Types
- **Attack**: High attack stats
- **Defense**: High defense stats
- **Stamina**: High stamina stats
- **Balance**: Balanced stats across all categories

### Adding New Beyblades

**Via Pull Request (Recommended):**

1. Fork the repository
2. Add entry to `public/data/beyblades.json` following the structure above
3. Use snake_case for `id` (e.g., `beyblade_name_parts`)
4. Provide all required stats as integers
5. Add image to `/public/assets/beyblades/` or use placeholder URL
6. Submit PR with clear description and source for stats
7. Data validation runs automatically on app startup

**Data Shape Requirements:**
- All stats must be integers
- Blade/Ratchet/Bit stats: 0-100 range (except height which is variable)
- All fields are required (no optional fields)
- Image URLs must be valid (or use placeholder from placehold.co)

## Development Workflow

### Code Quality

This project uses strict code quality tools:

- **Biome**: Linting and formatting
  - Import sorting by type
  - Single quotes, semicolons required
  - Line length: 100 characters
- **TypeScript**: Strict mode, no `any` types allowed
- **Husky**: Git hooks for automated checks

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes following the code style

3. Run checks before committing:
   ```bash
   bun run check
   ```

4. Commit using conventional commit format:
   ```bash
   git commit -m "feat(scope): description"
   ```

### Commit Convention

Format: `type(scope): description`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat(comparison): add win probability calculation"
git commit -m "fix(search): correct fuzzy matching logic"
git commit -m "docs(readme): update installation instructions"
```

### Pre-commit Hooks

Husky automatically runs:
- Biome linter on staged files
- Biome formatter on staged files
- Commit message validation (commitlint)

If checks fail, fix the issues and commit again.

## Testing

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run with coverage
bun test --coverage
```

### Test Coverage

Unit tests cover:
- Win probability calculations
- Stat aggregation functions
- Search/filter functionality

Tests are located in `__tests__` directories alongside source files.

## Tech Stack

- **Runtime**: Bun
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Validation**: Zod
- **Linting/Formatting**: Biome
- **Testing**: Vitest

## Troubleshooting

### Common Issues

**"Bun not found"**
- Install Bun: `curl -fsSL https://bun.sh/install | bash`
- Verify installation: `bun --version`

**Port 5173 already in use**
- Kill the process using the port or change port in `vite.config.ts`

**Biome errors on commit**
- Run `bun run format` to auto-fix formatting
- Run `bun run lint` to see specific issues
- Fix issues manually if auto-fix doesn't work

**Build fails**
- Ensure all dependencies installed: `bun install`
- Check TypeScript errors: `bun run build`
- No `any` types allowed in TypeScript

**Data validation fails**
- Check `beyblades.json` syntax (valid JSON)
- Ensure all stats are integers within range
- Verify all required fields are present

## License

MIT License

## Credits

Built with:
- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- Biome + Husky
- Bun runtime
