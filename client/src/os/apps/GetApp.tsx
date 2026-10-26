import { useRef } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { SiApple, SiGoogleplay } from "react-icons/si";
import { useTheme } from "@/hooks/use-theme";
import { androidBetaSteps, appStoreUrl, highlights, releases, screenshots } from "../content";
import { useOS } from "../OSContext";

const latestVersion = releases.find((release) => release.status.startsWith("Version"));

export default function GetApp() {
  const { isDark } = useTheme();
  const { openApp } = useOS();
  const betaRef = useRef<HTMLElement>(null);

  return (
    <div className="px-6 py-8 sm:px-9">
      <header className="flex flex-wrap items-center gap-x-6 gap-y-5">
        <img src="/app_icon.png" alt="" className="h-24 w-24 rounded-[22.5%] shadow-lg ring-1 ring-black/10" />
        <div className="min-w-0 flex-1 basis-60">
          <h2 className="font-display text-3xl font-bold tracking-tight">Maliya</h2>
          <p className="mt-0.5 text-muted-foreground">Personal finance · Free</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={appStoreUrl}
              className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-foreground px-4 text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <SiApple className="h-6 w-6 shrink-0" aria-hidden="true" />
              <span className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-medium">Download on the</span>
                <span className="mt-0.5 text-base font-semibold tracking-tight">App Store</span>
              </span>
            </a>
            <button
              type="button"
              onClick={() => betaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-border bg-card px-4 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <SiGoogleplay className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-medium">Android beta on</span>
                <span className="mt-0.5 text-base font-semibold tracking-tight">Google Play</span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        {["Free for everyone", "No bank login", "Statements stay on your phone"].map((item) => (
          <li key={item} className="inline-flex items-center gap-2">
            <Check className="h-4 w-4 text-primary" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <section aria-label="Screenshots" className="-mx-6 mt-8 sm:-mx-9">
        <ul tabIndex={0} className="flex snap-x gap-3 overflow-x-auto px-6 pb-3 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-9">
          {screenshots.map((shot) => (
            <li key={shot.src} className="w-[160px] shrink-0 snap-start sm:w-[180px]">
              <img
                src={isDark ? shot.dark : shot.src}
                alt={shot.alt}
                loading="lazy"
                className="w-full rounded-[1.5rem] border-4 border-foreground/15 bg-card shadow-md"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h3 className="font-display text-xl font-bold">Description</h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Import supported UAE credit card statements and see where your money goes. No bank login or account
          required.
        </p>
      </section>

      {latestVersion && (
        <section className="mt-8">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl font-bold">What's New</h3>
            <button
              type="button"
              onClick={() => openApp("news")}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Version history
            </button>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{latestVersion.status}</p>
          <p className="mt-2 font-medium">{latestVersion.title}</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">{latestVersion.description}</p>
        </section>
      )}

      <section
        ref={betaRef}
        aria-labelledby="android-beta-title"
        className="mt-10 scroll-mt-4 rounded-3xl border border-border/50 bg-muted/30 p-6 sm:p-8"
      >
        <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <SiGoogleplay className="h-3.5 w-3.5" aria-hidden="true" />
          Android beta
        </div>
        <h3 id="android-beta-title" className="font-display text-2xl font-bold tracking-tight text-balance">
          Try Maliya on Android
        </h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Maliya 1.0.5 for Android is in closed beta on Google Play. The public release is coming soon.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            Use the same Google account for all three steps.
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            Needs Android 15 or newer.
          </li>
        </ul>
        <ol className="mt-7 space-y-6">
          {androidBetaSteps.map((step, index) => (
            <li key={step.title} className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {index + 1}
              </span>
              <div>
                <h4 className="font-display text-lg font-bold leading-snug">{step.title}</h4>
                <p className="text-muted-foreground">{step.description}</p>
                {step.link && (
                  <a
                    href={step.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                  >
                    {step.link.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <p className="mt-8 text-xs text-muted-foreground">{highlights.join(" · ")}</p>
    </div>
  );
}
