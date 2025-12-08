# AGENTS.md

## Commands
- Build: `pnpm run build` | `pnpm run build:examples`
- Lint: `pnpm run lint` + `pnpm run oxc` | `:fix` for auto-fix
- Test: `pnpm run test:unit` | Single: `pnpm run test:unit path/to/test.test.tsx`
- Typecheck: `pnpm run typecheck`
- Format: `pnpm run format` (Biome)
- Dev: `pnpm run start` (Storybook)

## Code Style
- **Imports**: 'use client' → external (alpha) → internal → local
- **Components**: PascalCase dirs, forwardRef, compound patterns
- **TypeScript**: Strict typing, Pick/Omit utilities, sentiment errors
- **Testing**: `shouldMatchSnapshot`, `renderWithTheme`, descriptive names
- **CSS**: Vanilla Extract recipes, theme tokens, `cn()` utility
- **Structure**: `__stories__`, `__tests__`, constants, styles per component

## Conventions
- Monorepo: pnpm workspaces + Turbo orchestration
- React 18/19 + TypeScript + ESM modules
- Accessibility: ARIA attributes, semantic HTML
- No console logs, sentiment prop for error/success states

## Testing
- Unit: Vitest + Testing Library, coverage with `:coverage`
- E2E: Playwright, run with `pnpm run test:e2e`