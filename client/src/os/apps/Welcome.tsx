import { ArrowRight, Check, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { highlights, supportedBanks } from "../content";
import { useOS } from "../OSContext";

const steps = [
  {
    title: "Choose Statements",
    description: "Pick the monthly credit card PDFs you already get from a supported bank. No bank login needed.",
  },
  {
    title: "Read and Check on Your Phone",
    description: "Maliya reads each PDF on your phone and only adds statements that match their printed totals.",
  },
  {
    title: "Explore Your Spending",
    description:
      "See monthly comparisons, category and purchase stories, spending wellness, searchable activity, and answers worked out on your phone.",
  },
];

export default function Welcome() {
  const { openApp } = useOS();
  const { isDark } = useTheme();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-8 sm:px-10 sm:py-10">
      <section className="flex flex-wrap items-center gap-x-12 gap-y-10">
        <div className="flex-[1_1_320px]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Meet Maliya</p>
          <h2 className="font-display text-4xl font-bold leading-[1.04] tracking-tight text-balance sm:text-5xl">
            Your money, <span className="text-primary">in focus.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-balance">
            Add the credit card statements you already get, and see where your money went. Your statements and
            spending history stay on your phone.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              onClick={() => openApp("get")}
              className="h-12 rounded-full px-6 text-base font-semibold shadow-lg shadow-primary/20"
            >
              Get Maliya Free
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              onClick={() => openApp("simulator")}
              className="h-12 rounded-full bg-background/50 px-6 text-base"
            >
              <Smartphone aria-hidden="true" />
              Try it here
            </Button>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {highlights.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[240px] flex-[0_1_240px]">
          <div className="absolute inset-6 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
          <img
            src={isDark ? "/images/dashboard-overview-dark.png" : "/images/dashboard-overview.png"}
            alt="Maliya home screen showing September spending, wellness, and monthly trends"
            className="relative w-full rounded-[2rem] border-[5px] border-foreground/20 bg-card shadow-2xl"
          />
        </div>
      </section>

      <section className="mt-12 border-t border-border/60 pt-8">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Supports original credit card statement PDFs from
        </p>
        <ul className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {supportedBanks.map((bank) => (
            <li
              key={bank.name}
              className="flex h-16 items-center justify-center rounded-2xl border border-border/60 bg-[#FDFCF8] px-3 shadow-sm"
            >
              <img src={bank.src} alt={bank.name} className="max-h-8 max-w-full object-contain mix-blend-multiply" />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 border-t border-border/60 pt-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <h3 className="font-display text-2xl font-bold tracking-tight">How Maliya works</h3>
          <Button variant="ghost" size="sm" onClick={() => openApp("howItWorks")} className="text-primary">
            Watch a statement get checked
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>
        <ol className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex items-start gap-4 sm:block">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground sm:mb-4">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="font-display text-lg font-bold leading-snug">{step.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
