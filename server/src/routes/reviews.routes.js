import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { firebaseAuth } from "../middleware/firebaseAuth.js";

import { listRecentReviews } from "../controllers/reviews.controller.js";

export const reviewsRouter = Router();

reviewsRouter.use(firebaseAuth);

reviewsRouter.get("/recent", asyncHandler(listRecentReviews));
