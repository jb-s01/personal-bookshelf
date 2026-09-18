import type { Metadata } from "next";
import { BookCard } from "@/components/book-card";
import { LlmStatusBadge } from "@/components/llm-status";
import { getCurrentlyReading } from "@/lib/catalog";
import { isDeskShelf, shelfLabel } from "@/lib/shelf";
import { SHELF_IDS } from "@/lib/types";

export const metadata: Metadata = {
  title: "Currently reading",
};

export default function CurrentlyReadingPage() {
  const reading = getCurrentlyReading();
  const deskShelves = SHELF_IDS.filter((shelf) => isDeskShelf(shelf));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-heading text-4xl text-[color:var(--walnut)]">
            Currently reading
          </h1>
          <LlmStatusBadge />
        </div>
        <p className="max-w-2xl text-muted-foreground">
          Off the tall wall and onto the furniture: the stool stack, the O’Reilly
          pile, and the small display of Daily Stoic, Meditations, and The
          Intelligent Investor.
        </p>
      </header>
      {reading.length === 0 ? (
        <div className="rounded-xl border border-dashed px-4 py-16 text-center text-muted-foreground">
          The desk is clear. Nothing is marked as currently reading.
        </div>
      ) : (
        deskShelves.map((shelf) => {
          const books = reading.filter((book) => book.shelf === shelf);
          if (books.length === 0) {
            return (
              <section key={shelf} className="space-y-3">
                <h2 className="font-heading text-2xl">{shelfLabel(shelf)}</h2>
                <p className="rounded-xl border border-dashed px-4 py-8 text-sm text-muted-foreground">
                  No titles from this pile in the catalog yet.
                </p>
              </section>
            );
          }
          return (
            <section key={shelf} className="space-y-4">
              <h2 className="font-heading text-2xl text-[color:var(--walnut)]">
                {shelfLabel(shelf)}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
