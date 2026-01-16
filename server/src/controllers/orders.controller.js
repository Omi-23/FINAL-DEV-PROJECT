import mongoose from "mongoose";
import { z } from "zod";
import { nanoid } from "nanoid";

import { ApiError } from "../utils/ApiError.js";
import { Order } from "../models/Order.js";
import { Product } from "../models/Product.js";

function ensureObjectId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid id");
  }
}

export const createOrderSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1),
  customerName: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  address: z.string().optional().default("")
});

export async function createOrder(req, res) {
  ensureObjectId(req.body.productId);

  const product = await Product.findById(req.body.productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const order = await Order.create({
    orderId: nanoid(10),
    userId: req.auth.userId,
    productId: product._id,
    quantity: req.body.quantity,
    unitPrice: product.price,
    customerName: req.body.customerName || req.auth.name || "",
    customerEmail: req.auth.email || "",
    phone: req.body.phone,
    address: req.body.address
  });

  res.status(201).json({ ok: true, data: order });
}

export async function getMyOrders(req, res) {
  const orders = await Order.find({ userId: req.auth.userId })
    .populate("productId")
    .sort({ createdAt: -1 });

  res.json({ ok: true, data: orders });
}

export async function getOrderByOrderId(req, res) {
  const { orderId } = req.params;

  const order = await Order.findOne({ orderId })
    .populate("productId")
    .populate("userId", "email name role");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  const isOwner = String(order.userId?._id || order.userId) === req.auth.userId;
  const isAdmin = req.auth.role === "admin";

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Forbidden");
  }

  res.json({ ok: true, data: order });
}

export const updateMyOrderSchema = z.object({
  quantity: z.number().int().min(1).optional(),
  phone: z.string().optional(),
  address: z.string().optional()
});

export async function updateMyOrder(req, res) {
  const { orderId } = req.params;

  const order = await Order.findOne({ orderId, userId: req.auth.userId });
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.status !== "pending" && order.status !== "confirmed") {
    throw new ApiError(400, "Order cannot be updated at this stage");
  }

  if (typeof req.body.quantity === "number") order.quantity = req.body.quantity;
  if (typeof req.body.phone === "string") order.phone = req.body.phone;
  if (typeof req.body.address === "string") order.address = req.body.address;

  await order.save();
  res.json({ ok: true, data: order });
}

export async function cancelMyOrder(req, res) {
  const { orderId } = req.params;

  const order = await Order.findOne({ orderId, userId: req.auth.userId });
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.status === "canceled") {
    return res.json({ ok: true, data: order });
  }

  if (order.status === "delivered") {
    throw new ApiError(400, "Delivered order cannot be canceled");
  }

  order.status = "canceled";
  await order.save();

  res.json({ ok: true, data: order });
}

export async function adminListOrders(req, res) {
  const orders = await Order.find({})
    .populate("productId")
    .populate("userId", "email name role")
    .sort({ createdAt: -1 });

  res.json({ ok: true, data: orders });
}

export const adminUpdateOrderStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "canceled"])
});

export async function adminUpdateOrderStatus(req, res) {
  const { orderId } = req.params;

  const order = await Order.findOne({ orderId });
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.status = req.body.status;
  await order.save();

  res.json({ ok: true, data: order });
}
