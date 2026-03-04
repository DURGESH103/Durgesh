import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  techStack: [{ type: String }],
  liveLink: { type: String },
  githubLink: { type: String },
  featuredImage: { type: String, required: true },
  galleryImages: [{ type: String }],
  featured: { type: Boolean, default: false },
  category: { type: String }
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
