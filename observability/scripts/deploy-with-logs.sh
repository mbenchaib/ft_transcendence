#!/usr/bin/env bash
set -euo pipefail


#Had script kaychecki container Running, walakin Running machi necessarily Healthy.

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$PROJECT_ROOT"

COMPOSE_FILE="observability/compose.elk.yaml"
ENV_FILE="observability/.env"
REFRESH_SCRIPT="observability/scripts/refresh-log-paths.py"

# Require an explicit application service.
if (( $# == 0 )); then
  echo "Usage: $0 nginx [backend]"
  echo "       $0 backend"
  exit 2
fi

# Allow only our CRM application services.
for service in "$@"; do
  case "$service" in
    nginx|backend)
      ;;
    *)
      echo "ERROR: Unsupported service: $service" >&2
      exit 2
      ;;
  esac
done

echo "[1/5] Validating observability Compose..."

docker compose \
  --env-file "$ENV_FILE" \
  -f "$COMPOSE_FILE" \
  config -q

echo "[2/5] Recreating requested CRM service(s)..."

docker compose -f compose.yaml \
  up -d --no-deps --force-recreate "$@"

echo "[3/5] Verifying application containers..."

for service in "$@"; do
  container="ft_transcendence-${service}-1"

  state="$(docker inspect \
    --format '{{.State.Running}}' \
    "$container")"

  if [[ "$state" != "true" ]]; then
    echo "ERROR: $container is not running" >&2
    exit 1
  fi

  echo "$service: RUNNING"
done

echo "[4/5] Refreshing Docker log paths..."

refresh_output="$(python3 "$REFRESH_SCRIPT")"
printf '%s\n' "$refresh_output"

if grep -qx 'LOG_PATHS_CHANGED=yes' <<< "$refresh_output"; then
  echo "Log paths changed. Recreating Filebeat..."

  docker compose \
    --env-file "$ENV_FILE" \
    -f "$COMPOSE_FILE" \
    up -d --no-deps --force-recreate filebeat

elif grep -qx 'LOG_PATHS_CHANGED=no' <<< "$refresh_output"; then
  echo "Log paths unchanged. Keeping existing Filebeat."

else
  echo "ERROR: Unexpected refresh-script output" >&2
  exit 1
fi

echo "[5/5] Checking Filebeat..."

filebeat_state="$(docker inspect \
  --format '{{.State.Running}}' \
  observability-filebeat-1)"

if [[ "$filebeat_state" != "true" ]]; then
  echo "ERROR: Filebeat is not running" >&2
  exit 1
fi

echo "Filebeat: RUNNING"
echo "DEPLOYMENT_WORKFLOW=PASS"
echo "NOTE: Application health and Elasticsearch ingestion still need verification."
