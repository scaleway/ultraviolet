FROM node:22.13.0-alpine
WORKDIR /build

ARG TURBO_TOKEN=token

ENV TURBO_TOKEN ${TURBO_TOKEN}

COPY . .

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build:storybook

EXPOSE 80/tcp

CMD pnpm http-server ./storybook-static -p 80
