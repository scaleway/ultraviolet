######################################################################
# This stage install dependencies and build the application          #
######################################################################
FROM node:17.6-alpine as builder
WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn --immutable --inline-builds

COPY . .

RUN yarn run build:storybook

######################################################################
# This stage download a simple http server and serve the application #
######################################################################
FROM node:17.6-alpine

WORKDIR /workspace

COPY --from=builder /usr/src/app/storybook-static .

RUN yarn global add http-server

CMD http-server -g -b -p 80
