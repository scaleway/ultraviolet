FROM node:24.16.0-alpine@sha256:21f403ab171f2dc89bad4dd69d7721bfd15f084ccb46cdd225f31f2bc59b5c9a AS builder
WORKDIR /build

ARG TURBO_TOKEN=token

ENV TURBO_TOKEN ${TURBO_TOKEN}

COPY . .

RUN npm install -g corepack@0.31.0
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build:storybook

FROM node:24.16.0-alpine@sha256:21f403ab171f2dc89bad4dd69d7721bfd15f084ccb46cdd225f31f2bc59b5c9a AS runner
WORKDIR /app

COPY --from=builder /build/storybook-static ./storybook-static

EXPOSE 80/tcp

CMD npx http-server@14.1.1 ./storybook-static -p 80
