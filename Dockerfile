FROM node:24.17.0-alpine@sha256:156b55f92e98ccd5ef49578a8cea0df4679826564bad1c9d4ef04462b9f0ded6 AS builder
WORKDIR /build

ARG TURBO_TOKEN=token

ENV TURBO_TOKEN ${TURBO_TOKEN}

COPY . .

RUN npm install -g corepack@0.31.0
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build:storybook

FROM node:24.17.0-alpine@sha256:156b55f92e98ccd5ef49578a8cea0df4679826564bad1c9d4ef04462b9f0ded6 AS runner
WORKDIR /app

COPY --from=builder /build/storybook-static ./storybook-static

EXPOSE 80/tcp

CMD npx http-server@14.1.1 ./storybook-static -p 80
