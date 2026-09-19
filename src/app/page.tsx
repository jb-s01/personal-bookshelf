import { LibraryJourney } from "@/components/library-journey";
import { getBooks } from "@/lib/catalog";

export default function HomePage() {
  return <LibraryJourney books={getBooks()} />;
}
