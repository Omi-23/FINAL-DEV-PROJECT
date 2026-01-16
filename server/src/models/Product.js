import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
