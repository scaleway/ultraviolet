######################################################################
# This stage install dependencies and build the application          #
######################################################################
FROM node:14.15-alpine as builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --pure-lockfile

COPY . .

RUN yarn run build:storybook

######################################################################
# This stage download a simple http server and serve the application #
######################################################################
FROM node:14.15-alpine

WORKDIR /workspace

COPY --from=builder /usr/src/app/storybook-static .

RUN yarn global add serve

CMD serve -l 80
