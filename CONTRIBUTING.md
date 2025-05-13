# Contributing to Ultraviolet UI

We are very happy to welcome you into this project! Your contribution is very appreciated and will help development and stability of the project.
Contribution is in fact open to anyone, developer or not, in order to guide you during this process here are some guidelines.

## Table of content

- [Contributing](#contributing-to-ultraviolet)
  - [Code of Conduct](#code-of-conduct)
  - [Project Structure](#project-structure)
  - [Creating an Issue](#creating-an-issue)
  - [Creating a pull request](#creating-a-pull-request)
  - [Commit & Pull Request Guideline](#commit--pull-request-guideline)
  - [Versioning](#versioning)
  - [Release](#release)
  - [Hotfix](#hotfix)
  - [Beta](#beta)

## Code of Conduct

Ultraviolet UI has adopted [Contributor Covenant](https://www.contributor-covenant.org), please read [code of conduct file](/CODE_OF_CONDUCT.md)
to understand what is tolerated and what is not.

## Project Structure

```
ultraviolet/
  package.json
  ...
  e2e/ <== end-to-end testing with a mix of many components to test edge cases
  examples/ <== folder with project examples using our packages (nextjs, vite, etc.)
  packages/
    [ui/form/plus/...]/
      src/
        components/
          Button/
            __stories__/
            __tests__/ <== unit testing
            __generated__/ <== some package have generated files do not edit those manually
            index.tsx
            helper.ts <== local helper used in one specific component
          ...
        helpers/ <== global helpers for all components in a specific package
    utils/ <== our scripts for generation and tools for testing 
```

The project is composed of components, each of them is composed of a story folder plus a test folder.

Helper files contains functions that are used multiple times, they are useful in order to make a functionalities work.

## Creating an Issue

You have an issue with Ultraviolet UI or you want to propose a new creative feature? First things first: [check that this issue hasn't been already opened or solved](https://github.com/scaleway/ultraviolet/issues). 🔎

**You found a closed issue about a bug, but it's still here?**

Please [open an issue](https://github.com/scaleway/ultraviolet/issues/new/choose) mentioning closed issue with all details: how to reproduce it, screenshots and videos if you can.

**You didn't find any corresponding issue?**

You can now [open an issue](https://github.com/scaleway/ultraviolet/issues/new/choose) and choose most fitting template! Collect and describe as much information as possible.
If you're opening an issue about a bug or a fix please describe how to reproduce, put some screenshots and even videos if you can.

## Creating a pull request

You are a developer and wants to play part in this project? Lucky us!

In order to publish your changes here is what you need to do:

1. Fork the repository.
2. Clone your fork on your local machine:

```shell
git clone https://github.com/<your username>/ultraviolet.git
cd ultraviolet
git remote add upstream https://github.com/scaleway/ultraviolet.git
```

3. Synchronize your local main branch with the upstream one:

```shell
git checkout main
git pull upstream main
```

4. Create a new branch:

```shell
git checkout -b fix/my-branch
```

5. Install dependencies and start storybook to test your modifications:

```shell
pnpm install && pnpm build && pnpm run start
```

6. Make your code modifications and test them locally:

```shell
pnpm run test:unit
```

If you have an error with unit test please check corresponding test and try to resolve the issue.
Generating snapshot might be required depending on modification.

7. Generate a changeset file for the changelog history:

```shell
pnpm changeset
```

You will need to choose between `major`, `minor` or `patch` version. This will generate a file in the `.changeset` folder. Please refer to [versioning](#versioning) section to understand when to use which version.

8. Commit using [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) and push your changes:

```shell
pnpm run commit
```

and then:

```shell
git push -u origin HEAD
```

9. Come back on our repository and create a [pull request](https://github.com/scaleway/ultraviolet/compare).

Congratulation! Now you just need to wait for 2 reviews from our core team, your pull request will either be merged, request changes or closed with an explanation.

## Commit & Pull Request Guideline

We have specific rules on how to structure of our commit messages to make them easy to read.

### Structure

Here is simple structure:

```
type(scope): commit message
```

Where types are defined just below, scope defines the subject and commit message should be a more precise definition of what has been changed.

Example: I'm working on a fix on Button component by changing behavior on click event. Commit message & pull request title will be:

```
fix(button): fade in animation on click
```

### Types

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **revert**: If the commit revert a previous commit

## Versioning

Ultraviolet uses [semantic versioning](https://semver.org/), this means that each version is composed of 3 numbers: major, minor and patch.

- **Major**: When you make incompatible API changes.
- **Minor**: When you add functionality in a backwards-compatible manner.
- **Patch**: When you make backwards-compatible bug fixes.

## Release

We have a github action named [release.yml](https://github.com/scaleway/ultraviolet/blob/main/.github/workflows/release.yml) that will automatically create a new pull request for release when something is merge into main.

This pull request will show all the changeset that have been added into main since last release. In order to trigger a new release you need to only merge this pull request usually named `chore: release`

Once merge the same github action will run and will automatically bump version of modified package and publish it on NPM.

## Hotfix

It can happen that you need to fix a bug on a stable version, in this case you need to create a hotfix branch from the stable version and then create a pull request on this branch. The process is the same as [creating a pull request](#creating-a-pull-request) but you need to create a hotfix branch from the stable version.

## Beta

We will explain here how to handle a beta correctly and how our workflow of GitHub Actions works with it.

> [!NOTE]
> A beta version is not always required. Consider creating a beta version if you have significant major changes that need to be tested and reviewed before the final release. This is especially useful when multiple teams or projects depend on the library and need time to adapt. However, **using a beta version is optional and not mandatory**.

Before releasing a new major version, you should create a beta to allow for a testing period of the major changes across all projects using the library. To do this, first create a beta branch from main:
```sh
git checkout -b beta main
```

Next, enter prerelease mode for changeset:
```sh
pnpm changeset pre enter beta
```

From this point on, any changeset added to pull requests targeting the beta branch will be included in the beta version.

Creating a `beta` branch enables the [release GitHub Action](https://github.com/scaleway/ultraviolet/blob/main/.github/workflows/release.yml) to run on the beta branch as well. Like the main branch, the beta branch will have its own release (beta) pull request, usually named `chore: release (beta)`. Merging this pull request will publish the beta version to npm and make it available for testing.

> [!IMPORTANT] 
> Throughout the beta period, **make sure to write clear and descriptive changesets**, as these will be used for the beta release notes. 

When the beta phase is complete and you are ready to release the new major version, create a pull request from the beta branch into main. This will merge all beta changes into main and trigger the new major release. After the release, you can delete the beta branch.

### How to manage both main and beta?

Managing both the main and beta branches requires careful coordination. **When you create a beta version, all new features and changes should be merged into the beta branch.** The only exceptions are critical hotfixes, which may be merged into main.

If a hotfix needs to be applied to the stable version (main), proceed as usual by merging it into main and releasing a new stable version. Afterward, ensure that the hotfix is also included in the beta branch by merging main into beta through a intermediate pull request. This keeps both branches synchronized and ensures that the beta version contains all critical fixes.

> [!TIP]
> Keep the following in mind when planning a beta:
> - Have a clear roadmap and action plan before starting a beta.
> - Set a deadline for the beta period; managing multiple release branches is complex and requires regular synchronization.
> - Only hotfixes should be merged and released in the main branch during the beta period.
> - Encourage teams to migrate to the beta version quickly by providing support and documentation.
> - Write clear changesets, as they will be used as release notes for the beta version.

## License

By contributing your code to the [scaleway/ultraviolet](https://github.com/scaleway/ultraviolet) GitHub repository, you agree to license your contribution under the [Apache License 2.0](/LICENSE).
