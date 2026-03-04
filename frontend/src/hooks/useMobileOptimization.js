import { useEffect } from 'react';

export const useMobileOptimization = () => {
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Disable hover effects on mobile
      document.body.classList.add('mobile-device');
      
      // Reduce animation complexity
      const style = document.createElement('style');
      style.innerHTML = `
        @media (max-width: 768px) {
          * {
            animation-duration: 0.4s !important;
            transition-duration: 0.25s !important;
          }
          
          .backdrop-blur-xl {
            backdrop-filter: blur(8px) !important;
          }
          
          .backdrop-blur-md {
            backdrop-filter: blur(4px) !important;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Passive event listeners for better scroll performance
      const options = { passive: true };
      document.addEventListener('touchstart', () => {}, options);
      document.addEventListener('touchmove', () => {}, options);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);
};
