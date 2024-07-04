FROM node:20.15.0-alpine
WORKDIR /build

COPY . .

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm build:storybook:stats

RUN pnpm add serve -w

EXPOSE 80/tcp

CMD pnpm serve ./storybook-static -l 80
