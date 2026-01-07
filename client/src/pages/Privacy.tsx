import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: December 15, 2025
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Overview
              </h2>
              <p>
                Maliya helps you understand your finances by analyzing the PDF
                bank statements you upload. This policy explains what we collect,
                how we use it, and your choices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Information we collect
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Waitlist details such as name, email, and optional notes.
                </li>
                <li>
                  PDF bank statements you upload and the transaction data we
                  extract from them.
                </li>
                <li>
                  Basic usage and device information needed to operate and secure
                  the service.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                How we use your information
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide insights, categorization, and analytics.</li>
                <li>Operate, maintain, and improve the product.</li>
                <li>Communicate with you about updates and support.</li>
                <li>Protect against fraud and abuse.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Data sharing
              </h2>
              <p>
                We do not sell your personal data. We may share information with
                trusted service providers who help us run the service, or when
                required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Security
              </h2>
              <p>
                We use encryption and access controls to protect your data. We
                only process information needed to provide read-only insights and
                never connect directly to your bank accounts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Data retention
              </h2>
              <p>
                We retain your data only as long as necessary to provide the
                service or meet legal requirements. You can request deletion at
                any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Your choices
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Request access, correction, or deletion of your data.</li>
                <li>Opt out of marketing communications.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Contact
              </h2>
              <p>
                Questions about this policy? Email us at{" "}
                <a
                  className="text-primary hover:underline"
                  href="mailto:privacy@maliya.app"
                >
                  privacy@maliya.app
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
