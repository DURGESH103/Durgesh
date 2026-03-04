import express from 'express';
import { createGalleryItem, getAllGalleryItems, deleteGalleryItem } from '../controllers/galleryController.js';
import { auth } from '../middleware/auth.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.get('/', getAllGalleryItems);
router.post('/', auth, upload.single('image'), createGalleryItem);
router.delete('/:id', auth, deleteGalleryItem);

export default router;
