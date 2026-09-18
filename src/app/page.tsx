import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { LlmStatusBadge } from "@/components/llm-status";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentlyReading, catalogSize } from "@/lib/catalog";
import { bio } from "@/lib/bio";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const reading = getCurrentlyReading();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-5">
          <p className="text-sm tracking-[0.2em] text-[color:var(--brass-dark)] uppercase">
            Halifax · physical copies
          </p>
          <h1 className="font-heading text-4xl leading-[1.1] text-[color:var(--walnut)] sm:text-5xl">
            The books on Jonas Slaunwhite’s shelves.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {catalogSize} identifiable titles from the tall wall, the leadership bay,
            the stool, the O’Reilly pile, and the stoic display on the desk. Click a
            spine for a brief. {bio.headline}.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/shelves" className={cn(buttonVariants(), "h-9 px-4")}>
              Walk the shelves
            </Link>
            <Link
              href="/currently-reading"
              className={cn(buttonVariants({ variant: "outline" }), "h-9 px-4")}
            >
              What he’s reading
            </Link>
            <LlmStatusBadge />
          </div>
        </div>
        <blockquote className="rounded-2xl border border-[color:var(--wood-edge)] bg-[color:var(--paper)] p-6 shadow-sm">
          <p className="font-heading text-xl leading-snug text-[color:var(--walnut)]">
            “{bio.quote}”
          </p>
          <footer className="mt-4 text-sm text-muted-foreground">
            — Jonas, on why AI projects start with the outcome
          </footer>
        </blockquote>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl text-[color:var(--walnut)]">On the desk</h2>
            <p className="text-sm text-muted-foreground">
              Stool stack, O’Reilly animals, and the small facing row — currently in hand.
            </p>
          </div>
          <Link href="/currently-reading" className="text-sm underline-offset-4 hover:underline">
            All {reading.length}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {reading.slice(0, 6).map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
}
