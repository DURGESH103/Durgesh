import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, Building } from 'lucide-react';
import SEO from '../components/SEO';
import { getCertifications } from '../services/api';

const CertificationsPage = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const { data } = await getCertifications();
      setCertifications(data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center pt-32">
        <div className="text-gold text-xl">Loading certifications...</div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Certifications - DK Portfolio"
        description="Professional certifications and achievements"
        keywords="certifications, achievements, professional development"
      />
      
      <section className="pt-32 pb-24 px-4 sm:px-6 min-h-screen bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <Award className="w-16 h-16 text-gold mx-auto" />
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              My <span className="text-gold">Certifications</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Professional achievements and credentials
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedCert(cert)}
                className="glass rounded-2xl overflow-hidden hover:shadow-[0_20px_60px_rgba(198,169,114,0.2)] transition-all duration-500 group"
              >
                {/* Certificate Image */}
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gold/10 to-transparent">
                  <img
                    src={`http://localhost:5000/${cert.certificateImage}`}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Click to view</span>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-gold transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gold" />
                      <span>{cert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span>{cert.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {certifications.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No certifications yet</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gold transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="bg-[#111111] rounded-2xl overflow-hidden">
                <img
                  src={`http://localhost:5000/${selectedCert.certificateImage}`}
                  alt={selectedCert.title}
                  className="w-full h-auto"
                />
                <div className="p-6 sm:p-8">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">{selectedCert.title}</h3>
                  <div className="flex flex-wrap gap-6 text-gray-400">
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-gold" />
                      <span>{selectedCert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gold" />
                      <span>{selectedCert.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificationsPage;
