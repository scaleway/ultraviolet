# Contributing to Scaleway UI

We are very happy to welcome you into this project! Your contribution is very appreciated and will help development and stability of the project.
Contribution is in fact open to anyone, developer or not, in order to guide you during this process here are some guidelines.

## Table of content

- [Contributing](#contributing-to-scaleway-ui)
  - [Code of Conduct](#code-of-conduct)
  - [Project Structure](#project-structure)
  - [Creating an Issue](#creating-an-issue)
  - [Creating a pull request](#creating-a-pull-request)
  - [Commit & Pull Request Guideline](#commit--pull-request-guideline)

## Code of Conduct

Scaleway UI has adopted [Contributor Covenant](https://www.contributor-covenant.org), please read [code of conduct file](/CODE_OF_CONDUCT.md)
to understand what is tolerated and what is not.

## Project Structure

```
scaleway-ui/
  package.json
  ...
  src/
    components/
      Button/
        __stories__/
        __tests__/
        index.tsx
        helper.ts
      ...
    helpers/
    theme/
```

The project is composed of components, each of them is composed of a story folder plus a test folder.

Helper files contains functions that are used multiple times, they are useful in order to make a functionalities work.

## Creating an Issue

You have an issue with Scaleway UI or you want to propose a new creative feature? First things first: [check that this issue hasn't been already opened or solved](https://github.com/scaleway/scaleway-ui/issues). 🔎

**You found a closed issue about a bug, but it's still here?**

Please [open an issue](https://github.com/scaleway/scaleway-ui/issues/new/choose) mentioning closed issue with all details: how to reproduce it, screenshots and videos if you can.

**You didn't find any corresponding issue?**

You can now [open an issue](https://github.com/scaleway/scaleway-ui/issues/new/choose) and choose most fitting template! Collect and describe as much information as possible.
If you're opening an issue about a bug or a fix please describe how to reproduce, put some screenshots and even videos if you can.

## Creating a pull request

You are a developer and wants to play part in this project? Lucky us!

In order to publish your changes here is what you need to do:

1. Fork the repository.
2. Clone your fork on your local machine:

```shell
git clone https://github.com/<your username>/scaleway-ui.git
cd scaleway-ui
git remote add upstream https://github.com/scaleway/scaleway-ui.git
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
pnpm install && pnpm start
```

6. Make your code modifications and test them locally:

```shell
pnpm test:unit
```

If you have an error with unit test please check corresponding test and try to resolve the issue.
Generating snapshot might be required depending on modification.

7. Commit using [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) and push your changes:

```shell
pnpm commit
```

and then:

```shell
git push -u origin HEAD
```

8. Come back on our repository and create a [pull request](https://github.com/scaleway/scaleway-ui/compare).

Congratulation! Now you just need to wait reviews from our core team, your pull request will either be merged, request changes or closed with an explanation.

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

## License

By contributing your code to the [scaleway/scaleway-ui](https://github.com/scaleway/scaleway-ui) GitHub repository, you agree to license your contribution under the [Apache License 2.0](/LICENSE).
