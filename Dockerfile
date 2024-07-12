FROM node:20.15.1-alpine
WORKDIR /build

ARG TURBO_TOKEN=token

ENV TURBO_TOKEN ${TURBO_TOKEN}

COPY . .

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run storybook:build --output-logs=hash-only

RUN pnpm add serve -w

EXPOSE 80/tcp

CMD pnpm serve ./storybook-static -l 80
