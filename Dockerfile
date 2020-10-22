######################################################################
# This stage install dependencies and build the application          #
######################################################################
FROM node:14.14.0-stretch as builder
WORKDIR /usr/src/app


COPY package.json yarn.lock ./

RUN yarn --pure-lockfile

COPY . .

ARG NODE_ENV=production

ENV NODE_ENV ${NODE_ENV}

ARG LINT_TIME=false

RUN if [ "$LINT_TIME" = "true" ]; \
    then yarn lint; \
    fi

######################################################################
# This stage download a simple http server and serve the application #
######################################################################
FROM nginx:1.19-alpine
COPY ./nginx-mime.types /etc/nginx/mime.types
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /var/www/html
