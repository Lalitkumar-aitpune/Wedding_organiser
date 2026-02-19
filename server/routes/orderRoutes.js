import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/order", asyncHandler(createOrder));

export default router;
