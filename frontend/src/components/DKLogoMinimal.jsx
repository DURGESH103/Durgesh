import { motion } from 'framer-motion';

const DKLogoMinimal = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-7xl',
    xl: 'text-9xl'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <div className={`${sizes[size]} font-bold relative`}>
        {/* D - Serif with subtle shadow */}
        <span 
          className="font-serif text-white relative z-10" 
          style={{ 
            fontFamily: 'Georgia, serif',
            textShadow: '0 0 40px rgba(198, 169, 114, 0.3)'
          }}
        >
          D
        </span>
        
        {/* K - Sans-serif overlapping */}
        <span 
          className="font-sans text-[#C6A972] -ml-2" 
          style={{ 
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.05em'
          }}
        >
          K
        </span>
      </div>
    </motion.div>
  );
};

export default DKLogoMinimal;
