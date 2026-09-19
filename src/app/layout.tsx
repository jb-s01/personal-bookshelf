import type { Metadata } from "next";
import { Figtree, IBM_Plex_Mono, Newsreader, Outfit } from "next/font/google";
import "./globals.css";

const sans = Figtree({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const heading = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "My personal library in digital timespace",
    template: "%s · My personal library in digital timespace",
  },
  description:
    "A cinematic door into Jonas Slaunwhite’s physical library — adjacent rooms, then the wall of spines.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${heading.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="relative h-dvh overflow-hidden bg-[#03050c] text-foreground">
        <main className="h-dvh">{children}</main>
      </body>
    </html>
  );
}
