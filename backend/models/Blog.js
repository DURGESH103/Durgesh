import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true },
  excerpt:     { type: String, required: true, maxlength: 300 },
  content:     { type: String, required: true },          // markdown
  thumbnail:   { type: String, default: '' },
  tags:        [{ type: String, trim: true }],
  category:    { type: String, trim: true, default: 'General' },
  author:      { type: String, default: 'DK' },
  isPublished: { type: Boolean, default: false },
  views:       { type: Number, default: 0 },
  readTime:    { type: Number, default: 1 },              // minutes
}, { timestamps: true });

// Text index for search
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });

export default mongoose.model('Blog', blogSchema);
