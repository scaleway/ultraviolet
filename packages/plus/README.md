# Ultraviolet Plus

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fplus.svg)](https://badge.fury.io/js/%40ultraviolet%2Fplus)

We are going to make breaking changes regularly until the first version is released.

Ultraviolet Plus is a set of complex components that are built on top of Ultraviolet UI.

## Get Started

```sh
$ pnpm add @ultraviolet/plus
```

### Usage

In order for the library to work you will need to import both Ultraviolet UI and Ultraviolet Plus styles in your project.

```tsx
import { ThemeProvider } from '@ultraviolet/ui'
import { normalize, theme } from '@ultraviolet/ui'
import { ContentCard } from '@ultraviolet/plus'
import '@ultraviolet/ui/styles'
import '@ultraviolet/plus/styles'

const App = () => (
  <ThemeProvider theme={theme}>
    <Global
      styles={css`
        ${normalize()}
      `}
    />
    <ContentCard title="Welcome on Ultraviolet Plus" />
  </ThemeProvider>
)
```

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).

## Contributing

📝 You can participate in the development and [start contributing](/CONTRIBUTING.md) to it.
