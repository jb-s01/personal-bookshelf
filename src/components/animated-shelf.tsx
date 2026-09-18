"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";

type BookSpineProps = {
  book: Book;
  onSelect: (book: Book) => void;
};

export function BookSpine({ book, onSelect }: BookSpineProps) {
  const height = `${Math.round(148 + book.height * 72)}px`;
  const width = `${Math.round(28 + (1 - book.height) * 10)}px`;

  return (
    <button
      type="button"
      data-spine
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onSelect(book);
      }}
      onMouseEnter={(event) => {
        animate(event.currentTarget, {
          translateY: -14,
          duration: 280,
          ease: "outQuad",
        });
      }}
      onMouseLeave={(event) => {
        animate(event.currentTarget, {
          translateY: 0,
          duration: 320,
          ease: "outQuad",
        });
      }}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-sm shadow-[inset_-8px_0_12px_rgba(0,0,0,0.18),0_8px_10px_rgba(40,24,8,0.18)]",
        "focus-visible:ring-2 focus-visible:ring-[color:var(--brass)] focus-visible:outline-none",
      )}
      style={{
        height,
        width,
        backgroundColor: book.spineColor,
        color: book.textColor,
      }}
      aria-label={`${book.title} by ${book.author}`}
    >
      <span
        className="pointer-events-none absolute inset-y-0 right-0 w-[3px] opacity-40"
        style={{ background: "linear-gradient(to left, rgba(255,255,255,0.35), transparent)" }}
      />
      <span className="[writing-mode:vertical-rl] rotate-180 px-1 text-left text-[11px] leading-tight font-medium tracking-wide">
        <span className="block max-h-[9.5rem] overflow-hidden text-ellipsis">
          {book.title}
        </span>
      </span>
    </button>
  );
}

type AnimatedShelfProps = {
  books: Book[];
  label: string;
  blurb: string;
  onSelect: (book: Book) => void;
};

export function AnimatedShelf({ books, label, blurb, onSelect }: AnimatedShelfProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) {
      return;
    }
    const spines = row.querySelectorAll("[data-spine]");
    if (spines.length === 0) {
      return;
    }
    const animation = animate(spines, {
      translateY: [24, 0],
      opacity: [0, 1],
      delay: stagger(42),
      duration: 640,
      ease: "outCubic",
    });
    return () => {
      animation.pause();
    };
  }, [books]);

  return (
    <section className="space-y-3">
      <div>
        <h2 className="font-heading text-2xl text-[color:var(--walnut)]">{label}</h2>
        <p className="text-sm text-muted-foreground">{blurb}</p>
      </div>
      {books.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[color:var(--wood-edge)] bg-[color:var(--paper-shadow)] px-4 py-10 text-center text-sm text-muted-foreground">
          Nothing on this shelf matches the filter.
        </div>
      ) : (
        <div className="rounded-xl bg-[color:var(--wood)] p-3 shadow-[inset_0_12px_18px_rgba(0,0,0,0.18)] sm:p-4">
          <div
            ref={rowRef}
            className="flex min-h-[240px] items-end gap-[3px] overflow-x-auto pb-1"
          >
            {books.map((book) => (
              <BookSpine key={book.id} book={book} onSelect={onSelect} />
            ))}
          </div>
          <div className="mt-2 h-3 rounded-sm bg-[color:var(--wood-edge)] shadow-[0_-4px_8px_rgba(0,0,0,0.25)]" />
        </div>
      )}
    </section>
  );
}
