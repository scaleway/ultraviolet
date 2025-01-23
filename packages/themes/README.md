# Ultraviolet Themes

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fthemes.svg)](https://badge.fury.io/js/%40ultraviolet%2Fthemes)

Ultraviolet Themes is a set of themes for the Ultraviolet UI library.

> **Note**
>
> `@ultraviolet/ui` is using `@ultraviolet/theme` under the hood, therefore you don't need to install it if you want to use the default theme (`consoleLightTheme` and `consoleDarkTheme` are the default themes).

## Get Started

Using npm:

```sh
$ pnpm add @ultraviolet/ui @ultraviolet/themes @emotion/react @emotion/styled
```

Directly importing the CSS theme in your HTML file:

```html
<link rel="stylesheet" href="assets.scaleway.com/themes/light.css"> 
// OR
<link rel="stylesheet" href="assets.scaleway.com/themes/dark.css"> 
// OR 
<link rel="stylesheet" href="assets.scaleway.com/themes/darker.css"> 
```

### Usage

```js
import { normalize, Button } from '@ultraviolet/ui'
import { consoleDarkTheme } from '@ultraviolet/themes' // Here we import the theme we want to use
// import { consoleLightTheme } from "@ultraviolet/themes/console/light" // Alternatively you can directly import the light theme if your bundler doesn't have tree-shaking capabilities
import { Global, css, ThemeProvider } from '@emotion/react'

const App = () => (
  <ThemeProvider theme={consoleDarkTheme}>
    <Global
      styles={css`
        ${normalize()}
      `}
    />
    <Button variant="primary" onClick={() => console.log('clicked')}>
      Click Me
    </Button>
  </ThemeProvider>
)
```

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).
