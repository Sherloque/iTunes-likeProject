import { Router } from "express";
import trackRoutes from "./track.routes.js";
import playlistRoutes from "./playlist.routes.js";
import authRoutes from "./auth.routes.js";
import externalRoutes from "./external.routes.js"

const router = Router();

router.use(trackRoutes);
router.use(playlistRoutes);
router.use(authRoutes);
router.use(externalRoutes)

export default router;
