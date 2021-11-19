![Codecov](https://img.shields.io/codecov/c/github/scaleway/scaleway-ui)
![GitHub closed issues](https://img.shields.io/github/issues-closed/scaleway/scaleway-ui)
![dependencies](https://david-dm.org/scaleway/scaleway-ui.svg)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/scaleway/scaleway-ui)

# Scaleway UI

Scaleway UI library.

---

⚠️ This library is far from being ready. We are actively working on it. Our goal is to have an easy to use UI system. This includes an exhaustive documentation, improved DX, confidence in testing and a lot of refactoring to have consistency across our components.

⚠️ We are going to break a lot of things towards V1. This library is not yet made to be used by external projects

⚠️ We currently do not accept contributions from external contributors

## Quick Start

```sh
$ yarn add @scaleway/ui @emotion/react @emotion/styled
```

```js
import { theme, Button } from "@scaleway/ui";
import { ThemeProvider } from "@emotion/react";

const App = () => (
  <ThemeProvider theme={theme}>
    <Button variant="primary" onClick={() => console.log("clicked")}>
      Click Me
    </Button>
  </ThemeProvider>
);
```

N.B. To allow typescript theme typings with `@emotion/styled` components,
you'll have to define the `@emotion/react` module `Theme` interface in your project.

Example, in a `global.d.ts` file:

- Declaration to use the default Scaleway theme
```ts
declare module '@emotion/react' {
  import type { SCWUITheme } from '@scaleway/ui'
  // https://emotion.sh/docs/typescript#define-a-theme
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends SCWUITheme {}
}

```
-  Declaration to use your custom theme
```ts
import type { MyTheme } from './src/theme'

declare module '@emotion/react' {
  // https://emotion.sh/docs/typescript#define-a-theme
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MyTheme {}
}

```

## Development

### Storybook

Make sure to have dependencies up to date by running `yarn install`

```sh
$ yarn run start
```

### Test

#### Unit 

```sh
$ yarn run test # Will run all tests
$ yarn run test --updateSnapshot # Will update all snapshots
$ yarn run test:watch # Will watch tests and only rerun the one who are modified
$ yarn run test:coverage # Will generate a coverage report
$ yarn run test:coverage --coverageReporters lcov && open coverage/lcov-report/index.html # Will generate an open an html code coverage report
```

#### Accessibility
```sh
$ yarn run test:a11y # Will run all accessibility tests
$ yarn run test:a11y src/components/Alert # Will run accessibility test of Alert component only
```

### Lint

```sh
$ yarn run lint
$ yarn run lint:fix
```

### Build

```sh
$ yarn run build
$ yarn run build:profile # Will open a visual representation of the modules inside the compile package
```

### Use a locally built package

You might want to test your local changes against a React application.

> [`yalc`](https://github.com/whitecolor/yalc) is a tool aiming to simplify working with local npm packages by providing a different workflow than `npm/yarn link`, hence avoiding most of their issues with module resolving.

```bash
$ yarn global add yalc # Make sure to have the yalc binary
```

```bash
$ cd scaleway-ui
$ yarn build && yalc publish
$ # Now it's ready to install in your project
$ cd ../project-something
$ yalc add @scaleway/ui --yarn
$ cd ../scaleway-ui
$ # If you do some changes into your package
$ yarn build && yalc publish --push --sig # --push will automatically update the package on projects where it have been added, --sig updates the signature hash to trigger webpack update
```

> :warning: since [1.0.0.pre.51 (2021-04-23)](https://github.com/wclr/yalc/blob/master/CHANGELOG.md#100pre51-2021-04-23), `yalc publish` needs the `--sig` option to trigger webpack module actual update.

> :warning: `yalc` create a `yalc.lock` and updates the `package.json` in the target project. **Make sure to not commit these changes**

---

### Versioning

We enforce the [conventionnal commits](https://www.conventionalcommits.org) convention in order to infer package bump versions and generate changelog.

Only the `feat`, `fix` and `perf` types will generate a new package on the `master` branch
