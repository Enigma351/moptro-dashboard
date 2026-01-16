import mongoose from 'mongoose';

const dashboardOverviewSchema = new mongoose.Schema(
  {
    battery: Number,
    chargingStatus: String,
    chargingTime: String,
    batteryHealth: Number,
    efficiency: Number,
    consumption: Number,
    distance: Number,
  },
  { timestamps: true }
);

export default mongoose.model(
  'DashboardOverview',
  dashboardOverviewSchema
);
