export const SHELF_IDS = [
  "display",
  "stool",
  "oreilly",
  "leadership",
  "main-left",
  "main-right",
] as const;

export type ShelfId = (typeof SHELF_IDS)[number];

export type Book = {
  id: string;
  title: string;
  author: string;
  shelf: ShelfId;
  currentlyReading: boolean;
  genre: string;
  year: number;
  spineColor: string;
  textColor: string;
  height: number;
  summary: string;
  whyItFits: string;
};

export type Catalog = {
  owner: string;
  updated: string;
  photoMap: Record<ShelfId, string>;
  notes: string;
  books: Book[];
};

export type LlmSource = "ollama" | "fallback";

export type SummaryResponse = {
  bookId: string;
  summary: string;
  whyItFits: string;
  source: LlmSource;
  model: string | null;
  error: string | null;
};

export type LlmStatus = {
  available: boolean;
  host: string;
  model: string | null;
  models: string[];
};
