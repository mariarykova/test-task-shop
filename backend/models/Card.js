import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    model: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Good",
      required: true,
    },
    mainPhotoUrl: String,
    hoverPhotoUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Card", CardSchema);
