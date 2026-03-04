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
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="glass rounded-xl overflow-hidden group hover:shadow-[0_10px_40px_rgba(198,169,114,0.15)] hover:-translate-y-2 transition-all duration-300"
              >
                <Link to={`/project/${project.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={`http://localhost:5000/${project.featuredImage}`} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </Link>
                
                <div className="p-5">
                  <Link to={`/project/${project.slug}`}>
                    <h3 className="font-serif text-lg font-bold mb-2 group-hover:text-gold transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed line-clamp-2">{project.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack?.slice(0, 3).map((tech, j) => (
                      <span key={j} className="px-2 py-1 bg-gold/10 text-gold text-xs rounded-md">
                        {tech}
                      </span>
                    ))}
                    {project.techStack?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-md">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium transition-colors">
                        <Github className="w-3.5 h-3.5" /> Code
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 rounded-lg text-xs font-medium transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
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
