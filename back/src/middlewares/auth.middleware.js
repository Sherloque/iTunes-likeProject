import { expressjwt } from "express-jwt";

export const jwtMiddleware = expressjwt({
  secret: "akfr-vfybfr",
  algorithms: ["HS256"],
}).unless({
  path: ["/api/auth/login", "/api/auth/signup", "/api/external/hotchart", "/"],
});
