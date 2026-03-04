import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getProjects } from '../services/api';

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <section id="work" className="relative py-32 bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-end justify-between flex-wrap gap-4 mb-3">
            <div>
              <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase mb-3">Portfolio</p>
              <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-tight">
                Selected <span className="text-gold">Work</span>
              </h2>
            </div>
            <Link to="/projects">
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-xs text-white/50 hover:text-gold transition-colors"
              >
                View All <ArrowUpRight className="w-3 h-3" />
              </motion.button>
            </Link>
          </div>
          <p className="text-white/40 text-sm max-w-xl">Explore my latest projects showcasing modern web development and design excellence</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to={`/project/${project.slug}`}>
                <div className="group relative h-full">
                  {/* Card */}
                  <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900/40 to-zinc-900/20 border border-white/[0.05] hover:border-gold/20 transition-all duration-500 backdrop-blur-sm">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <motion.img
                        src={`http://localhost:5000/${project.featuredImage}`}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        animate={{ 
                          scale: hoveredIndex === index ? 1.1 : 1,
                          filter: hoveredIndex === index ? 'brightness(1.1)' : 'brightness(1)'
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        loading="lazy"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      
                      {/* Number Badge */}
                      <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-gold">{String(index + 1).padStart(2, '0')}</span>
                      </div>

                      {/* Hover Arrow */}
                      <motion.div
                        animate={{ 
                          opacity: hoveredIndex === index ? 1 : 0,
                          scale: hoveredIndex === index ? 1 : 0.8,
                          rotate: hoveredIndex === index ? 0 : -45
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gold flex items-center justify-center shadow-lg"
                      >
                        <ArrowUpRight className="w-4 h-4 text-black" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Category */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-1 rounded-full bg-gold" />
                        <span className="text-[9px] tracking-[0.2em] text-gold/80 uppercase font-medium">
                          {project.category || 'Development'}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-1">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-4">
                        {project.shortDescription}
                      </p>

                      {/* Tech Stack Pills */}
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 3).map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.05] rounded-full text-[9px] text-white/50 hover:text-white/70 hover:border-white/10 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="px-2.5 py-1 text-[9px] text-white/30">+{project.techStack.length - 3}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Accent Line */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-gold via-gold/50 to-transparent"
                      animate={{ width: hoveredIndex === index ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/projects">
            <button className="group px-8 py-3.5 bg-gradient-to-r from-gold to-[#E6C78F] text-black text-sm font-medium rounded-full hover:shadow-[0_0_40px_rgba(198,169,114,0.4)] transition-all duration-300 flex items-center gap-2 mx-auto">
              <span>Explore All Projects</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
