import mongoose from "mongoose";
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please input a name"],
    },
    quantity: {
      type: Number,
      required: [true, "Please input a quantity"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Please input a price"],
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema)

export default Product