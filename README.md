# Jonas’s bookshelf

A personal library site for **Jonas Slaunwhite** — Technology Manager, Data & AI at BDO Canada, based in Halifax. Visitors can walk the physical shelves, open a spine for a short brief, see what is currently on the desk, and read a bio drawn from his public work (`jb-s01` profile/portfolio, Concordia teaching, and the career graph that lives in `resume_graph`).

The interactive wall uses [Anime.js](https://animejs.com) for the shelf stagger and the pull-out hover. Briefs try a local [Ollama](https://ollama.com) model first and fall back to the static shelf notes if Ollama is not running.

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

- `/` — desk pile and the working quote
- `/shelves` — the six photographed bays as an animated wall
- `/currently-reading` — stool, O’Reilly, and the stoic/investor display
- `/bio` — career, method, and what the collection implies
- `/book/[id]` — a single title, with an Ollama brief when available

The catalog is `src/data/catalog.json` (45 titles). Tall shelves are the standing collection; the stool, O’Reilly stack, and small display row are marked currently reading.

## Stack

Next.js (App Router) · TypeScript · Tailwind · shadcn/ui · Anime.js · Ollama
