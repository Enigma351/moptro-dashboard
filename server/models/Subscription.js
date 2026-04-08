import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    default: 'Enterprise Fleet Capacity'
  },
  price: {
    type: String,
    required: true,
    default: '$499'
  },
  nextPayment: {
    type: String,
    required: true,
    default: 'April 01, 2024'
  },
  paymentMethod: {
    cardType: { type: String, default: 'VISA' },
    last4: { type: String, default: '4242' },
    expiry: { type: String, default: '12/26' }
  },
  previousPlanName: { type: String, default: null },
  previousPrice: { type: String, default: null }
}, { timestamps: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
