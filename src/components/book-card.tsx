import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { shelfLabel } from "@/lib/shelf";
import type { Book } from "@/lib/types";
import { cn } from "@/lib/utils";

export function BookCard({ book }: { book: Book }) {
  return (
    <Card className="bg-[color:var(--paper)] ring-[color:var(--wood-edge)]">
      <CardHeader>
        <div className="mb-2 flex h-1.5 w-16 rounded-full" style={{ backgroundColor: book.spineColor }} />
        <CardTitle className="font-heading text-xl">{book.title}</CardTitle>
        <CardDescription>
          {book.author} · {book.year}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline">{shelfLabel(book.shelf)}</Badge>
          <Badge variant="secondary">{book.genre}</Badge>
          {book.currentlyReading ? (
            <Badge className="bg-[color:var(--brass)] text-[color:var(--walnut)]">Now</Badge>
          ) : null}
        </div>
        <p className="line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {book.summary}
        </p>
        <Link href={`/book/${book.id}`} className={cn(buttonVariants(), "self-start")}>
          Read the brief
        </Link>
      </CardContent>
    </Card>
  );
}
