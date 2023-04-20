# Scaleway Themes

[![npm version](https://badge.fury.io/js/%40scaleway%2Fthemes.svg)](https://badge.fury.io/js/%40scaleway%2Fthemes)

Scaleway Themes is a set of themes for the Scaleway UI library.

> **Note**
> 
> `@scaleway/ui` is using `@scaleway/theme` under the hood, therefore you don't need to install it if you want to use the default theme (`consoleLightTheme` and `consoleDarkTheme` are the default themes).

## Installation

```sh
$ pnpm add @scaleway/ui @scaleway/themes @emotion/react @emotion/styled
```

### Usage

```js
import { normalize, Button } from '@scaleway/ui'
import { consoleDarkTheme } from '@scaleway/themes' // << Here we import the theme we want to use
import { Global, css, ThemeProvider } from '@emotion/react'

const App = () => (
  <ThemeProvider theme={consoleDarkTheme}>
    <Global styles={css`${normalize()}`}>
    <Button variant="primary" onClick={() => console.log('clicked')}>
      Click Me
    </Button>
  </ThemeProvider>
)
```

## Documentation

Checkout our [documentation website](https://storybook.ui.scaleway.com/).
