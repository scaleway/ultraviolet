FROM node:20.16.0-alpine
WORKDIR /build

ARG TURBO_TOKEN=token

ENV TURBO_TOKEN ${TURBO_TOKEN}

COPY . .

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run storybook:build --output-logs=hash-only

EXPOSE 80/tcp

CMD pnpm http-server ./storybook-static -p 80
