import multer from 'multer';
import path from 'path';
import fs from 'fs';

const ALLOWED_MIME = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE     = 5 * 1024 * 1024; // 5 MB

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Route-based sub-folder: /api/projects → uploads/projects/, else uploads/
    const folder = req.baseUrl?.includes('projects') ? 'uploads/projects'
                 : req.baseUrl?.includes('gallery')  ? 'uploads/gallery'
                 : req.baseUrl?.includes('blogs')     ? 'uploads/blogs'
                 : 'uploads';
    ensureDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname).toLowerCase());
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, and WebP images are allowed.'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE },
});
