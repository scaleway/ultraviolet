---
"@ultraviolet/themes": minor
---

Replace `createThemeContract` (hashed variable names like `--uv_theme_rwwhsl6`) with `createGlobalThemeContract` (human-readable names like `--color-danger-background`, `--space-0`). This is a **breaking change** for the compiled CSS output — all UV components now reference human-readable CSS variables instead of hashed ones.

The `theme` contract now returns `var(--color-*)`, `var(--space-*)`, etc. matching the static CSS files (`light.css`, `dark.css`, `darker.css`).

Add a new `ThemesProvider` component as a static-CSS-first alternative to `ThemeProvider`:
- Uses pre-generated static CSS classes instead of runtime `<style>` injection
- No FOUC in SSR/SSG (includes a no-flash inline script)
- Programmatic theme switching via `useThemes()` hook (`setThemeName`, `toggleTheme`)
- Persists theme choice to `localStorage`

The existing `ThemeProvider` is unchanged and still works as before (runtime injection via `assignInlineVars`), just with human-readable variable names.
