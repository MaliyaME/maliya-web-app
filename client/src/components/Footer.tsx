import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border/50 py-12 md:py-20 mt-20 md:mt-24">
      <div className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img
                src="/app_icon.png"
                alt="Maliya logo"
                className="w-6 h-6 rounded object-cover"
              />
              <span className="font-display font-bold text-lg text-foreground">
                Maliya
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A private, on-device view of your spending from supported credit card statement PDFs.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/product" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/changelog" className="text-sm text-muted-foreground hover:text-primary transition-colors">What's New</Link></li>
              <li><Link href="/download" className="text-sm text-muted-foreground hover:text-primary transition-colors">Get the App</Link></li>
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

        <div className="mt-10 md:mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4 text-xs text-muted-foreground">
          <p>&copy; {currentYear} Maliya. All rights reserved.</p>
          <p>Your money, in focus.</p>
        </div>
      </div>
    </footer>
  );
}
