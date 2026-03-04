import { motion } from 'framer-motion';
import { Lightbulb, Palette, Code, Rocket } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Discovery',
      desc: 'Understanding your vision, goals, and requirements'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Design',
      desc: 'Creating beautiful, user-centric interfaces'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Development',
      desc: 'Building robust, scalable solutions'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Launch',
      desc: 'Deploying and optimizing for success'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
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
    <section className="py-24 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            My <span className="text-gold">Process</span>
          </h2>
          <p className="text-gray-400 text-lg">How I bring your ideas to life</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative text-center group"
            >
              <div className="glass p-8 rounded-2xl hover:shadow-[0_20px_60px_rgba(198,169,114,0.15)] transition-all duration-500">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="text-2xl font-bold text-gold mb-2">{i + 1}</div>
                <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-gold transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-gold/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
