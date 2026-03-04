import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
  category: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
