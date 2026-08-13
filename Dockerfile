FROM node:24.18.1-alpine@sha256:f70403e87646dc51b45295f4b8b70cdad0b63d2297c4c9899119b03f7af7a6b3
WORKDIR /app

COPY ./storybook-static ./storybook-static

EXPOSE 80/tcp

CMD npx http-server@14.1.1 ./storybook-static --port 80 --gzip --brotli
