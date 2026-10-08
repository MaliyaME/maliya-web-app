import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScreenshotPlaceholder } from "@/components/ScreenshotPlaceholder";
import { Link } from "wouter";
import { ArrowRight, Check, CheckCircle2, Store, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

// Dynamic images
const dashboardImg = "/images/dashboard-overview.png";
const dashboardDarkImg = "/images/dashboard-overview-dark.png";
const insightsImg = "/images/insights-stats.png";
const insightsDarkImg = "/images/insights-stats-dark.png";
const spendingImg = "/images/spending-trend.png";
const spendingDarkImg = "/images/spending-trend-dark.png";
const purchaseImg = "/images/purchase-story.png";
const purchaseDarkImg = "/images/purchase-story-dark.png";

const supportedBanks = [
  { name: "HSBC", src: "/images/hsbc.svg" },
  { name: "FAB", src: "/images/fab.webp" },
  { name: "ADCB Islamic", src: "/images/adcb.png" },
  { name: "Emirates NBD", src: "/images/enbd.png" },
];

const heroHighlights = ["No bank login", "No account", "No cloud sync"];

export default function Home() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-28 overflow-hidden">
          <div className="page-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 text-balance"
              >
                Your money, <br />
                <span className="text-primary">in focus.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 text-balance"
              >
                Add the credit card statements you already get, and see where your money went. Your statements and spending history stay on your phone.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center lg:justify-start justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto lg:mx-0"
              >
                <Link href="/download">
                  <Button size="lg" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105">
                    Get Maliya Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/product">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg bg-background/50">
                    View Features
                  </Button>
                </Link>
              </motion.div>
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-muted-foreground"
              >
                {heroHighlights.map((item) => (
                  <li key={item} className="inline-flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[360px] mx-auto lg:mr-0"
            >
              <div className="absolute inset-8 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
              <img
                src={isDark ? dashboardDarkImg : dashboardImg}
                alt="Maliya home screen showing September spending, wellness, and monthly trends"
                className="relative w-full rounded-[2.5rem] border-[6px] border-foreground/20 bg-card shadow-2xl"
              />
            </motion.div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-12 border-y border-border/50 bg-muted/20">
          <div className="page-container text-center">
            <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 sm:mb-8 text-balance">
              Supports original credit card statement PDFs from
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
              {supportedBanks.map((bank) => (
                <div key={bank.name} className="flex h-16 sm:h-20 items-center justify-center rounded-2xl border border-border/60 bg-[#FDFCF8] px-3 sm:px-5 shadow-sm">
                  <img src={bank.src} alt={bank.name} className="max-h-8 sm:max-h-12 max-w-full object-contain mix-blend-multiply" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-20 md:py-28">
          <div className="page-container">
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                A clearer picture of every month
              </h2>
              <p className="text-lg text-muted-foreground">
                Maliya reads your statements, checks the numbers, and shows what you spent, how it compares with your usual month, and what made the difference.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <FeatureCard 
                icon={<Zap className="w-8 h-8 text-yellow-500" />}
                title="Checked before it is added"
                description="Maliya checks the numbers it reads against the totals printed on your statement. If they don't match, that statement isn't added."
              />
              <FeatureCard 
                icon={<Store className="w-8 h-8 text-primary" />}
                title="Name your top merchants"
                description="Shops Maliya can't identify are ranked by how much you spent. Name them one at a time, skip any, or mark a charge as not a business."
              />
              <FeatureCard 
                icon={<Globe className="w-8 h-8 text-blue-500" />}
                title="Built for UAE credit cards"
                description="Add monthly credit card PDFs from HSBC, FAB, Emirates NBD, and ADCB Islamic, up to 50 at a time. Password-protected PDFs open right in the app."
              />
            </div>

            {/* Feature Deep Dive 1 */}
            <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
              <div className="order-2 md:order-1">
                <ScreenshotPlaceholder 
                  imageSrc={spendingImg} 
                  darkImageSrc={spendingDarkImg}
                  alt="Dining spending story with monthly chart and subcategories"
                  className="rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  See each month in context
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Open a category to see how it compares with your usual, then move through subcategories, shops, and the purchases behind every total.
                </p>
                <ul className="space-y-4">
                  <CheckItem text="Above and below your usual, in every category" />
                  <CheckItem text="Category, subcategory, and shop stories" />
                  <CheckItem text="Every total links to its purchases" />
                </ul>
              </div>
            </div>

            {/* Feature Deep Dive 2 */}
            <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Every purchase has a story
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Open any purchase to see whether it stands out, what you spent at the same shop before, and the card you paid with.
                </p>
                <ul className="space-y-4">
                  <CheckItem text="Color-coded comparisons" />
                  <CheckItem text="Your latest purchases at the same shop" />
                  <CheckItem text="One tap to the exact statement" />
                </ul>
              </div>
              <div>
                <ScreenshotPlaceholder 
                  imageSrc={purchaseImg} 
                  darkImageSrc={purchaseDarkImg}
                  alt="Purchase story for a Carrefour grocery purchase, with recent purchases at the same shop"
                  className="-rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Feature Deep Dive 3 */}
            <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
              <div className="order-2 md:order-1">
                <ScreenshotPlaceholder 
                  imageSrc={insightsImg} 
                  darkImageSrc={insightsDarkImg}
                  alt="Maliya Ask answer showing where most of September's money went, with follow-up questions"
                  className="rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Answers worked out on your phone
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Ask about a month, category, repeat charge, or unusual purchase. Continue with suggested follow-ups and see the purchases behind each answer.
                </p>
                <ul className="space-y-4">
                  <CheckItem text="Follow-up questions that keep context" />
                  <CheckItem text="Links to the purchases behind each answer" />
                  <CheckItem text="Not sent to an external AI chat service" />
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 md:py-24 bg-muted/30" id="how-it-works">
          <div className="page-container grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-10 md:mb-12">
                How Maliya works
              </h2>
              <div className="space-y-9">
                <StepCard
                  number="01"
                  title="Choose Statements"
                  description="Pick the monthly credit card PDFs you already get from a supported bank. No bank login needed."
                />
                <StepCard
                  number="02"
                  title="Read and Check on Your Phone"
                  description="Maliya reads each PDF on your phone and only adds statements that match their printed totals."
                />
                <StepCard
                  number="03"
                  title="Explore Your Spending"
                  description="See monthly comparisons, category and purchase stories, spending wellness, searchable activity, and answers worked out on your phone."
                />
              </div>
            </div>
            <div className="w-full max-w-[280px] lg:max-w-[300px] mx-auto">
              <video
                controls
                playsInline
                preload="none"
                poster="/media/maliya-launch-cover.jpg"
                aria-label="Maliya launch video: where did your money go this month?"
                className="w-full rounded-2xl shadow-xl bg-card"
              >
                <source src="/media/maliya-launch.mp4" type="video/mp4" />
                <track kind="captions" src="/media/maliya-launch.vtt" srcLang="en" label="English" />
                Your browser does not support video playback.
              </video>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="pt-16 md:pt-24 pb-4">
          <div className="page-container">
            <div className="border-t border-border pt-10 md:pt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Get Maliya</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                  Ready for a clearer picture?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Free on the App Store now. On Android, join the closed beta on Google Play.
                </p>
              </div>
              <Link href="/download">
                <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold shrink-0">
                  Get the App
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-card border border-border/50 hover:shadow-xl transition-all hover:-translate-y-1 group">
      <div className="mb-6 p-4 bg-muted rounded-2xl w-fit group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-display mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex items-start gap-5">
      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex-shrink-0 flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold font-display mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <span className="font-medium">{text}</span>
    </li>
  );
}
