import type { Book, LlmStatus, SummaryResponse } from "@/lib/types";

const OLLAMA_HOST =
  process.env.OLLAMA_HOST?.replace(/\/$/, "") ?? "http://127.0.0.1:11434";
const PREFERRED_MODEL = process.env.OLLAMA_MODEL ?? "";
const FETCH_MS = 8000;

type TagsResponse = {
  models?: { name: string }[];
};

function withTimeout(ms: number): AbortSignal {
  return AbortSignal.timeout(ms);
}

async function listModels(): Promise<string[]> {
  const response = await fetch(`${OLLAMA_HOST}/api/tags`, {
    signal: withTimeout(4000),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Ollama tags failed (${response.status})`);
  }
  const body = (await response.json()) as TagsResponse;
  return (body.models ?? []).map((model) => model.name).filter(Boolean);
}

function pickModel(models: string[]): string | null {
  if (models.length === 0) {
    return null;
  }
  if (PREFERRED_MODEL && models.includes(PREFERRED_MODEL)) {
    return PREFERRED_MODEL;
  }
  const preferred = models.find(
    (name) =>
      name.startsWith("llama3.2") ||
      name.startsWith("llama3") ||
      name.startsWith("qwen") ||
      name.startsWith("mistral") ||
      name.startsWith("gemma") ||
      name.startsWith("phi"),
  );
  return preferred ?? models[0] ?? null;
}

export async function getLlmStatus(): Promise<LlmStatus> {
  try {
    const models = await listModels();
    return {
      available: models.length > 0,
      host: OLLAMA_HOST,
      model: pickModel(models),
      models,
    };
  } catch {
    return {
      available: false,
      host: OLLAMA_HOST,
      model: null,
      models: [],
    };
  }
}

function fallbackSummary(book: Book, error: string | null): SummaryResponse {
  return {
    bookId: book.id,
    summary: book.summary,
    whyItFits: book.whyItFits,
    source: "fallback",
    model: null,
    error,
  };
}

function buildPrompt(book: Book): string {
  return [
    "Write a 70-word brief for a visitor to Jonas Slaunwhite's personal bookshelf.",
    "Tone: specific, warm, no hype, no lorem. Do not invent plot points.",
    `Title: ${book.title}`,
    `Author: ${book.author}`,
    `Genre: ${book.genre}`,
    `Year: ${book.year}`,
    `Known notes: ${book.summary}`,
    "Return only the brief paragraph.",
  ].join("\n");
}

export async function summarizeBook(book: Book): Promise<SummaryResponse> {
  const status = await getLlmStatus();
  if (!status.available || !status.model) {
    return fallbackSummary(book, null);
  }

  try {
    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: withTimeout(FETCH_MS),
      cache: "no-store",
      body: JSON.stringify({
        model: status.model,
        prompt: buildPrompt(book),
        stream: false,
        options: { temperature: 0.4, num_predict: 180 },
      }),
    });
    if (!response.ok) {
      return fallbackSummary(book, `Ollama generate failed (${response.status})`);
    }
    const body = (await response.json()) as { response?: string };
    const text = body.response?.trim();
    if (!text) {
      return fallbackSummary(book, "Ollama returned an empty summary");
    }
    return {
      bookId: book.id,
      summary: text,
      whyItFits: book.whyItFits,
      source: "ollama",
      model: status.model,
      error: null,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Ollama request failed";
    return fallbackSummary(book, message);
  }
}
