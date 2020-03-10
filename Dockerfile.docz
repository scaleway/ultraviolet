######################################################################
# This stage install dependencies and build the application          #
######################################################################
FROM node:13.10.1-stretch as builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --pure-lockfile

COPY . .

RUN yarn run docz:build

######################################################################
# This stage download a simple http server and serve the application #
######################################################################
FROM nginx:1.15-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/.docz/dist /var/www/html
