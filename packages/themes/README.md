# Ultraviolet Themes

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fthemes.svg)](https://badge.fury.io/js/%40ultraviolet%2Fthemes)

Ultraviolet Themes is a set of themes for the Ultraviolet UI library.

> **Note**
> 
> `@ultraviolet/ui` is using `@ultraviolet/theme` under the hood, therefore you don't need to install it if you want to use the default theme (`consoleLightTheme` and `consoleDarkTheme` are the default themes).

## Installation

```sh
$ pnpm add @ultraviolet/ui @ultraviolet/themes @emotion/react @emotion/styled
```

### Usage

```js
import { normalize, Button } from '@ultraviolet/ui'
import { consoleDarkTheme } from '@ultraviolet/themes' // << Here we import the theme we want to use
import { Global, css, ThemeProvider } from '@emotion/react'

const App = () => (
  <ThemeProvider theme={consoleDarkTheme}>
    <Global styles={css`${normalize()}`} />
    <Button variant="primary" onClick={() => console.log('clicked')}>
      Click Me
    </Button>
  </ThemeProvider>
)
```

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).
