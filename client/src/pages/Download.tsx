import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowUpRight, Check } from "lucide-react";
import { SiApple, SiGoogleplay } from "react-icons/si";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

const appStoreUrl = "https://apps.apple.com/ae/app/maliya/id6754902365";

const highlights = ["Free for everyone", "No bank login", "Statements stay on your phone"];

const androidBetaSteps = [
  {
    title: "Join the beta group",
    description: "Join the Maliya Android beta group on Google Groups.",
    link: { href: "https://groups.google.com/g/maliya-android-beta", label: "Join the group" },
  },
  {
    title: "Become a tester",
    description: "Open the Google Play testing page and choose to become a tester.",
    link: { href: "https://play.google.com/apps/testing/com.maliya", label: "Become a tester" },
  },
  {
    title: "Install from Google Play",
    description: "Follow the Google Play install link shown after you opt in.",
  },
];

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
              <span className="text-primary">on your phone.</span>
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
              <a
                href="#android-beta"
                aria-label="Join the Maliya Android beta on Google Play"
                className="inline-flex h-14 items-center justify-center sm:justify-start gap-2.5 rounded-xl border border-border bg-card px-4 sm:px-5 text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <SiGoogleplay className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" aria-hidden="true" />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[11px] font-medium">Android beta on</span>
                  <span className="text-lg sm:text-xl font-semibold tracking-tight mt-1">Google Play</span>
                </span>
              </a>
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

        <section id="android-beta" className="page-container mt-20 lg:mt-28 scroll-mt-28">
          <div className="rounded-3xl border border-border/50 bg-muted/30 p-6 sm:p-10 md:p-12 grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-4">
                <SiGoogleplay className="w-4 h-4" aria-hidden="true" />
                Android beta
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-balance">
                Try Maliya on Android
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Maliya 1.0.5 for Android is in closed beta on Google Play. The public release is coming soon.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
                  Use the same Google account for all three steps.
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
                  Needs Android 15 or newer.
                </li>
              </ul>
            </div>
            <ol className="space-y-8">
              {androidBetaSteps.map((step, index) => (
                <li key={step.title} className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex-shrink-0 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display mb-1">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    {step.link && (
                      <a
                        href={step.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                      >
                        {step.link.label}
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
