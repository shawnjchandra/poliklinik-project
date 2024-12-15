import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import jwt from "jsonwebtoken";

// role : string[]
export const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log("token: "+token);
    if (!token) {
      throw new UnauthorizedError("token not provided");
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);

      if (!allowedRoles.includes(payload.role)) {
        next(new UnauthorizedError("you are not allowed to access this resource"));
      }

      req.user = payload;

      next();
    } catch (err) {
      throw new UnauthorizedError("invalid token");
    }
  };
};
