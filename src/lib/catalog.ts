import catalogJson from "@/data/catalog.json";
import { SHELF_IDS, type Book, type Catalog, type ShelfId } from "@/lib/types";

function isShelfId(value: string): value is ShelfId {
  return (SHELF_IDS as readonly string[]).includes(value);
}

function parseBook(raw: (typeof catalogJson.books)[number]): Book {
  if (!isShelfId(raw.shelf)) {
    throw new Error(`Unknown shelf in catalog: ${raw.shelf}`);
  }
  return { ...raw, shelf: raw.shelf };
}

export const catalog: Catalog = {
  owner: catalogJson.owner,
  updated: catalogJson.updated,
  notes: catalogJson.notes,
  photoMap: catalogJson.photoMap as Catalog["photoMap"],
  books: catalogJson.books.map(parseBook),
};

export function getBooks(): Book[] {
  return catalog.books;
}

export function getBook(id: string): Book | undefined {
  return catalog.books.find((book) => book.id === id);
}

export function getCurrentlyReading(): Book[] {
  return catalog.books.filter((book) => book.currentlyReading);
}

export function getCollection(): Book[] {
  return catalog.books.filter((book) => !book.currentlyReading);
}

export function getBooksByShelf(shelf: ShelfId): Book[] {
  return catalog.books.filter((book) => book.shelf === shelf);
}

export function searchBooks(query: string): Book[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return catalog.books;
  }
  return catalog.books.filter((book) => {
    const haystack = `${book.title} ${book.author} ${book.genre}`.toLowerCase();
    return haystack.includes(needle);
  });
}

export const catalogSize = catalog.books.length;
