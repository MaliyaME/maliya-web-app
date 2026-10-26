import { useState } from "react";
import { ArrowRight, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScreenshotPlaceholder } from "@/components/ScreenshotPlaceholder";
import { cn } from "@/lib/utils";
import { useElementWidth } from "../hooks";
import { useOS } from "../OSContext";

interface Feature {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  callout?: { title: string; text: string };
  note?: string;
  image: string;
  darkImage: string;
  alt: string;
}

const features: Feature[] = [
  {
    id: "statements",
    label: "Checked statements",
    eyebrow: "Checked Statements",
    title: "A statement archive you can trust",
    body: "Add the monthly credit card PDFs you already get, up to 50 at a time, without a bank login. Maliya checks the numbers against each statement's printed totals, shows your statements by card with the months they cover, and leaves out any statement that doesn't match.",
    callout: {
      title: "Supported credit card PDFs",
      text: "HSBC, FAB, Emirates NBD, and ADCB Islamic. Password-protected PDFs open in the app, and passwords are never saved. Bank account statements, scans, and transaction-list exports are not supported.",
    },
    image: "/images/statements-list.png",
    darkImage: "/images/statements-list-dark.png",
    alt: "Statements grouped by card with monthly coverage",
  },
  {
    id: "stories",
    label: "Spending stories",
    eyebrow: "Spending Stories",
    title: "Follow every total to its purchases",
    body: "See every category in the month, each marked above, below, or in line with your usual. Then move through subcategories, shops, and the purchases behind each number.",
    bullets: [
      "Complete-month comparisons",
      "Category, subcategory, and shop drill-down",
      "Searchable activity behind every total",
    ],
    image: "/images/category-breakdown.png",
    darkImage: "/images/category-breakdown-dark.png",
    alt: "Every category in September, each compared with its usual spend",
  },
  {
    id: "purchases",
    label: "Purchase stories",
    eyebrow: "New · Purchase Stories",
    title: "Every purchase, in context",
    body: "Open a purchase to see whether it stands out, with color-coded comparisons. Below it are your five latest purchases at the same shop and the card you paid with, one tap from the exact statement.",
    image: "/images/purchase-story.png",
    darkImage: "/images/purchase-story-dark.png",
    alt: "Purchase story for a Carrefour grocery purchase, with recent purchases at the same shop",
  },
  {
    id: "merchants",
    label: "Name your merchants",
    eyebrow: "New · Name Your Merchants",
    title: "Put a name to unfamiliar charges",
    body: "Shops Maliya can't identify are ranked by how much you spent there, so the biggest come first. Name them one at a time, track your progress, skip any, or mark a charge as not a business.",
    note: "A name for a single purchase stays on your phone. A name for every purchase like it is sent for review and, if approved, helps name that shop for everyone.",
    image: "/images/naming-card.png",
    darkImage: "/images/naming-card-dark.png",
    alt: "Home card showing two merchants left to name in September, above the month's categories",
  },
  {
    id: "wellness",
    label: "Wellness score",
    eyebrow: "Wellness Score",
    title: "Understand your monthly rhythm",
    body: "A score out of 100, compared only with your own past months. Six factors you can open explain it, and each links back to its purchases. Set a monthly goal that stays on your phone. It's a guide, not a grade.",
    image: "/images/wellness.png",
    darkImage: "/images/wellness-dark.png",
    alt: "Spending wellness score with its factors",
  },
  {
    id: "ask",
    label: "Ask Maliya",
    eyebrow: "Ask Maliya",
    title: "Answers worked out on your phone",
    body: "Ask about a month, category, repeat charge, or unusual purchase. Every answer shows the purchases behind it and suggests what to ask next. Your questions are not sent to an external AI chat service.",
    image: "/images/insights-stats.png",
    darkImage: "/images/insights-stats-dark.png",
    alt: "Maliya Ask answer showing where most of September's money went",
  },
];

export default function Features() {
  const { openApp } = useOS();
  const [active, setActive] = useState(features[0].id);
  const [ref, width] = useElementWidth<HTMLDivElement>();
  const sidebar = width >= 680;
  const sideBySide = width >= (sidebar ? 880 : 560);

  return (
    <div ref={ref} className="min-h-full">
      <Tabs
        value={active}
        onValueChange={setActive}
        orientation={sidebar ? "vertical" : "horizontal"}
        className={cn(sidebar ? "flex min-h-full" : "block")}
      >
        <div
          className={cn(
            "bg-muted/50",
            sidebar
              ? "w-52 shrink-0 border-r border-border/60"
              : "sticky top-0 z-10 border-b border-border/60 backdrop-blur",
          )}
        >
          <TabsList
            aria-label="Features"
            className={cn(
              "h-auto justify-start gap-1 rounded-none bg-transparent p-2",
              sidebar ? "sticky top-0 w-full flex-col items-stretch p-3" : "w-full snap-x overflow-x-auto",
            )}
          >
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className={cn(
                  "snap-start justify-start rounded-lg px-3 py-2 text-left text-sm",
                  !sidebar && "shrink-0",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm",
                )}
              >
                {feature.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="min-w-0 flex-1">
          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0 px-6 py-8 sm:px-9">
              <div className={cn("flex gap-x-10 gap-y-8", sideBySide ? "items-center" : "flex-col")}>
                <div className="min-w-0 flex-1">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">{feature.eyebrow}</p>
                  <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-balance">
                    {feature.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{feature.body}</p>

                  {feature.bullets && (
                    <ul className="mt-5 space-y-2">
                      {feature.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-3 rounded-xl border border-border/50 bg-card p-3 text-sm font-medium shadow-sm"
                        >
                          <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {feature.callout && (
                    <div className="mt-5 rounded-2xl border border-border/50 bg-muted/40 p-5">
                      <h3 className="mb-1.5 text-sm font-bold">{feature.callout.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{feature.callout.text}</p>
                    </div>
                  )}

                  {feature.note && (
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{feature.note}</p>
                  )}
                </div>

                <div className={cn("w-full shrink-0", sideBySide ? "max-w-[230px]" : "mx-auto max-w-[250px]")}>
                  <ScreenshotPlaceholder
                    imageSrc={feature.image}
                    darkImageSrc={feature.darkImage}
                    alt={feature.alt}
                    className="rounded-[2rem] border-[5px]"
                  />
                </div>
              </div>
            </TabsContent>
          ))}

          <div className="mx-6 mb-8 flex flex-col gap-4 rounded-3xl border border-border/50 bg-muted/30 p-6 sm:mx-9 sm:flex-row sm:items-center">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Smartphone className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold">Your statements stay on your phone</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                So do your spending history, notes, and goal, and your totals and answers are worked out there. No
                bank login, no account, and no cloud sync.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openApp("security")}
              className="inline-flex shrink-0 items-center text-sm font-semibold text-primary hover:underline"
            >
              What is shared, and when
              <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
