.DEFAULT_GOAL := up

.PHONY: up down logs status

up:
	@if [ ! -f .env ]; then \
		echo "Missing .env. Set DB_PASSWORD, DJANGO_SECRET_KEY, and CSRF_TRUSTED_ORIGINS first." >&2; \
		exit 1; \
	fi
	docker compose build
	docker compose up -d postgres
	docker compose run --rm backend python manage.py migrate
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f backend nginx frontend

status:
	docker compose ps
