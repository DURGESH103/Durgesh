# 🎯 Quick Reference Guide

## 📝 Update Your Portfolio in 3 Steps

### Step 1: Open the Data File
```
📁 src/data/portfolioData.js
```

### Step 2: Update Your Information
```javascript
// Personal Info
export const personalInfo = {
  name: 'Your Name',              // ← Change
  email: 'your@email.com',        // ← Change
  // ...
};

// Projects
export const projects = [
  {
    title: 'Your Project',        // ← Change
    description: '...',           // ← Change
    // ...
  }
];

// Social Links
export const socialLinks = [
  { url: 'github.com/YOU' }       // ← Change
];
```

### Step 3: Run & Test
```bash
npm run dev
```

---

## 📂 File Organization

```
WHERE TO FIND EVERYTHING:

Content & Data:
└── src/data/portfolioData.js     ← Update ALL content here

Styling:
├── tailwind.config.cjs           ← Change colors
└── src/index.css                 ← Global styles

Components:
└── src/components/               ← UI components

Pages:
└── src/pages/                    ← Page components

Layout:
└── src/layouts/MainLayout.jsx    ← Consistent layout
```

---

## 🎨 Common Customizations

### Change Brand Color
```javascript
// tailwind.config.cjs
colors: {
  gold: '#C6A972',  // ← Your color here
}
```

### Add a Project
```javascript
// src/data/portfolioData.js
export const projects = [
  // ... existing projects
  {
    id: 5,
    title: 'New Project',
    description: 'Description here',
    image: 'https://...',
    tags: ['React', 'Node.js'],
    github: '#',
    live: '#'
  }
];
```

### Update Stats
```javascript
// src/data/portfolioData.js
export const metrics = [
  { number: '100+', label: 'Projects' },  // ← Change numbers
  { number: '50+', label: 'Clients' },
  // ...
];
```

---

## 🚀 Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview build

# Other
npm run lint         # Check code quality
```

---

## 📋 Checklist Before Deploy

- [ ] Updated personalInfo in portfolioData.js
- [ ] Added real projects
- [ ] Updated social media links
- [ ] Changed profile image URL
- [ ] Updated metrics (projects, clients)
- [ ] Added testimonials
- [ ] Updated tech stack
- [ ] Tested on mobile
- [ ] All links work
- [ ] Changed brand color (optional)

---

## 🆘 Troubleshooting

**Problem**: Page not loading
**Solution**: Check console for errors, ensure all imports are correct

**Problem**: Images not showing
**Solution**: Use full URLs (https://...) in portfolioData.js

**Problem**: Want to add more sections
**Solution**: Create component in src/components/, add to Home.jsx

**Problem**: Need to change navigation
**Solution**: Edit navLinks in portfolioData.js

---

## 📚 Documentation

- `QUICKSTART.md` - Quick setup (5 min)
- `IMPROVEMENTS.md` - What was improved
- `CLEANUP.md` - What was removed
- `SUMMARY.md` - Complete overview
- `README.md` - Full documentation

---

## 🎯 One File to Rule Them All

**Remember**: Almost everything you need to update is in:
```
src/data/portfolioData.js
```

This includes:
- ✅ Personal information
- ✅ Projects
- ✅ Services
- ✅ Testimonials
- ✅ Tech stack
- ✅ Social links
- ✅ Navigation links
- ✅ Metrics/stats

---

**That's it! Your portfolio is ready to customize and deploy! 🚀**
