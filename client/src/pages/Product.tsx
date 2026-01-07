import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScreenshotPlaceholder } from "@/components/ScreenshotPlaceholder";
import { motion } from "framer-motion";

// Images
const statementsImg = "/images/statements-list.png";
const wellnessImg = "/images/wellness.png";
const breakdownImg = "/images/category-breakdown.png";
const merchantsImg = "/images/merchants.png";

export default function Product() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Features designed for <br/>
              <span className="text-primary">financial wellness</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore the tools that give you complete control over your financial life.
            </p>
          </div>

          <div className="space-y-32">
            {/* Feature 1 */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">Unified Dashboard</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">All your accounts, one place</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  No more switching between bank apps. Upload PDF statements from your current accounts, savings, and credit cards to see your total net worth at a glance.
                </p>
                <div className="p-6 bg-muted/30 rounded-2xl border border-border/50">
                  <h4 className="font-bold mb-2">Supported Statement Sources</h4>
                  <p className="text-sm text-muted-foreground">Currently supporting PDF statements from major UAE banks including ENBD, ADCB, FAB, and more coming soon.</p>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ScreenshotPlaceholder imageSrc={statementsImg} alt="Statements List" />
              </motion.div>
            </section>

            {/* Feature 2 */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="order-2 md:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ScreenshotPlaceholder imageSrc={breakdownImg} alt="Category Breakdown" />
              </motion.div>
              <div className="order-1 md:order-2">
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">Smart Analytics</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Know where every Dirham goes</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Our breakdown view shows you spending by category, merchant, or time period. Identify leaks in your budget instantly.
                </p>
                <ul className="space-y-3">
                  {['Dining & Groceries', 'Transport & Fuel', 'Shopping & Electronics'].map((cat) => (
                    <li key={cat} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50 shadow-sm">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-medium">{cat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Feature 3 */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">Wellness Score</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Measure your financial health</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Get a personalized wellness score based on your saving habits, debt-to-income ratio, and emergency fund status. Gamify your way to better finances.
                </p>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ScreenshotPlaceholder imageSrc={wellnessImg} alt="Wellness Score" />
              </motion.div>
            </section>
            
             {/* Feature 4 */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="order-2 md:order-1"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ScreenshotPlaceholder imageSrc={merchantsImg} alt="Merchant Analysis" />
              </motion.div>
              <div className="order-1 md:order-2">
                <div className="uppercase text-sm font-bold tracking-wider text-primary mb-2">Merchant Insights</div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">See who gets your money</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Track recurring subscriptions and top merchants. Find out exactly how much you spent at Starbucks or Amazon this year.
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
