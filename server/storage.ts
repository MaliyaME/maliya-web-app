import { supabase } from "./supabase";
import { type InsertWaitlist, type WaitlistSignup } from "@shared/schema";

type WaitlistRow = {
  id: number;
  email: string;
  name: string | null;
  message: string | null;
  consent: boolean;
  created_at: string | null;
};

function mapWaitlistRow(row: WaitlistRow): WaitlistSignup {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    message: row.message,
    consent: row.consent,
    createdAt: row.created_at ? new Date(row.created_at) : null,
  } satisfies WaitlistSignup;
}

export interface IStorage {
  createWaitlistSignup(signup: InsertWaitlist): Promise<WaitlistSignup>;
  getWaitlistSignupByEmail(email: string): Promise<WaitlistSignup | undefined>;
}

export class SupabaseStorage implements IStorage {
  async createWaitlistSignup(signup: InsertWaitlist): Promise<WaitlistSignup> {
    const { honey, ...validSignup } = signup; // Exclude honey from db insert
    const { data, error } = await supabase
      .schema("reg")
      .from("waitlist_signups")
      .insert(validSignup)
      .select(
        "id, email, name, message, consent, created_at",
      )
      .single();

    if (error) {
      throw error;
    }

    return mapWaitlistRow(data as WaitlistRow);
  }

  async getWaitlistSignupByEmail(email: string): Promise<WaitlistSignup | undefined> {
    const { data, error } = await supabase
      .schema("reg")
      .from("waitlist_signups")
      .select(
        "id, email, name, message, consent, created_at",
      )
      .eq("email", email)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? mapWaitlistRow(data as WaitlistRow) : undefined;
  }
}

export const storage = new SupabaseStorage();
