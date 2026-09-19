"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { Bookcase } from "@/components/bookcase";
import { QuantumHallway } from "@/components/quantum-hallway";
import { ThresholdDoor } from "@/components/threshold-door";
import type { JourneyScene } from "@/lib/journey";
import type { Book } from "@/lib/types";

type LibraryJourneyProps = {
  books: Book[];
};

export function LibraryJourney({ books }: LibraryJourneyProps) {
  const reduceMotion = useReducedMotion();
  const [scene, setScene] = useState<JourneyScene>("threshold");
  const activeScene: JourneyScene = reduceMotion ? "library" : scene;

  const goLibrary = useCallback(() => {
    setScene("library");
  }, []);

  const sceneView = (() => {
    switch (activeScene) {
      case "threshold":
        return (
          <ThresholdDoor
            key="threshold"
            onCrossed={() => setScene("corridor")}
            onSkip={goLibrary}
          />
        );
      case "corridor":
        return (
          <QuantumHallway
            key="corridor"
            onArrive={goLibrary}
            onSkip={goLibrary}
          />
        );
      case "library":
        return (
          <Bookcase
            key="library"
            books={books}
            onReplay={() => setScene("threshold")}
          />
        );
      default: {
        const _exhaustive: never = activeScene;
        return _exhaustive;
      }
    }
  })();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sceneView}
    </AnimatePresence>
  );
}
