import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    key: String,
    label: String,
    enabled: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model('Setting', settingSchema);
