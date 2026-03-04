import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import SEO from '../components/SEO';
import { getProjects } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="text-gold text-xl">Loading projects...</div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Projects - DK Portfolio"
        description="Explore my portfolio of web design and development projects showcasing modern technologies and creative solutions."
        keywords="web projects, portfolio, case studies, web development projects"
      />
      
      <section className="pt-32 pb-24 px-6 min-h-screen bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="font-serif text-6xl md:text-7xl font-bold mb-6">
              My <span className="text-gold">Projects</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A collection of {projects.length} projects showcasing my skills and expertise
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="glass rounded-2xl overflow-hidden group hover:shadow-[0_20px_60px_rgba(198,169,114,0.15)] transition-all duration-500"
              >
                <Link to={`/project/${project.slug}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={`http://localhost:5000/${project.featuredImage}`} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                </Link>
                
                <div className="p-8">
                  <Link to={`/project/${project.slug}`}>
                    <h3 className="font-serif text-2xl font-semibold mb-3 group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, j) => (
                      <span key={j} className="px-3 py-1 bg-gold/10 text-gold text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-gold transition-colors">
                        <Github className="w-4 h-4" /> Code
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-gold transition-colors">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Projects;
