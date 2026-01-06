import { db } from "./db";
import { waitlistSignups, type InsertWaitlist, type WaitlistSignup } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createWaitlistSignup(signup: InsertWaitlist): Promise<WaitlistSignup>;
  getWaitlistSignupByEmail(email: string): Promise<WaitlistSignup | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createWaitlistSignup(signup: InsertWaitlist): Promise<WaitlistSignup> {
    const { honey, ...validSignup } = signup; // Exclude honey from db insert
    const [created] = await db.insert(waitlistSignups).values(validSignup).returning();
    return created;
  }

  async getWaitlistSignupByEmail(email: string): Promise<WaitlistSignup | undefined> {
    const [signup] = await db.select().from(waitlistSignups).where(eq(waitlistSignups.email, email));
    return signup;
  }
}

export const storage = new DatabaseStorage();
