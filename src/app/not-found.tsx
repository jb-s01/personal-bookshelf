import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="font-heading text-3xl text-[#f3e6c8]">Page not on the shelf.</h1>
      <p className="mt-3 text-white/60">
        That route isn’t part of this library. Head back to the door.
      </p>
      <Link href="/" className="mt-6 inline-block text-[#7ee0ff] underline-offset-4 hover:underline">
        Threshold
      </Link>
    </div>
  );
}
