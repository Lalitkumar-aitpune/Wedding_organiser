import Shop from "../models/Shop.js";

export async function updatePrice(req, res) {
  const { productName, pricePerKg } = req.body;

  if (!productName || typeof pricePerKg !== "number") {
    res.status(400);
    throw new Error("productName and numeric pricePerKg are required");
  }

  const shop = await Shop.findOne({ owner: req.user._id });
  if (!shop) {
    res.status(404);
    throw new Error("Shop profile not found for this account");
  }

  const index = shop.prices.findIndex((p) => p.productName.toLowerCase() === productName.toLowerCase());

  if (index >= 0) {
    shop.prices[index].pricePerKg = pricePerKg;
  } else {
    shop.prices.push({ productName, pricePerKg });
  }

  await shop.save();
  return res.json({ message: "Price updated", shop });
}

export async function getShops(req, res) {
  const shops = await Shop.find().select("shopName prices createdAt").lean();
  return res.json({ shops });
}
