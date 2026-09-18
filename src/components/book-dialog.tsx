"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LlmStatusBadge } from "@/components/llm-status";
import { shelfLabel } from "@/lib/shelf";
import type { Book, SummaryResponse } from "@/lib/types";

type BookDialogProps = {
  book: Book | null;
  onOpenChange: (open: boolean) => void;
};

function BookSummaryPanel({ book }: { book: Book }) {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: book.id }),
      signal: controller.signal,
    })
      .then(async (response) => {
        const body = (await response.json()) as SummaryResponse & { error?: string };
        if (!response.ok) {
          throw new Error(body.error ?? "Could not load a summary.");
        }
        return body;
      })
      .then((body) => {
        setSummary(body);
        setLoading(false);
      })
      .catch((caught: unknown) => {
        if (controller.signal.aborted) {
          return;
        }
        setLoading(false);
        setError(caught instanceof Error ? caught.message : "Could not load a summary.");
      });

    return () => controller.abort();
  }, [book.id]);

  return (
    <>
      {loading ? (
        <p className="text-sm text-muted-foreground">Pulling a brief off the shelf…</p>
      ) : null}
      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
          <p className="mt-2 text-foreground">{book.summary}</p>
        </div>
      ) : null}
      {summary ? (
        <div className="space-y-3 text-sm leading-relaxed">
          <p>{summary.summary}</p>
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">On this shelf because. </span>
            {summary.whyItFits}
          </p>
          <p className="text-xs text-muted-foreground">
            {summary.source === "ollama"
              ? `Spoken by ${summary.model ?? "Ollama"}.`
              : "Shelf note (Ollama was not available)."}
          </p>
        </div>
      ) : null}
    </>
  );
}

export function BookDialog({ book, onOpenChange }: BookDialogProps) {
  const canDismiss = useRef(false);

  useEffect(() => {
    if (!book) {
      canDismiss.current = false;
      return;
    }
    canDismiss.current = false;
    const arm = window.setTimeout(() => {
      canDismiss.current = true;
    }, 350);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(arm);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [book, onOpenChange]);

  if (!book) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-[10vh] sm:pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-dialog-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close brief"
        onClick={() => {
          if (canDismiss.current) {
            onOpenChange(false);
          }
        }}
      />
      <div className="relative z-10 w-full max-w-lg rounded-xl bg-[color:var(--paper)] p-5 shadow-xl ring-1 ring-[color:var(--wood-edge)]/20">
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-3 right-3"
          aria-label="Close"
          onClick={() => onOpenChange(false)}
        >
          <XIcon />
        </Button>
        <div className="space-y-1 pr-8">
          <h2 id="book-dialog-title" className="font-heading text-2xl leading-tight">
            {book.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {book.author} · {book.year} · {book.genre}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline">{shelfLabel(book.shelf)}</Badge>
          {book.currentlyReading ? (
            <Badge className="bg-[color:var(--brass)] text-[color:var(--walnut)]">
              Currently reading
            </Badge>
          ) : (
            <Badge variant="secondary">Collection</Badge>
          )}
          <LlmStatusBadge />
        </div>
        <div className="mt-4 space-y-4">
          <BookSummaryPanel key={book.id} book={book} />
          <Link
            href={`/book/${book.id}`}
            className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground"
          >
            Open full card
          </Link>
        </div>
      </div>
    </div>
  );
}
