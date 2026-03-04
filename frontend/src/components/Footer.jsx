import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { getAbout } from '../services/api';

const Footer = () => {
  const [socials, setSocials] = useState([
    { icon: <Github className="w-5 h-5" />, href: '#', name: 'github' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', name: 'linkedin' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', name: 'twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', name: 'instagram' }
  ]);

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const { data } = await getAbout();
      if (data.socialLinks) {
        setSocials(prev => prev.map(s => ({
          ...s,
          href: data.socialLinks[s.name] || '#'
        })));
      }
    } catch (error) {
      console.error('Error fetching social links:', error);
    }
  };

  return (
    <footer className="py-12 px-6 bg-dark-300 border-t border-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="text-2xl font-serif font-bold mb-2">
              <span className="text-gold">D</span>K
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 All rights reserved
            </p>
          </div>

          <div className="flex items-center gap-6">
            {socials.map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#C6A972' }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 hover:text-gold transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
