import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { auth } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'profileImage') {
    const imageTypes = /jpeg|jpg|png|gif|webp/;
    const extname = imageTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = imageTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed for profile'));
    }
  } else if (file.fieldname === 'resume') {
    const docTypes = /pdf|doc|docx/;
    const extname = docTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF/DOC files allowed for resume'));
    }
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.get('/', getAbout);
router.put('/', auth, isAdmin, upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), updateAbout);

export default router;
