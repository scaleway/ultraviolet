![](.storybook/assets/logo-dark.png#gh-dark-mode-only)
![](.storybook/assets/logo-light.png#gh-light-mode-only)

![Codecov](https://img.shields.io/codecov/c/github/scaleway/ultraviolet)
![GitHub last commit](https://img.shields.io/github/last-commit/scaleway/ultraviolet)
![GitHub closed issues](https://img.shields.io/github/issues-closed/scaleway/ultraviolet)
![GitHub contributors](https://img.shields.io/github/contributors/scaleway/ultraviolet)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/scaleway/ultraviolet)
![GitHub](https://img.shields.io/github/license/scaleway/ultraviolet)

# Ultraviolet Core

Welcome to the Ultraviolet Core repository! This is the main repository for the Ultraviolet project, which is a set of packages and tools designed to help you build fast and efficient applications.

- [Ultraviolet UI](https://github.com/scaleway/ultraviolet/tree/main/packages/ui): The main UI library that includes a set of components and utilities to build fast application.
- [Ultraviolet Plus](https://github.com/scaleway/ultraviolet/tree/main/packages/plus): An extension of UI with more complex components.
- [Ultraviolet Form](https://github.com/scaleway/ultraviolet/tree/main/packages/form): A library to build forms with Ultraviolet UI components, it is using React Final Form under the hood.
- [Ultraviolet Themes](https://github.com/scaleway/ultraviolet/tree/main/packages/themes): A set of themes for the Ultraviolet UI library (default theme is included in `@ultraviolet/ui`).
- [Ultraviolet Icons](https://github.com/scaleway/ultraviolet/tree/main/packages/icons): A library that provides a set of icons to use with Ultraviolet UI.
- [Ultraviolet Illustrations](https://github.com/scaleway/ultraviolet/tree/main/packages/illustrations): A library that provides of illustrations.
- [Ultraviolet Fonts](https://github.com/scaleway/ultraviolet/tree/main/packages/fonts): A library that provides a set of fonts to use with Ultraviolet UI.

## Installation

### Quick start

```sh
pnpm add @ultraviolet/ui @ultraviolet/fonts
```

```tsx
import { ThemeProvider } from '@ultraviolet/ui'
import { Button, normalize, theme } from '@ultraviolet/ui'
import '@ultraviolet/ui/styles'
import '@ultraviolet/fonts/fonts.css'
import '@ultraviolet/themes/global' // for normalized css

const App = () => (
  <ThemeProvider>
    <Button onClick={() => console.log('clicked')}>Click Me</Button>
  </ThemeProvider>
)
```

If you use typescript please read the [full documentation](https://github.com/scaleway/ultraviolet/tree/main/packages/ui#typescript) for have correct types.

## Development

Before any command, install dependencies running following command:

```sh
pnpm install
```

### Storybook

Our storybook includes `@ultraviolet/ui`, `@ultraviolet/form` and `@ultraviolet/icons`.

In order to start storybook without errors you will need to build the project once
(this is because `@ultraviolet/form` uses `@ultraviolet/ui` build to run).

```sh
pnpm run start
```

Storybook documentation will then be available on [http://localhost:6006](http://localhost:6006)

### Test

#### Unit

```sh
pnpm run test:unit # Will run all tests
pnpm run test:unit:update # Will update all snapshots
pnpm run test:unit:watch # Will watch tests and only rerun the one who are modified
pnpm run test:unit:coverage # Will generate a coverage report
pnpm run testunit::coverage --coverageReporters lcov && open coverage/lcov-report/index.html # Will generate an open an html code coverage report
pnpm run e2e # Will run all e2e tests
```

#### Lint

```sh
pnpm run lint
pnpm run lint:fix
```

#### Typecheck

Running `npx typecheck --noEmit` won't work at root of the project. To run type check for all packages you need to run the following command:

```sh
pnpm run typecheck # this is a package json script that will run typecheck for all packages recursively
```

If you still want to use npx you will need to run it inside the package you want to check:

```sh
cd packages/ui
npx typecheck --noEmit
```

### Build

```sh
pnpm run build
pnpm run build:profile # Will open a visual representation of the modules inside the compile package
```

### Use a locally built package

You might want to test your local changes against a React application.

> [`yalc`](https://github.com/whitecolor/yalc) is a tool aiming to simplify working with local npm packages by providing a different workflow than `npm/pnpm link`, hence avoiding most of their issues with module resolving.

```bash
pnpm install --global yalc # Make sure to have the yalc binary
```

Here is an example for using `@ultraviolet/ui` as a local package:

```bash
pnpm run build && cd packages/ui && yalc publish
# Now it's ready to install in your project
cd ../project-something
yalc add @ultraviolet/ui
cd ../ultraviolet
# If you do some changes into your package
pnpm run build && yalc publish --push --sig # --push will automatically update the package on projects where it have been added, --sig updates the signature hash to trigger webpack update
```

You can redo the same with `@ultraviolet/form` if you want to test it

> :warning: since [1.0.0.pre.51 (2021-04-23)](https://github.com/wclr/yalc/blob/master/CHANGELOG.md#100pre51-2021-04-23), `yalc publish` needs the `--sig` option to trigger webpack module actual update.

> :warning: `yalc` create a `yalc.lock` and updates the `package.json` in the target project. **Make sure to not commit these changes**

> :warning: if you are trying to yalc @ultraviolet/ui & @ultraviolet/form in your application and hope to see the change of @ultraviolet/ui into the component used by @ultraviolet/form you should be sure to not have any peerDeps of @ultraviolet/ui installed as it's will be resolve. If your are using pnpm and vite you can add `pnpm.override: { "@ultraviolet/ui": "$@ultraviolet/ui" }`. If this rfc is accepted this will solve our issue https://github.com/pnpm/rfcs/blob/main/text/0001-catalogs.md 

---

## Versioning

We are using [Changeset](https://github.com/changesets/changesets) to manage our versioning.

Once your modifications are ready to be released, you can run `pnpm run changeset` to create a new changeset.
It will ask you to describe your changes and will create a new changeset file in the `changesets` folder.

Read more about it [here](/CONTRIBUTING.md#versioning).

## Documentation

Checkout our [documentation website](https://storybook.ultraviolet.scaleway.com/).

## Contributing

📝 You can participate in the development and [start contributing](/CONTRIBUTING.md) to it.
