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

This version is recommended for projects that import the static CSS files (`light.css`, `dark.css`, `darker.css`) which provide the theme variables. Contrary to `ThemeProvider`, it does **not** inject the CSS variables at runtime, so the variables already defined in the CSS are not duplicated. It also handles the theme logic internally: initialization, switching, system preference and persistence.

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
- it persists the chosen theme in `localStorage` under the `storageKey` (default `"uv-theme"`) and keeps it in sync across all open tabs/windows.

Use `v2/useTheme` to retrieve the current theme and `setTheme` to switch it from a child component:

```tsx
import { ThemeProvider, useTheme } from '@ultraviolet/themes/v2'
import type { ThemeOption } from '@ultraviolet/themes/v2'
import { SwitchButton } from '@ultraviolet/ui'

const ThemeSwitcher = () => {
  const { theme, isSystem, setTheme } = useTheme()

  return (
    <SwitchButton
      onChange={event => {
        setTheme(event.currentTarget.value as ThemeOption)
      }}
      value={isSystem ? 'system' : theme}
    >
      <SwitchButton.Option value="light">light mode</SwitchButton.Option>
      <SwitchButton.Option value="dark">dark mode</SwitchButton.Option>
      <SwitchButton.Option value="darker">darker mode</SwitchButton.Option>
      <SwitchButton.Option value="system">system</SwitchButton.Option>
    </SwitchButton>
  )
}
```

`isSystem` is `true` when the chosen theme is `"system"`, i.e. when the applied theme follows the OS `prefers-color-scheme` setting. When `isSystem` is `true`, `theme` still contains the resolved theme (`"light"`, `"dark"` or `"darker"`).

`initialTheme` and `storageKey` are both optional:

```tsx
<ThemeProvider initialTheme="system" storageKey="theme-preference">
  <YourApp />
</ThemeProvider>
```

##### Avoiding a flash of the wrong theme (FOUC)

`v2/ThemeProvider` applies the `*-theme` class on the document element in an effect, after React has hydrated. Before that, the page renders with the default styling: on a slow connection the browser can paint that un-themed page before hydration completes, causing a flash of the wrong theme.

To prevent it, apply the theme class **before the first paint** with a small inline script in the `<head>` of your HTML. The provider persists the theme in `localStorage` as a JSON-encoded value, so the script reads it and adds the matching class:

```html
<script>
  try {
    let theme = JSON.parse(localStorage.getItem('uv-theme')) || 'system'

    if (theme === 'system') {
      theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    if (['light', 'dark', 'darker'].includes(theme)) {
      document.documentElement.classList.add(`${theme}-theme`)
    }
  } catch (e) {}
</script>
```

The script must use the **same storage key** as the provider and be placed in the `<head>` so it runs before the first paint.

An example can be found in our [Next example](https://github.com/scaleway/ultraviolet/blob/main/examples/next/src/pages/_document.tsx).

##### Get the current theme object

Use `v2/useThemeObject` to retrieve the full object of the currently applied theme — the same objects exported at the root of the package (`consoleLightTheme`, `consoleDarkTheme`, `consoleDarkerTheme`). The objects are lazy loaded in their own chunks, so an app only downloads the theme it applies and the other themes never end up in the consumer bundle. Since the loading is asynchronous, the hook returns `undefined` until the object is available (always `undefined` during SSR):

```tsx
import { useThemeObject } from '@ultraviolet/themes/v2'

const CustomChart = () => {
  const themeObject = useThemeObject()

  if (!themeObject) return null

  return <div style={{ color: themeObject.colors.primary.text }}>Chart using theme colors</div>
}
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

Migrating an existing application from `ThemeProvider` (v1) to `ThemeProvider` (v2)? Check out the [migration guide](./MIGRATION.md).

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
