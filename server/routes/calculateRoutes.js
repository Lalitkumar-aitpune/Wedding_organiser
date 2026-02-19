import express from "express";
import { calculate } from "../controllers/calculateController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/calculate", asyncHandler(calculate));

export default router;
