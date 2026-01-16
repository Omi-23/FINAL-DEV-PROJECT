import { ApiError } from "../utils/ApiError.js";

export function errorHandler(err, req, res, next) {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;

  const message =
    err instanceof ApiError
      ? err.message
      : process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message;

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(statusCode).json({
    ok: false,
    message
  });
}
