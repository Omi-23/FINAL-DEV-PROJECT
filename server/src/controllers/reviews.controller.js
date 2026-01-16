import { z } from "zod";

import { Review } from "../models/Review.js";

export const listRecentReviewsQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((v) => {
      const n = Number(v || 10);
      return Number.isFinite(n) ? n : 10;
    })
});

export async function listRecentReviews(req, res) {
  const limit = Math.max(1, Math.min(50, Number(req.query.limit || 10)));

  const reviews = await Review.find({})
    .populate("userId", "name")
    .populate("productId", "title")
    .sort({ createdAt: -1 })
    .limit(limit);

  res.json({ ok: true, data: reviews });
}
