import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScreenshotPlaceholder } from "@/components/ScreenshotPlaceholder";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Smartphone } from "lucide-react";

// Images
const statementsImg = "/images/statements-list.png";
const statementsDarkImg = "/images/statements-list-dark.png";
const wellnessImg = "/images/wellness.png";
const wellnessDarkImg = "/images/wellness-dark.png";
const breakdownImg = "/images/category-breakdown.png";
const breakdownDarkImg = "/images/category-breakdown-dark.png";
const purchaseImg = "/images/purchase-story.png";
const purchaseDarkImg = "/images/purchase-story-dark.png";
const namingImg = "/images/naming-card.png";
const namingDarkImg = "/images/naming-card-dark.png";
const askImg = "/images/insights-stats.png";
const askDarkImg = "/images/insights-stats-dark.png";

export default function Product() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 sm:pt-32 pb-20">
        <div className="page-container">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              A clearer view of <br/>
              <span className="text-primary">your spending</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              From checked statements to answers worked out on your phone. Every feature starts with spending history that stays there.
            </p>
          </div>

          <div className="space-y-20 md:space-y-28">
            {/* Feature 1 */}
            <section className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
              <div>
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">Checked Statements</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">A statement archive you can trust</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Add the monthly credit card PDFs you already get, up to 50 at a time, without a bank login. Maliya checks the numbers against each statement's printed totals, shows your statements by card with the months they cover, and leaves out any statement that doesn't match.
                </p>
                <div className="p-6 bg-muted/30 rounded-2xl border border-border/50">
                  <h4 className="font-bold mb-2">Supported credit card PDFs</h4>
                  <p className="text-sm text-muted-foreground">HSBC, FAB, Emirates NBD, and ADCB Islamic. Password-protected PDFs open in the app, and passwords are never saved. Bank account statements, scans, and transaction-list exports are not supported.</p>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ScreenshotPlaceholder imageSrc={statementsImg} darkImageSrc={statementsDarkImg} alt="Statements grouped by card with monthly coverage" className="-rotate-2 hover:rotate-0 transition-transform duration-500" />
              </motion.div>
            </section>

            {/* Feature 2 */}
            <section className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
              <motion.div 
                className="order-2 md:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ScreenshotPlaceholder imageSrc={breakdownImg} darkImageSrc={breakdownDarkImg} alt="Every category in September, each compared with its usual spend" className="rotate-2 hover:rotate-0 transition-transform duration-500" />
              </motion.div>
              <div className="order-1 md:order-2">
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">Spending Stories</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Follow every total to its purchases</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  See every category in the month, each marked above, below, or in line with your usual. Then move through subcategories, shops, and the purchases behind each number.
                </p>
                <ul className="space-y-3">
                  {['Complete-month comparisons', 'Category, subcategory, and shop drill-down', 'Searchable activity behind every total'].map((cat) => (
                    <li key={cat} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium">{cat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Feature 3 */}
            <section className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
              <div>
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">New · Purchase Stories</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Every purchase, in context</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Open a purchase to see whether it stands out, with color-coded comparisons. Below it are your five latest purchases at the same shop and the card you paid with, one tap from the exact statement.
                </p>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ScreenshotPlaceholder imageSrc={purchaseImg} darkImageSrc={purchaseDarkImg} alt="Purchase story for a Carrefour grocery purchase, with recent purchases at the same shop" className="-rotate-2 hover:rotate-0 transition-transform duration-500" />
              </motion.div>
            </section>

            {/* Feature 4 */}
            <section className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
              <motion.div 
                className="order-2 md:order-1"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ScreenshotPlaceholder imageSrc={namingImg} darkImageSrc={namingDarkImg} alt="Home card showing two merchants left to name in September, above the month's categories" className="rotate-2 hover:rotate-0 transition-transform duration-500" />
              </motion.div>
              <div className="order-1 md:order-2">
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">New · Name Your Merchants</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Put a name to unfamiliar charges</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Shops Maliya can't identify are ranked by how much you spent there, so the biggest come first. Name them one at a time, track your progress, skip any, or mark a charge as not a business.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A name for a single purchase stays on your phone. A name for every purchase like it is sent for review and, if approved, helps name that shop for everyone.
                </p>
              </div>
            </section>

            {/* Feature 5 */}
            <section className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
              <div>
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">Wellness Score</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Understand your monthly rhythm</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  A score out of 100, compared only with your own past months. Six factors you can open explain it, and each links back to its purchases. Set a monthly goal that stays on your phone. It's a guide, not a grade.
                </p>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ScreenshotPlaceholder imageSrc={wellnessImg} darkImageSrc={wellnessDarkImg} alt="Spending wellness score with its factors" className="-rotate-2 hover:rotate-0 transition-transform duration-500" />
              </motion.div>
            </section>
            
            {/* Feature 6 */}
            <section className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
              <motion.div 
                className="order-2 md:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ScreenshotPlaceholder imageSrc={askImg} darkImageSrc={askDarkImg} alt="Maliya Ask answer showing where most of September's money went" className="rotate-2 hover:rotate-0 transition-transform duration-500" />
              </motion.div>
              <div className="order-1 md:order-2">
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">Ask Maliya</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Answers worked out on your phone</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Ask about a month, category, repeat charge, or unusual purchase. Every answer shows the purchases behind it and suggests what to ask next. Your questions are not sent to an external AI chat service.
                </p>
              </div>
            </section>
          </div>

          <section className="mt-20 md:mt-28 p-8 md:p-12 rounded-3xl bg-muted/30 border border-border/50 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Smartphone className="w-7 h-7" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Your statements stay on your phone</h2>
              <p className="text-muted-foreground leading-relaxed">
                So do your spending history, notes, and goal, and your totals and answers are worked out there. No bank login, no account, and no cloud sync.
              </p>
            </div>
            <Link href="/security" className="inline-flex items-center font-semibold text-primary hover:underline shrink-0">
              What is shared, and when
              <ArrowRight className="ml-1.5 w-4 h-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
