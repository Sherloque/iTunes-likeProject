import { Router } from "express";
import {
  login,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/profile", updateProfile);

export default router;
