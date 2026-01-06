import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const changes = [
  {
    version: "v1.0.2",
    date: "December 15, 2024",
    title: "Enhanced Merchant Identification",
    description: "We've improved our AI model to better recognize local UAE merchants, reducing 'Uncategorized' transactions by 40%.",
    tags: ["Improvement", "AI"]
  },
  {
    version: "v1.0.1",
    date: "December 1, 2024",
    title: "Dark Mode Support",
    description: "Maliya now fully supports system-level dark mode for better viewing at night.",
    tags: ["New Feature", "UI"]
  },
  {
    version: "v1.0.0",
    date: "November 15, 2024",
    title: "Initial Beta Release",
    description: "The first version of Maliya is live for beta testers! Connect accounts, view insights, and track spending.",
    tags: ["Release"]
  }
];

export default function Changelog() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">What's New</h1>
          <p className="text-lg text-muted-foreground mb-16">
            Latest updates, improvements, and fixes from the Maliya team.
          </p>

          <div className="relative border-l border-border/50 ml-4 md:ml-0 space-y-16">
            {changes.map((item, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                {/* Timeline dot */}
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <span className="font-mono text-sm text-muted-foreground">{item.date}</span>
                  <Badge variant="secondary" className="w-fit">{item.version}</Badge>
                </div>
                
                <h2 className="text-2xl font-bold font-display mb-3">{item.title}</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
