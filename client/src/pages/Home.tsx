import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScreenshotPlaceholder } from "@/components/ScreenshotPlaceholder";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

// Dynamic images
const dashboardImg = "/images/dashboard-overview.png";
const dashboardDarkImg = "/images/dashboard-overview-dark.png";
const insightsImg = "/images/insights-stats.png";
const insightsDarkImg = "/images/insights-stats-dark.png";
const spendingImg = "/images/spending-trend.png";
const spendingDarkImg = "/images/spending-trend-dark.png";

const supportedBanks = [
  { name: "HSBC", src: "/images/hsbc.svg" },
  { name: "FAB", src: "/images/fab.webp" },
  { name: "Emirates NBD", src: "/images/enbd.png" },
];

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
                Turn supported credit card statement PDFs into a clear, private view of your spending. No bank login, no account sync, and no invented totals.
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
                alt="Maliya home screen showing December spending, wellness, and monthly trends"
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
            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto">
              {supportedBanks.map((bank) => (
                <div key={bank.name} className="flex h-16 sm:h-20 items-center justify-center rounded-2xl border border-border/60 bg-[#FDFCF8] px-3 sm:px-5 shadow-sm">
                  <img src={bank.src} alt={bank.name} className="max-h-8 sm:max-h-12 max-w-full object-contain" />
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
                A clearer picture, held privately
              </h2>
              <p className="text-lg text-muted-foreground">
                Maliya reads supported statements on your device, checks the figures, and gives every month a useful shape.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <FeatureCard 
                icon={<Zap className="w-8 h-8 text-yellow-500" />}
                title="Checked before it is added"
                description="Maliya reconciles what it reads with the statement's printed totals. A statement that does not match stays out of your ledger."
              />
              <FeatureCard 
                icon={<ShieldCheck className="w-8 h-8 text-primary" />}
                title="Private on your device"
                description="Your PDFs, ledger, corrections, and notes remain app-private. There is no bank connection, account sync, or cloud recovery."
              />
              <FeatureCard 
                icon={<Globe className="w-8 h-8 text-blue-500" />}
                title="Built for supported UAE statements"
                description="Import recognized credit card PDF layouts from HSBC, FAB, and Emirates NBD, with clear guidance when a layout is not supported."
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
                  Compare complete months, open a category, then move through subcategories, merchants, and the purchases behind every total.
                </p>
                <ul className="space-y-4">
                  <CheckItem text="Monthly spending comparisons" />
                  <CheckItem text="Category and merchant stories" />
                  <CheckItem text="Links to supporting purchases" />
                </ul>
              </div>
            </div>

            {/* Feature Deep Dive 2 */}
            <div className="mt-20 md:mt-28 grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Answers grounded in your ledger
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Ask about a month, category, recurring charge, or unusual purchase. Continue with suggested follow-ups and see the purchases behind each answer.
                </p>
                <ul className="space-y-4">
                  <CheckItem text="Follow-up questions that keep context" />
                  <CheckItem text="Links to supporting transactions" />
                  <CheckItem text="Calculated on your device, without external AI" />
                </ul>
              </div>
              <div>
                <ScreenshotPlaceholder 
                  imageSrc={insightsImg} 
                  darkImageSrc={insightsDarkImg}
                  alt="Maliya AI conversation with a spending answer and follow-up questions"
                  className="-rotate-2 hover:rotate-0 transition-transform duration-500"
                />
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
                  description="Select original monthly credit card PDFs from a supported bank. No bank credentials are required."
                />
                <StepCard
                  number="02"
                  title="Read and Check"
                  description="Maliya reads each PDF on your device and only adds statements whose printed totals reconcile."
                />
                <StepCard
                  number="03"
                  title="Explore the Evidence"
                  description="Review monthly trends, spending stories, wellness factors, searchable activity, and on-device answers."
                />
              </div>
            </div>
            <div className="w-full max-w-[280px] lg:max-w-[300px] mx-auto">
              <video
                controls
                playsInline
                preload="none"
                poster="/media/product-cover.jpg"
                aria-label="Maliya product film: your spending, made clearer"
                className="w-full rounded-2xl shadow-xl bg-card"
              >
                <source src="/media/maliya-your-money-clearly.mp4" type="video/mp4" />
                <track kind="captions" src="/media/product.vtt" srcLang="en" label="English" default />
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
                  Free on the App Store now. Google Play is coming soon.
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
