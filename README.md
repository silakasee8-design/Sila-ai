# SILA AI

SILA AI is an English and Swahili assistant with grammar, code, business, and document review modes.

## Run locally

Requirements:

- Node.js 18 or newer
- Git
- Docker Desktop, or another reachable PostgreSQL database
- An OpenAI API key

Clone and install:

```bash
git clone https://github.com/silakasee8-design/Sila-ai.git
cd Sila-ai
npm install
cp .env.example .env
```

Start local PostgreSQL with Docker:

```bash
docker compose up -d postgres
```

Then edit `.env` and set the local database and private secrets:

```env
PORT=3000
OPENAI_API_KEY=your_real_openai_api_key
OPENAI_MODEL=gpt-4o-mini
DATABASE_URL=postgres://sila:sila_local_password@localhost:5432/sila
JWT_SECRET=replace_with_a_long_random_secret
INTEGRATION_API_KEY=replace_with_a_long_random_integration_key
```

Generate safe random values instead of the placeholders. For example, with Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run that command twice: use one value for `JWT_SECRET` and another for `INTEGRATION_API_KEY`.

Start SILA:

```bash
npm start
```

Open <http://localhost:3000>.

The server creates the `users` and `messages` tables automatically when it starts. Login, `/api/chat`, and `/api/history` require both `DATABASE_URL` and `JWT_SECRET` and a reachable PostgreSQL database.

Check health:

```bash
curl http://localhost:3000/api/health
```

Stop the local database when finished:

```bash
docker compose down
```

Use `docker compose down -v` only if you also want to delete local chat data.

## Render

The included `render.yaml` creates the web service and PostgreSQL database. In Render, add `OPENAI_API_KEY`; `JWT_SECRET`, `INTEGRATION_API_KEY`, and `DATABASE_URL` are configured by the Blueprint. Never paste secrets into tracked files.

## Security

Never commit `.env`, API keys, database URLs, passwords, OAuth secrets, or access tokens. `.env` is ignored by Git. If a secret is exposed, revoke and replace it immediately.
