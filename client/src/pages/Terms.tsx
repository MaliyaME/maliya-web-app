import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: December 15, 2025
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
                Maliya provides read-only insights from the PDF bank statements
                you upload. We do not connect directly to banks, move money, make
                transfers, or change your settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Eligibility and accounts
              </h2>
              <p>
                You must be at least 18 years old and provide accurate
                information. You are responsible for activity that happens under
                your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Your content
              </h2>
              <p>
                You own your uploaded statements. You grant Maliya a limited
                license to process them solely to provide the service. Do not
                upload data you do not have permission to share.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Prohibited use
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Attempting to access systems or data without authorization.</li>
                <li>Uploading malware or harmful content.</li>
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
