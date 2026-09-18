import type { ShelfId } from "@/lib/types";

export function shelfLabel(shelf: ShelfId): string {
  switch (shelf) {
    case "display":
      return "Desk display";
    case "stool":
      return "Stool stack";
    case "oreilly":
      return "O’Reilly stack";
    case "leadership":
      return "Leadership shelf";
    case "main-left":
      return "Main shelf — left";
    case "main-right":
      return "Main shelf — right";
    default: {
      const _exhaustive: never = shelf;
      return _exhaustive;
    }
  }
}

export function shelfBlurb(shelf: ShelfId): string {
  switch (shelf) {
    case "display":
      return "The small facing row on the desk: stoic practice beside Graham.";
    case "stool":
      return "The working pile on the stool — judgment, money, and habits.";
    case "oreilly":
      return "Animal-covered craft books, currently off the tall shelves.";
    case "leadership":
      return "How teams actually run. Collection, not the current desk stack.";
    case "main-left":
      return "Markets, risk, and the footnotes from the Citco years.";
    case "main-right":
      return "AI, causality, and the software craft that showed up at night.";
    default: {
      const _exhaustive: never = shelf;
      return _exhaustive;
    }
  }
}

export function isDeskShelf(shelf: ShelfId): boolean {
  switch (shelf) {
    case "display":
    case "stool":
    case "oreilly":
      return true;
    case "leadership":
    case "main-left":
    case "main-right":
      return false;
    default: {
      const _exhaustive: never = shelf;
      return _exhaustive;
    }
  }
}
