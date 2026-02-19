import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
    eventDetails: {
      numberOfGuests: Number,
      menuItems: [String],
      eventDate: Date,
      deliveryAddress: String,
      foodPreference: String
    },
    requiredMaterials: [
      {
        product: String,
        quantityKg: Number
      }
    ],
    totalCost: { type: Number, required: true }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
