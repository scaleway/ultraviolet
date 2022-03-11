######################################################################
# This stage install dependencies and build the application          #
######################################################################
FROM node:17.7-buster as builder
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN apk --no-cache add curl
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm@6
RUN pnpm install

COPY . .

RUN pnpm run build:storybook

######################################################################
# This stage download a simple http server and serve the application #
######################################################################
FROM node:17.7-alpine

WORKDIR /workspace

COPY --from=builder /usr/src/app/storybook-static .

RUN apk --no-cache add curl
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm@6
RUN pnpm add -g http-server

CMD http-server -g -b -p 80
