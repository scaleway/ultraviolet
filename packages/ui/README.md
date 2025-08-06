# Ultraviolet UI

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fui.svg)](https://badge.fury.io/js/%40ultraviolet%2Fui)

Ultraviolet UI is a set of React components and utilities to build fast application.

## Get Started

```sh
$ pnpm add @ultraviolet/ui @ultraviolet/themes @emotion/react @emotion/styled
```

You will also need to import fonts in your project by adding:

```html
<link
  href="https://fonts.cdnfonts.com/css/inter?styles=29139,29137,29140"
  rel="stylesheet"
/>
<link
  href="https://fonts.cdnfonts.com/css/jetbrains-mono-2?styles=156604"
  rel="stylesheet"
/>
<link
  href="https://fonts.cdnfonts.com/css/space-grotesk?styles=24816,24815,24817"
  rel="stylesheet"
/>
```

### Usage

```tsx
import { Global, ThemeProvider, css } from '@emotion/react'
import { ThemeProvider as ThemeProviderUV } from '@ultraviolet/ui'
import { Button, normalize, theme } from '@ultraviolet/ui'
import '@ultraviolet/ui/styles'

const App = () => (
  <ThemeProvider theme={theme}>
    <ThemeProviderUV>
      <Global
        styles={css`
          ${normalize()}
        `}
      />
      <Button onClick={() => console.log('clicked')}>Click Me</Button>
    </ThemeProviderUV>
  </ThemeProvider>
)
```

> **Note**:
> To generate your own theme easily you can check the [theme generator](https://storybook.ultraviolet.scaleway.com/?path=/docs/tools-theme-generator--docs).

### Typescript
To allow typescript theme typings with `@emotion/styled` components,
you'll have to define the `@emotion/react` module `Theme` interface in your project.

For example, in a `emotion.d.ts` file:

- Declaration to use the default Ultraviolet Themes

```ts
import '@emotion/react'
import type { UltravioletUITheme } from '@ultraviolet/ui'

declare module '@emotion/react' {
  export interface Theme extends UltravioletUITheme {}
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
