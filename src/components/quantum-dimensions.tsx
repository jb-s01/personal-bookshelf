"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger } from "animejs";
import { motion } from "motion/react";
import { dimensionCaption, type DimensionKind } from "@/lib/journey";

type QuantumDimensionProps = {
  kind: DimensionKind;
};

const CLOUD_MOTES = [
  { x: 18, y: 22, s: 3 },
  { x: 42, y: 18, s: 2 },
  { x: 70, y: 28, s: 4 },
  { x: 22, y: 48, s: 2 },
  { x: 54, y: 44, s: 3 },
  { x: 78, y: 52, s: 2 },
  { x: 30, y: 72, s: 3 },
  { x: 62, y: 76, s: 4 },
  { x: 86, y: 68, s: 2 },
  { x: 12, y: 64, s: 2 },
  { x: 48, y: 60, s: 3 },
  { x: 36, y: 34, s: 2 },
] as const;

function StringsField() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const paths = root.querySelectorAll("[data-string]");
    const timeline = createTimeline({ defaults: { loop: true, ease: "inOutSine" } });
    timeline.add(paths, {
      translateY: [0, -7, 6, 0],
      scaleY: [1, 1.35, 0.72, 1],
      opacity: [0.35, 0.95, 0.4, 0.85],
      duration: 1600,
      delay: stagger(90),
    });
    return () => {
      timeline.pause();
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-[#070312]">
      <svg className="h-full w-full" viewBox="0 0 200 140" preserveAspectRatio="none">
        {Array.from({ length: 11 }, (_, index) => {
          const y = 14 + index * 10;
          const hue = 190 + index * 12;
          return (
            <path
              key={`string-${index}`}
              data-string
              d={`M0 ${y} Q 50 ${y - 10} 100 ${y} T 200 ${y}`}
              fill="none"
              stroke={`hsl(${hue} 90% 72%)`}
              strokeWidth="1.1"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
    </div>
  );
}

function SuperpositionField() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0b0614]">
      {[0, 1, 2].map((copy) => (
        <motion.div
          key={`ghost-${copy}`}
          className="absolute top-[18%] left-[18%] h-[64%] w-[64%] rounded-[4px] border border-[#d48cff]/70"
          style={{
            boxShadow: "0 0 18px rgba(212, 140, 255, 0.28)",
            background:
              "linear-gradient(180deg, rgba(212,140,255,0.08), rgba(80,180,255,0.05))",
          }}
          animate={{
            x: [copy * -10, copy * 12, copy * -8],
            y: [copy * 6, copy * -10, copy * 4],
            opacity: [0.22 + copy * 0.12, 0.7 - copy * 0.12, 0.28 + copy * 0.1],
            rotate: [copy * -2, copy * 3, copy * -1],
          }}
          transition={{ duration: 3.6 + copy * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function CompactField() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const rings = root.querySelectorAll("[data-ring]");
    const spin = animate(rings, {
      rotate: 360,
      duration: 14000,
      delay: stagger(280),
      loop: true,
      ease: "linear",
    });
    return () => {
      spin.pause();
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 grid place-items-center bg-[#050816]">
      {[86, 64, 46, 30, 16].map((size, index) => (
        <span
          key={`ring-${size}`}
          data-ring
          className="absolute rounded-full border"
          style={{
            width: `${size}%`,
            height: `${size * (index % 2 === 0 ? 0.62 : 1.15)}%`,
            borderColor: index % 2 === 0 ? "rgba(126,224,255,0.7)" : "rgba(196,163,90,0.7)",
            boxShadow: "0 0 12px rgba(126,224,255,0.18)",
          }}
        />
      ))}
    </div>
  );
}

function CloudField() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#070a14]">
      {CLOUD_MOTES.map((mote, index) => (
        <motion.span
          key={`${mote.x}-${mote.y}`}
          className="absolute rounded-full bg-[#9be7ff]"
          style={{
            left: `${mote.x}%`,
            top: `${mote.y}%`,
            width: mote.s,
            height: mote.s,
            boxShadow: "0 0 10px rgba(155, 231, 255, 0.8)",
          }}
          animate={{
            x: [0, index % 2 === 0 ? 16 : -14, 0],
            y: [0, index % 3 === 0 ? -18 : 12, 0],
            opacity: [0.15, 0.9, 0.2],
            scale: [0.7, 1.4, 0.8],
          }}
          transition={{ duration: 4 + (index % 5), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function InterferenceField() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <motion.div
        className="absolute inset-[-20%]"
        style={{
          background:
            "repeating-radial-gradient(circle at 35% 50%, rgba(126,224,255,0.0) 0 8px, rgba(126,224,255,0.55) 9px 10px, rgba(212,140,255,0.0) 12px 18px)",
        }}
        animate={{ x: [0, 24, -10, 0], y: [0, -8, 6, 0], rotate: [0, 4, -2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[-20%] mix-blend-screen"
        style={{
          background:
            "repeating-radial-gradient(circle at 68% 48%, rgba(196,163,90,0.0) 0 10px, rgba(196,163,90,0.4) 11px 12px)",
        }}
        animate={{ x: [0, -18, 12, 0], y: [0, 10, -6, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

function DimensionScene({ kind }: { kind: DimensionKind }) {
  switch (kind) {
    case "strings":
      return <StringsField />;
    case "superposition":
      return <SuperpositionField />;
    case "compact":
      return <CompactField />;
    case "cloud":
      return <CloudField />;
    case "interference":
      return <InterferenceField />;
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

export function QuantumDimension({ kind }: QuantumDimensionProps) {
  return (
    <div className="relative h-full w-full">
      <DimensionScene kind={kind} />
      <p className="pointer-events-none absolute inset-x-2 bottom-2 font-mono text-[9px] tracking-wide text-white/55">
        {dimensionCaption(kind)}
      </p>
    </div>
  );
}
