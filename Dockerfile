FROM node:24.13.0-alpine
WORKDIR /build

ARG TURBO_TOKEN=token

ENV TURBO_TOKEN ${TURBO_TOKEN}

COPY . .

RUN npm install -g corepack@0.31.0
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build:storybook

EXPOSE 80/tcp

CMD pnpm http-server ./storybook-static -p 80
