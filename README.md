# Scaleway UI

Scaleway official UI library.

---

## Install environment

Install all dependencies with `yarn install`

## Develop

Start storybook using `yarn start`.

### Test

```sh
$ yarn run test # Will run all tests
$ yarn run test --updateSnapshot # Will update all snapshots
$ yarn run test:watch # Will watch tests and only rerun the one who are modified
$ yarn run test:coverage # Will generate a coverage report
```

### Lint

```sh
$ yarn run lint
$ yarn run lint:fix
```

### Build

```sh
$ yarn run build
$ yarn run build:profile
```

---

## Usage

### Link against another project (with `yalc`) => FAVORED

> [`yalc`](https://github.com/whitecolor/yalc) is a tool aiming to simplify working with local npm packages by providing a different workflow than `npm/yarn link`, hence avoiding most of their issues with module resolving.

```bash
$ yarn global add yalc # Make sure to have the yalc binary
```

```bash
$ cd scaleway-ui
$ yarn run build # Build the package
$ yalc publish
$ # Now it's ready to install in your project
$ cd ../project-something
$ yalc add @scaleway/ui --yarn
$ # If you do some changes into your package
$ cd scaleway-ui
$ yarn run build
$ yalc publish --push # --push will automatically update the package on projects where it have been added
```

> :warning: `yalc` create a `yalc.lock` and updates the `package.json` in the target project. Make sure to not commit these changes

### NPM link

```sh
$ # In the scaleway-ui project
$ yarn link
$ # In the project where you want to use it
$ yarn link @scaleway/ui
$ # When you are done, to restore the original package
$ yarn unlink @scaleway/ui && yarn install --force
```

---

## Versioning

We enforce the [conventionnal commits](https://www.conventionalcommits.org) convention in order to infer package bump versions and generate changelog.

Only the `feat`, `fix` and `perf` types will generate a new package on the `master` branch
