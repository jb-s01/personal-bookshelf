"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Desk" },
  { href: "/shelves", label: "Shelves" },
  { href: "/currently-reading", label: "Currently reading" },
  { href: "/bio", label: "Bio" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--wood-edge)] bg-[color:var(--paper)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-heading text-lg tracking-tight text-[color:var(--walnut)]">
          Jonas’s bookshelf
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-8 px-3 text-sm",
                  active
                    ? "bg-[color:var(--walnut)]/10 text-[color:var(--walnut)]"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="bg-[color:var(--paper)]">
            <SheetHeader>
              <SheetTitle className="font-heading">Navigate</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 px-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-base hover:bg-[color:var(--walnut)]/10"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--wood-edge)] bg-[color:var(--walnut)] text-[color:var(--paper)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Jonas Slaunwhite — Halifax. Physical books, local summaries.</p>
        <p className="text-[color:var(--paper)]/70">
          Summaries via Ollama when it is running, otherwise the shelf notes.
        </p>
      </div>
    </footer>
  );
}
