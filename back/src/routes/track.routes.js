import { Router } from "express";
import multer from "multer";
import {
  uploadTrack,
  getUploadedTracks,
  getRecentUploads,
  search,
} from "../controllers/track.controller.js";

const upload = multer({ dest: "public/track/" });
const router = Router();

router.post("/upload", upload.single("file"), uploadTrack);
router.get("/peruploads", getUploadedTracks);
router.get("/recentuploads", getRecentUploads);
router.get("/search", search);

export default router;
