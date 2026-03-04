import { motion } from 'framer-motion';

const DKLogoFramed = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { container: 'w-16 h-16', text: 'text-xl' },
    md: { container: 'w-24 h-24', text: 'text-3xl' },
    lg: { container: 'w-32 h-32', text: 'text-5xl' },
    xl: { container: 'w-40 h-40', text: 'text-6xl' }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center justify-center ${className}`}
    >
      {/* Framed Version */}
      <div className={`${sizes[size].container} border border-[#C6A972]/30 rounded-sm flex items-center justify-center relative group hover:border-[#C6A972]/60 transition-colors duration-500`}>
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#C6A972]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#C6A972]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#C6A972]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#C6A972]" />
        
        {/* Letters */}
        <div className={`${sizes[size].text} font-bold tracking-tight flex flex-col items-center leading-none`}>
          <span className="font-serif text-white" style={{ fontFamily: 'Georgia, serif' }}>D</span>
          <div className="w-6 h-px bg-[#C6A972] my-1" />
          <span className="font-sans text-[#C6A972]" style={{ fontFamily: 'Inter, sans-serif' }}>K</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DKLogoFramed;
