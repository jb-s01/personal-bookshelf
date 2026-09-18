import type { Metadata } from "next";
import { LlmStatusBadge } from "@/components/llm-status";
import { ShelfExplorer } from "@/components/shelf-explorer";
import { catalogSize } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shelves",
};

export default function ShelvesPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-4xl text-[color:var(--walnut)]">The wall</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {catalogSize} spines. Tall shelves are the collection; the desk piles are
            marked as currently reading. Pull a book for a brief.
          </p>
        </div>
        <LlmStatusBadge />
      </header>
      <ShelfExplorer />
    </div>
  );
}
