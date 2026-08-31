# Ultraviolet Themes

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fthemes.svg)](https://badge.fury.io/js/%40ultraviolet%2Fthemes)

Ultraviolet Themes is a set of themes for the Ultraviolet UI library.

> [!NOTE]
>
> `@ultraviolet/ui` is using `@ultraviolet/themes` under the hood, therefore you don't need to install it if you want to use the default theme (`consoleLightTheme` and `consoleDarkTheme` are the default themes).
> This package is only usefull if you want to use only `@ultraviolet/themes` without `@ultraviolet/ui` or if you want to create your own theme based on the existing ones.

## Get Started

### CDN

```html
<link rel="stylesheet" href="https://assets.scaleway.com/themes/light.css" />
// OR
<link rel="stylesheet" href="https://assets.scaleway.com/themes/dark.css" />
// OR
<link rel="stylesheet" href="https://assets.scaleway.com/themes/darker.css" />
```

### Using npm

```sh
$ pnpm add @ultraviolet/themes
```

#### Pure CSS file

```tsx
import '@ultraviolet/themes/light.css'
import '@ultraviolet/themes/dark.css'
import '@ultraviolet/themes/darker.css'
```

#### With Provider and React

This is the recommended version for React application.

```tsx
import { ThemeProvider, consoleLightTheme } from '@ultraviolet/themes' // Here we import the theme we want to use
// import { consoleLightTheme } from "@ultraviolet/themes/console/light" // Alternatively you can directly import the light theme if your bundler doesn't have tree-shaking capabilities

export const App = () => (
  <ThemeProvider theme={consoleLightTheme}>
    <YourApp />
  </ThemeProvider>
)
```

##### Using `ThemesProvider` (static CSS + programmatic switching)

`ThemesProvider` is a static-CSS-first alternative to `ThemeProvider`. Instead
of injecting CSS variables at runtime, it toggles pre-generated CSS classes
(`light-theme`, `dark-theme`, `darker-theme`) on `<html>`. The CSS variables are
defined statically in the bundle — no runtime `<style>` injection.

This means:

- **No FOUC** in SSR/SSG — an inline `<script>` applies the correct theme class
  before React hydrates
- **No runtime JS** required to define variables
- **Programmatic theme switching** via the `useThemes()` hook

```tsx
import { ThemesProvider, useThemes } from '@ultraviolet/themes'

const App = () => (
  <ThemesProvider>
    <YourApp />
  </ThemesProvider>
)

const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useThemes()
  return <button onClick={toggleTheme}>{themeName}</button>
}
```

`useThemes()` returns `{ theme, themeName, setThemeName, toggleTheme }`:

```tsx
const { themeName, setThemeName } = useThemes()

setThemeName('dark') // switch to dark
setThemeName('darker') // switch to darker
toggleTheme() // toggle between light/dark
```

The provider persists the user's choice to `localStorage` (key customizable via
the `storageKey` prop, defaults to `'uv-theme'`).

You can also switch themes **without the provider** by toggling the class
manually — useful for non-React apps or when the CSS is loaded via `<link>`:

```ts
document.documentElement.classList.toggle('dark-theme')
```

The light theme is applied by default on `:root` (no class needed).
`dark-theme` and `darker-theme` override it when present.

For **scoped** theming (e.g. a dark panel inside a light app), use the
exported theme classes on any container element:

```tsx
import { lightThemeClass, darkThemeClass } from '@ultraviolet/themes'

;<div className={darkThemeClass}>{/* This section uses the dark theme */}</div>
```

##### Using theme variables in your code

The `theme` export is a typed object that mirrors the theme structure, where every
leaf value is a `var(--color-*)` CSS variable reference. This provides IDE
autocomplete and type safety when using UV theme variables in inline styles or
JavaScript:

```tsx
import { theme } from '@ultraviolet/themes'

const styles = {
  color: theme.colors.info.text, // var(--color-info-text)
  backgroundColor: theme.colors.neutral.background, // var(--color-neutral-background)
  fontSize: theme.typography.body.fontSize, // var(--typography-body-font-size)
}
```

For CSS files, VS Code autocomplete and hover tooltips for `--color-*`, `--space-*`,
`--radius-*`, `--shadow-*`, `--typography-*`, and `--breakpoint-*` variables are
available via the `css-custom-data.json` file. To enable it in your project, add
this to `.vscode/settings.json`:

```json
{
  "css.customData": ["./node_modules/@ultraviolet/themes/css-custom-data.json"]
}
```

#### Normalized css

Add this import for normalized css:

```tsx
import '@ultraviolet/themes/global'
```

It also provides a `visually-hidden` class that visually hides a component while keeping it accessible to screen readers. It can be applied to Ultraviolet components.

Usage:

```tsx
import { Text } from '@ultraviolet/ui'

const HiddenComponent = () => {
  return (
    <>
      <p className="visually-hidden">I am hidden</p>
      <Text as="p" variant="body" className="visually-hidden">
        So am I
      </Text>
    </>
  )
}
```

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).
