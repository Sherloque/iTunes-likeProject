import { Router } from "express";
import { getHotChart } from "../controllers/external.controller.js";

const router = Router();

router.get("/hotchart", getHotChart);

export default router;
