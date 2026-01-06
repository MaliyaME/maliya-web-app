import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ScreenshotPlaceholder } from "@/components/ScreenshotPlaceholder";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Dynamic images
const dashboardImg = "/images/dashboard-overview.png";
const insightsImg = "/images/insights-stats.png";
const spendingImg = "/images/spending-trend.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-40">
            <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 border border-border/50"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Waitlist is now open for early access</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 max-w-4xl mx-auto text-balance"
            >
              Your AI-Powered <br />
              <span className="gradient-text bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Personal Finance Assistant
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
            >
              Maliya connects to your accounts, categorizes your spending, and gives you actionable insights to build wealth. Smart, secure, and simple.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            >
              <Link href="/waitlist">
                <Button size="lg" className="rounded-full px-8 h-14 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105">
                  Get Early Access
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/product">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg bg-background/50 backdrop-blur-sm">
                  View Features
                </Button>
              </Link>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              <ScreenshotPlaceholder 
                imageSrc={dashboardImg} 
                alt="Maliya Dashboard Overview" 
                className="shadow-2xl shadow-primary/10 border-border"
              />
            </motion.div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-12 border-y border-border/50 bg-muted/20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
              Seamlessly connects with
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Using text placeholders for bank logos to be safe, but styled nicely */}
              <div className="text-xl font-bold font-display">ENBD</div>
              <div className="text-xl font-bold font-display">ADCB</div>
              <div className="text-xl font-bold font-display">Mashreq</div>
              <div className="text-xl font-bold font-display">FAB</div>
              <div className="text-xl font-bold font-display">Revolut</div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Financial clarity in your pocket
              </h2>
              <p className="text-lg text-muted-foreground">
                Stop guessing where your money goes. Maliya brings all your accounts into one beautiful, intelligent view.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Zap className="w-8 h-8 text-yellow-500" />}
                title="Smart Categorization"
                description="Our AI automatically tags your transactions with 95% accuracy, so you don't have to."
              />
              <FeatureCard 
                icon={<ShieldCheck className="w-8 h-8 text-primary" />}
                title="Bank-Grade Security"
                description="We use 256-bit encryption and read-only access. Your money never moves without you."
              />
              <FeatureCard 
                icon={<Globe className="w-8 h-8 text-blue-500" />}
                title="Regional Focus"
                description="Built specifically for the UAE market, handling local banks and spending habits perfectly."
              />
            </div>

            {/* Feature Deep Dive 1 */}
            <div className="mt-32 grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <ScreenshotPlaceholder 
                  imageSrc={spendingImg} 
                  alt="Spending Trends"
                  className="rotate-2 hover:rotate-0 transition-transform duration-500" 
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  Spot trends before they become problems
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Visualize your spending habits over time. See exactly where you're overspending and where you can save, with beautiful interactive charts.
                </p>
                <ul className="space-y-4">
                  <CheckItem text="Monthly spending comparison" />
                  <CheckItem text="Category-wise breakdown" />
                  <CheckItem text="Subscription tracking" />
                </ul>
              </div>
            </div>

            {/* Feature Deep Dive 2 */}
            <div className="mt-32 grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  AI Insights that actually help
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Maliya doesn't just show you numbers. It tells you what they mean. Get personalized tips to improve your financial health score.
                </p>
                <ul className="space-y-4">
                  <CheckItem text="Smart budget recommendations" />
                  <CheckItem text="Unusual transaction alerts" />
                  <CheckItem text="Savings opportunities" />
                </ul>
              </div>
              <div>
                <ScreenshotPlaceholder 
                  imageSrc={insightsImg} 
                  alt="AI Insights"
                  className="-rotate-2 hover:rotate-0 transition-transform duration-500" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16">
              How Maliya works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

              <StepCard 
                number="01"
                title="Connect Accounts"
                description="Securely link your bank accounts and credit cards with read-only access."
              />
              <StepCard 
                number="02"
                title="AI Analysis"
                description="Our engine categorizes 12 months of history to build your financial profile."
              />
              <StepCard 
                number="03"
                title="Get Insights"
                description="Receive instant clarity on your net worth, spending, and savings potential."
              />
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden">
              {/* Abstract shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 relative z-10">
                Ready to master your money?
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto relative z-10">
                Join thousands of users on the waitlist for the smartest personal finance app in the region.
              </p>
              <Link href="/waitlist">
                <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 text-lg font-semibold relative z-10">
                  Join the Waitlist
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
    <div className="text-center bg-background p-8 rounded-3xl shadow-sm border border-border/50 md:border-none md:shadow-none md:bg-transparent">
      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mx-auto mb-6 text-xl shadow-lg shadow-primary/20">
        {number}
      </div>
      <h3 className="text-xl font-bold font-display mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <span className="font-medium">{text}</span>
    </li>
  );
}
