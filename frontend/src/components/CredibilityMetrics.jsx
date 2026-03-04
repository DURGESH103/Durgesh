import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Award, Users, Briefcase } from 'lucide-react';
import { getAbout, getProjects } from '../services/api';

const CredibilityMetrics = () => {
  const [metrics, setMetrics] = useState([
    { icon: <Code2 className="w-8 h-8" />, number: '0', label: 'Projects Delivered' },
    { icon: <Users className="w-8 h-8" />, number: '30+', label: 'Happy Clients' },
    { icon: <Award className="w-8 h-8" />, number: '15+', label: 'Awards Won' },
    { icon: <Briefcase className="w-8 h-8" />, number: '0', label: 'Years Experience' }
  ]);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const [aboutRes, projectsRes] = await Promise.all([getAbout(), getProjects()]);
      setMetrics([
        { icon: <Code2 className="w-8 h-8" />, number: `${projectsRes.data.length}+`, label: 'Projects Delivered' },
        { icon: <Users className="w-8 h-8" />, number: '30+', label: 'Happy Clients' },
        { icon: <Award className="w-8 h-8" />, number: '15+', label: 'Awards Won' },
        { icon: <Briefcase className="w-8 h-8" />, number: `${aboutRes.data.experienceYears || 5}+`, label: 'Years Experience' }
      ]);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

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
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {metrics.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="text-gold mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{item.number}</div>
              <div className="text-sm text-gray-400">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CredibilityMetrics;
