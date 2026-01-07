import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waitlistSignups = pgTable("waitlist_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  message: text("message"), // what_you_want
  consent: boolean("consent").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWaitlistSchema = createInsertSchema(waitlistSignups).omit({ 
  id: true, 
  createdAt: true 
}).extend({
  email: z.string().email("Please enter a valid email address"),
  consent: z.boolean().refine(val => val === true, "You must agree to be contacted"),
  // Honeypot field (should be empty)
  honey: z.string().optional()
});

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type WaitlistSignup = typeof waitlistSignups.$inferSelect;
