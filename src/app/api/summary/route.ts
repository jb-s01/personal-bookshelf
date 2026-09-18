import { getBook } from "@/lib/catalog";
import { summarizeBook } from "@/lib/ollama";

export async function POST(request: Request) {
  let bookId = "";
  try {
    const body = (await request.json()) as { bookId?: string };
    bookId = body.bookId?.trim() ?? "";
  } catch {
    return Response.json(
      { error: "Send a JSON body with bookId." },
      { status: 400 },
    );
  }

  const book = getBook(bookId);
  if (!book) {
    return Response.json({ error: "That book is not on these shelves." }, { status: 404 });
  }

  const summary = await summarizeBook(book);
  return Response.json(summary);
}
