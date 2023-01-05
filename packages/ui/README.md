# Scaleway UI

[![npm version](https://badge.fury.io/js/%40scaleway%2Fui.svg)](https://badge.fury.io/js/%40scaleway%2Fui)

Scaleway UI is a set of React components and utilities to build fast application.

> :warning: This library is still WIP. We are actively working on it. Our goal is to have an easy to use UI system. This includes an exhaustive documentation, improved DX, confidence in testing and a lot of refactoring to have consistency across our components.

> :warning: We are going to break a lot of things towards V1. This library is not yet production ready.

📝 You can still participate in its development and [start contributing](/CONTRIBUTING.md) to it.

## Installation

```sh
$ pnpm add @scaleway/ui @emotion/react @emotion/styled
```

### Usage

```js
import { theme, normalize, Button } from '@scaleway/ui'
import { Global, css, ThemeProvider } from '@emotion/react'

const App = () => (
  <ThemeProvider theme={theme}>
    <Global styles={css`${normalize()}`}>
    <Button variant="primary" onClick={() => console.log('clicked')}>
      Click Me
    </Button>
  </ThemeProvider>
)
```

N.B. To allow typescript theme typings with `@emotion/styled` components,
you'll have to define the `@emotion/react` module `Theme` interface in your project.

Example, in a `global.d.ts` file:

- Declaration to use the default Scaleway theme

```ts
declare module '@emotion/react' {
  import type { SCWUITheme } from '@scaleway/ui'
  // https://emotion.sh/docs/typescript#define-a-theme
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends SCWUITheme {}
}
```

- Declaration to use your custom theme

```ts
import type { MyTheme } from './src/theme'

declare module '@emotion/react' {
  // https://emotion.sh/docs/typescript#define-a-theme
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MyTheme {}
}
```

## Documentation

Checkout our [documentation website](https://storybook.ui.scaleway.com/).
