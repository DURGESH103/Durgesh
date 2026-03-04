// Centralized data for easy management and scalability
export const personalInfo = {
  name: 'Your Name',
  title: 'Web Designer & Developer',
  tagline: 'Creative Professional',
  description: 'Crafting premium digital experiences with elegant design and cutting-edge technology',
  email: 'your.email@example.com',
  phone: '+1 234 567 8900',
  location: 'Your City, Country',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'
};

export const metrics = [
  { icon: 'Code2', number: '50+', label: 'Projects Delivered' },
  { icon: 'Users', number: '30+', label: 'Happy Clients' },
  { icon: 'Award', number: '15+', label: 'Awards Won' },
  { icon: 'Briefcase', number: '5+', label: 'Years Experience' }
];

export const services = [
  { 
    icon: 'Palette', 
    title: 'UI/UX Design', 
    description: 'Creating intuitive and visually stunning interfaces that captivate users' 
  },
  { 
    icon: 'Code2', 
    title: 'Web Development', 
    description: 'Building responsive, performant websites with modern technologies' 
  },
  { 
    icon: 'Rocket', 
    title: 'Brand Strategy', 
    description: 'Developing cohesive digital identities that resonate with audiences' 
  }
];

export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Design',
    description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: '#',
    live: '#',
    featured: true
  },
  {
    id: 2,
    title: 'SaaS Dashboard',
    category: 'UI/UX',
    description: 'Modern analytics dashboard with data visualization, user management, and API integrations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Chart.js'],
    github: '#',
    live: '#'
  },
  {
    id: 3,
    title: 'Portfolio CMS',
    category: 'Development',
    description: 'Content management system for creative professionals with drag-and-drop builder.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    tags: ['React', 'Firebase', 'Framer Motion'],
    github: '#',
    live: '#'
  },
  {
    id: 4,
    title: 'Mobile Banking App',
    category: 'Branding',
    description: 'Secure mobile banking interface with biometric authentication and transaction tracking.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
    tags: ['React Native', 'Redux', 'Node.js'],
    github: '#',
    live: '#'
  }
];

export const processSteps = [
  {
    icon: 'Lightbulb',
    title: 'Discovery',
    description: 'Understanding your vision, goals, and requirements'
  },
  {
    icon: 'Palette',
    title: 'Design',
    description: 'Creating beautiful, user-centric interfaces'
  },
  {
    icon: 'Code',
    title: 'Development',
    description: 'Building robust, scalable solutions'
  },
  {
    icon: 'Rocket',
    title: 'Launch',
    description: 'Deploying and optimizing for success'
  }
];

export const technologies = [
  { name: 'React', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'TypeScript', category: 'Language', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'MongoDB', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Tailwind', category: 'Styling', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
  { name: 'Figma', category: 'Design', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Git', category: 'Version Control', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'AWS', category: 'Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' }
];

export const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    text: 'Outstanding work! The attention to detail and creative approach exceeded our expectations.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Founder, DesignHub',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    text: 'Professional, reliable, and incredibly talented. Delivered a stunning website on time.',
    rating: 5
  },
  {
    name: 'Emily Davis',
    role: 'Marketing Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    text: 'Transformed our brand identity with elegant design and seamless functionality.',
    rating: 5
  }
];

export const socialLinks = [
  { name: 'Github', icon: 'Github', url: 'https://github.com/yourusername' },
  { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/in/yourusername' },
  { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/yourusername' },
  { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/yourusername' }
];

export const navLinks = {
  main: [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certifications', path: '/certifications' }
  ],
  dropdown: [
    { name: 'Skills', path: '/skills' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]
};
