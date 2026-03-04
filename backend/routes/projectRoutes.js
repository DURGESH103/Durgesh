import express from 'express';
import { createProject, getAllProjects, getProjectBySlug, updateProject, deleteProject } from '../controllers/projectController.js';
import { auth } from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', auth, isAdmin, upload.fields([{ name: 'featuredImage', maxCount: 1 }, { name: 'galleryImages', maxCount: 10 }]), createProject);
router.put('/:id', auth, isAdmin, upload.fields([{ name: 'featuredImage', maxCount: 1 }, { name: 'galleryImages', maxCount: 10 }]), updateProject);
router.delete('/:id', auth, isAdmin, deleteProject);

export default router;
