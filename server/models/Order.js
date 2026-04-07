import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: String,
    color: { type: String, enum: ['obsidian', 'pearl', 'cobalt'] },
    battery: { type: String, enum: ['standard', 'long_range'] },
    autopilot: Boolean,
    wheels: { type: String, default: 'standard' },
    interior: { type: String, default: 'obsidian' },
    softwarePackage: { type: String, default: 'basic' },
    price: String,
    userEmail: String,
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
