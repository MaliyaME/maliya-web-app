import { useMutation } from "@tanstack/react-query";
import { api, type InsertWaitlist } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useWaitlistSignup() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertWaitlist) => {
      // Validate with Zod before sending if possible, but route handles it too
      const validated = api.waitlist.signup.input.parse(data);
      
      const res = await fetch(api.waitlist.signup.path, {
        method: api.waitlist.signup.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.waitlist.signup.responses[400].parse(await res.json());
          throw new Error(error.message || "Invalid details provided");
        }
        if (res.status === 409) {
          const error = api.waitlist.signup.responses[409].parse(await res.json());
          throw new Error(error.message || "Email already registered");
        }
        throw new Error('Failed to join waitlist. Please try again later.');
      }

      return api.waitlist.signup.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Welcome aboard! 🚀",
        description: "You've successfully joined the Maliya waitlist. We'll be in touch soon.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
