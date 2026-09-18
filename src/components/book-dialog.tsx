"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  return (
    <Dialog open={book !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[color:var(--paper)] sm:max-w-lg">
        {book ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl leading-tight">
                {book.title}
              </DialogTitle>
              <DialogDescription>
                {book.author} · {book.year} · {book.genre}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap items-center gap-2">
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
            <BookSummaryPanel key={book.id} book={book} />
            <Link
              href={`/book/${book.id}`}
              className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground"
            >
              Open full card
            </Link>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
