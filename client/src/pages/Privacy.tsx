import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="page-container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            Last updated: September 23, 2026
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Overview
              </h2>
              <p>
                Maliya helps you understand spending from supported credit card
                statement PDFs. The app keeps your statements and ledger on your
                device. This website previously operated an early-access waitlist;
                this policy explains both boundaries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Information and data involved
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Details previously submitted to the waitlist, such as email,
                  optional name and message, consent choice, and signup time.
                </li>
                <li>
                  App-private data you choose in Maliya, including statement PDFs,
                  the local ledger, corrections, and notes. This data stays on your
                  device and is not collected by this website.
                </li>
                <li>
                  When merchant identification is enabled, eligible bank-printed
                  descriptions and a fingerprint. Descriptions can contain names,
                  references, dates, amounts, or card fragments.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                How we use your information
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Calculate spending views and answers locally in the app.</li>
                <li>Identify merchants from eligible printed descriptions.</li>
                <li>Contact past waitlist subscribers who consented to receive updates.</li>
                <li>Maintain, secure, and support Maliya.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Data sharing
              </h2>
              <p>
                We do not sell your personal data. If the connected merchant
                service is enabled, eligible descriptions and a fingerprint are
                sent to Maliya and AI providers. Up to four candidate business
                names and an optional country hint may be searched on the web; the
                full printed description is not sent to search. Separate transaction
                fields and personal corrections are not sent to that service.
              </p>
              <p className="mt-3">
                No account or device identifier is attached to a contribution, but
                a printed description can still identify someone. Providers may
                retain network metadata and logs. Maliya presents this disclosure
                before you select a statement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Security
              </h2>
              <p>
                Maliya never connects to your bank or asks for bank credentials.
                The built-in reader processes supported PDFs on your device, PDF
                passwords are never saved, and statements are only added after
                extracted figures reconcile with printed totals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Data retention
              </h2>
              <p>
                Local app data remains until you remove it or use Delete all local
                data. Original PDFs and local records are excluded from operating-
                system backup. There is no account sync or cloud recovery. Maliya
                keeps descriptions contributed to the merchant service permanently;
                deleting local data does not remove those shared copies or exports
                you saved elsewhere.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Your choices
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Review the sharing disclosure before selecting a statement.</li>
                <li>Delete the app's local data from Profile and data.</li>
                <li>Choose where to save exports and remove them yourself.</li>
                <li>Opt out of any marketing communications.</li>
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
