import { motion } from 'framer-motion';

const DKLogo = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <div className={`${sizes[size]} font-bold tracking-tight flex items-baseline`}>
        {/* D - Modern Serif */}
        <span className="font-serif text-white" style={{ fontFamily: 'Georgia, serif' }}>
          D
        </span>
        
        {/* Separator Dot */}
        <span className="w-1.5 h-1.5 rounded-full bg-[#C6A972] mx-1 mb-2" />
        
        {/* K - Clean Sans-Serif */}
        <span className="font-sans text-[#C6A972]" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
          K
        </span>
      </div>
    </motion.div>
  );
};

export default DKLogo;
