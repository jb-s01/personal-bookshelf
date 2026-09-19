# Jonas’s bookshelf

A personal library site for **Jonas Slaunwhite** — Technology Manager, Data & AI at BDO Canada, based in Halifax. Open a cinematic door, walk a hallway of adjacent dimensions, and arrive at a single animated bookcase. Pull a spine and it opens to a short brief.

The wall uses [Anime.js](https://animejs.com) for shelf stagger, lamp glow, vibrating strings, and vault rails, and [Motion](https://motion.dev) for the door, camera walk, dust, and the pull-out / open-book choreography. Briefs try a local [Ollama](https://ollama.com) model first and fall back to the static shelf notes if Ollama is not running.

## Run locally

Needs Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:4731](http://127.0.0.1:4731).

Optional Ollama (summaries stay useful without it):

```bash
ollama serve
ollama pull llama3.2:3b
```

Environment (all optional — defaults work for local mock):

```
OLLAMA_HOST=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.2:3b
```

Copy `.env.example` to `.env.local` if you want to pin a model.

## What’s in here

- `/` — door, quantum hallway, then the bookcase in a futurist vault. Click a spine to pull it and open a brief.

The catalog is `src/data/catalog.json` (titles read from the six shelf photos). Every title sits on the same wall — no labeled bays.

## Stack

Next.js (App Router) · TypeScript · Tailwind · shadcn/ui · Anime.js · Motion · Ollama
