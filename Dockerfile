FROM caddy:2-alpine
COPY Caddyfile Caddyfile.code start.sh /etc/caddy/
COPY site /srv
CMD ["sh", "/etc/caddy/start.sh"]
