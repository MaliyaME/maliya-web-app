import type { Express, NextFunction } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

type StorageError = {
  code?: string;
  message?: string;
  details?: string;
};

function isStorageError(error: unknown): error is StorageError {
  return Boolean(error && typeof error === "object");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.waitlist.signup.path, async (req, res, next: NextFunction) => {
    try {
      const input = api.waitlist.signup.input.parse(req.body);

      // Bot protection: Check honeypot
      if (input.honey && input.honey.length > 0) {
        // Silently fail for bots (return success fake)
        return res.status(201).json({ id: -1, email: input.email, consent: true });
      }

      // Check for existing
      const existing = await storage.getWaitlistSignupByEmail(input.email);
      if (existing) {
        return res.status(409).json({ message: "Email already registered on the waitlist." });
      }

      const signup = await storage.createWaitlistSignup(input);
      res.status(201).json(signup);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid input",
          field: err.errors[0].path.join('.'),
        });
      }
      if (isStorageError(err) && err.code === "23505") {
        return res.status(409).json({ message: "Email already registered on the waitlist." });
      }

      console.error("Waitlist signup failed:", err);
      return res.status(500).json({ message: "Unable to submit waitlist right now." });
    }
  });

  return httpServer;
}
