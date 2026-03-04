import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import SEO from '../components/SEO';
import { getAbout } from '../services/api';

const AboutPage = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const { data } = await getAbout();
      setAbout(data);
    } catch (error) {
      console.error('Error fetching about:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center pt-32">
        <div className="text-gold text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="About - DK Portfolio"
        description={about?.bio || "Learn more about me"}
        keywords="about, biography, experience, background"
      />
      
      <section className="pt-32 pb-24 px-4 sm:px-6 min-h-screen bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              About <span className="text-gold">Me</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Get to know me better
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image & Stats */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Profile Image */}
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="/profile.png"
                    alt="DK Profile"
                    className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass p-6 rounded-xl text-center"
                >
                  <div className="text-4xl font-bold text-gold mb-2">
                    {about?.experienceYears || 5}+
                  </div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="glass p-6 rounded-xl text-center"
                >
                  <div className="text-4xl font-bold text-gold mb-2">50+</div>
                  <div className="text-sm text-gray-400">Projects Done</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Bio */}
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-gold" />
                  My Journey
                </h2>
                <div className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
                  {about?.bio || 'Passionate developer and designer with a love for creating beautiful, functional digital experiences. I specialize in modern web technologies and always strive to deliver high-quality work that exceeds expectations.'}
                </div>
              </div>

              {/* Contact Info */}
              <div className="glass p-6 rounded-xl space-y-4">
                <h3 className="font-serif text-2xl font-bold mb-4">Get In Touch</h3>
                
                {about?.socialLinks?.email && (
                  <div className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors">
                    <Mail className="w-5 h-5 text-gold" />
                    <a href={`mailto:${about.socialLinks.email}`}>{about.socialLinks.email}</a>
                  </div>
                )}
                
                {about?.socialLinks?.phone && (
                  <div className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors">
                    <Phone className="w-5 h-5 text-gold" />
                    <a href={`tel:${about.socialLinks.phone}`}>{about.socialLinks.phone}</a>
                  </div>
                )}
                
                {about?.socialLinks?.location && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-gold" />
                    <span>{about.socialLinks.location}</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {about?.socialLinks && (
                <div className="flex flex-wrap gap-4">
                  {about.socialLinks.github && (
                    <a
                      href={about.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 glass rounded-full hover:bg-gold/10 transition-all duration-300 text-sm"
                    >
                      GitHub
                    </a>
                  )}
                  {about.socialLinks.linkedin && (
                    <a
                      href={about.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 glass rounded-full hover:bg-gold/10 transition-all duration-300 text-sm"
                    >
                      LinkedIn
                    </a>
                  )}
                  {about.socialLinks.twitter && (
                    <a
                      href={about.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 glass rounded-full hover:bg-gold/10 transition-all duration-300 text-sm"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              )}

              {/* Resume Download */}
              {about?.resumeLink && (
                <motion.a
                  href={about.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C6A972] to-[#E6C78F] text-[#0d0d0d] font-medium rounded-full hover:shadow-[0_0_50px_rgba(198,169,114,0.5)] transition-all duration-300"
                >
                  <Download className="w-5 h-5" /> Download Resume
                </motion.a>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
