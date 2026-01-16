import mongoose from "mongoose";
import { z } from "zod";

import { ApiError } from "../utils/ApiError.js";
import { WishlistItem } from "../models/WishlistItem.js";

function ensureObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid id");
  }
}

export async function getMyWishlist(req, res) {
  const items = await WishlistItem.find({ userId: req.auth.userId })
    .populate("productId")
    .sort({ createdAt: -1 });

  res.json({ ok: true, data: items });
}

export const toggleWishlistSchema = z.object({
  productId: z.string().min(1)
});

export async function toggleWishlist(req, res) {
  ensureObjectId(req.body.productId);

  const existing = await WishlistItem.findOne({
    userId: req.auth.userId,
    productId: req.body.productId
  });

  if (existing) {
    await existing.deleteOne();
    return res.json({ ok: true, data: { inWishlist: false } });
  }

  await WishlistItem.create({
    userId: req.auth.userId,
    productId: req.body.productId
  });

  return res.status(201).json({ ok: true, data: { inWishlist: true } });
}

export async function removeFromWishlist(req, res) {
  const { productId } = req.params;
  ensureObjectId(productId);

  await WishlistItem.deleteOne({ userId: req.auth.userId, productId });
  res.json({ ok: true, data: { removed: true } });
}
