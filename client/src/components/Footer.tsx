import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border/50 py-12 md:py-24 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white font-display font-bold text-sm">
                M
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Maliya
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your AI-powered personal finance assistant. Making wealth management simpler, smarter, and accessible.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/product" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/changelog" className="text-sm text-muted-foreground hover:text-primary transition-colors">What's New</Link></li>
              <li><Link href="/waitlist" className="text-sm text-muted-foreground hover:text-primary transition-colors">Early Access</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/press" className="text-sm text-muted-foreground hover:text-primary transition-colors">Press Kit</Link></li>
              <li><a href="mailto:hello@maliya.app" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              <li><Link href="/security" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {currentYear} Maliya Finance. All rights reserved.</p>
          <p>Designed for financial wellness.</p>
        </div>
      </div>
    </footer>
  );
}
