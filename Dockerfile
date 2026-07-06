FROM node:24.18.0-alpine@sha256:a0b9bf06e4e6193cf7a0f58816cc935ff8c2a908f81e6f1a95432d679c54fbfd AS builder
WORKDIR /build

ARG TURBO_TOKEN=token

ENV TURBO_TOKEN ${TURBO_TOKEN}

COPY . .

RUN npm install -g corepack@0.31.0
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build:storybook

FROM node:24.18.0-alpine@sha256:a0b9bf06e4e6193cf7a0f58816cc935ff8c2a908f81e6f1a95432d679c54fbfd AS runner
WORKDIR /app

COPY --from=builder /build/storybook-static ./storybook-static

EXPOSE 80/tcp

CMD npx http-server@14.1.1 ./storybook-static -p 80
