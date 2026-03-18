import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Loader2, ExternalLink, Github, Star } from 'lucide-react';
import {
  getProjects, createProject, updateProject,
  deleteProject, toggleFeatured,
} from '../../services/api';
import GalleryUploader from '../../components/GalleryUploader';

const EMPTY_FORM = {
  title: '',
  shortDescription: '',
  fullDescription: '',
  techStack: '',
  liveLink: '',
  githubLink: '',
  category: '',
  status: 'Completed',
  featured: false,
};

const ProjectsManager = () => {
  const [projects, setProjects]             = useState([]);
  const [loading, setLoading]               = useState(true);
  const [showForm, setShowForm]             = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting]         = useState(false);
  const [progress, setProgress]             = useState(0);
  const [togglingId, setTogglingId]         = useState(null); // star spinner

  const [formData, setFormData]             = useState(EMPTY_FORM);
  const [featuredFile, setFeaturedFile]     = useState([]);
  const [existingFeatured, setExistingFeatured] = useState([]);
  const [galleryFiles, setGalleryFiles]     = useState([]);
  const [existingGallery, setExistingGallery]   = useState([]);
  const [removedGallery, setRemovedGallery]     = useState([]);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch {
      alert('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const field = (key) => (e) =>
    setFormData((p) => ({ ...p, [key]: e.target.value }));

  /* ── Toggle featured (instant, no form) ── */
  const handleToggleFeatured = async (id) => {
    setTogglingId(id);
    try {
      const { data } = await toggleFeatured(id);
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, featured: data.featured } : p))
      );
    } catch {
      alert('Failed to update featured status');
    } finally {
      setTogglingId(null);
    }
  };

  /* ── Submit form ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingProject && featuredFile.length === 0) {
      alert('Please select a featured image.');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (k === 'techStack') {
        data.append(k, JSON.stringify(v.split(',').map((t) => t.trim()).filter(Boolean)));
      } else if (k === 'featured') {
        data.append(k, String(v));          // boolean → "true"/"false"
      } else {
        data.append(k, v);
      }
    });

    if (featuredFile[0]) data.append('featuredImage', featuredFile[0]);
    galleryFiles.forEach((f) => data.append('galleryImages', f));

    const keptGallery = existingGallery.filter((_, i) => !removedGallery.includes(i));
    data.append('keepGallery', JSON.stringify(keptGallery));

    setSubmitting(true);
    setProgress(0);
    try {
      const config = {
        onUploadProgress: (e) =>
          setProgress(Math.round((e.loaded * 100) / (e.total || 1))),
      };
      if (editingProject) {
        await updateProject(editingProject._id, data, config);
      } else {
        await createProject(data, config);
      }
      await fetchProjects();
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
      setProgress(0);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects((p) => p.filter((x) => x._id !== id));
    } catch {
      alert('Failed to delete project');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title:            project.title,
      shortDescription: project.shortDescription,
      fullDescription:  project.fullDescription,
      techStack:        project.techStack.join(', '),
      liveLink:         project.liveLink   || '',
      githubLink:       project.githubLink || '',
      category:         project.category   || '',
      status:           project.status     || 'Completed',
      featured:         project.featured   ?? false,
    });
    setExistingFeatured(project.featuredImage ? [project.featuredImage] : []);
    setExistingGallery(project.galleryImages || []);
    setFeaturedFile([]);
    setGalleryFiles([]);
    setRemovedGallery([]);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setFeaturedFile([]);
    setGalleryFiles([]);
    setExistingFeatured([]);
    setExistingGallery([]);
    setRemovedGallery([]);
    setEditingProject(null);
    setShowForm(false);
  };

  const featuredCount = projects.filter((p) => p.featured).length;

  if (loading) return (
    <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
      <Loader2 className="w-5 h-5 animate-spin text-gold" /> Loading projects…
    </div>
  );

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">
            Projects <span className="text-gold">({projects.length})</span>
          </h2>
          {featuredCount > 0 && (
            <p className="text-xs text-gold/70 mt-0.5 flex items-center gap-1">
              <Star className="w-3 h-3 fill-gold/70" />
              {featuredCount} featured case {featuredCount === 1 ? 'study' : 'studies'}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gold text-[#0d0d0d] font-semibold rounded-lg hover:shadow-[0_0_24px_rgba(198,169,114,0.45)] transition-all"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {/* ── Form Modal ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-2xl my-8 overflow-hidden"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-white/[0.07]">
                <h3 className="text-xl font-bold">
                  {editingProject ? 'Edit' : 'Add'} Project
                </h3>
                <button onClick={resetForm} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Upload progress */}
              {submitting && (
                <div className="h-1 bg-white/5">
                  <motion.div
                    className="h-full bg-gold"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
              )}

              <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">
                <input
                  type="text" placeholder="Project Title *"
                  value={formData.title} onChange={field('title')} required
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold/60 placeholder:text-gray-600 transition-colors"
                />
                <textarea
                  placeholder="Short Description *"
                  value={formData.shortDescription} onChange={field('shortDescription')} required rows={2}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold/60 placeholder:text-gray-600 transition-colors resize-none"
                />
                <textarea
                  placeholder="Full Description *"
                  value={formData.fullDescription} onChange={field('fullDescription')} required rows={4}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold/60 placeholder:text-gray-600 transition-colors resize-none"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text" placeholder="Tech Stack (comma-separated) *"
                    value={formData.techStack} onChange={field('techStack')} required
                    className="px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold/60 placeholder:text-gray-600 transition-colors"
                  />
                  <input
                    type="text" placeholder="Category"
                    value={formData.category} onChange={field('category')}
                    className="px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold/60 placeholder:text-gray-600 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="url" placeholder="Live URL"
                    value={formData.liveLink} onChange={field('liveLink')}
                    className="px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold/60 placeholder:text-gray-600 transition-colors"
                  />
                  <input
                    type="url" placeholder="GitHub URL"
                    value={formData.githubLink} onChange={field('githubLink')}
                    className="px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold/60 placeholder:text-gray-600 transition-colors"
                  />
                  <select
                    value={formData.status} onChange={field('status')}
                    className="px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold/60 text-gray-300 transition-colors"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                {/* ── isFeatured toggle ── */}
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, featured: !p.featured }))}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                    formData.featured
                      ? 'bg-gold/10 border-gold/40 text-gold'
                      : 'bg-white/[0.03] border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Star className={`w-4 h-4 ${formData.featured ? 'fill-gold text-gold' : ''}`} />
                    <div className="text-left">
                      <p className="text-sm font-medium">Featured Case Study</p>
                      <p className="text-[11px] opacity-60 mt-0.5">
                        {formData.featured
                          ? 'This project will appear in the Featured section'
                          : 'Mark as featured to highlight on the Projects page'}
                      </p>
                    </div>
                  </div>
                  {/* pill toggle */}
                  <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${
                    formData.featured ? 'bg-gold' : 'bg-white/10'
                  }`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                      formData.featured ? 'left-5' : 'left-0.5'
                    }`} />
                  </div>
                </button>

                <div className="border-t border-white/[0.06] pt-2" />

                <GalleryUploader
                  label="Featured Image *" single
                  files={featuredFile} onChange={setFeaturedFile}
                  existingUrls={existingFeatured}
                  onRemoveExisting={() => setExistingFeatured([])}
                  maxFiles={1}
                />

                <GalleryUploader
                  label="Gallery Images (up to 8)"
                  files={galleryFiles} onChange={setGalleryFiles}
                  existingUrls={existingGallery.filter((_, i) => !removedGallery.includes(i))}
                  onRemoveExisting={(i) => {
                    const kept = existingGallery
                      .map((_, idx) => idx)
                      .filter((idx) => !removedGallery.includes(idx));
                    setRemovedGallery((prev) => [...prev, kept[i]]);
                  }}
                  maxFiles={8}
                />

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit" disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold text-[#0d0d0d] font-semibold rounded-xl hover:shadow-[0_0_24px_rgba(198,169,114,0.4)] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    {submitting
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading {progress}%</>
                      : editingProject ? 'Update Project' : 'Create Project'
                    }
                  </button>
                  <button
                    type="button" onClick={resetForm} disabled={submitting}
                    className="px-6 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-sm hover:bg-white/[0.09] disabled:opacity-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Projects Grid ── */}
      {projects.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No projects yet. Add your first one!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleFeatured={handleToggleFeatured}
              isToggling={togglingId === project._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Project Card ── */
function ProjectCard({ project, onEdit, onDelete, onToggleFeatured, isToggling }) {
  const IMG = (p) => p?.startsWith('http') ? p : `http://localhost:5000/${p}`;
  const isCompleted = project.status?.toLowerCase() === 'completed';

  return (
    <div className={`bg-[#1a1a1a] border rounded-xl overflow-hidden group transition-colors duration-300 ${
      project.featured ? 'border-gold/30' : 'border-white/[0.07]'
    }`}>
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={IMG(project.featuredImage)}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Status badge */}
        {project.status && (
          <span className={`absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
            isCompleted
              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25'
              : 'bg-amber-500/15 text-amber-400 border-amber-500/25'
          }`}>
            {project.status}
          </span>
        )}

        {/* Featured star — top right, always visible */}
        <button
          onClick={() => onToggleFeatured(project._id)}
          disabled={isToggling}
          title={project.featured ? 'Remove from featured' : 'Mark as featured'}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200 ${
            project.featured
              ? 'bg-gold text-black border-gold shadow-[0_0_12px_rgba(198,169,114,0.5)]'
              : 'bg-black/60 backdrop-blur-sm text-white/50 border-white/10 hover:border-gold/50 hover:text-gold'
          }`}
        >
          {isToggling
            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
            : <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-black' : ''}`} />
          }
        </button>

        {/* Gallery count */}
        {project.galleryImages?.length > 0 && (
          <span className="absolute bottom-2 right-2 text-[10px] text-white/70 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
            +{project.galleryImages.length} imgs
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-base truncate flex-1">{project.title}</h3>
          {project.featured && (
            <span className="flex-shrink-0 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 bg-gold/10 text-gold border border-gold/20 rounded-full">
              Featured
            </span>
          )}
        </div>
        <p className="text-gray-400 text-xs mb-3 line-clamp-2">{project.shortDescription}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.techStack?.slice(0, 3).map((t, i) => (
            <span key={i} className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] rounded border border-gold/15">
              {t}
            </span>
          ))}
          {project.techStack?.length > 3 && (
            <span className="px-2 py-0.5 text-[10px] text-gray-500 bg-white/5 rounded">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-gold hover:underline">
              <ExternalLink className="w-3 h-3" /> Live
            </a>
          )}
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-white">
              <Github className="w-3 h-3" /> Code
            </a>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(project)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-500/10 text-blue-400 text-xs rounded-lg hover:bg-blue-500/20 transition-all"
          >
            <Edit className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500/10 text-red-400 text-xs rounded-lg hover:bg-red-500/20 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectsManager;
