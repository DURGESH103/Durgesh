import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

const CTA = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = personalInfo.resume;
    link.download = `${personalInfo.name}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass rounded-3xl p-12 md:p-20 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
          
          <div className="relative z-10">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              Ready to Start Your <span className="text-gold">Project?</span>
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Let's collaborate and create something extraordinary together
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#C6A972] to-[#E6C78F] text-[#0d0d0d] font-medium rounded-full hover:shadow-[0_0_50px_rgba(198,169,114,0.5)] transition-all duration-300 flex items-center gap-2 justify-center"
                >
                  Get In Touch <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <motion.button
                onClick={handleDownloadResume}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-transparent border-2 border-gold text-gold rounded-full hover:bg-gold hover:text-[#0d0d0d] transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Download className="w-5 h-5" /> Download Resume
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
