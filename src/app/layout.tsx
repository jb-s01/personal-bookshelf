import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import "./globals.css";

const sans = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
});

const heading = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jonas’s bookshelf",
    template: "%s · Jonas’s bookshelf",
  },
  description:
    "Jonas Slaunwhite’s physical library in Halifax — browse the shelves, see what he’s reading, and read a short brief on each spine.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${heading.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
