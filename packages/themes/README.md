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

##### Wrap the injected styles in a CSS layer

`ThemeProvider` injects the theme variables (and the `body` background) in a `<style>` tag in the `<head>`. If your application already defines styles using [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), pass the `cssLayer` prop to wrap the injected styles in a layer, so they don't override other layered styles by specificity:

```tsx
import { ThemeProvider, consoleLightTheme } from '@ultraviolet/themes'

export const App = () => (
  <ThemeProvider theme={consoleLightTheme} cssLayer="uv">
    <YourApp />
  </ThemeProvider>
)
```

The prop is optional and `undefined` by default, in which case the styles are injected without any layer.

> **Note**:
> The `cssLayer` prop only wraps the styles **injected by `ThemeProvider`**. It does not affect the static theme CSS files if they are directly imported. Because un-layered styles always win over layered ones, an un-layered `light.css` would override `layer(uv)`. If you import the static CSS while using `cssLayer`, wrap the import in the same layer so both are applied consistently:
>
> ```css
> @import '@ultraviolet/themes/light.css' layer(uv);
> ```

#### Normalized css

Add this import for normalized css:

```tsx
import '@ultraviolet/themes/normalize'
// OR
import '@ultraviolet/themes/normalize.css'
```

#### Global style

For a default background-color and text-color, and a `visually-hidden` class that visually hides a component while keeping it accessible to screen readers, you can import a `global` style instead of `normalize`.

```tsx
import '@ultraviolet/themes/global'
// OR
import '@ultraviolet/themes/global.css'
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
