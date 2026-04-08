import mongoose from 'mongoose';

const utilizationSchema = new mongoose.Schema(
  {
    efficiency: Number,
    consumption: Number,
    distance: Number,
    lastTrip: String,
    stats: [
      {
        label: String,
        value: String,
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model(
  'Utilization',
  utilizationSchema
);
