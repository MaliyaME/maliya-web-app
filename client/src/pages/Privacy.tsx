import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// The native disclosures reflect owner-confirmed IP settings. Do not infer provider-side
// operational-log retention or App Store privacy answers from this page.

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
            Last updated: September 27, 2026
          </p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Overview
              </h2>
              <p>
                Maliya helps you understand spending from supported credit card
                statement PDFs. Maliya is operated by Marius Raileanu. The app
                keeps your statements and ledger on your
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
                <li>
                  Optional technical crash reports if you enable diagnostics, and
                  an optional usage-event stream if you enable usage analytics.
                  Feedback is sent only when you explicitly submit it.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Optional diagnostics and feedback
              </h2>
              <p>
                Crash reporting is off by default. If enabled, Maliya sends
                minimized technical exception stacks and app version/build to
                Sentry&apos;s EU ingestion service. The app does not attach your
                statements, ledger, financial values, notes, credentials,
                screenshots, screen recordings or console logs. Collection begins
                only after the app opens and reads your saved choice.
              </p>
              <p className="mt-3">
                Feedback is separate: pressing Send feedback sends the message you
                enter and the app version/build to Sentry. Do not include account
                numbers, statements, passwords or other sensitive details. Cancelling
                cannot recall a message already received by the provider. Sentry
                receives network metadata such as your IP address when a request
                reaches its service. Maliya&apos;s Sentry organization is configured
                to prevent IP addresses from being stored in crash events. This
                does not prevent the network edge from seeing the connection or
                establish how long separate operational logs are kept.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Optional usage analytics
              </h2>
              <p>
                Usage analytics is a separate choice, off by default. If enabled,
                Maliya sends basic screen visits, import outcomes, whether an Ask
                question was typed or selected, and successful goal-save and
                feedback-submission events to PostHog&apos;s EU service. Events do
                not include financial values, merchants, transaction identifiers,
                filenames, questions or feedback text. There is no screen recording,
                automatic click capture, advertising integration or person profile.
              </p>
              <p className="mt-3">
                A random event identifier is replaced on each app launch and after
                opting out. The PostHog project is configured to discard client IP
                data from stored events; PostHog still receives the IP at its
                network edge. The app requests that GeoIP enrichment be disabled;
                neither setting conceals the connection from the provider.
              </p>
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
                keeps contributed bank-printed merchant descriptions, their exact
                fingerprints and bounded structured merchant-review results. The
                descriptions and fingerprints are retained permanently; deleting
                local data does not remove those shared copies or exports you saved
                elsewhere. The service does not receive a separate reader or device
                identifier with a merchant contribution, but its hosting and AI
                providers may receive request metadata under their own policies.
                The providers&apos; own logs and previously received diagnostics or
                usage events are subject to their applicable retention terms;
                local deletion cannot recall them.
              </p>
              <p className="mt-3">
                Turning crash reporting off clears unsent local crash reports.
                Usage events have a bounded, memory-only queue; opting out or
                backgrounding drops unsent events. Deleting local data clears these
                choices, but it does not recall diagnostics, feedback or events
                already received by Sentry or PostHog.
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
                <li>Choose crash reporting and usage analytics independently in the app.</li>
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
                  href="mailto:privacy@maliya.me"
                >
                  privacy@maliya.me
                </a>
                . For app support use{" "}
                <a className="text-primary hover:underline" href="mailto:support@maliya.me">
                  support@maliya.me
                </a>
                ; for legal correspondence use{" "}
                <a className="text-primary hover:underline" href="mailto:legal@maliya.me">
                  legal@maliya.me
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
