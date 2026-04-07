import mongoose from 'mongoose';

/**
 * RevokedToken Schema
 * Used to store JWTs that have been invalidated (e.g. on logout).
 * Features a TTL index to automatically remove tokens after they expire.
 */
const revokedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // Automatically deletes document at this date
  },
  revokedAt: {
    type: Date,
    default: Date.now,
  },
});

const RevokedToken = mongoose.model('RevokedToken', revokedTokenSchema);

export default RevokedToken;
