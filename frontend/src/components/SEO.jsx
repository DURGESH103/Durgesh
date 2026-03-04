import { useEffect } from 'react';

const SEO = ({ 
  title = 'DK Portfolio - Web Designer & Developer',
  description = 'Professional web designer and developer creating premium digital experiences with elegant design and cutting-edge technology.',
  keywords = 'web design, web development, UI/UX, portfolio, react developer'
}) => {
  useEffect(() => {
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords;
      document.head.appendChild(meta);
    }
  }, [title, description, keywords]);

  return null;
};

export default SEO;
