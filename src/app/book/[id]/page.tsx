import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { LlmStatusBadge } from "@/components/llm-status";
import { getBook } from "@/lib/catalog";
import { summarizeBook } from "@/lib/ollama";
import { shelfLabel } from "@/lib/shelf";

export const dynamicParams = true;

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const book = getBook(id);
  if (!book) {
    return { title: "Missing title" };
  }
  return { title: book.title };
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params;
  const book = getBook(id);
  if (!book) {
    notFound();
  }

  const brief = await summarizeBook(book);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/shelves" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
        ← Back to the shelves
      </Link>
      <div
        className="h-2 w-24 rounded-full"
        style={{ backgroundColor: book.spineColor }}
        aria-hidden
      />
      <header className="space-y-2">
        <h1 className="font-heading text-4xl text-[color:var(--walnut)]">{book.title}</h1>
        <p className="text-muted-foreground">
          {book.author} · {book.year} · {book.genre}
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{shelfLabel(book.shelf)}</Badge>
          {book.currentlyReading ? (
            <Badge className="bg-[color:var(--brass)] text-[color:var(--walnut)]">
              Currently reading
            </Badge>
          ) : (
            <Badge variant="secondary">Collection</Badge>
          )}
          <LlmStatusBadge />
        </div>
      </header>
      <article className="space-y-4 text-[15px] leading-relaxed">
        <p>{brief.summary}</p>
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">Why it sits here. </span>
          {brief.whyItFits}
        </p>
        <p className="text-xs text-muted-foreground">
          {brief.source === "ollama"
            ? `Brief generated with ${brief.model ?? "Ollama"}.`
            : "High-quality shelf note used because Ollama is not running here."}
          {brief.error ? ` (${brief.error})` : ""}
        </p>
      </article>
    </div>
  );
}
