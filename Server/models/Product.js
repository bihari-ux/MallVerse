import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    imageUrl: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      // Optional for now to avoid breaking existing data, but good to have
    },
    brand: { type: String },
    countInStock: { type: Number, required: true, default: 0 },
    sold: { type: Number, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
