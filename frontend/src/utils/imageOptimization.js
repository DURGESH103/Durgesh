// Image optimization utility
export const optimizeImage = (src, width = 800) => {
  if (!src) return '';
  
  // For local images
  if (src.startsWith('/')) return src;
  
  // For API images
  return src;
};

// Lazy load images with Intersection Observer
export const lazyLoadImage = (imageRef) => {
  if (!imageRef.current) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '50px' }
  );
  
  observer.observe(imageRef.current);
  
  return () => observer.disconnect();
};

// Preload critical images
export const preloadImage = (src) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};
