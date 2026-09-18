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
      return "The facing row on the desk: stoic dailies, Hamming, Munger, and Graham.";
    case "stool":
      return "The working pile on the stool — quantum, data history, and Kasparov.";
    case "oreilly":
      return "Chip Huyen and Yves Hilpisch, currently off the tall shelves.";
    case "leadership":
      return "Investing, Gladwell, Willink, and the business bay. Standing collection.";
    case "main-left":
      return "Thrillers, war, Tolkien, and the Hadfield stack at the bottom.";
    case "main-right":
      return "Craft and textbooks on top, classics in the middle, Harari and science below.";
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
