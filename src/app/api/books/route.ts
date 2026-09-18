import { catalog, getBook, searchBooks } from "@/lib/catalog";
import { SHELF_IDS, type ShelfId } from "@/lib/types";

function parseShelf(value: string | null): ShelfId | null {
  if (!value) {
    return null;
  }
  if ((SHELF_IDS as readonly string[]).includes(value)) {
    return value as ShelfId;
  }
  return null;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (id) {
    const book = getBook(id);
    if (!book) {
      return Response.json({ error: "Not on the shelf." }, { status: 404 });
    }
    return Response.json(book);
  }

  const query = url.searchParams.get("q") ?? "";
  const shelf = parseShelf(url.searchParams.get("shelf"));
  const reading = url.searchParams.get("reading");

  let books = searchBooks(query);
  if (shelf) {
    books = books.filter((book) => book.shelf === shelf);
  }
  if (reading === "now") {
    books = books.filter((book) => book.currentlyReading);
  }
  if (reading === "collection") {
    books = books.filter((book) => !book.currentlyReading);
  }

  return Response.json({
    owner: catalog.owner,
    count: books.length,
    total: catalog.books.length,
    books,
  });
}
