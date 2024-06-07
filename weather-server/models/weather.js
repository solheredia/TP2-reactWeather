import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  temperature: { type: Number, required: true },
  conditionText: { type: String, required: true },
  icon: { type: String, required: true },
  searchDate: { type: Date, default: Date.now }
});

export default mongoose.model('Weather', weatherSchema);
