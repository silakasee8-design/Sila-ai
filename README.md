# SILA AI

SILA AI is a simple English and Swahili assistant with a responsive web interface and a secure Node.js backend.

## What is connected

- Frontend chat interface in `index.html`
- Express backend in `server.js`
- OpenAI chat endpoint at `POST /api/chat`
- Health endpoint at `GET /api/health`
- Environment-variable protection for the API key
- Render deployment configuration in `render.yaml`

## Run locally

You need Node.js 18 or newer.

```bash
npm install
cp .env.example .env
```

Open `.env` and set your private API key:

```env
PORT=3000
OPENAI_API_KEY=your_real_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

Start the application:

```bash
npm start
```

Open <http://localhost:3000> in your browser.

Check the backend:

```bash
curl http://localhost:3000/api/health
```

A configured local server should return:

```json
{
  "ok": true,
  "aiConfigured": true,
  "model": "gpt-4o-mini"
}
```

## Deploy on Render

1. Open [Render](https://render.com/) and sign in with GitHub.
2. Select **New**, then **Web Service**.
3. Select the `silakasee8-design/Sila-ai` repository.
4. Use the following settings:

   - **Runtime:** Node
   - **Build command:** `npm install`
   - **Start command:** `npm start`

5. Add these environment variables in the Render dashboard:

   ```text
   OPENAI_API_KEY=your_real_openai_api_key
   OPENAI_MODEL=gpt-4o-mini
   ```

6. Create the service and wait for deployment to finish.
7. Test the health URL:

   ```text
   https://YOUR-RENDER-URL.onrender.com/api/health
   ```

8. Open the Render service URL and test the SILA chat.

The included `render.yaml` configures the build command, start command, health check, and model variable. Render will still ask you to provide the secret `OPENAI_API_KEY` privately.

## Security

Never add a real API key to `index.html`, `server.js`, `.env.example`, or any other tracked file. Add the key only to a local `.env` file or to Render's private environment variables. The `.gitignore` file excludes `.env` and `node_modules/` from Git.

If an API key was accidentally published, revoke it immediately and create a replacement before deploying.

## Project files

- `index.html` — SILA AI interface and chat client
- `server.js` — Express server, health check, and OpenAI integration
- `package.json` — dependencies and start scripts
- `.env.example` — safe environment-variable template
- `.gitignore` — prevents local secrets and dependencies from being committed
- `render.yaml` — Render deployment configuration
