# 🚀 Quick Start Commands

## Initial Setup (Run Once)

### 1. Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..
npm install
```

### 2. Start MongoDB
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud) - update backend/.env with connection string
```

### 3. Create Admin User
```bash
cd backend
node createAdmin.js
# Or manually insert into MongoDB
```

---

## Daily Development

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
✅ Backend running on: http://localhost:5000

### Terminal 2 - Frontend
```bash
npm run dev
```
✅ Frontend running on: http://localhost:5173

---

## Access Points

- **Portfolio:** http://localhost:5173
- **Admin Login:** http://localhost:5173/admin/login
- **Admin Dashboard:** http://localhost:5173/admin/dashboard
- **API:** http://localhost:5000/api

---

## Default Admin Credentials

- **Email:** admin@portfolio.com
- **Password:** admin123

⚠️ Change these in production!

---

## Common Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint
```

---

## File Locations

- **Add Projects:** Admin Dashboard → Projects → Add Project
- **Upload Images:** Stored in `backend/uploads/`
- **Database:** MongoDB (local or Atlas)
- **API Config:** `src/services/api.js`
- **Backend Config:** `backend/.env`

---

## Troubleshooting

**Backend won't start:**
```bash
# Check if MongoDB is running
mongod --version

# Check if port 5000 is free
netstat -ano | findstr :5000
```

**Frontend won't connect:**
```bash
# Verify backend is running
curl http://localhost:5000/api/projects

# Check browser console for errors
```

**Can't login:**
```bash
# Verify admin user exists in MongoDB
# Check JWT_SECRET in backend/.env
```

---

## Next Steps

1. ✅ Start backend and frontend
2. ✅ Login to admin dashboard
3. ✅ Add your first project
4. ✅ View it on the portfolio
5. ✅ Customize and deploy!

---

**Need help?** Check `FULLSTACK_SETUP.md` for detailed instructions.
