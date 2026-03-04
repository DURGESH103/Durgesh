import { motion } from 'framer-motion';
import { Code2, Palette, Rocket } from 'lucide-react';

const Services = () => {
  const services = [
    { icon: <Palette className="w-8 h-8" />, title: 'UI/UX Design', description: 'Creating intuitive and visually stunning interfaces that captivate users' },
    { icon: <Code2 className="w-8 h-8" />, title: 'Web Development', description: 'Building responsive, performant websites with modern technologies' },
    { icon: <Rocket className="w-8 h-8" />, title: 'Brand Strategy', description: 'Developing cohesive digital identities that resonate with audiences' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
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
            What I <span className="text-gold">Do</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Specialized services tailored to bring your vision to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="glass p-8 rounded-2xl hover:shadow-[0_20px_60px_rgba(198,169,114,0.15)] transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4 group-hover:text-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
