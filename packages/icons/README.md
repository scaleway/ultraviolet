# Ultraviolet Icons

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Ficons.svg)](https://badge.fury.io/js/%40ultraviolet%2Ficons)

Ultraviolet Icons is a set of components based on SVG icons. It provides a set of icons that can be used in your projects.

## Get Started

```sh
$ pnpm add @ultraviolet/icons @ultraviolet/themes
```

You can then add `ThemeProvider` to your applications and use the provided theme from `@ultraviolet/themes` or use your own.

```tsx
import { SdkGoProductIcon } from '@ultraviolet/icons/product'
import { theme, ThemeProvider } from '@ultraviolet/themes'

const App = () => (
  <ThemeProvider theme={theme}>
    <SdkGoProductIcon size="medium" variant="primary"/>
  </ThemeProvider>
)
```

> **Note**:
> To generate your own theme easily you can check the [theme generator](https://storybook.ultraviolet.scaleway.com/?path=/docs/tools-theme-generator--docs).

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).

## Contributing

📝 You can participate in the development and [start contributing](/CONTRIBUTING.md) to it.
