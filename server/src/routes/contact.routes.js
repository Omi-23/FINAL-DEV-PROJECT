import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { firebaseAuth } from "../middleware/firebaseAuth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { validateBody } from "../middleware/validate.js";

import {
  adminListContactMessages,
  createContactMessage,
  createContactSchema
} from "../controllers/contact.controller.js";

export const contactRouter = Router();

contactRouter.use(firebaseAuth);

contactRouter.post(
  "/",
  validateBody(createContactSchema),
  asyncHandler(createContactMessage)
);

contactRouter.get("/", requireAdmin, asyncHandler(adminListContactMessages));
