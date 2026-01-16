import { ApiError } from "../utils/ApiError.js";

export function validateBody(schema) {
  return function validateBodyMiddleware(req, res, next) {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new ApiError(400, result.error.issues[0]?.message || "Invalid body"));
    }
    req.body = result.data;
    return next();
  };
}
