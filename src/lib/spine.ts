import type { Book } from "@/lib/types";

const SHELF_GAP = 3;

export function spineSize(book: Book): { width: number; height: number } {
  const height = Math.round(118 + book.height * 52);
  const width = Math.round(18 + (1 - book.height) * 11 + (book.title.length > 28 ? 3 : 0));
  return { width, height };
}

export function packShelves(books: Book[], innerWidth: number): Book[][] {
  const usable = Math.max(innerWidth, 80);
  const rows: Book[][] = [];
  let row: Book[] = [];
  let used = 0;

  for (const book of books) {
    const { width } = spineSize(book);
    const nextUsed = row.length === 0 ? width : used + SHELF_GAP + width;
    if (row.length > 0 && nextUsed > usable) {
      rows.push(row);
      row = [book];
      used = width;
      continue;
    }
    row.push(book);
    used = nextUsed;
  }

  if (row.length > 0) {
    rows.push(row);
  }

  return rows;
}

export function spineTilt(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return ((Math.abs(hash) % 17) - 8) / 10;
}
