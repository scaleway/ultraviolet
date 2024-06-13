# Ultraviolet Illustrations

[![npm version](https://badge.fury.io/js/%40ultraviolet%2Fillustrations.svg)](https://badge.fury.io/js/%40ultraviolet%2Fillustrations)

Ultraviolet Illustrations is a set of illustrations.

## Installation

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

## Adding an asset
The whole process is automatic. Simply add the assets you want to include in the package to the correct folder in `assets/` and create a pull request. Once the pull request is approved and the branch is merged, the illustrations will be added to an S3 bucket and exported in the package automatically.
## Deleting an asset
It is possible to delete an asset. However, the asset will still be present in the S3 bucket and can be used by directly importing the link from the S3 bucket.
## Editing an asset
- If an asset is renamed, the old version will remain on the bucket but will not be exported in ultraviolet.
- If an asset is modified, without changing its name, it will replace the old version on the bucket, which will not be available anymore.
## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).

## Contributing

📝 You can participate in the development and [start contributing](/CONTRIBUTING.md) to it.
