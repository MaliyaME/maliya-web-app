import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Press() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="page-container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Press Kit</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Assets, logos, and resources for media coverage.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold font-display mb-6">About Maliya</h2>
              <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                <p>
                  Maliya is a private spending companion built for supported UAE credit card statements. It reads PDFs on the device, checks extracted figures against printed totals, and turns complete statement history into monthly comparisons, spending stories, searchable activity, wellness factors, and evidence-backed answers. Maliya is free on the App Store; its Google Play listing is coming soon.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display mb-6">Brand Assets</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 border border-border/50 rounded-2xl bg-card flex flex-col items-center text-center">
                  <img
                    src="/maliya-icon.svg"
                    alt="Maliya logomark"
                    className="w-24 h-24 rounded-2xl object-cover mb-6"
                  />
                  <h3 className="font-bold mb-2">Logomark</h3>
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <a href="/maliya-icon.svg" download="maliya-icon.svg">
                      <Download className="w-4 h-4 mr-2" /> Download SVG
                    </a>
                  </Button>
                </div>

                <div className="p-8 border border-border/50 rounded-2xl bg-card flex flex-col items-center text-center">
                  <img
                    src="/app_icon.png"
                    alt="Maliya app icon"
                    className="w-24 h-24 rounded-2xl object-cover mb-6"
                  />
                  <h3 className="font-bold mb-2">App Icon</h3>
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <a href="/app_icon.png" download="maliya-app-icon.png">
                      <Download className="w-4 h-4 mr-2" /> Download PNG
                    </a>
                  </Button>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold font-display mb-6">Media Contact</h2>
              <p className="text-muted-foreground mb-4">
                For press inquiries, please contact:
              </p>
              <a href="mailto:press@maliya.app" className="text-primary font-medium text-lg hover:underline">
                press@maliya.app
              </a>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
