import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    product: { type: String, required: true },
    quantityKgPerPerson: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const dishRatioSchema = new mongoose.Schema(
  {
    dishName: { type: String, required: true, unique: true },
    ingredients: [ingredientSchema]
  },
  { timestamps: true }
);

const DishRatio = mongoose.model("DishRatio", dishRatioSchema);
export default DishRatio;
