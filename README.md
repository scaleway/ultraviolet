# Scaleway UI

Scaleway official UI library.

## Develop

Start docz using `yarn dev`.

## Create a new release

1. Prepare the new release: `yarn release`. (You can check changes made with `git diff HEAD^1`)
1. Push the release: `git push --follow-tags origin master`.
1. :warning: **do not publish yourself**, the pipeline will do it for you with the `front-ci-cd` user.
