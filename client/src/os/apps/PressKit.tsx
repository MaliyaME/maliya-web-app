import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact } from "../content";

const assets = [
  { src: "/maliya-icon.svg", alt: "Maliya logomark", title: "Logomark", file: "maliya-icon.svg", label: "Download SVG" },
  { src: "/app_icon.png", alt: "Maliya app icon", title: "App Icon", file: "maliya-app-icon.png", label: "Download PNG" },
];

export default function PressKit() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8 sm:px-9 sm:py-10">
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Press Kit</h2>
      <p className="mt-2 text-lg text-muted-foreground">Assets, logos, and resources for media coverage.</p>

      <section className="mt-10">
        <h3 className="font-display text-xl font-bold">About Maliya</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Maliya is a private spending companion for supported UAE credit card statements from HSBC, FAB, Emirates NBD,
          and ADCB Islamic. It reads PDFs on the phone, checks the numbers against printed totals, and turns complete
          statement history into monthly comparisons, category and purchase stories, searchable activity, wellness
          factors, and answers worked out on the phone. Statements and spending history stay on the user's phone, with
          no bank login or account. Maliya is free on the App Store, and its Android version is in closed beta on
          Google Play, with the public release coming soon.
        </p>
      </section>

      <section className="mt-10">
        <h3 className="font-display text-xl font-bold">Brand Assets</h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {assets.map((asset) => (
            <li
              key={asset.file}
              className="flex flex-col items-center rounded-2xl border border-border/50 bg-card p-7 text-center"
            >
              <img src={asset.src} alt={asset.alt} className="mb-5 h-20 w-20 rounded-2xl object-cover" />
              <h4 className="font-bold">{asset.title}</h4>
              <Button asChild variant="outline" size="sm" className="mt-4">
                <a href={asset.src} download={asset.file}>
                  <Download aria-hidden="true" /> {asset.label}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h3 className="font-display text-xl font-bold">Media Contact</h3>
        <p className="mt-3 text-muted-foreground">For press inquiries, please contact:</p>
        <a href={`mailto:${contact.press}`} className="mt-2 inline-block text-lg font-medium text-primary hover:underline">
          {contact.press}
        </a>
      </section>
    </div>
  );
}
