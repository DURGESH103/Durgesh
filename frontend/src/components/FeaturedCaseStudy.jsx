import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getProjects } from '../services/api';

const FeaturedCaseStudy = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetchFeaturedProject();
  }, []);

  const fetchFeaturedProject = async () => {
    try {
      const { data } = await getProjects();
      const featured = data.find(p => p.featured) || data[0];
      setProject(featured);
    } catch (error) {
      console.error('Error fetching featured project:', error);
    }
  };

  if (!project) return null;

  return (
    <section className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            Featured <span className="text-gold">Case Study</span>
          </h2>
          <p className="text-gray-400 text-lg">A deep dive into my latest project</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <Link to={`/project/${project.slug}`} className="relative group overflow-hidden rounded-2xl">
            <img 
              src={`http://localhost:5000/${project.featuredImage}`} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60" />
          </Link>

          <div>
            <p className="text-gold text-sm tracking-wider uppercase mb-4">{project.category || 'Featured Project'}</p>
            <h3 className="font-serif text-4xl font-bold mb-6">{project.title}</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              {project.shortDescription}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-4 py-2 glass rounded-full text-sm text-gray-300">
                  {tech}
                </span>
              ))}
            </div>

            <Link to={`/project/${project.slug}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-gradient-to-r from-[#C6A972] to-[#E6C78F] text-[#0d0d0d] font-medium rounded-full hover:shadow-[0_0_50px_rgba(198,169,114,0.5)] transition-all duration-300 flex items-center gap-2"
              >
                View Case Study <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudy;
