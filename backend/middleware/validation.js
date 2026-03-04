import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
];

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

export const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('shortDescription').trim().notEmpty().withMessage('Short description is required'),
  body('fullDescription').trim().notEmpty().withMessage('Full description is required'),
  validate
];

export const skillValidation = [
  body('name').trim().notEmpty().withMessage('Skill name is required'),
  body('level').isInt({ min: 0, max: 100 }).withMessage('Level must be between 0 and 100'),
  validate
];
