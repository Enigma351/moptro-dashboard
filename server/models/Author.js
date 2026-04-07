import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  role: { type: String, required: true },
  organization: { type: String, required: true },
  status: { type: String, enum: ['Online', 'Offline'], default: 'Offline' },
  employedDate: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Author', authorSchema);
