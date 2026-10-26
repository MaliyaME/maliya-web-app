import { EyeOff, Lock, Server, Shield } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import { contact } from "../content";

const cards = [
  {
    icon: <Lock className="h-6 w-6" aria-hidden="true" />,
    title: "Stays on Your Phone",
    description:
      "Your statement PDFs, spending history, notes, single-purchase edits, and monthly goal stay in the app's private storage and are excluded from operating-system backup. There is no account sync or cloud recovery.",
  },
  {
    icon: <EyeOff className="h-6 w-6" aria-hidden="true" />,
    title: "No Bank Credentials",
    description:
      "You choose statement files yourself. Maliya never connects to your bank, asks for a bank login, moves money, makes transfers, or changes account settings.",
  },
  {
    icon: <Server className="h-6 w-6" aria-hidden="true" />,
    title: "Checked Imports",
    description:
      "The built-in reader processes supported PDFs on the device. A statement is only added after extracted figures reconcile with its printed totals, and PDF passwords are never saved.",
  },
  {
    icon: <Shield className="h-6 w-6" aria-hidden="true" />,
    title: "Clear Sharing Boundary",
    description:
      "PDFs, amounts, dates, and card details are not sent to the merchant service. Eligible bank-printed descriptions and a fingerprint are shared to identify merchants, and a name or category you choose for every purchase like it is sent for review. The app explains this before anything is shared. Crash reports and usage analytics are off unless you turn them on.",
  },
];

export default function Security() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8 sm:px-9 sm:py-10">
      <header className="text-center">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Shield className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Security First. Always.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground text-balance">
          Your statements and spending history stay on your phone. Maliya never asks for access to your bank account.
        </p>
      </header>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <SecurityCard key={card.title} {...card} />
        ))}
      </ul>

      <section className="mt-8 rounded-3xl border border-border/50 bg-muted/30 p-6">
        <h3 className="font-display text-lg font-bold">Have a security concern?</h3>
        <p className="mt-2 text-muted-foreground">
          If you believe you've found a security vulnerability in Maliya, please let us know immediately.
        </p>
        <a href={`mailto:${contact.security}`} className="mt-4 inline-block font-medium text-primary hover:underline">
          Contact Security Team &rarr;
        </a>
      </section>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Read the full{" "}
        <Link href="/privacy" className="font-medium text-primary hover:underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="font-medium text-primary hover:underline">
          Terms of Service
        </Link>
        .
      </p>
    </div>
  );
}

function SecurityCard({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <li className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
      <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-foreground">{icon}</span>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </li>
  );
}
