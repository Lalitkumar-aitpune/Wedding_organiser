import Order from "../models/Order.js";

export async function createOrder(req, res) {
  const { selectedShopId, eventDetails, requiredMaterials, totalCost } = req.body;

  if (!selectedShopId || !requiredMaterials?.length) {
    res.status(400);
    throw new Error("selectedShopId and requiredMaterials are required");
  }

  const order = await Order.create({
    user: req.user?._id,
    shop: selectedShopId,
    eventDetails,
    requiredMaterials,
    totalCost: totalCost || 0
  });

  return res.status(201).json({ message: "Order created", order });
}
