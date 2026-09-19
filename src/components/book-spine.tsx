"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Book } from "@/lib/types";
import { spineSize, spineTilt } from "@/lib/spine";
import { cn } from "@/lib/utils";

type BookSpineProps = {
  book: Book;
  pulled: boolean;
  onSelect: (book: Book, origin: DOMRect) => void;
};

export function BookSpine({ book, pulled, onSelect }: BookSpineProps) {
  const reduceMotion = useReducedMotion();
  const { width, height } = spineSize(book);
  const tilt = spineTilt(book.id);

  return (
    <motion.button
      type="button"
      data-spine
      disabled={pulled}
      onClick={(event) => {
        onSelect(book, event.currentTarget.getBoundingClientRect());
      }}
      whileHover={
        reduceMotion || pulled
          ? undefined
          : {
              y: -16,
              rotate: tilt - 2.4,
              scale: 1.04,
              filter: "brightness(1.14)",
              zIndex: 6,
            }
      }
      whileTap={reduceMotion || pulled ? undefined : { y: -7, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-[2px]",
        "shadow-[inset_-7px_0_10px_rgba(0,0,0,0.22),0_10px_14px_rgba(20,10,0,0.28)]",
        "focus-visible:ring-2 focus-visible:ring-[color:var(--brass)] focus-visible:outline-none",
        pulled && "pointer-events-none",
      )}
      style={{
        height,
        width,
        backgroundColor: book.spineColor,
        color: book.textColor,
        rotate: tilt,
        opacity: pulled ? 0.22 : 1,
      }}
      aria-label={`${book.title} by ${book.author}`}
    >
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-[2px] opacity-50"
        style={{
          background: "linear-gradient(to right, rgba(255,255,255,0.45), transparent)",
        }}
      />
      <span
        className="pointer-events-none absolute inset-x-0 top-[10%] h-[3px] opacity-40"
        style={{ backgroundColor: book.textColor }}
      />
      <span
        className="pointer-events-none absolute inset-x-0 bottom-[10%] h-[3px] opacity-30"
        style={{ backgroundColor: book.textColor }}
      />
      <span className="[writing-mode:vertical-rl] rotate-180 px-0.5 text-left text-[10px] leading-tight font-medium tracking-wide sm:text-[11px]">
        <span className="block max-h-[9rem] overflow-hidden text-ellipsis">
          {book.title}
        </span>
      </span>
    </motion.button>
  );
}
