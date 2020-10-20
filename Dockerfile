######################################################################
# This stage install dependencies and build the application          #
######################################################################
FROM node:14.14.0-stretch as builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --pure-lockfile

COPY . .

RUN yarn run storybook:build

######################################################################
# This stage download a simple http server and serve the application #
######################################################################
FROM node:14.14.0-stretch

WORKDIR /workspace

COPY --from=builder /usr/src/app/storybook-static .

CMD npx serve -l 80
