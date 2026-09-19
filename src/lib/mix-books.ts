import type { Book } from "@/lib/types";

function mulberry32(seed: number): () => number {
  let state = seed;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function mixBooks(books: Book[]): Book[] {
  const next = [...books];
  const rand = mulberry32(0x5e1f7c0d);
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    const current = next[i] as Book;
    const swap = next[j] as Book;
    next[i] = swap;
    next[j] = current;
  }
  return next;
}
