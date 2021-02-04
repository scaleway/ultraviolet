# Scaleway UI

Scaleway official UI library.

---

## Develop

Start storybook using `yarn dev`.

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
