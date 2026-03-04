# 🎨 DK Portfolio - Modern Web Developer Portfolio

A premium, high-performance portfolio website built with React, Vite, and modern web technologies. Features elegant animations, smooth scrolling, and a fully responsive design.

## ✨ Features

- 🚀 **Fast Performance** - Built with Vite for lightning-fast development and optimized production builds
- 🎭 **Smooth Animations** - Framer Motion & GSAP for fluid, professional animations
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ♿ **Accessible** - WCAG compliant with proper ARIA labels and semantic HTML
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards for better visibility
- 🎨 **Custom Cursor** - Interactive custom cursor for enhanced UX
- 📊 **Scroll Progress** - Visual feedback for page scroll position
- 🌙 **Dark Theme** - Elegant dark design with gold accents
- 🔄 **Lazy Loading** - Code splitting for optimal performance
- 🛡️ **Error Handling** - Error boundaries and 404 page
- 📦 **Centralized Data** - Easy content management through data files

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, GSAP
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Smooth Scroll:** Lenis
- **SEO:** React Helmet Async

## 📁 Project Structure

```
DKPortfolio/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── layouts/         # Layout wrappers
│   ├── hooks/           # Custom React hooks
│   ├── data/            # Centralized data/content
│   ├── utils/           # Utility functions
│   ├── assets/          # Images, fonts, etc.
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
└── package.json         # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dkportfolio.git
   cd dkportfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your configuration

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Configuration

### Customize Content

Edit `src/data/portfolioData.js` to update:
- Personal information
- Projects
- Services
- Testimonials
- Social links
- Tech stack

### Update Styling

- Colors: `tailwind.config.cjs`
- Global styles: `src/index.css`
- Component styles: Individual component files

## 🏗️ Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📦 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy the 'dist' folder
```

## 🎨 Customization Guide

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/data/portfolioData.js`

### Adding New Sections

1. Create component in `src/components/`
2. Import and use in desired page
3. Add data to `src/data/portfolioData.js`

### Changing Colors

Update `tailwind.config.cjs`:
```js
colors: {
  gold: '#C6A972', // Change to your brand color
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- Website: [yourwebsite.com](https://yourwebsite.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons by [Lucide](https://lucide.dev)
- Images from [Unsplash](https://unsplash.com)

---

Made with ❤️ and React
