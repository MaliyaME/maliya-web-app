import { WaitlistForm } from "@/components/WaitlistForm";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Waitlist() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left side - Content */}
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-muted/20 -z-10" />
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />

        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-display font-bold text-xl">
              M
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Maliya</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
          >
            Join the future of <span className="text-primary">personal finance.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            We're slowly opening access to ensure the best experience. Sign up now to secure your spot in line.
          </motion.p>
        </div>

        <div className="hidden md:block">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="avatar" />
                </div>
              ))}
            </div>
            <p>Join 2,000+ others on the waitlist</p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 p-4 md:p-12 lg:p-16 flex items-center justify-center bg-white dark:bg-black">
        <div className="w-full max-w-md">
          <WaitlistForm />
        </div>
      </div>
    </div>
  );
}
