#!/bin/sh
# Si la variable CODE est remplie dans Railway, le site demande un identifiant et un code.
if [ -n "$CODE" ]; then
  CODE_HASH=$(caddy hash-password --plaintext "$CODE")
  export CODE_HASH
  echo "Protection par code : ACTIVE (identifiant : ${IDENTIFIANT:-famille})"
  exec caddy run --config /etc/caddy/Caddyfile.code --adapter caddyfile
else
  echo "Protection par code : desactivee (variable CODE vide)"
  exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
fi
