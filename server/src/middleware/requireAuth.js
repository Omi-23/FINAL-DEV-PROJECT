import { ApiError } from "../utils/ApiError.js";

export function requireAuth(req, res, next) {
  if (!req.auth) {
    return next(new ApiError(401, "Unauthorized"));
  }
  return next();
}
