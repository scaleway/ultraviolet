# this dockerfile will be used to generate the same screenshot for our CI.
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /build

ARG TURBO_TOKEN=

ENV TURBO_TOKEN ${TURBO_TOKEN}
ENV CI=true

COPY . .

RUN npm install -g corepack@0.31.0
RUN corepack enable
RUN pnpm install --frozen-lockfile

ENTRYPOINT ["pnpm", "run", "test:e2e"]
