import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const resumeFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = /pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document/.test(file.mimetype);
  
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and DOC files are allowed!'));
  }
};

export const uploadResume = multer({
  storage,
  fileFilter: resumeFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});
