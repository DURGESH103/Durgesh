# 🚀 Full-Stack Dynamic Portfolio - Setup Guide

## ✨ System Overview

Your portfolio is now a **fully dynamic CMS-based system** with:
- ✅ Backend API (Node.js + Express + MongoDB)
- ✅ Frontend (React + Vite)
- ✅ Image Upload (Multer - Local Storage)
- ✅ JWT Authentication
- ✅ Admin Dashboard
- ✅ CRUD Operations for all content

---

## 📋 Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Git

---

## 🛠️ Installation Steps

### 1️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 2️⃣ Install Frontend Dependencies

```bash
cd ..
npm install
```

### 3️⃣ Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `backend/.env`

### 4️⃣ Configure Environment

Backend `.env` is already created. Update if needed:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
```

### 5️⃣ Create Admin User

Run this script once to create admin:

```bash
cd backend
node -e "
const mongoose = require('mongoose');
const User = require('./models/User.js');
mongoose.connect('mongodb://localhost:27017/portfolio').then(async () => {
  await User.create({ email: 'admin@portfolio.com', password: 'admin123' });
  console.log('Admin created!');
  process.exit();
});
"
```

Or use MongoDB Compass/Shell to insert:
```javascript
db.users.insertOne({
  email: "admin@portfolio.com",
  password: "$2a$10$...", // Will be hashed automatically
  role: "admin"
})
```

---

## 🚀 Running the Application

### Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

### Start Frontend (Terminal 2)
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 🔐 Admin Access

1. Go to: `http://localhost:5173/admin/login`
2. Login with:
   - Email: `admin@portfolio.com`
   - Password: `admin123`
3. Access Dashboard: `http://localhost:5173/admin/dashboard`

---

## 📁 Project Structure

```
DKPortfolio/
├── backend/
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Business logic
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth middleware
│   ├── config/             # Multer config
│   ├── uploads/            # Uploaded images
│   ├── server.js           # Main server
│   └── .env                # Environment variables
│
├── src/
│   ├── components/         # React components
│   ├── pages/             # Page components
│   │   └── admin/         # Admin pages
│   ├── services/          # API calls
│   ├── context/           # Auth context
│   ├── layouts/           # Layout components
│   └── App.jsx            # Main app
│
└── package.json
```

---

## 🔌 API Endpoints

### Public Endpoints
```
GET  /api/projects              # Get all projects
GET  /api/projects/:slug        # Get project by slug
GET  /api/certifications        # Get all certifications
GET  /api/skills                # Get all skills
GET  /api/gallery               # Get gallery items
GET  /api/about                 # Get about info
```

### Protected Endpoints (Require JWT Token)
```
POST   /api/projects            # Create project
PUT    /api/projects/:id        # Update project
DELETE /api/projects/:id        # Delete project

POST   /api/certifications      # Create certification
PUT    /api/certifications/:id  # Update certification
DELETE /api/certifications/:id  # Delete certification

POST   /api/skills              # Create skill
PUT    /api/skills/:id          # Update skill
DELETE /api/skills/:id          # Delete skill

POST   /api/gallery             # Upload gallery image
DELETE /api/gallery/:id         # Delete gallery image

PUT    /api/about               # Update about info
```

### Auth Endpoints
```
POST /api/auth/login            # Admin login
POST /api/auth/register         # Register admin (optional)
```

---

## 📸 Image Upload

Images are stored in `backend/uploads/` folder.

**Access images:**
```
http://localhost:5000/uploads/filename.jpg
```

**Supported formats:** JPG, JPEG, PNG, GIF, WEBP
**Max size:** 5MB per file

---

## 🎯 How to Use Admin Dashboard

### Add New Project
1. Login to admin
2. Go to Projects section
3. Click "Add Project"
4. Fill form:
   - Title (auto-generates slug)
   - Short description
   - Full description
   - Tech stack (comma-separated)
   - Upload featured image
   - Upload gallery images (multiple)
   - Live link
   - GitHub link
5. Submit

### Add Certification
1. Go to Certifications
2. Click "Add Certification"
3. Fill: Title, Issuer, Year
4. Upload certificate image
5. Submit

### Add Skill
1. Go to Skills
2. Click "Add Skill"
3. Fill: Name, Level (0-100), Category
4. Submit

### Upload to Gallery
1. Go to Gallery
2. Click "Upload Image"
3. Fill: Title, Category
4. Upload image
5. Submit

### Update About
1. Go to About
2. Edit bio, experience years
3. Upload profile image
4. Add social links
5. Submit

---

## 🔧 Frontend Integration

All pages now fetch data from API:

**Projects Page:**
```javascript
import { getProjects } from '../services/api';

const { data } = await getProjects();
```

**Project Detail:**
```javascript
import { getProjectBySlug } from '../services/api';

const { data } = await getProjectBySlug(slug);
```

**Certifications:**
```javascript
import { getCertifications } from '../services/api';

const { data } = await getCertifications();
```

---

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. **Create account** on hosting platform
2. **Connect GitHub** repo
3. **Set environment variables:**
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secret_key
   NODE_ENV=production
   ```
4. **Deploy** from `backend` folder

### Frontend Deployment (Vercel/Netlify)

1. **Update API URL** in `src/services/api.js`:
   ```javascript
   const API_URL = 'https://your-backend-url.com/api';
   ```
2. **Build:**
   ```bash
   npm run build
   ```
3. **Deploy** `dist` folder

---

## 🔒 Security Notes

1. **Change JWT_SECRET** in production
2. **Use HTTPS** for production
3. **Enable CORS** only for your domain
4. **Validate all inputs**
5. **Use strong admin password**

---

## 📊 Database Schema

### Project
```javascript
{
  title: String,
  slug: String (unique),
  shortDescription: String,
  fullDescription: String,
  techStack: [String],
  liveLink: String,
  githubLink: String,
  featuredImage: String,
  galleryImages: [String],
  featured: Boolean,
  category: String,
  createdAt: Date
}
```

### Certification
```javascript
{
  title: String,
  issuer: String,
  year: Number,
  certificateImage: String,
  createdAt: Date
}
```

### Skill
```javascript
{
  name: String,
  level: Number (0-100),
  category: String,
  createdAt: Date
}
```

### Gallery
```javascript
{
  title: String,
  image: String,
  category: String,
  createdAt: Date
}
```

### About
```javascript
{
  bio: String,
  experienceYears: Number,
  profileImage: String,
  resumeLink: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String
  }
}
```

---

## 🆘 Troubleshooting

**Backend not starting:**
- Check MongoDB is running
- Verify `.env` file exists
- Check port 5000 is available

**Frontend not connecting:**
- Verify backend is running on port 5000
- Check API_URL in `services/api.js`
- Check browser console for errors

**Images not loading:**
- Verify uploads folder exists
- Check file permissions
- Ensure correct image path in database

**Login not working:**
- Verify admin user exists in database
- Check JWT_SECRET is set
- Clear browser localStorage

---

## ✅ Testing Checklist

- [ ] Backend starts successfully
- [ ] Frontend starts successfully
- [ ] Can login to admin
- [ ] Can create project with images
- [ ] Can view projects on frontend
- [ ] Can view project detail page
- [ ] Can add certification
- [ ] Can add skill
- [ ] Can upload to gallery
- [ ] Can update about section
- [ ] Images display correctly
- [ ] All CRUD operations work

---

## 🎉 You're Done!

Your portfolio is now a **fully dynamic CMS system**!

**Next Steps:**
1. Create admin user
2. Start backend and frontend
3. Login to admin dashboard
4. Add your real projects
5. Customize and deploy

**Admin URL:** `http://localhost:5173/admin/login`
**Portfolio URL:** `http://localhost:5173`

---

Made with ❤️ - Full-Stack Dynamic Portfolio System
