#!/bin/bash
set -euo pipefail

CERTS=/usr/share/elasticsearch/config/certs

if [ ! -f "$CERTS/ca/ca.crt" ]; then
    bin/elasticsearch-certutil ca \
      --silent --pem \
      -out "$CERTS/ca.zip"

    unzip -q "$CERTS/ca.zip" -d "$CERTS"
fi

if [ ! -f "$CERTS/es01/es01.crt" ]; then
    cat > "$CERTS/instances.yml" <<'EOF'
instances:
  - name: es01
    dns:
      - es01
      - elasticsearch
      - localhost
    ip:
      - 127.0.0.1
EOF

    bin/elasticsearch-certutil cert \
      --silent --pem \
      -out "$CERTS/certs.zip" \
      --in "$CERTS/instances.yml" \
      --ca-cert "$CERTS/ca/ca.crt" \
      --ca-key "$CERTS/ca/ca.key"

    unzip -q "$CERTS/certs.zip" -d "$CERTS"
fi

chown -R 1000:0 "$CERTS"
find "$CERTS" -type d -exec chmod 750 {} \;
find "$CERTS" -type f -exec chmod 640 {} \;

echo "Certificate setup completed"