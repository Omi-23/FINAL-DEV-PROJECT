import { Router } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { firebaseAuth } from "../middleware/firebaseAuth.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validateBody } from "../middleware/validate.js";

import {
  adminListOrders,
  adminUpdateOrderStatus,
  adminUpdateOrderStatusSchema,
  cancelMyOrder,
  createOrder,
  createOrderSchema,
  getOrderByOrderId,
  getMyOrders,
  updateMyOrder,
  updateMyOrderSchema
} from "../controllers/orders.controller.js";

export const ordersRouter = Router();

ordersRouter.use(firebaseAuth);

ordersRouter.post(
  "/",
  requireAuth,
  validateBody(createOrderSchema),
  asyncHandler(createOrder)
);

ordersRouter.get("/my", requireAuth, asyncHandler(getMyOrders));
ordersRouter.get("/:orderId", requireAuth, asyncHandler(getOrderByOrderId));
ordersRouter.patch(
  "/:orderId",
  requireAuth,
  validateBody(updateMyOrderSchema),
  asyncHandler(updateMyOrder)
);
ordersRouter.delete("/:orderId", requireAuth, asyncHandler(cancelMyOrder));

ordersRouter.get("/", requireAdmin, asyncHandler(adminListOrders));
ordersRouter.patch(
  "/:orderId/status",
  requireAdmin,
  validateBody(adminUpdateOrderStatusSchema),
  asyncHandler(adminUpdateOrderStatus)
);
