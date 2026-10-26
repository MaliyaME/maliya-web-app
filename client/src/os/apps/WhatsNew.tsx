import { releases } from "../content";

export default function WhatsNew() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-8 sm:px-9 sm:py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">What's New</h2>
      <p className="mt-2 text-muted-foreground">What's new in Maliya, and what is coming next.</p>

      <ol className="relative mt-10 ml-2 space-y-12 border-l border-border">
        {releases.map((release) => (
          <li key={release.title} className="relative pl-7 sm:pl-9">
            <span
              aria-hidden="true"
              className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background"
            />
            <span className="inline-flex rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
              {release.status}
            </span>
            <h3 className="mt-3 font-display text-xl font-bold leading-snug">{release.title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{release.description}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {release.tags.map((tag) => (
                <li key={tag} className="rounded bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
