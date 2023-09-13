# Ultraviolet UI

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fui.svg)](https://badge.fury.io/js/%40ultraviolet%2Fui)

Ultraviolet UI is a set of React components and utilities to build fast application.

## Installation

```sh
$ pnpm add @ultraviolet/ui @emotion/react @emotion/styled
```

You will also need to import fonts in your project by adding:

```html
<link href="https://fonts.cdnfonts.com/css/asap?styles=20325,20323,20320" rel="stylesheet">
<link href="https://fonts.cdnfonts.com/css/jetbrains-mono-2?styles=156604" rel="stylesheet">
```

### Usage

```js
import { theme, normalize, Button } from '@ultraviolet/ui'
import { Global, css, ThemeProvider } from '@emotion/react'

const App = () => (
  <ThemeProvider theme={theme}>
    <Global styles={css`${normalize()}`} />
    <Button variant="primary" onClick={() => console.log('clicked')}>
      Click Me
    </Button>
  </ThemeProvider>
)
```

N.B. To allow typescript theme typings with `@emotion/styled` components,
you'll have to define the `@emotion/react` module `Theme` interface in your project.

Example, in a `emotion.d.ts` file:

- Declaration to use the default Ultraviolet Themes

```ts
import '@emotion/react'
import type { SCWUITheme } from '@ultraviolet/ui'

declare module '@emotion/react' {
  export interface Theme extends SCWUITheme {}
}
```

- Declaration to use your custom theme

```ts
import '@emotion/react'
import type { MyTheme } from './src/theme'

declare module '@emotion/react' {
  export interface Theme extends MyTheme {}
}
```

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).


## Contributing

📝 You can participate in the development and [start contributing](/CONTRIBUTING.md) to it.
