# SILA AI — local and production use

## Browser login flow

Open `/auth.html` to sign in or create an account. Successful authentication sets an HTTP-only cookie and redirects to the main SILA app. The browser then calls `/api/chat` directly; no curl or API-key testing is required for normal users.

Authentication and chat require a reachable PostgreSQL database, `JWT_SECRET`, and `OPENAI_API_KEY`.

## Local startup

```bash
git clone https://github.com/silakasee8-design/Sila-ai.git
cd Sila-ai
npm install
cp .env.example .env
docker compose up -d postgres
npm start
```

Open:

```text
http://localhost:3000/auth.html
```

Verify the service:

```bash
curl http://localhost:3000/api/health
```

The weather dashboard is available at `/weather-dashboard.html` and uses Open-Meteo without a weather API key.

## Runtime checklist

- Use Node.js 18 or newer.
- Set `OPENAI_API_KEY`, `DATABASE_URL`, and `JWT_SECRET`.
- Keep `.env` out of Git; never commit real credentials.
- Start PostgreSQL before starting the server.
- If chat returns “Please log in”, open `/auth.html` first.
- If chat returns a service configuration error, inspect `/api/health` before troubleshooting the browser.
