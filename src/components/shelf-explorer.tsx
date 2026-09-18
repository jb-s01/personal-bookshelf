"use client";

import { useMemo, useState } from "react";
import { AnimatedShelf } from "@/components/animated-shelf";
import { BookDialog } from "@/components/book-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { searchBooks } from "@/lib/catalog";
import { SHELF_IDS, type Book, type ShelfId } from "@/lib/types";
import { isDeskShelf, shelfBlurb, shelfLabel } from "@/lib/shelf";

type Filter = "all" | "desk" | "collection" | ShelfId;

function filterBooks(filter: Filter, query: string): Book[] {
  const searched = searchBooks(query);
  if (filter === "all") {
    return searched;
  }
  if (filter === "desk") {
    return searched.filter((book) => book.currentlyReading);
  }
  if (filter === "collection") {
    return searched.filter((book) => !book.currentlyReading);
  }
  return searched.filter((book) => book.shelf === filter);
}

export function ShelfExplorer() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Book | null>(null);

  const visible = useMemo(() => filterBooks(filter, query), [filter, query]);

  const shelvesToShow: ShelfId[] =
    filter === "all" || filter === "desk" || filter === "collection"
      ? SHELF_IDS.filter((shelf) => {
          if (filter === "desk") {
            return isDeskShelf(shelf);
          }
          if (filter === "collection") {
            return !isDeskShelf(shelf);
          }
          return true;
        })
      : [filter];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search title, author, or genre"
          aria-label="Search the shelves"
          className="h-8 w-full max-w-md rounded-lg border border-input bg-[color:var(--paper)] px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <Tabs
          value={filter === "all" || filter === "desk" || filter === "collection" ? filter : "all"}
          onValueChange={(value) => {
            if (value === "all" || value === "desk" || value === "collection") {
              setFilter(value);
            }
          }}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="desk">On the desk</TabsTrigger>
            <TabsTrigger value="collection">Tall shelves</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex flex-wrap gap-2">
        {SHELF_IDS.map((shelf) => (
          <button
            key={shelf}
            type="button"
            onClick={() => setFilter(shelf)}
            className={`rounded-full border px-3 py-1 text-xs ${
              filter === shelf
                ? "border-[color:var(--walnut)] bg-[color:var(--walnut)] text-[color:var(--paper)]"
                : "border-[color:var(--wood-edge)] bg-[color:var(--paper)] text-muted-foreground"
            }`}
          >
            {shelfLabel(shelf)}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[color:var(--wood-edge)] px-4 py-16 text-center">
          <p className="font-heading text-xl">No spines match that search.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a looser title, or clear the filter to see the whole wall.
          </p>
        </div>
      ) : (
        shelvesToShow.map((shelf) => {
          const books = visible.filter((book) => book.shelf === shelf);
          if (books.length === 0) {
            return null;
          }
          return (
            <AnimatedShelf
              key={shelf}
              books={books}
              label={shelfLabel(shelf)}
              blurb={shelfBlurb(shelf)}
              onSelect={setSelected}
            />
          );
        })
      )}
      <BookDialog book={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  );
}
