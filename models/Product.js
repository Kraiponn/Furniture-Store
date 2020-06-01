import mongoose from "mongoose";
import shortId from "shortid";

// const { String, Number } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a product name"],
  },
  price: {
    type: Number,
    required: [true, "Please add a product price"],
  },
  descript: {
    type: String,
    required: [true, "Please add a descript of product"],
  },
  sku: {
    type: String,
    unique: true,
    default: shortId.generate(),
  },
  mediaUrl: {
    type: String,
    required: [true, "Please add a media url"],
  },
});


// export default mongoose.model('Product', ProductSchema)

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
