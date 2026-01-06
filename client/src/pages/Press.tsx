import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Press() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Press Kit</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Assets, logos, and resources for media coverage.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold font-display mb-6">About Maliya</h2>
              <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                <p>
                  Maliya is an AI-powered personal finance assistant built for the modern generation in the UAE. 
                  Founded in 2024, our mission is to simplify wealth management by unifying bank accounts, 
                  analyzing spending patterns, and providing actionable insights for financial growth.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-display mb-6">Brand Assets</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 border border-border/50 rounded-2xl bg-card flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center text-white font-display font-bold text-4xl mb-6">
                    M
                  </div>
                  <h3 className="font-bold mb-2">Logomark</h3>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Download className="w-4 h-4 mr-2" /> Download SVG
                  </Button>
                </div>

                <div className="p-8 border border-border/50 rounded-2xl bg-card flex flex-col items-center text-center">
                  <div className="h-24 flex items-center justify-center mb-6">
                     <span className="font-display font-bold text-3xl">Maliya</span>
                  </div>
                  <h3 className="font-bold mb-2">Wordmark</h3>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Download className="w-4 h-4 mr-2" /> Download SVG
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
