# Ultraviolet Illustrations

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fillustrations.svg)](https://badge.fury.io/js/%40ultraviolet%2Fillustrations)

Ultraviolet Illustrations is a set of illustrations.

## Get Started

```sh
$ pnpm add @ultraviolet/illustrations
```

## Usage
### Assets

```js
import { instanceOriginal } from '@ultraviolet/illustrations/products/instance'

const App = () => <img src={instanceOriginal} alt="illustration instance" />
```
### Components 
```js
import { DynamicIllustration } from '@ultraviolet/illustrations'

const App = () => <DynamicIllustration name="success">
```

## Usage of component `DynamicIllustration`

`DynamicIllustration` is a React component and so it requires you to have a `ThemeProvider` in order to be able to switch between light and dark. To use it you will need to install `@ultraviolet/themes`:

```sh
$ pnpm add @ultraviolet/themes
```

Then you can use it like this:

```tsx
import { ThemeProvider, theme } from '@ultraviolet/themes'
import { DynamicIllustration } from '@ultraviolet/illustrations'

const App = () => (
  <ThemeProvider theme={theme}>
    <DynamicIllustration name="success" />
  </ThemeProvider>
)
```

## Making changes
The entire process of adding, deleting or editing an asset is automated. The imports and exports are handled automatically by `@utils/scripts/illustrations/upload-illustrations.tsx` and `@utils/scripts/illustrations/upload-components.tsx` using the command **`pnpm run illustrations:update`**.

It is only possible edit  (add, delete or replace) the assets to the `assets/` folder. Any changes made directly to one of the `index.ts` file will be overriden by the command.

**The same goes for `DynamicIllustration` and `WireIllustration**

### Adding an asset
Simply add the assets you want to include in the package to the correct folder in `assets/`, run `pnpm run illustrations:update`, and create a pull request. Once the pull request is approved and the branch is merged, the illustrations will be added to an S3 bucket. If the assets can be used as `WireIllustration` or a `DynamicIllustration`, the component(s) will also be updated to include them.

### Deleting an asset
It is possible to delete an asset. To do so, simply delete its folder and run `pnpm run illustrations:update`. However, the asset will still be present in the S3 bucket and can be used by directly importing the link from the S3 bucket.

### Editing an asset
- If an asset is renamed, the old version will remain on the bucket but will not be exported in ultraviolet. Make sure to correctly rename the assets' name as well as their directory.
- If an asset is modified, without changing its name, it will replace the old version on the bucket, which will not be available anymore.
## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).

## Contributing

📝 You can participate in the development and [start contributing](/CONTRIBUTING.md) to it.
