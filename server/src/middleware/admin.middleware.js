import { authenticate } from "./auth.middleware.js";

export const authorizeAdmin = [
  authenticate,

  (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    next();
  },
];