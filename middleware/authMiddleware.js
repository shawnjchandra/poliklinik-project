import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { verifyToken } from "../utils/token/token.js";
import { ForbiddenError } from "../errors/ForbiddenError.js";

export const authMiddleware = (authRole) => {
  return async (req, res, next) => {
    if (authRole !== "dokter" && authRole !== "sis-admin" && authRole !== "pet-admin" && authRole !== "perawat" && authRole !== "pasien") {
      return next(new Error("Invalid role"));
    }

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return next(new UnauthorizedError("asuthorization header must be provided"));
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new UnauthorizedError("token not provided"));
    }

    try {
      const payload = verifyToken(token);

      if (payload.role !== authRole) {
        next(new ForbiddenError("you don't have permission"));
      }

      if (Date.now() > payload.expiresIn) {
        next(new UnauthorizedError("expired token"));
      }

      req.user = payload;

      console.log(req.user);
      next();
    } catch (err) {
      throw new UnauthorizedError("invalid token");
    }
  };
};
