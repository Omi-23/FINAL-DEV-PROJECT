import { ApiError } from "../utils/ApiError.js";

export function notFoundHandler(req, res, next) {
  next(new ApiError(404, `Not Found: ${req.method} ${req.originalUrl}`));
}
