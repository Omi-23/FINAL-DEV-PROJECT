import mongoose from "mongoose";
import { z } from "zod";

import { Product } from "../models/Product.js";
import { Review } from "../models/Review.js";
import { ApiError } from "../utils/ApiError.js";

export const createProductSchema = z.object({
  title: z.string().min(1),
  price: z.number().nonnegative(),
  imageUrl: z.string().optional().default(""),
  shortDescription: z.string().optional().default(""),
  description: z.string().optional().default("")
});

export const updateProductSchema = createProductSchema.partial();

function ensureObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid id");
  }
}

export async function listProducts(req, res) {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.json({ ok: true, data: products });
}

export async function getProductDetails(req, res) {
  const { id } = req.params;
  ensureObjectId(id);

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const reviews = await Review.find({ productId: id })
    .populate("userId", "name")
    .sort({ createdAt: -1 })
    .lean();

  const reviewCount = reviews.length;
  const avgRating =
    reviewCount === 0
      ? 0
      : reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviewCount;

  res.json({
    ok: true,
    data: {
      product,
      reviews,
      reviewCount,
      avgRating
    }
  });
}

export async function createProduct(req, res) {
  const created = await Product.create(req.body);
  res.status(201).json({ ok: true, data: created });
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  ensureObjectId(id);

  const updated = await Product.findByIdAndUpdate(id, req.body, {
    new: true
  });

  if (!updated) {
    throw new ApiError(404, "Product not found");
  }

  res.json({ ok: true, data: updated });
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  ensureObjectId(id);

  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(404, "Product not found");
  }

  res.json({ ok: true, data: deleted });
}

export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional().default("")
});

export async function listProductReviews(req, res) {
  const { id } = req.params;
  ensureObjectId(id);

  const reviews = await Review.find({ productId: id })
    .populate("userId", "name")
    .sort({ createdAt: -1 });

  res.json({ ok: true, data: reviews });
}

export async function upsertProductReview(req, res) {
  const { id } = req.params;
  ensureObjectId(id);

  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const userId = req.auth.userId;

  const updated = await Review.findOneAndUpdate(
    { userId, productId: id },
    { $set: { rating: req.body.rating, comment: req.body.comment } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  res.status(201).json({ ok: true, data: updated });
}
