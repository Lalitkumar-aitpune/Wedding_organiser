import Shop from "../models/Shop.js";
import { calculateRequiredMaterials, calculateShopComparison } from "../utils/calculateMaterials.js";

export async function calculate(req, res) {
  const { numberOfGuests, menuItems, eventDate, deliveryAddress, foodPreference } = req.body;

  if (!numberOfGuests || !Array.isArray(menuItems) || !menuItems.length) {
    res.status(400);
    throw new Error("numberOfGuests and menuItems are required");
  }

  const requiredMaterials = await calculateRequiredMaterials(menuItems, numberOfGuests);
  const shops = await Shop.find().lean();
  const { comparison, lowestCostShop } = calculateShopComparison(requiredMaterials, shops);

  return res.json({
    requiredMaterials,
    shopComparison: comparison,
    lowestCostShop,
    eventMeta: {
      numberOfGuests,
      eventDate,
      deliveryAddress,
      foodPreference
    }
  });
}
