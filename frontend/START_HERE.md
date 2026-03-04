# 🚀 RUN YOUR PORTFOLIO NOW - 3 STEPS

## Step 1: Install Dependencies (Run Once)

Open terminal in `DKPortfolio` folder:

```bash
cd backend
npm install
cd ..
npm install
```

---

## Step 2: Create Admin User (Run Once)

```bash
cd backend
node createAdmin.js
```

You'll see:
```
✅ Admin user created successfully!
📧 Email: admin@portfolio.com
🔑 Password: admin123
```

---

## Step 3: Start Your Portfolio

### Open 2 Terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Wait for:
```
✅ MongoDB Connected
🚀 Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Wait for:
```
  ➜  Local:   http://localhost:5173/
```

---

## ✅ DONE! Access Your Portfolio:

- **Portfolio:** http://localhost:5173
- **Admin Login:** http://localhost:5173/admin/login
  - Email: `admin@portfolio.com`
  - Password: `admin123`

---

## 🎯 Add Your First Project:

1. Go to: http://localhost:5173/admin/login
2. Login with credentials above
3. Click "Add Project"
4. Fill the form
5. Upload images
6. Submit
7. View at: http://localhost:5173/projects

---

## 🔄 Daily Use:

Just run these 2 commands in separate terminals:

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2  
npm run dev
```

---

That's it! Your dynamic portfolio is running! 🎉
