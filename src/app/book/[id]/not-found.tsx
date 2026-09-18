import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Missing title",
};

export default function BookNotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="font-heading text-3xl text-[color:var(--walnut)]">That spine isn’t here.</h1>
      <p className="mt-3 text-muted-foreground">
        The catalog doesn’t include that id. It may have been misshelved.
      </p>
      <Link href="/shelves" className="mt-6 inline-block underline-offset-4 hover:underline">
        Return to the shelves
      </Link>
    </div>
  );
}
