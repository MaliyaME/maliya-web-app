import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Lock, EyeOff, Server } from "lucide-react";

export default function Security() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="page-container max-w-4xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Security First. Always.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Maliya minimizes the data boundary instead of asking for access to your bank account.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <SecurityCard 
              icon={<Lock className="w-6 h-6" />}
              title="App-Private Storage"
              description="Your statement PDFs, local ledger, corrections, and notes stay in the app's private storage and are excluded from operating-system backup. There is no account sync or cloud recovery."
            />
            <SecurityCard 
              icon={<EyeOff className="w-6 h-6" />}
              title="No Bank Credentials"
              description="You choose statement files yourself. Maliya never connects to your bank, asks for a bank login, moves money, makes transfers, or changes account settings."
            />
            <SecurityCard 
              icon={<Server className="w-6 h-6" />}
              title="Checked Imports"
              description="The built-in reader processes supported PDFs on the device. A statement is only added after extracted figures reconcile with its printed totals, and PDF passwords are never saved."
            />
            <SecurityCard 
              icon={<Shield className="w-6 h-6" />}
              title="Clear Sharing Boundary"
              description="PDFs and separate transaction fields are not sent to the merchant service. When enabled, eligible bank-printed descriptions and a fingerprint are shared for merchant identification only after an upfront disclosure."
            />
          </div>

          <div className="bg-muted/30 p-8 rounded-3xl border border-border/50">
            <h3 className="text-xl font-bold font-display mb-4">Have a security concern?</h3>
            <p className="text-muted-foreground mb-6">
              If you believe you've found a security vulnerability in Maliya, please let us know immediately.
            </p>
            <a href="mailto:security@maliya.app" className="text-primary font-medium hover:underline">
              Contact Security Team &rarr;
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SecurityCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm">
      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-foreground mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-display mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
