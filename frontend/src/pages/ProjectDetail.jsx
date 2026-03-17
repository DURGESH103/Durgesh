import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, ChevronLeft, ChevronRight, X, Calendar, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import { getProjectBySlug } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const IMG = (path) => `http://localhost:5000/${path}`;

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    setLoading(true);
    getProjectBySlug(slug)
      .then(({ data }) => setProject(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0d0d0d]' : 'bg-[#f5f0e8]'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-gold text-sm tracking-widest uppercase">Loading Project</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#0d0d0d] text-white' : 'bg-[#f5f0e8] text-[#1a1a1a]'}`}>
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="text-3xl font-bold mb-3">Project not found</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>This project doesn't exist or was removed.</p>
          <Link to="/projects" className="text-gold hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [project.featuredImage, ...(project.galleryImages || [])].filter(Boolean);

  const prev = () => setSelectedImage(i => (i - 1 + allImages.length) % allImages.length);
  const next = () => setSelectedImage(i => (i + 1) % allImages.length);

  return (
    <>
      <SEO
        title={`${project.title} - DK Portfolio`}
        description={project.shortDescription}
        keywords={project.techStack?.join(', ')}
      />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors">
              <X className="w-7 h-7" />
            </button>
            <button onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={IMG(allImages[selectedImage])}
              alt={project.title}
              className="max-w-5xl max-h-[85vh] w-full object-contain rounded-xl"
              onClick={e => e.stopPropagation()}
            />
            <button onClick={e => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors">
              <ChevronRight className="w-8 h-8" />
            </button>
            <p className="absolute bottom-6 text-white/40 text-sm">{selectedImage + 1} / {allImages.length}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <section className={`min-h-screen pt-28 pb-24 px-6 transition-colors duration-300 ${isDark ? 'bg-[#0d0d0d] text-white' : 'bg-[#f5f0e8] text-[#1a1a1a]'}`}>
        <div className="max-w-7xl mx-auto">

          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/projects" className="inline-flex items-center gap-2 text-gold hover:gap-3 transition-all duration-200 text-sm mb-10 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-12 xl:gap-16">

            {/* LEFT — Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Title */}
              <p className="text-gold text-xs tracking-[0.35em] uppercase mb-3 font-light">Case Study</p>
              <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {project.title}
              </h1>
              <p className={`text-lg leading-relaxed mb-8 max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {project.shortDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-10">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 hover:-translate-y-0.5 ${isDark ? 'border-white/15 text-gray-300 hover:border-white/30 hover:text-white bg-white/5' : 'border-black/15 text-gray-600 hover:border-black/30 hover:text-black bg-black/5'}`}>
                    <Github className="w-4 h-4" /> View Code
                  </a>
                )}
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#C6A972] to-[#E6C78F] text-black rounded-full text-sm font-medium hover:shadow-[0_0_30px_rgba(198,169,114,0.4)] transition-all duration-200 hover:-translate-y-0.5">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>

              {/* Main Image */}
              <div
                className="relative rounded-2xl overflow-hidden cursor-zoom-in mb-4 group"
                onClick={() => setLightbox(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={IMG(allImages[selectedImage])}
                    alt={project.title}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white/0 group-hover:text-white/70 text-xs tracking-widest uppercase transition-all duration-300">
                    Click to expand
                  </span>
                </div>
                {/* Nav arrows */}
                {allImages.length > 1 && (
                  <>
                    <button onClick={e => { e.stopPropagation(); prev(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={e => { e.stopPropagation(); next(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mb-10 overflow-x-auto pb-1">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === i ? 'border-gold shadow-[0_0_12px_rgba(198,169,114,0.4)]' : isDark ? 'border-white/10 opacity-50 hover:opacity-80' : 'border-black/10 opacity-50 hover:opacity-80'}`}
                    >
                      <img src={IMG(img)} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className={`rounded-2xl border p-8 ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
                <h2 className="font-serif text-2xl font-bold mb-5">About This Project</h2>
                <div className={`text-sm leading-8 whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.fullDescription}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Sticky Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-5"
            >
              {/* Tech Stack */}
              <div className={`rounded-2xl border p-6 ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-gold" />
                  <h3 className="text-sm font-semibold tracking-widest uppercase">Tech Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-gold/10 text-gold text-xs rounded-lg border border-gold/20 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className={`rounded-2xl border p-6 space-y-4 ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gold" />
                  <h3 className="text-sm font-semibold tracking-widest uppercase">Details</h3>
                </div>
                {project.category && (
                  <div>
                    <p className={`text-xs uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Category</p>
                    <p className="text-sm font-medium">{project.category}</p>
                  </div>
                )}
                {project.createdAt && (
                  <div>
                    <p className={`text-xs uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Year</p>
                    <p className="text-sm font-medium">{new Date(project.createdAt).getFullYear()}</p>
                  </div>
                )}
                {project.techStack?.length > 0 && (
                  <div>
                    <p className={`text-xs uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Technologies</p>
                    <p className="text-sm font-medium">{project.techStack.length} used</p>
                  </div>
                )}
              </div>

              {/* Links */}
              <div className={`rounded-2xl border p-6 space-y-3 ${isDark ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'}`}>
                <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">Links</h3>
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-[#C6A972] to-[#E6C78F] text-black rounded-xl text-sm font-medium hover:shadow-[0_0_20px_rgba(198,169,114,0.3)] transition-all duration-200 group">
                    <span>Live Demo</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200 group ${isDark ? 'border-white/15 text-gray-300 hover:border-white/30 hover:bg-white/5' : 'border-black/15 text-gray-600 hover:border-black/25 hover:bg-black/5'}`}>
                    <span>Source Code</span>
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Back to projects */}
              <Link to="/projects"
                className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm border transition-all duration-200 ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/20' : 'border-black/10 text-gray-500 hover:text-black hover:border-black/20'}`}>
                <ArrowLeft className="w-4 h-4" /> All Projects
              </Link>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
