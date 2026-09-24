import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const changes = [
  {
    status: "Available now",
    title: "Maliya on the App Store",
    description: "Maliya is free to download for iPhone. Explore spending from supported credit card statements without a bank login or an app account.",
    tags: ["iPhone", "Free"]
  },
  {
    status: "Coming soon",
    title: "Maliya on Google Play",
    description: "The Android store listing is not public yet. Check back here for its download link.",
    tags: ["Android"]
  }
];

export default function Changelog() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="page-container max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">What's New</h1>
          <p className="text-lg text-muted-foreground mb-16">
            Where to get Maliya and what is coming next.
          </p>

          <div className="relative border-l border-border/50 ml-4 md:ml-0 space-y-16">
            {changes.map((item, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                {/* Timeline dot */}
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <Badge variant="secondary" className="w-fit">{item.status}</Badge>
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
