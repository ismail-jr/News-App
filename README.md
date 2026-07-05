# World News

A modern React news reader that shows top US headlines by category, powered by [NewsAPI](https://newsapi.org).

## Why news was not showing

The app was calling NewsAPI directly from the browser. NewsAPI blocks most browser requests (CORS), so the fetch failed silently and no articles rendered. This project now routes requests through a local `/api/news` proxy that keeps your API key on the server.

## Features

- Category navigation (General, Technology, Business, Health, Sports, Science, Entertainment)
- Loading, error, and empty states
- Responsive card grid layout
- Image fallback when article thumbnails are missing
- Works in development, preview, and production

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and add your API key:

```bash
cp .env.example .env
```

Then edit `.env` and replace `your_newsapi_key_here` with your real key from https://newsapi.org/register

> **Important:** `.env` is not committed to git. You must create it locally after cloning.

3. Start the development server:

```bash
npm run dev
```

Open http://localhost:5173

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with API proxy |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build (includes API proxy) |
| `npm start` | Serve production build with Express API proxy |
| `npm run lint` | Run ESLint |

## Production

### Option 1: Node server (recommended)

```bash
npm run build
npm start
```

### Option 2: Vercel

Deploy as-is. The `api/news.js` serverless function handles API requests. Set `VITE_API_KEY` in your Vercel environment variables.

## Tech stack

- React 18
- Vite 5
- Bootstrap 5
- NewsAPI Top Headlines
