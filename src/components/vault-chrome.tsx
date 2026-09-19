"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { motion, useReducedMotion } from "motion/react";

type VaultChromeProps = {
  onReplay: () => void;
};

export function VaultChrome({ onReplay }: VaultChromeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const rails = root.querySelectorAll("[data-rail]");
    const ticks = root.querySelectorAll("[data-tick]");
    const pulse = animate(rails, {
      opacity: [0.35, 0.95, 0.4],
      duration: 2800,
      delay: stagger(220),
      loop: true,
      ease: "inOutSine",
    });
    const scan = animate(ticks, {
      opacity: [0.15, 0.8, 0.15],
      duration: 1800,
      delay: stagger(90),
      loop: true,
      ease: "inOutSine",
    });
    return () => {
      pulse.pause();
      scan.pause();
    };
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0">
      <div className="vault-void absolute inset-0 z-0" />
      <div className="vault-grid absolute inset-0 z-0" />
      <div className="absolute inset-0 z-20">
        <div data-rail className="vault-rail vault-rail-top" />
        <div data-rail className="vault-rail vault-rail-bottom" />
        <div data-rail className="vault-rail vault-rail-left" />
        <div data-rail className="vault-rail vault-rail-right" />
        <span className="vault-corner vault-corner-tl" />
        <span className="vault-corner vault-corner-tr" />
        <span className="vault-corner vault-corner-bl" />
        <span className="vault-corner vault-corner-br" />
        <div className="absolute top-4 left-1/2 flex -translate-x-1/2 items-center gap-3">
          {Array.from({ length: 11 }, (_, index) => (
            <span
              key={`tick-${index}`}
              data-tick
              className="h-1.5 w-1.5 rounded-full bg-[#7ee0ff]"
            />
          ))}
        </div>
        <p className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.34em] text-[#7ee0ff]/70 uppercase">
          Jonas’s bookshelf
        </p>
        {reduceMotion ? null : (
          <motion.button
            type="button"
            className="pointer-events-auto absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.22em] text-[#c4a35a]/80 uppercase hover:text-[#f3e6c8]"
            onClick={onReplay}
            whileHover={{ x: -2 }}
          >
            Return to the door
          </motion.button>
        )}
      </div>
    </div>
  );
}
