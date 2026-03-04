import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const TechStack = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const technologies = [
    { name: 'React', category: 'Frontend', level: 95, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
    { name: 'Node.js', category: 'Backend', level: 90, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
    { name: 'TypeScript', category: 'Language', level: 88, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
    { name: 'MongoDB', category: 'Database', level: 85, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
    { name: 'Tailwind', category: 'Styling', level: 92, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', color: '#06B6D4' },
    { name: 'Figma', category: 'Design', level: 87, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E' },
    { name: 'Git', category: 'Version Control', level: 89, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
    { name: 'AWS', category: 'Cloud', level: 82, logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: '#FF9900' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-[#141414] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium border border-gold/20">
              💻 Skills & Technologies
            </span>
          </motion.div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gold to-white bg-clip-text text-transparent">
            My <span className="text-gold">Expertise</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Crafting digital experiences with cutting-edge technologies and creative design
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group cursor-pointer"
            >
              {/* Card */}
              <div className="glass p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_80px_rgba(198,169,114,0.2)] relative overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${tech.color}, transparent 70%)` }}
                />
                
                {/* Logo with Floating Animation */}
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 flex items-center justify-center relative"
                  animate={hoveredIndex === i ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <img 
                    src={tech.logo} 
                    alt={tech.name} 
                    className="w-full h-full object-contain filter group-hover:drop-shadow-lg transition-all duration-300" 
                  />
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"
                    style={{ backgroundColor: tech.color }}
                  />
                </motion.div>

                {/* Skill Level Circle */}
                <div className="absolute top-4 right-4 w-12 h-12">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                    />
                    <motion.path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={tech.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 100" }}
                      animate={isInView ? { strokeDasharray: `${tech.level} 100` } : { strokeDasharray: "0 100" }}
                      transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span 
                      className="text-xs font-bold text-white"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                    >
                      {tech.level}%
                    </motion.span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center relative z-10">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-gold transition-colors duration-300">
                    {tech.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{tech.category}</p>
                  
                  {/* Skill Bar */}
                  <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: tech.color }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${tech.level}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: i * 0.1 + 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Hover Particles Effect */}
                {hoveredIndex === i && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, particleIndex) => (
                      <motion.div
                        key={particleIndex}
                        className="absolute w-1 h-1 rounded-full"
                        style={{ backgroundColor: tech.color }}
                        initial={{
                          x: Math.random() * 200,
                          y: Math.random() * 200,
                          opacity: 0
                        }}
                        animate={{
                          x: Math.random() * 200,
                          y: Math.random() * 200,
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: particleIndex * 0.2
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold rounded-full"></div>
              <span>5+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>50+ Projects Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Always Learning</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
