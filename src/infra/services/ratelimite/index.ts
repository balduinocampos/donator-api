import { rateLimit } from "express-rate-limit";

class RateLimitServices {
  apply() {
    return rateLimit({
      windowMs: 1 * 60 * 1000,
      limit: process.env.API_NODE_ENV === "dev" ? 100 : 15, 
      message: "Try again later",
      standardHeaders: true,
      legacyHeaders: false,
    });
  }
}

export default new RateLimitServices();