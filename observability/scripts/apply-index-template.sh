#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$PROJECT_ROOT"

CONTAINER="observability-elasticsearch-1"
TEMPLATE_FILE="observability/elasticsearch/crm-logs-v2-template.json"
TEMPLATE_NAME="crm-logs-v2-template"

echo "[1/3] Validating template JSON..."
python3 -m json.tool "$TEMPLATE_FILE" > /dev/null

echo "[2/3] Applying Elasticsearch index template..."

docker exec -i "$CONTAINER" sh -c '
  set -eu

  CA=$(find /usr/share/elasticsearch/config/certs \
    -type f -name ca.crt -print -quit)

  test -n "$CA"

  curl -fsS \
    --cacert "$CA" \
    -u "elastic:$ELASTIC_PASSWORD" \
    -X PUT \
    -H "Content-Type: application/json" \
    "https://localhost:9200/_index_template/crm-logs-v2-template" \
    --data-binary @-
' < "$TEMPLATE_FILE"

echo
echo "[3/3] Template deployment completed."
echo "TEMPLATE_DEPLOYMENT=PASS"
