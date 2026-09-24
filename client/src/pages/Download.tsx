import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check } from "lucide-react";
import { SiApple, SiGoogleplay } from "react-icons/si";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

const appStoreUrl = "https://apps.apple.com/ae/app/maliya/id6754902365";

const highlights = ["Free for everyone", "No bank login", "Statements stay on your device"];

export default function Download() {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 sm:pt-32 lg:pt-40 pb-16 lg:pb-20 overflow-x-clip">
        <section className="page-container grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 mb-8 text-left">
              <img src="/app_icon.png" alt="" className="w-14 h-14 rounded-[14px] shadow-md" />
              <div>
                <p className="font-display font-semibold text-lg leading-tight">Maliya</p>
                <p className="text-sm text-muted-foreground">Personal finance · Free</p>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 text-balance">
              Get Maliya <br />
              <span className="text-primary">for iPhone.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 text-balance">
              Import supported UAE credit card statements and see where your money goes. No bank login or account required.
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-[380px] mx-auto sm:flex sm:max-w-none sm:justify-center lg:justify-start">
              <a
                href={appStoreUrl}
                aria-label="Download Maliya on the App Store"
                className="inline-flex h-14 items-center justify-center sm:justify-start gap-2.5 rounded-xl bg-foreground px-4 sm:px-5 text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <SiApple className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" aria-hidden="true" />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[11px] font-medium">Download on the</span>
                  <span className="text-lg sm:text-xl font-semibold tracking-tight mt-1">App Store</span>
                </span>
              </a>
              <div
                aria-label="Google Play version coming soon"
                className="inline-flex h-14 items-center justify-center sm:justify-start gap-2.5 rounded-xl border border-dashed border-border px-4 sm:px-5 text-muted-foreground"
              >
                <SiGoogleplay className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" aria-hidden="true" />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[11px] font-medium">Coming soon to</span>
                  <span className="text-lg sm:text-xl font-semibold tracking-tight mt-1">Google Play</span>
                </span>
              </div>
            </div>

            <ul className="mt-8 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {highlights.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative flex justify-center lg:justify-end items-start gap-4 sm:gap-6"
          >
            <div className="absolute inset-x-8 inset-y-12 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
            <img
              src={isDark ? "/images/dashboard-overview-dark.png" : "/images/dashboard-overview.png"}
              alt="Maliya home screen showing monthly spending and wellness"
              className="relative w-[46%] max-w-[250px] -rotate-3 hover:rotate-0 transition-transform duration-500 rounded-[1.75rem] sm:rounded-[2.25rem] border-4 sm:border-[6px] border-foreground/20 bg-card shadow-2xl"
            />
            <img
              src={isDark ? "/images/insights-stats-dark.png" : "/images/insights-stats.png"}
              alt="Maliya answering where most of the month's money went"
              className="relative w-[46%] max-w-[250px] mt-12 sm:mt-16 rotate-3 hover:rotate-0 transition-transform duration-500 rounded-[1.75rem] sm:rounded-[2.25rem] border-4 sm:border-[6px] border-foreground/20 bg-card shadow-2xl"
            />
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
