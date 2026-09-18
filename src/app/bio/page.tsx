import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { bio, projects, skills, timeline } from "@/lib/bio";
import { catalogSize, getCurrentlyReading } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Bio",
};

export default function BioPage() {
  const reading = getCurrentlyReading();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
      <header className="space-y-4">
        <p className="text-sm tracking-[0.2em] text-[color:var(--brass-dark)] uppercase">
          {bio.location}
        </p>
        <h1 className="font-heading text-4xl text-[color:var(--walnut)] sm:text-5xl">
          {bio.name}
        </h1>
        <p className="text-lg text-muted-foreground">{bio.headline}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="underline-offset-4 hover:underline" href={bio.github}>
            GitHub
          </Link>
          <Link className="underline-offset-4 hover:underline" href={bio.linkedin}>
            LinkedIn
          </Link>
        </div>
      </header>

      <div className="space-y-4 text-[15px] leading-relaxed">
        <p>{bio.intro}</p>
        <p>{bio.teaching}</p>
        <p>{bio.method}</p>
      </div>

      <blockquote className="border-l-2 border-[color:var(--brass)] pl-4 font-heading text-xl text-[color:var(--walnut)]">
        {bio.quote}
      </blockquote>

      <section className="space-y-3">
        <h2 className="font-heading text-2xl">What the shelves say</h2>
        <p className="text-[15px] leading-relaxed">{bio.taste}</p>
        <p className="text-sm text-muted-foreground">
          {catalogSize} titles in the catalog. {reading.length} currently off the
          wall and on the desk.
        </p>
      </section>

      <Separator />

      <section className="space-y-6">
        <h2 className="font-heading text-2xl">Path</h2>
        <ol className="space-y-5">
          {timeline.map((item) => (
            <li key={`${item.years}-${item.title}`} className="grid gap-1 sm:grid-cols-[8.5rem_1fr]">
              <p className="text-sm text-[color:var(--brass-dark)]">{item.years}</p>
              <div>
                <p className="font-medium">
                  {item.title} · {item.org}
                </p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-2xl">Craft</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Things he builds</h2>
        <ul className="space-y-3">
          {projects.map((project) => (
            <li key={project.name}>
              <Link href={project.href} className="font-medium underline-offset-4 hover:underline">
                {project.name}
              </Link>
              <p className="text-sm text-muted-foreground">{project.blurb}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
