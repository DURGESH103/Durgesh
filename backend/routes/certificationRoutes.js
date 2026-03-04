import express from 'express';
import { createCertification, getAllCertifications, updateCertification, deleteCertification } from '../controllers/certificationController.js';
import { auth } from '../middleware/auth.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.get('/', getAllCertifications);
router.post('/', auth, upload.single('certificateImage'), createCertification);
router.put('/:id', auth, upload.single('certificateImage'), updateCertification);
router.delete('/:id', auth, deleteCertification);

export default router;
