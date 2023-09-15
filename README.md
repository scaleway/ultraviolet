![](.storybook/assets/logo-dark.svg#gh-dark-mode-only)
![](.storybook/assets/logo-light.svg#gh-light-mode-only)

![Codecov](https://img.shields.io/codecov/c/github/scaleway/ultraviolet)
![GitHub last commit](https://img.shields.io/github/last-commit/scaleway/ultraviolet)
![GitHub closed issues](https://img.shields.io/github/issues-closed/scaleway/ultraviolet)
![GitHub contributors](https://img.shields.io/github/contributors/scaleway/ultraviolet)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/scaleway/ultraviolet)
![GitHub](https://img.shields.io/github/license/scaleway/ultraviolet)

# Ultraviolet Core

Ultraviolet Core contains the core features of the Ultraviolet UI library. 
It is set of React library that can be used to build fast application.

- [Ultraviolet UI](https://github.com/scaleway/ultraviolet/tree/main/packages/ui): The main library that includes a set of components and utilities to build fast application.
- [Ultraviolet Form](https://github.com/scaleway/ultraviolet/tree/main/packages/form): A library to build forms with Ultraviolet UI components, it is using React Final Form under the hood.
- [Ultraviolet Themes](https://github.com/scaleway/ultraviolet/tree/main/packages/themes): A set of themes for the Ultraviolet UI library (default theme is included in `@ultraviolet/ui`).
- [Ultraviolet Icons](https://github.com/scaleway/ultraviolet/tree/main/packages/icons): A library that provides a set of icons to use with Ultraviolet UI.

## Installation

### Quick start

```sh
$ pnpm add @ultraviolet/ui @emotion/react @emotion/styled
```

### Documentation

- #### [Ultraviolet UI](https://github.com/scaleway/ultraviolet/tree/main/packages/ui)
- #### [Ultraviolet Form](https://github.com/scaleway/ultraviolet/tree/main/packages/form)
- #### [Ultraviolet Themes](https://github.com/scaleway/ultraviolet/tree/main/packages/themes)
- #### [Ultraviolet Icons](https://github.com/scaleway/ultraviolet/tree/main/packages/icons)

## Development

Before any command, install dependencies running following command:

```sh
$ pnpm install
```

### Storybook

Our storybook includes `@ultraviolet/ui`, `@ultraviolet/form` and `@ultraviolet/icons`.

In order to start storybook without errors you will need to build the project once 
(this is because `@ultraviolet/form` uses `@ultraviolet/ui` build to run).

```sh
$ pnpm build
$ pnpm run start
```

Storybook documentation will then be available on [http://localhost:6006](http://localhost:6006)

### Test

#### Unit

```sh
$ pnpm run test:unit # Will run all tests
$ pnpm run test:unit:update # Will update all snapshots
$ pnpm run test:unit:watch # Will watch tests and only rerun the one who are modified
$ pnpm run test:unit:coverage # Will generate a coverage report
$ pnpm run testunit::coverage --coverageReporters lcov && open coverage/lcov-report/index.html # Will generate an open an html code coverage report
```

#### Accessibility

```sh
$ pnpm run test:a11y # Will run all accessibility tests
$ pnpm run test:a11y src/components/Alert # Will run accessibility test of Alert component only
```

#### Lint

```sh
$ pnpm run lint
$ pnpm run lint:fix
```

### Build

```sh
$ pnpm run build
$ pnpm run build:profile # Will open a visual representation of the modules inside the compile package
```

### Use a locally built package

You might want to test your local changes against a React application.

> [`yalc`](https://github.com/whitecolor/yalc) is a tool aiming to simplify working with local npm packages by providing a different workflow than `npm/pnpm link`, hence avoiding most of their issues with module resolving.

```bash
$ pnpm install --global yalc # Make sure to have the yalc binary
```

Here is an example for using `@ultraviolet/ui` as a local package:

```bash
$ pnpm run build && cd packages/ui && yalc publish
$ # Now it's ready to install in your project
$ cd ../project-something
$ yalc add @ultraviolet/ui
$ cd ../ultraviolet
$ # If you do some changes into your package
$ pnpm run build && yalc publish --push --sig # --push will automatically update the package on projects where it have been added, --sig updates the signature hash to trigger webpack update
```

You can redo the same with `@ultraviolet/form` if you want to test it.

> :warning: since [1.0.0.pre.51 (2021-04-23)](https://github.com/wclr/yalc/blob/master/CHANGELOG.md#100pre51-2021-04-23), `yalc publish` needs the `--sig` option to trigger webpack module actual update.

> :warning: `yalc` create a `yalc.lock` and updates the `package.json` in the target project. **Make sure to not commit these changes**

---

## Versioning

We are using [Changeset](https://github.com/changesets/changesets) to manage our versioning.

Once your modifications are ready to be released, you can run `pnpm run changeset` to create a new changeset. 
It will ask you to describe your changes and will create a new changeset file in the `changesets` folder.

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).

## Contributing

📝 You can participate in the development and [start contributing](/CONTRIBUTING.md) to it.

## Thanks

<a href="https://www.chromatic.com/"><img src="https://user-images.githubusercontent.com/321738/84662277-e3db4f80-af1b-11ea-88f5-91d67a5e59f6.png" width="153" height="30" alt="Chromatic" /></a>

Thanks to [Chromatic](https://www.chromatic.com/) for providing the visual testing platform that helps us review UI changes and catch visual regressions.
