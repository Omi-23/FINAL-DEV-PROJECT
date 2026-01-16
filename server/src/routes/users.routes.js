import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { firebaseAuth } from "../middleware/firebaseAuth.js";
import { requireAuth } from "../middleware/requireAuth.js";

import { getMe } from "../controllers/users.controller.js";

export const usersRouter = Router();

usersRouter.use(firebaseAuth);

usersRouter.get("/me", requireAuth, asyncHandler(getMe));
