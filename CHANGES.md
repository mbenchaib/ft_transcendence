# Integration changes
1. Replaced demo `python -m http.server` with actual Django Gunicorn container.
2. Added PostgreSQL service, migrations-first run steps, database connection via environment variables.
3. Built frontend with multi-stage Node/Vite Dockerfile, served built files via frontend Nginx.
4. Routed `/api/` to Django and `/` to frontend via root Nginx, keeping API prefixes intact.
5. Fixed wrong external frontend API host and `/api/sign_up/` calls; matched Django authentication routes.
6. Matched registration snake_case fields and added CSRF cookie acquisition, token request header and session credentials.
7. Added awaited form submissions, error display, navigation on success, removed console logging of form values.
8. Added `/workspace` placeholder and `/api/health/` endpoint (neither implies CRM features are complete).
9. Converted UTF-16 requirements file into plain UTF-8, added server dependencies.
10. Moved hard-coded Django secret to env and disabled debug by default.
11. Removed automatic Django staff privilege for public registrations; workspace owner based employee API authorization on boss relationship.
12. Added input password validation, compose `.env.example`, Docker ignore files, and run documentation.

**Scope caveat:** Docker could not be run inside the artifact-building environment; verify compose on your own machine and inspect container logs. Observability configs are retained but not integrated or verified.
