import { Router } from "express";
import {
  addToFavourites,
  getFavourites,
} from "../controllers/playlist.controller.js";

const router = Router();

router.post("/favor", addToFavourites);
router.get("/perfavor", getFavourites);

export default router;
