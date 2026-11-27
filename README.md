# ft_transcendence integration starter (CRM for rental car teams)

This is **not a finished CRM**. The initial integration connects React, Django REST Framework, PostgreSQL, Nginx, and session-based authentication.

## Requirements
Docker Engine, `docker compose` (Docker Desktop on Windows), GNU Make, free port 8081 by default, and internet access to fetch images/packages on the first build.

## Launch
1. Create a local `.env` file and set `DB_PASSWORD`, `DJANGO_SECRET_KEY`, and `CSRF_TRUSTED_ORIGINS=http://localhost:8081`. The first two values are required by Compose; choose random secrets. `APP_PORT` defaults to `8081`.
2. From the repository root, start the app and apply database migrations with:

   ```bash
   make up
   ```

3. Check services with `make status` or `curl http://localhost:8081/api/health/`. Visit http://localhost:8081/setup-business , create an account, then log in at http://localhost:8081/login .

Use `make logs` to follow app logs. Stop with `make down` (keeps data). **Do not** run `docker compose down -v` unless you want to delete the PostgreSQL volume.

## DevOps and operations

The repository's operational setup is Docker Compose for local or single-host use; it does not contain checked-in CI/CD workflows, infrastructure-as-code, or a cloud deployment configuration.

- **Build and run the app:** `backend/Dockerfile` packages Django/Gunicorn, while `frontend/Dockerfile` builds the Vite app and serves it with Nginx. The root `compose.yaml` runs PostgreSQL, backend, frontend, and a reverse proxy; it defines health checks, restart policies, isolated networks, and a persistent PostgreSQL volume. Nginx publishes the app on `APP_PORT` (8081 by default) and routes `/api/` and `/admin/` to Django.
- **Routine operations:** `make up` applies database migrations when starting the app, and `make logs` follows app logs. There are no repository scripts for database backup/restore or automated upgrades.
- **Optional log pipeline:** `observability/compose.elk.yaml` defines Elasticsearch, Logstash, and Filebeat separately from the app stack. Filebeat reads the Docker JSON logs for Nginx and the backend; Logstash uses TLS for Beats input and Elasticsearch output, tags the sources, parses Nginx access fields, and writes daily `crm-logs-v2-*` indices. The stack requires its own `observability/.env` values and TLS files. `observability/scripts/deploy-with-logs.sh` refreshes Docker log paths and Filebeat after recreating app services; `observability/scripts/apply-index-template.sh` applies the Elasticsearch index template.
- **Operational limits:** these scripts are manual helpers, not a complete deployment or monitoring service. The log deployment script checks that containers are running, but explicitly leaves application health and Elasticsearch ingestion to be verified separately. Production deployment hardening, HTTPS at the app proxy, and a fully integrated ELK deployment are not provided here.

## Standalone development
For backend development, create a virtual environment under `backend/.venv`, install `backend/requirements.txt`, then from `backend/ft_trans` run `python manage.py migrate` and `python manage.py runserver 8000`. This uses local SQLite unless `DB_HOST` is set. For frontend development, run `npm ci && npm run dev` in `frontend`; Vite proxies `/api` to port 8000. Use `http://localhost:5173` and set `DJANGO_DEBUG=1` for backend local development.

## URLs
- `/setup-business`: registration
- `/login`: sign-in
- `/workspace`: placeholder after login (NOT a completed CRM)
- `/api/health/`: backend health
- `/api/auth/csrf`, `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`: authentication
- `/api/auth/employees/`: owner-only employee listing/creation
- `/api/clients/hello`: basic backend test endpoint

## Still unfinished
Protected routing and current-user API, client management, bookings, CRM dashboard, employee UI, password-reset flow, tests for the full feature set, HTTPS, deployment hardening, full ELK deployment integration, and production security review. No feature should be considered production-ready.
