######################################################################
# This stage install dependencies and build the application          #
######################################################################
FROM node:18.7-alpine as builder
WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build:storybook

######################################################################
# This stage download a simple http server and serve the application #
######################################################################
FROM node:18.7-alpine

WORKDIR /workspace

COPY --from=builder /usr/src/app/storybook-static .

RUN npm add -g serve

CMD serve -l 80
