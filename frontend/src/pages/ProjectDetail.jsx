import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { getProjectBySlug } from '../services/api';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    try {
      const { data } = await getProjectBySlug(slug);
      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="text-gold text-xl">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Project not found</h2>
          <Link to="/projects" className="text-gold hover:underline">Back to Projects</Link>
        </div>
      </div>
    );
  }

  const allImages = [project.featuredImage, ...project.galleryImages];

  return (
    <>
      <SEO 
        title={`${project.title} - DK Portfolio`}
        description={project.shortDescription}
        keywords={project.techStack.join(', ')}
      />
      
      <section className="pt-32 pb-24 px-6 min-h-screen bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <Link to="/projects" className="inline-flex items-center gap-2 text-gold hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              {project.title}
            </h1>
            <p className="text-gray-400 text-xl mb-8">{project.shortDescription}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-4 py-2 bg-gold/10 text-gold rounded-full">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mb-12">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 glass rounded-full hover:bg-gold/10 transition-all flex items-center gap-2">
                  <Github className="w-5 h-5" /> View Code
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gradient-to-r from-[#C6A972] to-[#E6C78F] text-[#0d0d0d] rounded-full hover:shadow-[0_0_50px_rgba(198,169,114,0.5)] transition-all flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" /> Live Demo
                </a>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <img 
                  src={`http://localhost:5000/${allImages[selectedImage]}`} 
                  alt={project.title}
                  className="w-full rounded-2xl"
                />
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {allImages.map((img, i) => (
                    <img
                      key={i}
                      src={`http://localhost:5000/${img}`}
                      alt={`${project.title} ${i + 1}`}
                      onClick={() => setSelectedImage(i)}
                      className={`w-full aspect-video object-cover rounded-lg cursor-pointer transition-all ${selectedImage === i ? 'ring-2 ring-gold' : 'opacity-50 hover:opacity-100'}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-serif text-3xl font-bold mb-4">About This Project</h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
