export const JOURNEY_SCENES = ["threshold", "corridor", "library"] as const;

export type JourneyScene = (typeof JOURNEY_SCENES)[number];

export const DOOR_BEATS = ["idle", "unlatch", "swing", "cross"] as const;

export type DoorBeat = (typeof DOOR_BEATS)[number];

export const DIMENSION_KINDS = [
  "strings",
  "superposition",
  "compact",
  "cloud",
  "interference",
] as const;

export type DimensionKind = (typeof DIMENSION_KINDS)[number];

export type DimensionPortal = {
  id: string;
  kind: DimensionKind;
  side: "left" | "right";
  depth: number;
  inscription: string;
};

export const DIMENSION_PORTALS: readonly DimensionPortal[] = [
  { id: "worldline", kind: "strings", side: "left", depth: 420, inscription: "11-brane" },
  { id: "psi", kind: "superposition", side: "right", depth: 780, inscription: "ψ(x)" },
  { id: "cy", kind: "compact", side: "left", depth: 1280, inscription: "Calabi–Yau" },
  { id: "foam", kind: "cloud", side: "right", depth: 1680, inscription: "foam" },
  { id: "slit", kind: "interference", side: "left", depth: 2140, inscription: "amplitude" },
] as const;

export const HALLWAY_DEPTH = 2800;

export function nextDoorBeat(beat: DoorBeat): DoorBeat | null {
  switch (beat) {
    case "idle":
      return "unlatch";
    case "unlatch":
      return "swing";
    case "swing":
      return "cross";
    case "cross":
      return null;
    default: {
      const _exhaustive: never = beat;
      return _exhaustive;
    }
  }
}

export function dimensionCaption(kind: DimensionKind): string {
  switch (kind) {
    case "strings":
      return "Vibrating filaments — the same note, extra dimensions.";
    case "superposition":
      return "Every doorway until you look.";
    case "compact":
      return "Geometry folded smaller than light.";
    case "cloud":
      return "A library as a probability.";
    case "interference":
      return "Paths that remember each other.";
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}
