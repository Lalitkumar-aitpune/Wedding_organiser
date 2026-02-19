import express from "express";
import { getShops, updatePrice } from "../controllers/shopController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/shops", asyncHandler(getShops));
router.post("/shop/update-price", protect, requireRole("shop", "admin"), asyncHandler(updatePrice));

export default router;
