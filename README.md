# Scaleway UI

Scaleway official UI library.

## Develop

Start docz using `yarn dev`.

## Create a new release

1. Prepare the new release: `yarn release`. (You can check changes made with `git diff HEAD^1`)
2. Push the release: `git push --follow-tags origin master`.
3. :warning: **do not publish yourself**, the pipeline will do it for you with the `front-ci-cd` user.

## Use local changes on shire

1. In the scaleway-ui directory: `yarn && yarn build && cp -f ./dist/* ../shire/node_modules/@scaleway/ui/dist`
2. Go to your local branch on shire and: `yarn start`