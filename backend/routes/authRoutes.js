import express from 'express';
import { login, register, getProfile, updateProfile } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';
import { loginValidation, registerValidation } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;
