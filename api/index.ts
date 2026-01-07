import type { IncomingMessage, ServerResponse } from "http";
import { z } from "zod";
import { insertWaitlistSchema } from "../shared/schema.js";
import { supabase } from "../server/supabase.js";

type StorageError = {
  code?: string;
  message?: string;
};

async function readJsonBody(req: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf-8");
  if (!raw) {
    return {};
  }
  return JSON.parse(raw);
}

function sendJson(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { message: "Method Not Allowed" });
  }

  try {
    let body: unknown = {};
    try {
      body = await readJsonBody(req);
    } catch (error) {
      return sendJson(res, 400, { message: "Invalid JSON payload" });
    }
    const input = insertWaitlistSchema.parse(body);

    if (input.honey) {
      return sendJson(res, 201, { id: -1, email: input.email, consent: true });
    }

    const { data: existing, error: existingError } = await supabase
      .schema("reg")
      .from("waitlist_signups")
      .select("id")
      .eq("email", input.email)
      .maybeSingle();

    if (existingError) {
      throw existingError;
    }

    if (existing) {
      return sendJson(res, 409, {
        message: "Email already registered on the waitlist.",
      });
    }

    const { honey, ...validSignup } = input;
    const { data, error } = await supabase
      .schema("reg")
      .from("waitlist_signups")
      .insert(validSignup)
      .select("id, email, name, message, consent, created_at")
      .single();

    if (error) {
      if (error.code === "23505") {
        return sendJson(res, 409, {
          message: "Email already registered on the waitlist.",
        });
      }
      throw error;
    }

    return sendJson(res, 201, {
      id: data.id,
      email: data.email,
      name: data.name,
      message: data.message,
      consent: data.consent,
      createdAt: data.created_at ? new Date(data.created_at) : null,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return sendJson(res, 400, {
        message: "Invalid input",
        field: err.errors[0]?.path.join("."),
      });
    }

    const storageError = err as StorageError;
    console.error("Waitlist signup failed:", storageError);
    return sendJson(res, 500, { message: "Unable to submit waitlist right now." });
  }
}
