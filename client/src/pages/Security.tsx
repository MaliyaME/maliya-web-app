import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Lock, EyeOff, Server } from "lucide-react";

export default function Security() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Security First. Always.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We know that trust is everything when it comes to your money. Here's how we keep your data safe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <SecurityCard 
              icon={<Lock className="w-6 h-6" />}
              title="Bank-Grade Encryption"
              description="We use AES-256 encryption for all data at rest and TLS 1.3 for data in transit. This is the same standard used by major financial institutions."
            />
            <SecurityCard 
              icon={<EyeOff className="w-6 h-6" />}
              title="Read-Only Access"
              description="Maliya only has read-only access to your financial data. We cannot move money, make transfers, or change your settings."
            />
            <SecurityCard 
              icon={<Server className="w-6 h-6" />}
              title="Local Data Compliance"
              description="We comply with UAE data protection regulations. Your sensitive financial data is processed securely."
            />
            <SecurityCard 
              icon={<Shield className="w-6 h-6" />}
              title="Regular Audits"
              description="Our systems undergo regular security audits and penetration testing to identify and patch vulnerabilities immediately."
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
