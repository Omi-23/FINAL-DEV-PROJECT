import { z } from "zod";

import { ContactMessage } from "../models/ContactMessage.js";

export const createContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional().default(""),
  message: z.string().min(1)
});

export async function createContactMessage(req, res) {
  const created = await ContactMessage.create({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    userId: req.auth?.userId
  });

  res.status(201).json({ ok: true, data: created });
}

export async function adminListContactMessages(req, res) {
  const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
  res.json({ ok: true, data: messages });
}
