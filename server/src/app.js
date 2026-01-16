import express from "express";
import cors from "cors";
import morgan from "morgan";

import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";

import { productsRouter } from "./routes/products.routes.js";
import { ordersRouter } from "./routes/orders.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { wishlistRouter } from "./routes/wishlist.routes.js";
import { contactRouter } from "./routes/contact.routes.js";
import { reviewsRouter } from "./routes/reviews.routes.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:5173",
      credentials: true
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/", (req, res) => {
    res.json({ ok: true, name: "smart-ecommerce-server" });
  });

  app.use("/api/products", productsRouter);
  app.use("/api/orders", ordersRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/wishlist", wishlistRouter);
  app.use("/api/contact", contactRouter);
  app.use("/api/reviews", reviewsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
