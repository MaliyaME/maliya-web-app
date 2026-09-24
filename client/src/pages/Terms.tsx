import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="page-container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: September 23, 2026
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Acceptance of terms
              </h2>
              <p>
                By accessing or using Maliya, you agree to these Terms. If you
                do not agree, do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                The service
              </h2>
              <p>
                Maliya reads supported credit card statement PDFs you choose and
                creates an informational spending ledger on your device. We do not
                connect directly to banks, ask for bank credentials, move money,
                make transfers, or change bank settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Eligibility and device access
              </h2>
              <p>
                You must be at least 18 years old. Maliya does not require an app
                account; you are responsible for access to your device, local app
                data, and any exports you create.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Your content
              </h2>
              <p>
                You retain rights in the statements and data you choose. Statement
                PDFs, the ledger, corrections, and notes remain in app-private
                storage. Do not process data you do not have permission to use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Merchant identification
              </h2>
              <p>
                When the connected merchant service is enabled, Maliya shares
                eligible bank-printed descriptions and a fingerprint under the
                disclosure shown before file selection. Shared descriptions may be
                retained permanently and cannot be retrieved or deleted in the app.
                See the Privacy Policy for the full boundary.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Prohibited use
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Attempting to access systems or data without authorization.</li>
                <li>Providing malicious or harmful files.</li>
                <li>Using the service for unlawful activities.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Disclaimers
              </h2>
              <p>
                Maliya provides informational insights only and does not offer
                financial, legal, or tax advice. The service is provided "as is"
                without warranties of any kind.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Limitation of liability
              </h2>
              <p>
                To the fullest extent permitted by law, Maliya is not liable for
                indirect, incidental, or consequential damages arising from your
                use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Termination
              </h2>
              <p>
                We may suspend or terminate access if you violate these Terms or
                if required for security or legal reasons.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Changes to these terms
              </h2>
              <p>
                We may update these Terms from time to time. If changes are
                material, we will provide notice within the product or via email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Governing law
              </h2>
              <p>
                These Terms are governed by the laws of the United Arab Emirates,
                without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Contact
              </h2>
              <p>
                Questions about these Terms? Email us at{" "}
                <a
                  className="text-primary hover:underline"
                  href="mailto:legal@maliya.app"
                >
                  legal@maliya.app
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
