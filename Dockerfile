FROM node:24.12.0-alpine
WORKDIR /build

ARG TURBO_TOKEN=token
ENV TURBO_TOKEN=${TURBO_TOKEN}

# Copy only necessary files for installation
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Install corepack and pnpm
RUN npm install -g corepack@0.31.0
RUN corepack enable

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build storybook
RUN pnpm turbo run build:storybook

EXPOSE 80/tcp

CMD pnpm http-server ./storybook-static -p 80
