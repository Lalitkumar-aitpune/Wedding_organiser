import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    productName: { type: String, required: true },
    pricePerKg: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

productSchema.index({ shop: 1, productName: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
