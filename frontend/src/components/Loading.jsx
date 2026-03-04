import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full mx-auto mb-4"
        />
        <p className="text-gray-400">Loading...</p>
      </motion.div>
    </div>
  );
};

export default Loading;
