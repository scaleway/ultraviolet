FROM node:24.15.0-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f AS builder
WORKDIR /build

ARG TURBO_TOKEN=token

ENV TURBO_TOKEN ${TURBO_TOKEN}

COPY . .

RUN npm install -g corepack@0.31.0
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build:storybook

FROM node:24.15.0-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f AS runner
WORKDIR /app

COPY --from=builder /build/storybook-static ./storybook-static

EXPOSE 80/tcp

CMD npx http-server@14.1.1 ./storybook-static -p 80
