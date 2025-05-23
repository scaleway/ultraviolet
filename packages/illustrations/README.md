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

## Making changes
The entire process of adding, deleting or editing an asset is automated. The imports and exports are handled automatically by `@utils/scripts/upload-illustrations.tsx` and `@utils/scripts/upload-illustration-components.tsx`.

When a file from the package is edited in a pull request, the aforementioned scripts run and update every `index.ts(x)` to ensure the imports and exports match the names of the folders and files located in `assets/`. It is only possible edit  (add, delete or replace some assets) the assets to the `assets/` folder. Any changes made directly to one of the `index.ts` file will be overriden by an automatic commit.

**The same goes for `DynamicIllustration` and `WireIllustration` : simply add the illustrations to the correct folder (in `assets/`).**

### Adding an asset
Simply add the assets you want to include in the package to the correct folder in `assets/` and create a pull request. Once the pull request is approved and the branch is merged, the illustrations will be added to an S3 bucket and exported in the package automatically. If the assets can be used as `WireIllustration` or a `DynamicIllustration`, the component(s) will also be updated to include them.

### Deleting an asset
It is possible to delete an asset. To do so, simply delete its folder. However, the asset will still be present in the S3 bucket and can be used by directly importing the link from the S3 bucket.

### Editing an asset
- If an asset is renamed, the old version will remain on the bucket but will not be exported in ultraviolet. Make sure to correctly rename the assets' name as well as their directory.
- If an asset is modified, without changing its name, it will replace the old version on the bucket, which will not be available anymore.
## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).

## Contributing

📝 You can participate in the development and [start contributing](/CONTRIBUTING.md) to it.
