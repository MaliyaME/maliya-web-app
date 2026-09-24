import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScreenshotPlaceholder } from "@/components/ScreenshotPlaceholder";
import { motion } from "framer-motion";

// Images
const statementsImg = "/images/statements-list.png";
const statementsDarkImg = "/images/statements-list-dark.png";
const wellnessImg = "/images/wellness.png";
const wellnessDarkImg = "/images/wellness-dark.png";
const breakdownImg = "/images/category-breakdown.png";
const breakdownDarkImg = "/images/category-breakdown-dark.png";
const merchantsImg = "/images/merchants.png";
const merchantsDarkImg = "/images/merchants-dark.png";

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
              From checked statement imports to evidence-backed answers, every feature starts with your local ledger.
            </p>
          </div>

          <div className="space-y-20 md:space-y-28">
            {/* Feature 1 */}
            <section className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
              <div>
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">Checked Statements</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">A statement archive you can trust</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Choose original monthly credit card PDFs without sharing bank credentials. Maliya checks their printed totals, shows coverage by card and month, and leaves out statements whose figures do not match.
                </p>
                <div className="p-6 bg-muted/30 rounded-2xl border border-border/50">
                  <h4 className="font-bold mb-2">Supported credit card PDFs</h4>
                  <p className="text-sm text-muted-foreground">Recognized layouts from HSBC, FAB, and Emirates NBD. Bank account statements, scans, and transaction-list exports are not supported.</p>
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
                <ScreenshotPlaceholder imageSrc={breakdownImg} darkImageSrc={breakdownDarkImg} alt="Category Breakdown" className="rotate-2 hover:rotate-0 transition-transform duration-500" />
              </motion.div>
              <div className="order-1 md:order-2">
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">Spending Stories</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Follow every total to its evidence</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Start with a monthly breakdown, then move through categories, subcategories, merchants, and the purchases behind each number.
                </p>
                <ul className="space-y-3">
                  {['Complete-month comparisons', 'Category and merchant drill-down', 'Searchable supporting activity'].map((cat) => (
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
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">Wellness Score</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Understand your monthly rhythm</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Six transparent factors turn your complete statement history into a spending wellness guide. Each factor links back to its supporting transactions—it is a guide, not a grade.
                </p>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ScreenshotPlaceholder imageSrc={wellnessImg} darkImageSrc={wellnessDarkImg} alt="Wellness Score" className="-rotate-2 hover:rotate-0 transition-transform duration-500" />
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
                <ScreenshotPlaceholder imageSrc={merchantsImg} darkImageSrc={merchantsDarkImg} alt="Merchant Analysis" className="rotate-2 hover:rotate-0 transition-transform duration-500" />
              </motion.div>
              <div className="order-1 md:order-2">
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">Merchant Evidence</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">See where your spending lands</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  See each merchant's contribution inside a category, open its purchases, and correct unidentified names locally when a printed description needs your help.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
