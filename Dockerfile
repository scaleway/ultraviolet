FROM caddy:2.11.7-alpine@sha256:e70b164da81ef698b3ad19af799ea6086ce6d9e48ed4079eb9fe26f6fbf14ee5

COPY Caddyfile /etc/caddy/Caddyfile
COPY ./storybook-static /srv/storybook-static
