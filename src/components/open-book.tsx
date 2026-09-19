"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  bookFrame,
  isSpreadStage,
  nextStage,
  stageTransition,
  type BookStage,
} from "@/lib/book-stage";
import type { Book, SummaryResponse } from "@/lib/types";

type OpenBookProps = {
  book: Book;
  origin: DOMRect;
  onClose: () => void;
};

function BookSummary({ book }: { book: Book }) {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);

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
      })
      .catch((caught: unknown) => {
        if (controller.signal.aborted) {
          return;
        }
        setSummary({
          bookId: book.id,
          summary: book.summary,
          whyItFits: book.whyItFits,
          source: "fallback",
          model: null,
          error: caught instanceof Error ? caught.message : "Could not load a summary.",
        });
      });
    return () => controller.abort();
  }, [book.id, book.summary, book.whyItFits]);

  const text = summary?.summary ?? book.summary;

  return (
    <p className="font-heading text-[13px] leading-relaxed text-[color:var(--walnut)] sm:text-[15px]">
      {text}
    </p>
  );
}

function ClosedCover({ book }: { book: Book }) {
  return (
    <div
      className="flex h-full w-full flex-col justify-between overflow-hidden rounded-sm p-4 shadow-[inset_-18px_0_28px_rgba(0,0,0,0.28),0_18px_40px_rgba(0,0,0,0.35)]"
      style={{ backgroundColor: book.spineColor, color: book.textColor }}
    >
      <span className="h-1 w-10 rounded-full opacity-50" style={{ backgroundColor: book.textColor }} />
      <div className="space-y-2">
        <p className="font-heading text-xl leading-tight sm:text-2xl">{book.title}</p>
        <p className="text-xs tracking-wide uppercase opacity-80">{book.author}</p>
      </div>
      <span className="h-1 w-16 rounded-full opacity-40" style={{ backgroundColor: book.textColor }} />
    </div>
  );
}

function OpenSpread({ book, onClose }: { book: Book; onClose: () => void }) {
  return (
    <div className="relative h-full w-full" style={{ perspective: 1600 }}>
      <div className="absolute inset-0 flex overflow-hidden rounded-sm shadow-[0_24px_60px_rgba(20,10,0,0.45)]">
        <div className="book-page book-page-left flex w-1/2 flex-col justify-between px-4 py-5 sm:px-6 sm:py-6">
          <div>
            <h2
              id="open-book-title"
              className="font-heading text-xl leading-tight text-[color:var(--walnut)] sm:text-3xl"
            >
              {book.title}
            </h2>
            <p className="mt-2 text-sm text-[#6b5340]">{book.author}</p>
          </div>
          <p className="text-[11px] text-[#8a7460]">
            {book.year}
            {book.genre ? ` · ${book.genre}` : ""}
          </p>
        </div>
        <div className="book-page book-page-right relative w-1/2 overflow-y-auto px-4 pt-10 pb-5 sm:px-6 sm:pt-11 sm:pb-6">
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-2 right-2 text-[color:var(--walnut)] hover:bg-[color:var(--walnut)]/10"
            aria-label="Return to the shelf"
            onClick={onClose}
          >
            <XIcon />
          </Button>
          <BookSummary book={book} />
        </div>
      </div>
      <motion.div
        className="absolute top-0 right-0 h-full w-1/2 origin-left rounded-r-sm"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: -158 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: book.spineColor,
          color: book.textColor,
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          boxShadow: "-12px 0 24px rgba(0,0,0,0.28)",
        }}
      >
        <div className="flex h-full flex-col justify-end p-4">
          <p className="font-heading text-lg leading-tight">{book.title}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function OpenBook({ book, origin, onClose }: OpenBookProps) {
  const reduceMotion = useReducedMotion();
  const [stage, setStage] = useState<BookStage>(reduceMotion ? "open" : "pulling");
  const [viewport, setViewport] = useState({ w: origin.width, h: origin.height });

  const beginClose = useCallback(() => {
    setStage((current) => {
      if (current === "folding" || current === "shelving") {
        return current;
      }
      return reduceMotion ? "shelving" : "folding";
    });
  }, [reduceMotion]);

  useEffect(() => {
    const update = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        beginClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [beginClose]);

  const frame = bookFrame(stage, origin, viewport);
  const spread = isSpreadStage(stage);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="open-book-title">
      <motion.button
        type="button"
        aria-label="Close book"
        className="absolute inset-0 cursor-default bg-[#120a04]/55"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={beginClose}
      />
      <motion.div
        className="pointer-events-none absolute top-0 left-0 origin-center"
        initial={{
          x: origin.left,
          y: origin.top,
          width: origin.width,
          height: origin.height,
          rotate: 0,
        }}
        animate={{
          x: frame.x,
          y: frame.y,
          width: frame.width,
          height: frame.height,
          rotate: frame.rotate,
        }}
        transition={reduceMotion ? { duration: 0 } : stageTransition(stage)}
        onAnimationComplete={() => {
          const upcoming = nextStage(stage);
          if (upcoming) {
            setStage(upcoming);
            return;
          }
          if (stage === "shelving") {
            onClose();
          }
        }}
      >
        <div className="pointer-events-auto h-full w-full">
          <AnimatePresence mode="wait" initial={false}>
            {spread ? (
              <motion.div
                key="spread"
                className="h-full w-full"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <OpenSpread book={book} onClose={beginClose} />
              </motion.div>
            ) : (
              <motion.div
                key="closed"
                className="h-full w-full"
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ClosedCover book={book} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
