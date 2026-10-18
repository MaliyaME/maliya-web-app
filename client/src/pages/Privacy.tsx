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
            Last updated: October 18, 2026
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
                  the local ledger, single-purchase edits, notes, and your monthly
                  goal. This data stays on your device and is not collected by this
                  website.
                </li>
                <li>
                  When merchant identification is enabled, eligible bank-printed
                  descriptions and a fingerprint. Descriptions can contain names,
                  references, dates, amounts, or card fragments.
                </li>
                <li>
                  From version 1.0.5, a merchant name or category you choose for
                  every purchase like it, sent with that bank-printed description
                  and its fingerprint for review.
                </li>
                <li>
                  Optional technical crash reports if you enable diagnostics, and
                  an optional usage-event stream if you enable usage analytics.
                  Feedback is sent only when you explicitly submit it.
                </li>
                <li>
                  If you connect an email account in a build that offers Email,
                  your chosen search settings, matching sender addresses, dates,
                  filenames, and attachment identifiers stay on your device.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Optional email statement discovery on iPhone
              </h2>
              <p>
                In iPhone builds that offer Email, connecting a mailbox is optional;
                you can still import PDFs manually. Maliya searches for possible
                statement attachments using your chosen conditions while the app is
                active. If you enable checks on open, it checks no more than once
                every twelve hours after a successful check; you can also ask it to
                check. There is no unattended daily background mailbox job. Search
                conditions do not limit the permission granted by your provider.
                Only attachments you select are downloaded for local PDF review;
                nothing is added until you confirm Add. A PDF password used to open
                a selected statement is not saved.
              </p>
              <p className="mt-3">
                <strong className="text-foreground">Gmail:</strong> Google grants
                read-only access to the entire mailbox, not just matching messages.
                Maliya cannot send, change, or delete Gmail messages. Your iPhone
                contacts Google directly, and keeps its refresh credential in
                device-secure storage. Disconnect removes the local connection and
                attempts to revoke Google access; if that fails or the device is
                offline, remove Maliya in Google Account&apos;s third-party
                connections. Maliya&apos;s use of information received from Google
                APIs follows the Google API Services User Data Policy, including
                its Limited Use requirements.
              </p>
              <p className="mt-3">
                <strong className="text-foreground">Yahoo Mail:</strong> Yahoo
                app passwords can permit reading, changing, and sending mail;
                Yahoo does not offer a read-only app-password permission. Maliya
                sends only read-only IMAP commands over a verified encrypted
                connection to Yahoo and does not send, move, or delete messages.
                Yahoo receives a fixed Maliya name, version, and iOS label.
                The app password stays in device-secure storage. Disconnect
                removes this device&apos;s copy but does not invalidate the
                password at Yahoo; delete it separately in Yahoo Account Security.
              </p>
              <p className="mt-3">
                <strong className="text-foreground">Personal Outlook:</strong>
                Outlook.com, Hotmail, and Live personal accounts are supported,
                not work or school Microsoft 365 accounts. Microsoft&apos;s
                delegated Mail.Read permission covers the entire personal
                mailbox but cannot send, change, or delete mail. User.Read is used
                to validate the connected address, and offline_access supports
                renewal with a device-held refresh credential. Your iPhone
                contacts Microsoft Graph directly to find attachment details
                without requesting message bodies, recipients, or unselected
                file contents. Disconnect removes this
                device&apos;s connection but does not revoke Microsoft&apos;s grant;
                remove it separately in your Microsoft account.
              </p>
              <p className="mt-3">
                Matching email details, selected PDFs, and any added statements
                remain in app-private storage. No mailbox content, mail
                credentials or source PDFs are sent to Maliya, Supabase or AI providers.
                Maliya can still use its downloaded shared merchant directory to
                identify these purchases on your device. In build 38 and later,
                eligible email-derived descriptions and merchant-wide corrections
                can be reviewed and sent through the optional Council process
                below. In earlier builds without that process, email-derived
                descriptions and corrections remain local.
                Disconnect removes local searches and found-email details, not
                statements already added. Delete all local data removes saved
                mail sign-ins and records on this device; it does not delete
                messages or necessarily revoke a provider&apos;s remote grant.
                On iPhone, secure credentials may survive uninstall; a fresh
                installation removes any surviving mail sign-ins before
                offering email access.
                Google, Yahoo, and Microsoft receive your direct sign-in and
                search requests under their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Optional email statement discovery on Android
              </h2>
              <p>
                In Android builds that offer Email, you may connect a personal
                mailbox or continue importing PDFs manually. Maliya searches
                possible statement attachments using your conditions while the
                app is active. If you enable checks on open, it checks no more
                than once every twelve hours after a successful check. It does
                not run an unattended daily background mailbox job. Search
                conditions do not narrow the permission your provider grants.
                Only attachments you choose are downloaded for local PDF review;
                nothing is added until you confirm Add. A password used to open
                a PDF is never saved.
              </p>
              <p className="mt-3">
                <strong className="text-foreground">Gmail:</strong> Google grants
                gmail.readonly access to your entire mailbox, not just matching
                emails. Maliya cannot send, change or delete your messages.
                Android Google Play services handles permission and caches access
                tokens on your device; Maliya stores your validated address and
                search settings locally, not a Google refresh token. Your phone
                searches Google directly. Disconnect removes the local connection
                and attempts to revoke access, but Google may retain the grant if
                that fails or you are offline; revoking may also affect other
                Google scopes you previously granted Maliya. You can review and
                remove it in Google Account&apos;s third-party connections. While
                Google OAuth remains in Testing, only enrolled test accounts can
                connect. Maliya&apos;s use of information from Google APIs follows
                the Google API Services User Data Policy, including Limited Use.
              </p>
              <p className="mt-3">
                <strong className="text-foreground">Yahoo Mail:</strong> A Yahoo
                app password can allow reading, changing and sending mail; Yahoo
                cannot limit it to read-only access. Maliya uses only read-only
                IMAP commands over a verified encrypted connection to Yahoo and
                does not send, move or delete messages. Yahoo receives your sign-in,
                searches and a fixed Maliya name, version and Android label. The
                app password stays in Android&apos;s secure local storage.
                Disconnect removes the device&apos;s copy, not the password at
                Yahoo; delete it separately in Yahoo Account Security.
              </p>
              <p className="mt-3">
                <strong className="text-foreground">Personal Outlook:</strong>
                Outlook.com, Hotmail.com and Live.com personal accounts are
                supported, not work or school Microsoft 365 accounts. Mail.Read
                covers the entire personal mailbox but cannot send, change or
                delete messages. User.Read supplies your connected address; extra
                profile fields are discarded. Microsoft&apos;s MSAL manages
                offline_access and renews tokens in its on-device cache. Maliya
                stores an opaque MSAL account binding, not a separate Android
                Microsoft refresh token. A Microsoft broker app may also hold
                sign-in state on this device. Without a broker, another app may
                interfere with the custom browser callback; PKCE prevents it from
                redeeming Maliya&apos;s authorization code. Maliya requests Inbox
                and Archive message and attachment details from Graph, not message
                bodies, recipients or unselected file bytes. Disconnect removes
                this app&apos;s cached tokens and local connection but does not
                revoke Microsoft&apos;s permission or remove a broker account;
                review the grant separately in your Microsoft account.
              </p>
              <p className="mt-3">
                Matching email details, selected PDFs, statements you add and
                corrections remain in app-private storage. Android backup is
                disabled; there is no account sync or cloud recovery. No mailbox
                content, credentials or source PDFs are sent to Maliya, Supabase or AI.
                The downloaded merchant directory can still identify these
                purchases on your device. In build 38 and later, eligible
                email-derived descriptions and merchant-wide corrections can be
                reviewed and sent through the optional Council process below.
                In earlier builds without that process, email-derived descriptions
                and corrections remain local. Disconnect removes searches and
                found-email details, not statements already added. Delete all
                local data removes saved sign-ins and records on this device but
                neither deletes messages nor guarantees remote grant revocation.
                Google, Yahoo and Microsoft receive your direct sign-in and
                search requests under their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display text-foreground mb-3">
                Optional Council sharing in build 38 and later
              </h2>
              <p>
                File and email imports use the same optional Council process.
                Before each batch is sent, you review the eligible bank-printed
                descriptions and tap Send to Council. Only those approved
                descriptions and their fingerprints are sent for merchant
                identification. Merchant-wide name, category and subcategory
                corrections can also be reviewed and sent with their eligible
                descriptions. Saving a correction does not send it to Council.
              </p>
              <p className="mt-3">
                A description can itself contain names, references, dates, amounts
                or card fragments. Your original PDFs, ledger, private notes and
                single-purchase edits stay on your device. The service and provider
                terms below apply to the descriptions and corrections you approve.
              </p>
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
                <li>Review merchant corrections you send and, if approved, publish them in the shared directory.</li>
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
                fields (amounts, dates, and card details), notes, and single-purchase
                edits are not sent to that service.
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
                Merchant corrections
              </h2>
              <p>
                From version 1.0.5, when you name a merchant or change its category
                for every purchase like it, the app sends that name or category to
                Maliya with the bank-printed description and its fingerprint, for
                review. Nothing is sent until you choose Continue on the in-app
                explanation. To keep a correction on your device only, choose
                &ldquo;This purchase&rdquo;. Single-purchase edits, notes, recurring
                marks, &ldquo;Not a business&rdquo;, filing resets, amounts, dates,
                card details, and statements are never sent.
              </p>
              <p className="mt-3">
                A random identifier for each save is sent so that a retry is not
                stored twice; it is not an account or device identifier. A received
                correction is a suggestion, not a change to the shared directory.
                Maliya&apos;s operator reviews it; suggestions are not sent to AI
                services. If approved, the name or category is published in the
                shared directory that everyone&apos;s app uses.
              </p>
              <p className="mt-3">
                To limit abuse, the service keeps a daily-changing one-way hash of
                part of the network address a suggestion came from. It is not the
                address itself and is not linked to an account or device identifier.
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
                A merchant correction waits for review for up to 30 days. When it
                is approved or rejected, the suggestion is deleted and only a record
                of the decision is kept: the description&apos;s fingerprint, any
                published name or category and the values it replaced, and an
                optional reviewer note. Corrections not decided within 30 days are
                deleted. Save identifiers are kept for 60 days without the
                correction text, and network-address hashes for up to two days.
                Corrections waiting on your device to be sent are removed by Delete
                all local data; corrections already received are not.
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
                <li>Choose &ldquo;This purchase&rdquo; to keep a correction on your device only.</li>
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
