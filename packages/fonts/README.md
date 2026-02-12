# Ultraviolet Fonts

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fthemes.svg)](https://badge.fury.io/js/%40ultraviolet%2Ffonts)

Ultraviolet Fonts is a collection of fonts that are used in Ultraviolet projects.

## Get Started

```sh
$ pnpm add @ultraviolet/fonts
```

### Usage

```js
import '@ultraviolet/fonts/fonts.css'
```

## How to add a new font

1. Add the font files to the `assets` directory.
2. Edit `src/fonts.css` and add the font-face declaration following same directory order as you did locally but with S3 URL.
3. Push your pull request, once merged your font will be uploaded on S3 and available for use.

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).
