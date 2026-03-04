import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    { title: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023' },
    { title: 'Meta Front-End Developer', issuer: 'Meta', year: '2023' },
    { title: 'Google UX Design Professional', issuer: 'Google', year: '2022' },
    { title: 'Advanced React & Redux', issuer: 'Udemy', year: '2022' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gold">Certifications</span>
          </h2>
          <p className="text-gray-400 text-lg">Professional credentials and achievements</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass p-6 rounded-xl hover:shadow-[0_10px_40px_rgba(198,169,114,0.1)] transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-gold group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-gold transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
                  <p className="text-gold text-sm">{cert.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
