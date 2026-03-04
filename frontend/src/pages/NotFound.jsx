import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif text-9xl font-bold mb-6 text-gold"
        >
          404
        </motion.h1>
        <h2 className="font-serif text-4xl font-bold mb-6">
          Page <span className="text-gold">Not Found</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-gradient-to-r from-[#C6A972] to-[#E6C78F] text-[#0d0d0d] font-medium rounded-full hover:shadow-[0_0_50px_rgba(198,169,114,0.5)] transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <Home className="w-5 h-5" /> Go Home
            </motion.button>
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-transparent border-2 border-gold text-gold rounded-full hover:bg-gold hover:text-[#0d0d0d] transition-all duration-300 flex items-center gap-2 justify-center"
          >
            <ArrowLeft className="w-5 h-5" /> Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
