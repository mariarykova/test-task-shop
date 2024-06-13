import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        model: String,
        quantity: Number,
        color: String,
        size: String,
        price: Number,
        title: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
