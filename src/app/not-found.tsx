import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="font-heading text-3xl text-[color:var(--walnut)]">Page not on the shelf.</h1>
      <p className="mt-3 text-muted-foreground">
        That route isn’t part of this library. Head back to the wall.
      </p>
      <Link href="/" className="mt-6 inline-block underline-offset-4 hover:underline">
        Home
      </Link>
    </div>
  );
}
