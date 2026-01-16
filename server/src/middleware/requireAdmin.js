import { ApiError } from "../utils/ApiError.js";

export function requireAdmin(req, res, next) {
  if (!req.auth) {
    return next(new ApiError(401, "Unauthorized"));
  }
  if (req.auth.role !== "admin") {
    return next(new ApiError(403, "Forbidden"));
  }
  return next();
}
