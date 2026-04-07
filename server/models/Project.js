import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  budget: { type: String, required: true },
  status: { type: String, enum: ['Working', 'Done', 'Canceled'], default: 'Working' },
  completion: { type: Number, min: 0, max: 100, default: 0 },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
