"use client";

import { useEffect, useRef, useState } from "react";
import { createTimeline, stagger } from "animejs";
import { motion, useReducedMotion } from "motion/react";
import { SkipJourney } from "@/components/skip-journey";
import { nextDoorBeat, type DoorBeat } from "@/lib/journey";

type ThresholdDoorProps = {
  onCrossed: () => void;
  onSkip: () => void;
};

function doorTransition(beat: DoorBeat) {
  switch (beat) {
    case "idle":
      return { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };
    case "unlatch":
      return { duration: 0.72, ease: [0.33, 1, 0.68, 1] as const };
    case "swing":
      return { duration: 3.35, ease: [0.12, 0.82, 0.16, 1] as const };
    case "cross":
      return { duration: 1.35, ease: [0.22, 0.01, 0.18, 1] as const };
    default: {
      const _exhaustive: never = beat;
      return _exhaustive;
    }
  }
}

export function ThresholdDoor({ onCrossed, onSkip }: ThresholdDoorProps) {
  const reduceMotion = useReducedMotion();
  const [beat, setBeat] = useState<DoorBeat>("idle");
  const ambientRef = useRef<HTMLDivElement>(null);
  const opening = beat !== "idle";
  const swingOpen = beat === "swing" || beat === "cross";

  useEffect(() => {
    const root = ambientRef.current;
    if (!root || reduceMotion) {
      return;
    }
    const motes = root.querySelectorAll("[data-threshold-mote]");
    const seam = root.querySelector("[data-seam]");
    const timeline = createTimeline({ defaults: { loop: true, ease: "inOutSine" } });
    if (seam) {
      timeline.add(seam, {
        opacity: [0.28, 0.85, 0.35],
        duration: 3200,
      });
    }
    timeline.add(
      motes,
      {
        translateY: [-8, -46],
        opacity: [0, 0.7, 0],
        duration: 5200,
        delay: stagger(180),
      },
      0,
    );
    return () => {
      timeline.pause();
    };
  }, [reduceMotion]);

  const handleOpen = () => {
    if (beat !== "idle") {
      return;
    }
    if (reduceMotion) {
      onSkip();
      return;
    }
    setBeat("unlatch");
  };

  return (
    <motion.div
      ref={ambientRef}
      className="threshold-void relative h-dvh w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(126,224,255,0.08),transparent_42%),radial-gradient(ellipse_at_50%_110%,rgba(196,163,90,0.16),transparent_50%)]" />
      {Array.from({ length: 12 }, (_, index) => (
        <span
          key={`mote-${index}`}
          data-threshold-mote
          className="absolute h-1 w-1 rounded-full bg-[#f4e6c3]/80"
          style={{
            left: `${12 + ((index * 7) % 76)}%`,
            bottom: `${8 + (index % 5) * 6}%`,
          }}
        />
      ))}

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-[min(8vh,4.5rem)] sm:pb-16">
        <div className="mb-6 max-w-3xl text-center">
          <h1 className="font-display text-[1.85rem] leading-[1.15] font-light tracking-[0.02em] text-[#f3e6c8] sm:text-5xl">
            My personal library in digital timespace
          </h1>
          <blockquote className="font-heading mt-4 px-2 text-[15px] leading-relaxed font-normal text-[#d7c7a4] italic sm:text-xl">
            “What we know is a drop, what we don’t know is an ocean”
            <footer className="mt-2 font-sans text-[11px] tracking-[0.16em] text-[#cbb892]/75 not-italic uppercase">
              Isaac Newton
            </footer>
          </blockquote>
        </div>

        <motion.div
          className="door-stage"
          animate={
            beat === "cross"
              ? { scale: 1.28, z: 180, filter: "brightness(1.35)" }
              : { scale: 1, z: 0, filter: "brightness(1)" }
          }
          transition={doorTransition(beat)}
          onAnimationComplete={() => {
            if (beat !== "cross") {
              return;
            }
            onCrossed();
          }}
        >
          <button
            type="button"
            className="door-frame"
            onClick={handleOpen}
            disabled={opening}
            aria-label="Open the door to the library"
          >
            <span data-seam className="door-seam" />
            <motion.span
              className="door-leaf door-leaf-left"
              animate={{ rotateY: swingOpen ? -88 : 0 }}
              transition={doorTransition(swingOpen ? "swing" : beat)}
              onAnimationComplete={() => {
                if (beat !== "swing") {
                  return;
                }
                setBeat("cross");
              }}
            >
              <span className="door-glyph" />
              <motion.span
                className="door-handle door-handle-left"
                animate={{ rotate: beat === "idle" ? 0 : -82 }}
                transition={doorTransition("unlatch")}
                onAnimationComplete={() => {
                  if (beat !== "unlatch") {
                    return;
                  }
                  const next = nextDoorBeat(beat);
                  if (next) {
                    setBeat(next);
                  }
                }}
              />
            </motion.span>
            <motion.span
              className="door-leaf door-leaf-right"
              animate={{ rotateY: swingOpen ? 88 : 0 }}
              transition={doorTransition(swingOpen ? "swing" : beat)}
            >
              <span className="door-glyph" />
              <span className="door-handle door-handle-right" />
            </motion.span>
            <span className="door-glow" />
          </button>
        </motion.div>

        <p className="mt-5 font-mono text-[10px] tracking-[0.28em] text-white/45 uppercase">
          {beat === "idle" ? "Touch the door" : "The lock remembers other geometries"}
        </p>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(circle at 50% 58%, rgba(180,230,255,0.55), rgba(20,10,4,0.15) 46%, transparent 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: beat === "cross" ? 0.9 : beat === "swing" ? 0.35 : 0 }}
        transition={{ duration: 1.1 }}
      />
      <SkipJourney onSkip={onSkip} />
    </motion.div>
  );
}
