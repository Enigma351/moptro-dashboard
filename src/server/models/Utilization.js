import mongoose from 'mongoose';

const utilizationSchema = new mongoose.Schema(
  {
    change: Number,
    chart: [Number],
    stats: [
      {
        label: String,
        value: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model(
  'Utilization',
  utilizationSchema
);
