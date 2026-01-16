import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { firebaseAuth } from "../middleware/firebaseAuth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateBody } from "../middleware/validate.js";

import {
  createProduct,
  createProductSchema,
  createReviewSchema,
  deleteProduct,
  getProductDetails,
  listProductReviews,
  listProducts,
  updateProduct,
  updateProductSchema,
  upsertProductReview
} from "../controllers/products.controller.js";

export const productsRouter = Router();

productsRouter.use(firebaseAuth);

productsRouter.get("/", asyncHandler(listProducts));
productsRouter.get("/:id", asyncHandler(getProductDetails));
productsRouter.get("/:id/reviews", asyncHandler(listProductReviews));

productsRouter.post(
  "/:id/reviews",
  requireAuth,
  validateBody(createReviewSchema),
  asyncHandler(upsertProductReview)
);

productsRouter.post(
  "/",
  requireAdmin,
  validateBody(createProductSchema),
  asyncHandler(createProduct)
);

productsRouter.put(
  "/:id",
  requireAdmin,
  validateBody(updateProductSchema),
  asyncHandler(updateProduct)
);

productsRouter.delete("/:id", requireAdmin, asyncHandler(deleteProduct));
