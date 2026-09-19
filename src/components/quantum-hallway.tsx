"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { motion, useMotionTemplate, useMotionValue, animate as motionAnimate } from "motion/react";
import { QuantumDimension } from "@/components/quantum-dimensions";
import { SkipJourney } from "@/components/skip-journey";
import {
  DIMENSION_PORTALS,
  HALLWAY_DEPTH,
  type DimensionPortal,
} from "@/lib/journey";

type QuantumHallwayProps = {
  onArrive: () => void;
  onSkip: () => void;
};

function PortalWindow({ portal }: { portal: DimensionPortal }) {
  const isLeft = portal.side === "left";

  return (
    <div
      className="qh-portal"
      style={{
        [isLeft ? "left" : "right"]: "7%",
        top: "18%",
        transform: `translateZ(${-portal.depth}px) rotateY(${isLeft ? 32 : -32}deg)`,
      }}
    >
      <p className="qh-portal-label">{portal.inscription}</p>
      <div className="qh-portal-glass">
        <QuantumDimension kind={portal.kind} />
      </div>
    </div>
  );
}

export function QuantumHallway({ onArrive, onSkip }: QuantumHallwayProps) {
  const filamentRef = useRef<HTMLDivElement>(null);
  const onArriveRef = useRef(onArrive);
  const cameraZ = useMotionValue(80);
  const cameraTransform = useMotionTemplate`translateZ(${cameraZ}px)`;

  useEffect(() => {
    onArriveRef.current = onArrive;
  }, [onArrive]);

  useEffect(() => {
    const controls = motionAnimate(cameraZ, HALLWAY_DEPTH - 220, {
      duration: 8.4,
      ease: [0.12, 0.02, 0.18, 1],
      onComplete: () => {
        onArriveRef.current();
      },
    });
    return () => controls.stop();
  }, [cameraZ]);

  useEffect(() => {
    const root = filamentRef.current;
    if (!root) {
      return;
    }
    const strands = root.querySelectorAll("[data-filament]");
    const wave = animate(strands, {
      translateX: [-6, 6, -4, 5, 0],
      opacity: [0.18, 0.8, 0.25],
      duration: stagger(200, { start: 2200 }),
      delay: stagger(70),
      loop: true,
      ease: "inOutSine",
    });
    return () => {
      wave.pause();
    };
  }, []);

  return (
    <motion.div
      className="relative h-dvh w-full overflow-hidden bg-[#020309]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="qh-scene">
        <motion.div className="qh-camera" style={{ transform: cameraTransform }}>
          <div className="qh-room">
            <div className="qh-wall qh-floor" />
            <div className="qh-wall qh-ceiling" />
            <div className="qh-wall qh-left" />
            <div className="qh-wall qh-right" />
            <div className="qh-wall qh-end" />
            {DIMENSION_PORTALS.map((portal) => (
              <PortalWindow key={portal.id} portal={portal} />
            ))}
            <div ref={filamentRef} className="qh-filaments" aria-hidden>
              {Array.from({ length: 11 }, (_, index) => (
                <span
                  key={`filament-${index}`}
                  data-filament
                  className="qh-filament"
                  style={{
                    left: `${18 + index * 6.2}%`,
                    background:
                      index % 2 === 0
                        ? "linear-gradient(to bottom, transparent, rgba(126,224,255,0.85), transparent)"
                        : "linear-gradient(to bottom, transparent, rgba(212,140,255,0.7), transparent)",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,3,9,0.72)_100%)]" />
      <p className="pointer-events-none absolute top-6 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] tracking-[0.32em] text-[#7ee0ff]/70 uppercase">
        Adjacent Hilbert rooms
      </p>
      <motion.div
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(244,230,195,0.95), rgba(126,224,255,0.55) 42%, transparent 68%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7.5, duration: 0.95, ease: "easeIn" }}
      />
      <SkipJourney onSkip={onSkip} />
    </motion.div>
  );
}
