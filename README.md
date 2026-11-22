# ft_transcendence integration starter (CRM for rental car teams)

This is **not a finished CRM**. The initial integration connects React, Django REST Framework, PostgreSQL, Nginx, and session-based authentication.

## Requirements
Docker Engine and `docker compose` (Docker Desktop on Windows), free port 8080, and internet access to fetch images/packages on the first build.

## Launch
1. Copy `.env.example` to `.env`, replace `DB_PASSWORD` and `DJANGO_SECRET_KEY` with random secrets.
2. From the directory containing `compose.yaml` run:

```bash
docker compose build
docker compose up -d postgres
docker compose run --rm backend python manage.py migrate
docker compose up -d
docker compose ps
curl http://localhost:8080/api/health/
```

3. Visit http://localhost:8080/setup-business , create an account, then log in at http://localhost:8080/login .

To view logs: `docker compose logs -f backend nginx frontend`. To stop: `docker compose down` (keeps data). **Do not** run `docker compose down -v` unless you want to delete the PostgreSQL volume.

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
Protected routing and current-user API, client management, bookings, CRM dashboard, employee UI, password-reset flow, tests for the full feature set, HTTPS, deployment hardening, ELK deployment integration, and production security review. No feature should be considered production-ready.
