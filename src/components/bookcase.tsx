"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { animate, stagger } from "animejs";
import { BookcaseAtmosphere } from "@/components/bookcase-atmosphere";
import { BookSpine } from "@/components/book-spine";
import { OpenBook } from "@/components/open-book";
import { VaultChrome } from "@/components/vault-chrome";
import { mixBooks } from "@/lib/mix-books";
import { packShelves } from "@/lib/spine";
import type { Book } from "@/lib/types";

type BookcaseProps = {
  books: Book[];
  onReplay: () => void;
};

type Selection = {
  book: Book;
  origin: DOMRect;
};

export function Bookcase({ books, onReplay }: BookcaseProps) {
  const caseRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [innerWidth, setInnerWidth] = useState(1100);
  const [selected, setSelected] = useState<Selection | null>(null);

  const mixed = useMemo(() => mixBooks(books), [books]);
  const shelves = useMemo(() => packShelves(mixed, innerWidth), [mixed, innerWidth]);

  useEffect(() => {
    const node = rowRef.current;
    if (!node) {
      return;
    }
    const measure = () => {
      setInnerWidth(Math.max(80, Math.floor(node.getBoundingClientRect().width)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = caseRef.current;
    if (!root) {
      return;
    }
    const shelfNodes = root.querySelectorAll("[data-shelf]");
    const lamps = root.querySelectorAll("[data-lamp]");
    if (shelfNodes.length === 0) {
      return;
    }
    const enter = animate(shelfNodes, {
      translateY: [18, 0],
      delay: stagger(90),
      duration: 620,
      ease: "outCubic",
    });
    const glow =
      lamps.length === 0
        ? null
        : animate(lamps, {
            opacity: [0.32, 0.7, 0.32],
            duration: 4200,
            loop: true,
            ease: "inOutSine",
            delay: stagger(360),
          });
    return () => {
      enter.pause();
      glow?.pause();
    };
  }, [shelves.length]);

  const handleSelect = useCallback((book: Book, origin: DOMRect) => {
    setSelected({ book, origin });
  }, []);

  return (
    <motion.div
      ref={caseRef}
      className="relative h-dvh w-full overflow-hidden bg-[#03050c]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <VaultChrome onReplay={onReplay} />
      <div className="absolute inset-0 z-10 flex flex-col p-5 pt-16 pb-14 sm:p-12 sm:pt-20 sm:pb-16 lg:p-20 lg:pt-24 lg:pb-20">
        <div className="vault-aperture relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="vault-scan pointer-events-none absolute inset-0 z-30" />
          <div className="bookcase-frame relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="bookcase-crown h-4 shrink-0 sm:h-5" />
          <div className="relative min-h-0 flex-1 overflow-y-auto px-3 pb-4 sm:px-5">
            <div ref={rowRef} className="mx-auto flex h-full min-h-full w-full max-w-[1400px] flex-col">
              {shelves.map((row, index) => (
                <div
                  key={`shelf-${index}`}
                  data-shelf
                  className="flex min-h-[148px] flex-1 flex-col justify-end"
                >
                  <div
                    data-lamp
                    className="pointer-events-none mb-1 h-10 shrink-0 opacity-40"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(255, 214, 140, 0.28), transparent 68%)",
                    }}
                  />
                  <div className="flex items-end justify-center gap-[3px] px-1">
                    {row.map((book) => (
                      <BookSpine
                        key={book.id}
                        book={book}
                        pulled={selected?.book.id === book.id}
                        onSelect={handleSelect}
                      />
                    ))}
                  </div>
                  <div className="bookcase-board mt-1 h-3 shrink-0 sm:h-3.5" />
                </div>
              ))}
            </div>
          </div>
          <div className="bookcase-plinth h-5 shrink-0 sm:h-6" />
          </div>
        </div>
      </div>
      <BookcaseAtmosphere />
      <AnimatePresence>
        {selected ? (
          <OpenBook
            key={selected.book.id}
            book={selected.book}
            origin={selected.origin}
            onClose={() => setSelected(null)}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
