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
