import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
