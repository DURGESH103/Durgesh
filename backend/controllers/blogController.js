import Blog from '../models/Blog.js';
import fs from 'fs';

/* ── helpers ─────────────────────────────────────────────── */
const slugify = (title) =>
  title.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const calcReadTime = (content) =>
  Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

const delFile = (p) => { try { if (p && fs.existsSync(p)) fs.unlinkSync(p); } catch {} };

/* ── GET all (public) ────────────────────────────────────── */
export const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 9, tag, category, search, draft } = req.query;
    const query = {};

    const isAdmin = req.user?.role === 'admin';

    if (isAdmin) {
      // Admin: draft=true → only drafts | draft=false → only published | omitted → ALL
      if (draft === 'true')  query.isPublished = false;
      if (draft === 'false') query.isPublished = true;
      // no draft param = show everything (no isPublished filter)
    } else {
      // Public: always only published
      query.isPublished = true;
    }

    if (tag)      query.tags     = { $in: [tag] };
    if (category) query.category = category;
    if (search)   query.$text    = { $search: search };

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .select('-content')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      blogs,
      total,
      page:  Number(page),
      pages: Math.ceil(total / limit) || 1,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── GET single by slug ──────────────────────────────────── */
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Only increment views for published posts
    if (blog.isPublished) {
      blog.views += 1;
      await blog.save();
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── GET related blogs ───────────────────────────────────── */
export const getRelatedBlogs = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).select('tags category');
    if (!blog) return res.status(404).json({ message: 'Not found' });

    const related = await Blog.find({
      _id: { $ne: blog._id },
      isPublished: true,
      $or: [{ tags: { $in: blog.tags } }, { category: blog.category }],
    })
      .select('-content')
      .limit(3);

    res.json(related);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── CREATE ──────────────────────────────────────────────── */
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, tags, category, author, isPublished } = req.body;
    if (!title || !excerpt || !content)
      return res.status(400).json({ message: 'title, excerpt and content are required' });

    let slug = slugify(title);
    // ensure unique slug
    const exists = await Blog.findOne({ slug });
    if (exists) slug = `${slug}-${Date.now()}`;

    const thumbnail = req.file ? req.file.path.replace(/\\/g, '/') : '';

    const blog = await Blog.create({
      title, slug, excerpt, content,
      thumbnail,
      tags:        JSON.parse(tags || '[]'),
      category:    category || 'General',
      author:      author   || 'DK',
      isPublished: isPublished === 'true',
      readTime:    calcReadTime(content),
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── UPDATE ──────────────────────────────────────────────── */
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const { title, excerpt, content, tags, category, author, isPublished } = req.body;

    if (title && title !== blog.title) {
      let slug = slugify(title);
      const exists = await Blog.findOne({ slug, _id: { $ne: blog._id } });
      if (exists) slug = `${slug}-${Date.now()}`;
      blog.slug = slug;
    }

    if (title)       blog.title       = title;
    if (excerpt)     blog.excerpt     = excerpt;
    if (content)     { blog.content   = content; blog.readTime = calcReadTime(content); }
    if (tags)        blog.tags        = JSON.parse(tags);
    if (category)    blog.category    = category;
    if (author)      blog.author      = author;
    if (isPublished !== undefined) blog.isPublished = isPublished === 'true';

    if (req.file) {
      delFile(blog.thumbnail);
      blog.thumbnail = req.file.path.replace(/\\/g, '/');
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── TOGGLE PUBLISH ──────────────────────────────────────── */
export const togglePublish = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ isPublished: blog.isPublished });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ── DELETE ──────────────────────────────────────────────── */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    delFile(blog.thumbnail);
    await blog.deleteOne();
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
