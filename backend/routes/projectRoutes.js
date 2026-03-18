import express from 'express';
import {
  createProject,
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
  toggleFeatured,
} from '../controllers/projectController.js';
import { auth }    from '../middleware/auth.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { upload }  from '../config/multer.js';

const router = express.Router();

const projectUpload = upload.fields([
  { name: 'featuredImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 },
]);

router.get('/',          getAllProjects);
router.get('/featured',  getFeaturedProjects);          // ← public, no auth
router.get('/:slug',     getProjectBySlug);

router.post('/',         auth, isAdmin, projectUpload, createProject);
router.put('/:id',       auth, isAdmin, projectUpload, updateProject);
router.patch('/:id/featured', auth, isAdmin, toggleFeatured);  // ← instant toggle
router.delete('/:id',    auth, isAdmin, deleteProject);

export default router;
