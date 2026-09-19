export const BOOK_STAGES = [
  "pulling",
  "flying",
  "open",
  "folding",
  "shelving",
] as const;

export type BookStage = (typeof BOOK_STAGES)[number];

export type BookFrame = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
};

export type ViewportSize = {
  w: number;
  h: number;
};

export function bookFrame(
  stage: BookStage,
  origin: DOMRect,
  viewport: ViewportSize,
): BookFrame {
  const closedW = Math.min(210, Math.max(160, viewport.w * 0.22));
  const closedH = Math.min(360, Math.max(260, viewport.h * 0.58));
  const openW = Math.min(680, Math.max(300, viewport.w * 0.72));
  const openH = Math.min(430, Math.max(280, viewport.h * 0.64));
  const cx = viewport.w / 2;
  const cy = viewport.h / 2 + 6;

  switch (stage) {
    case "pulling":
      return {
        x: origin.left - 14,
        y: origin.top - 48,
        width: Math.max(origin.width * 2.1, 52),
        height: origin.height + 22,
        rotate: -14,
      };
    case "flying":
      return {
        x: cx - closedW / 2,
        y: cy - closedH / 2,
        width: closedW,
        height: closedH,
        rotate: 0,
      };
    case "open":
      return {
        x: cx - openW / 2,
        y: cy - openH / 2,
        width: openW,
        height: openH,
        rotate: 0,
      };
    case "folding":
      return {
        x: cx - closedW / 2,
        y: cy - closedH / 2,
        width: closedW,
        height: closedH,
        rotate: 0,
      };
    case "shelving":
      return {
        x: origin.left,
        y: origin.top,
        width: origin.width,
        height: origin.height,
        rotate: 0,
      };
    default: {
      const _exhaustive: never = stage;
      return _exhaustive;
    }
  }
}

export function isSpreadStage(stage: BookStage): boolean {
  switch (stage) {
    case "open":
      return true;
    case "pulling":
    case "flying":
    case "folding":
    case "shelving":
      return false;
    default: {
      const _exhaustive: never = stage;
      return _exhaustive;
    }
  }
}

export function nextStage(stage: BookStage): BookStage | null {
  switch (stage) {
    case "pulling":
      return "flying";
    case "flying":
      return "open";
    case "open":
      return null;
    case "folding":
      return "shelving";
    case "shelving":
      return null;
    default: {
      const _exhaustive: never = stage;
      return _exhaustive;
    }
  }
}

export function stageTransition(stage: BookStage) {
  switch (stage) {
    case "pulling":
      return { type: "spring" as const, stiffness: 380, damping: 26 };
    case "flying":
      return { type: "spring" as const, stiffness: 220, damping: 24 };
    case "open":
      return { type: "spring" as const, stiffness: 180, damping: 22 };
    case "folding":
      return { duration: 0.42, ease: [0.4, 0, 0.2, 1] as const };
    case "shelving":
      return { type: "spring" as const, stiffness: 260, damping: 28 };
    default: {
      const _exhaustive: never = stage;
      return _exhaustive;
    }
  }
}
