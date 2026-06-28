# Ultraviolet Fonts

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fthemes.svg)](https://badge.fury.io/js/%40ultraviolet%2Ffonts)

Ultraviolet Fonts is a collection of fonts that are used in Ultraviolet projects.

## Get Started

```sh
$ pnpm add @ultraviolet/fonts
```

### Usage

This package provides two ways to use the fonts:

#### CDN (default)

Fonts are loaded from Scaleway's CDN. No font files are bundled with your application.

```js
import '@ultraviolet/fonts'
// or
import '@ultraviolet/fonts/fonts.css'
```

#### Bundled

Fonts are bundled with your application and served from your own server.

```js
import '@ultraviolet/fonts/fonts-bundled.css'
```

**Note:** Vite and Next.js handle font assets natively—no additional configuration needed. For other build tools, ensure they are configured to copy font assets to your output directory.

## How to add a new font

1. Add the font files to the `assets` directory.
2. Edit `src/fonts.css` and add the font-face declaration following same directory order as you did locally but with S3 URL.
3. Push your pull request, once merged your font will be uploaded on S3 and available for use.

## How to use fallbacks fonts

Available font custom props that expose fallbacks are `--font-inter`, `--font-jetbrains` and `--font-space-grotesk`

You can map the pre-configured font tokens to your local semantic roles inside your application's global CSS file.

```CSS
/* Usage example */
:root {
   --font-body: var(--font-inter);
   --font-heading: var(--font-space-grotesk);
   --font-code: var(--font-jetbrains);
}
```

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).
