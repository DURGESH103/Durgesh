import express from 'express';
import jwt from 'jsonwebtoken';
import {
  getAllBlogs, getBlogBySlug, getRelatedBlogs,
  createBlog, updateBlog, deleteBlog, togglePublish,
} from '../controllers/blogController.js';
import { auth } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';
import multer from 'multer';
import path from 'path';

// Thumbnail upload (single image)
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'uploads/'),
  filename:    (_, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Attach user if token present — does NOT block request if missing/invalid
const optionalAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token) {
    try { req.user = jwt.verify(token, process.env.JWT_SECRET); } catch {}
  }
  next();
};

const router = express.Router();

// Public routes (admin gets extra access via optionalAuth)
router.get('/',              optionalAuth, getAllBlogs);
router.get('/:slug/related', getRelatedBlogs);
router.get('/:slug',         getBlogBySlug);

// Admin only
router.post('/',             auth, isAdmin, upload.single('thumbnail'), createBlog);
router.put('/:id',           auth, isAdmin, upload.single('thumbnail'), updateBlog);
router.patch('/:id/publish', auth, isAdmin, togglePublish);
router.delete('/:id',        auth, isAdmin, deleteBlog);

export default router;
