"use client";

import { motion } from "motion/react";

const MOTES = [
  { left: "8%", top: "18%", size: 2, duration: 11, delay: 0.2 },
  { left: "16%", top: "62%", size: 3, duration: 14, delay: 1.1 },
  { left: "23%", top: "34%", size: 2, duration: 9, delay: 2.4 },
  { left: "31%", top: "78%", size: 2, duration: 12, delay: 0.6 },
  { left: "39%", top: "22%", size: 3, duration: 15, delay: 3.1 },
  { left: "47%", top: "51%", size: 2, duration: 10, delay: 1.8 },
  { left: "54%", top: "14%", size: 2, duration: 13, delay: 0.4 },
  { left: "61%", top: "69%", size: 3, duration: 16, delay: 2.7 },
  { left: "68%", top: "41%", size: 2, duration: 11, delay: 1.4 },
  { left: "74%", top: "86%", size: 2, duration: 12, delay: 3.6 },
  { left: "81%", top: "27%", size: 3, duration: 14, delay: 0.9 },
  { left: "88%", top: "58%", size: 2, duration: 10, delay: 2.1 },
  { left: "12%", top: "88%", size: 2, duration: 13, delay: 4.2 },
  { left: "92%", top: "12%", size: 2, duration: 15, delay: 1.6 },
  { left: "43%", top: "8%", size: 3, duration: 17, delay: 2.9 },
] as const;

export function BookcaseAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      <div className="bookcase-haze absolute inset-0" />
      <div className="bookcase-lamplight absolute inset-0" />
      {MOTES.map((mote, index) => (
        <motion.span
          key={`${mote.left}-${mote.top}`}
          className="absolute rounded-full bg-[#f4e6c3]"
          style={{
            left: mote.left,
            top: mote.top,
            width: mote.size,
            height: mote.size,
            boxShadow: "0 0 6px 1px rgba(244, 230, 195, 0.55)",
          }}
          animate={{
            y: [0, -70, -140],
            x: [0, index % 2 === 0 ? 14 : -12, 4],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: mote.duration,
            delay: mote.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
