import DishRatio from "../models/DishRatio.js";
import { defaultDishRatios } from "./defaultDishRatios.js";

export async function getDishIngredients(dishName) {
  const dbRatio = await DishRatio.findOne({ dishName }).lean();
  if (dbRatio?.ingredients?.length) {
    return dbRatio.ingredients;
  }
  return defaultDishRatios[dishName] || [];
}

export async function calculateRequiredMaterials(menuItems, guestCount) {
  const accumulator = new Map();

  for (const dishName of menuItems) {
    const ingredients = await getDishIngredients(dishName);
    for (const ingredient of ingredients) {
      const current = accumulator.get(ingredient.product) || 0;
      const dishQuantity = ingredient.quantityKgPerPerson * guestCount;
      accumulator.set(ingredient.product, current + dishQuantity);
    }
  }

  return Array.from(accumulator.entries()).map(([product, quantityKg]) => ({
    product,
    quantityKg: Number(quantityKg.toFixed(3))
  }));
}

export function calculateShopComparison(requiredMaterials, shops) {
  const comparison = shops.map((shop) => {
    let totalCost = 0;
    let itemsPriced = 0;

    const priceMap = new Map(shop.prices.map((p) => [p.productName.toLowerCase(), p.pricePerKg]));

    requiredMaterials.forEach((material) => {
      const unitPrice = priceMap.get(material.product.toLowerCase());
      if (typeof unitPrice === "number") {
        itemsPriced += 1;
        totalCost += unitPrice * material.quantityKg;
      }
    });

    return {
      shopId: String(shop._id),
      shopName: shop.shopName,
      totalCost: Number(totalCost.toFixed(2)),
      itemsPriced
    };
  });

  const valid = comparison.filter((entry) => entry.itemsPriced > 0);
  const lowestCostShop = valid.length
    ? valid.reduce((prev, curr) => (curr.totalCost < prev.totalCost ? curr : prev))
    : null;

  return { comparison, lowestCostShop };
}
