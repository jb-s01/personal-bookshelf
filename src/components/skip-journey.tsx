"use client";

type SkipJourneyProps = {
  onSkip: () => void;
};

export function SkipJourney({ onSkip }: SkipJourneyProps) {
  return (
    <button
      type="button"
      onClick={onSkip}
      className="pointer-events-auto absolute right-4 bottom-4 z-40 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[11px] tracking-[0.18em] text-white/70 uppercase backdrop-blur-md hover:border-white/40 hover:text-white"
    >
      Skip
    </button>
  );
}
