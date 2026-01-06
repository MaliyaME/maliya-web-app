import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWaitlistSchema, type InsertWaitlist } from "@shared/routes";
import { useWaitlistSignup } from "@/hooks/use-waitlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

export function WaitlistForm() {
  const { mutate: signup, isPending, isSuccess } = useWaitlistSignup();

  const form = useForm<InsertWaitlist>({
    resolver: zodResolver(insertWaitlistSchema),
    defaultValues: {
      email: "",
      name: "",
      platform: "",
      emirate: "",
      message: "",
      consent: false,
      honey: "",
    },
  });

  function onSubmit(data: InsertWaitlist) {
    if (data.honey) return; // Honeypot trap
    signup(data);
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-primary/5 rounded-3xl border border-primary/20"
      >
        <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          ✨
        </div>
        <h3 className="text-2xl font-bold font-display mb-2">You're on the list!</h3>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          Thank you for joining Maliya. We'll notify you as soon as we open up more spots.
        </p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="rounded-xl"
        >
          Register another email
        </Button>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 md:p-8 rounded-3xl shadow-lg border border-border/50">
        
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" className="rounded-xl h-12 bg-background/50" {...field} value={field.value || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="jane@example.com" type="email" className="rounded-xl h-12 bg-background/50" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Platform Selection */}
          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Platform</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger className="rounded-xl h-12 bg-background/50">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="iOS">iOS (iPhone)</SelectItem>
                    <SelectItem value="Android">Android</SelectItem>
                    <SelectItem value="Web">Web Browser</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Emirate Selection */}
          <FormField
            control={form.control}
            name="emirate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emirate (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger className="rounded-xl h-12 bg-background/50">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Dubai">Dubai</SelectItem>
                    <SelectItem value="Abu Dhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="Sharjah">Sharjah</SelectItem>
                    <SelectItem value="Other">Other / International</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Message Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are you looking for most?</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="e.g. Better expense tracking, investment insights..." 
                  className="rounded-xl min-h-[100px] resize-none bg-background/50" 
                  {...field} 
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot - hidden */}
        <FormField
          control={form.control}
          name="honey"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl><Input {...field} /></FormControl>
            </FormItem>
          )}
        />

        {/* Consent Checkbox */}
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-xl bg-muted/30">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-normal text-muted-foreground text-sm">
                  I agree to receive emails about Maliya updates and launch news. We never spam.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isPending} 
          className="w-full h-14 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-lg shadow-primary/25"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
