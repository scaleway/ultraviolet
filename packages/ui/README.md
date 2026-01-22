# Ultraviolet UI

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fui.svg)](https://badge.fury.io/js/%40ultraviolet%2Fui)

Ultraviolet UI is a set of React components and utilities to build fast application.

## Get Started

```sh
$ pnpm add @ultraviolet/ui @ultraviolet/themes
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

Or if you prefer to install the package for it you can add:
```sh
$ pnpm add @ultraviolet/fonts
```

and import it in your project:

```ts
import '@ultraviolet/fonts'
```

### Usage

For the library to work properly, you need to wrap your application with the `ThemeProvider` component. `ThemeProvider` will provide the theme to all components in your application and allow you to do `const theme = useTheme()` to have access to the theme object in your TSX files.

You will also need to import styles of components for them to have the correct styles.

```tsx
import { ThemeProvider } from '@ultraviolet/themes'
import { Button, theme } from '@ultraviolet/ui'
import '@ultraviolet/ui/styles'

const App = () => (
  <ThemeProvider theme={theme}>
    <Button onClick={() => console.log('clicked')}>Click Me</Button>
  </ThemeProvider>
)
```

> **Note**:
> To generate your own theme easily you can check the [theme generator](https://storybook.ultraviolet.scaleway.com/?path=/docs/tools-theme-generator--docs).

## Migration from V2 to V3
With the migration from `@ultraviolet/ui 2.0.0` to `@ultraviolet/ui 3.0.0`, several core changes have been introduced. These changes are due to the shift in styling from `Emotion` to `vanilla-extract`.

### Theme provider
To ensure the library works correctly, you must wrap your application with the `ThemeProvider` component. Import it from `@ultraviolet/themes` or `@ultraviolet/ui` (replacing the previous `Emotion`-based provider). 

If your app still uses `Emotion`, you can combine both theme providers: 

```js
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import {
  consoleLightTheme,
  ThemeProvider as UVThemeProvider,
} from '@ultraviolet/ui'

const App = () => (
  <UVThemeProvider theme={consoleLightTheme}>
    <EmotionThemeProvider theme={consoleLightTheme}>
        {children}
    </EmotionThemeProvider>
  </UVThemeProvider>
)
```

### Style
To ensure styles are applied, import the component styles at the root of your application:

```js
import '@ultraviolet/ui/styles'
```
To replace `normalize()` (which was used with Emotion), you can now import a global style with the same effect:

Before:
```js
import { Global } from '@emotion/react'
import { normalize } from '@ultraviolet/ui'
import { ThemeProvider } from '@emotion/react'

const App = () => (
  <ThemeProvider theme={theme}>
      <Global styles={css`${normalize()}`}>
      <MyApp />
  </ThemeProvider>
)
```
After: 
```js
import { ThemeProvider } from "@ultraviolet/themes"
import "@ultraviolet/themes/global"

const App = () => (
  <ThemeProvider theme={theme}>
    <MyApp />
  </ThemeProvider>
)
```

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).

## Contributing

📝 You can participate in the development and [start contributing](/CONTRIBUTING.md) to it.
