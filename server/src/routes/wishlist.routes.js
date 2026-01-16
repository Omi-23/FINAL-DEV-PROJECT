import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { firebaseAuth } from "../middleware/firebaseAuth.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateBody } from "../middleware/validate.js";

import {
  getMyWishlist,
  removeFromWishlist,
  toggleWishlist,
  toggleWishlistSchema
} from "../controllers/wishlist.controller.js";

export const wishlistRouter = Router();

wishlistRouter.use(firebaseAuth);

wishlistRouter.get("/", requireAuth, asyncHandler(getMyWishlist));
wishlistRouter.post(
  "/toggle",
  requireAuth,
  validateBody(toggleWishlistSchema),
  asyncHandler(toggleWishlist)
);
wishlistRouter.delete(
  "/:productId",
  requireAuth,
  asyncHandler(removeFromWishlist)
);
