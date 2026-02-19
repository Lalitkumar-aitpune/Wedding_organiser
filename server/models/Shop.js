import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shopName: { type: String, required: true },
    prices: [
      {
        productName: { type: String, required: true },
        pricePerKg: { type: Number, required: true, min: 0 }
      }
    ]
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
