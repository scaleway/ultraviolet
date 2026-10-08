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

> **Note**:
> The static CSS imports above are **not** required for the CSS variables to work as long as `ThemeProvider` is used because the provider injects them at runtime. Importing the theme CSS file only **reduces FOUC**: it inlines the variables into the initial HTML, whereas without it the theme is applied client-side after first paint.
>
> This does **not** apply to `v2/ThemeProvider` which relies on the static CSS files to provide the variables (see below).

#### With static CSS files and new `ThemeProvider` (v2)

This version is recommended for projects that import the static CSS files (`light.css`, `dark.css`, `darker.css`) which provide the theme variables. Contrary to `ThemeProvider`, it does **not** inject the CSS variables at runtime, so the variables already defined in the CSS are not duplicated. It also handles the theme logic internally: initialization, switching, system preference and optional persistence.

```tsx
import '@ultraviolet/themes/light.css'
import '@ultraviolet/themes/dark.css'
import '@ultraviolet/themes/darker.css' // OR import '@ultraviolet/themes/themes.css' to import all three themes at once
import { ThemeProvider } from '@ultraviolet/themes/v2'

export const App = () => (
  <ThemeProvider>
    <YourApp />
  </ThemeProvider>
)
```

The provider manages the theme internally:

- it reads the initial theme from the `light-theme`/`dark-theme`/`darker-theme` class on the document element, falling back to `"system"`. This makes it possible to retrieve a theme saved in `localStorage` and applied with an inline script before the hydration,
- when the chosen theme is `"system"`, it follows the `prefers-color-scheme` media query and updates the theme accordingly,
- it updates the `*-theme` class on the document element whenever the theme changes,
- with the `localStorageConfig` prop, it persists the chosen theme in `localStorage` and keeps it in sync across all open tabs/windows.

Use `v2/useTheme` to retrieve the current theme and `setTheme` to switch it from a child component:

```tsx
import { ThemeProvider, useTheme } from '@ultraviolet/themes/v2'
import type { Themes } from '@ultraviolet/themes'
import { SwitchButton } from '@ultraviolet/ui'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <SwitchButton
      onChange={event => {
        setTheme(event.currentTarget.value as Themes)
      }}
      value={theme}
    >
      <SwitchButton.Option value="light">light mode</SwitchButton.Option>
      <SwitchButton.Option value="dark">dark mode</SwitchButton.Option>
      <SwitchButton.Option value="darker">darker mode</SwitchButton.Option>
    </SwitchButton>
  )
}
```

`initialTheme` and `localStorageConfig` are both optional. Storage is only enabled when `localStorageConfig` is provided:

```tsx
<ThemeProvider initialTheme="system" localStorageConfig={{ key: 'theme-preference' }}>
  <YourApp />
</ThemeProvider>
```

##### Customizing theme variables

`extendTheme` is **not** supported by `v2/ThemeProvider`: since the provider does not inject any variable at runtime, there is no theme object to extend. Instead, override the CSS variables directly in a `.css` file, scoped to the theme class (`:root.light-theme`, `:root.dark-theme`, `:root.darker-theme`):

```css
@import '@ultraviolet/themes/light.css' layer(ultraviolet);
@import '@ultraviolet/themes/dark.css' layer(ultraviolet);

:root.light-theme {
  --color-primary-text: #ff00aa;
}
```

The override must be scoped to the theme class (so it only applies when the corresponding theme is active) and must win the cascade: either declare it **after** the imported theme files, or wrap the imports and the overrides in cascade layers and give the overrides a later layer order.

Our components currently support both `ThemeProvider` and `v2/ThemeProvider`, but only one of them is necessary.

#### Normalized css

Add this import for normalized css:

```tsx
import '@ultraviolet/themes/normalize.css'
```

#### Global style

For a default background-color and text-color, and a `visually-hidden` class that visually hides a component while keeping it accessible to screen readers, you can import a `global` style instead of `normalize`.

```tsx
import '@ultraviolet/themes/global' //deprecated
// OR
import '@ultraviolet/themes/theme.css'
```

It imports `normalize` so **it is not necessary to import both `global` and `normalize`**.

The `visually-hidden` class (from `global`) is a simple CSS-class that can be used anywhere, which includes Ultraviolet components. Usage:

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
