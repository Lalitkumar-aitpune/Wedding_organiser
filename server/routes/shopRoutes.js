import express from "express";
import { getShops, updatePrice } from "../controllers/shopController.js";
import { protect, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/shops", getShops);
router.post("/shop/update-price", protect, requireRole("shop", "admin"), updatePrice);

export default router;
