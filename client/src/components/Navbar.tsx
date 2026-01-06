import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Overview" },
  { href: "/product", label: "Product" },
  { href: "/changelog", label: "What's New" },
  { href: "/security", label: "Security" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled || mobileMenuOpen
          ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-display font-bold text-xl group-hover:scale-105 transition-transform">
            M
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Maliya
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
              {location === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full layout-id-active" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/waitlist">
            <Button variant={isScrolled ? "default" : "secondary"} className="font-semibold rounded-xl">
              Join Waitlist
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border/50 animate-in slide-in-from-top-5">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-lg font-medium py-2 border-l-2 pl-4 transition-all",
                  location === link.href 
                    ? "border-primary text-primary bg-primary/5" 
                    : "border-transparent text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-border/50 my-2" />
            <Link href="/waitlist">
              <Button className="w-full text-lg h-12 rounded-xl">Join Waitlist</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
