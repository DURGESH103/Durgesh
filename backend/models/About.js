import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  experienceYears: { type: Number, required: true },
  profileImage: { type: String },
  resumeFile: { type: String },
  resumeLink: { type: String },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String
  }
}, { timestamps: true });

export default mongoose.model('About', aboutSchema);
