import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAbout } from '../services/api';

const Hero = () => {
  const sectionRef = useRef(null);
  const [resumeLink, setResumeLink] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  useEffect(() => {
    fetchResumeLink();
  }, []);

  const fetchResumeLink = async () => {
    try {
      const { data } = await getAbout();
      if (data.resumeLink) {
        setResumeLink(data.resumeLink);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#0d0d0d] to-[#111111]" />
      <div className="absolute inset-0 noise opacity-40" />
      
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto text-center py-20 sm:py-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12"
        >
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-2 border-gold/40 shadow-[0_0_40px_rgba(198,169,114,0.3)]"
          >
            <img 
              src="/profile.png" 
              alt="DK Portfolio" 
              className="w-full h-full object-cover" 
              loading="eager"
              fetchPriority="high"
            />
          </motion.div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.8 }} 
          className="text-gold text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase mb-6 sm:mb-8 font-light"
        >
          Creative Professional
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8 leading-tight"
        >
          <span className="block font-bold">Web Designer</span>
          <span className="block font-light italic text-gradient mt-2">& Developer</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.7, duration: 0.8 }} 
          className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
        >
          Crafting premium digital experiences with elegant design and cutting-edge technology
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/projects">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#C6A972] to-[#E6C78F] text-[#0d0d0d] font-medium rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(198,169,114,0.5)] text-sm sm:text-base">
              View My Work
            </button>
          </Link>
          {resumeLink && (
            <a href={resumeLink} target="_blank" rel="noopener noreferrer" download>
              <button className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-gold text-gold rounded-full hover:bg-gold hover:text-[#0d0d0d] transition-all duration-300 text-sm sm:text-base">
                <Download className="w-4 h-4" /> Download Resume
              </button>
            </a>
          )}
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: 'reverse' }} 
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gold/60" />
      </motion.div>
    </section>
  );
};

export default Hero;
