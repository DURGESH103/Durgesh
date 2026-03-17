import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Search, X, ArrowRight, Layers, LayoutGrid, List } from 'lucide-react';
import SEO from '../components/SEO';
import { getProjects } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const IMG = (path) => `http://localhost:5000/${path}`;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }
  }),
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [view, setView] = useState('grid'); // 'grid' | 'list'
  const { isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    getProjects()
      .then(({ data }) => setProjects(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach(p => p.techStack?.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, [projects]);

  const filtered = useMemo(() => projects.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.title.toLowerCase().includes(q) || p.shortDescription?.toLowerCase().includes(q);
    const matchFilter = activeFilter === 'All' || p.techStack?.includes(activeFilter);
    return matchSearch && matchFilter;
  }), [projects, search, activeFilter]);

  const bg = isDark ? 'bg-[#0d0d0d]' : 'bg-[#f7f4ef]';
  const text = isDark ? 'text-white' : 'text-[#111]';
  const sub = isDark ? 'text-gray-400' : 'text-gray-500';
  const card = isDark ? 'bg-[#141414] border-white/[0.07]' : 'bg-white border-black/[0.07]';
  const inputBg = isDark ? 'bg-white/[0.05] border-white/10 text-white' : 'bg-black/[0.04] border-black/10 text-[#111]';
  const filterInactive = isDark
    ? 'bg-white/[0.04] text-gray-400 border-white/10 hover:bg-white/[0.08] hover:text-white'
    : 'bg-black/[0.04] text-gray-500 border-black/10 hover:bg-black/[0.08] hover:text-black';

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${bg}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-gold text-xs tracking-[0.3em] uppercase">Loading</p>
      </div>
    </div>
  );

  return (
    <>
      <SEO title="Projects — DK" description="Portfolio of web design and development projects." />

      <div className={`min-h-screen ${bg} ${text} transition-colors duration-300`}>

        {/* ── Hero Banner ── */}
        <div className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* subtle radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/[0.06] rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-gold text-xs tracking-[0.4em] uppercase mb-5 font-light"
            >
              Portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] mb-6"
            >
              My <span className="text-gradient">Projects</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base max-w-lg leading-relaxed ${sub}`}
            >
              {projects.length} carefully crafted projects — from concept to deployment.
            </motion.p>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="px-6 pb-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6"
            >
              {/* Search */}
              <div className={`relative flex items-center rounded-xl border ${inputBg} w-full sm:w-72`}>
                <Search className="absolute left-3.5 w-4 h-4 text-gold/50 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search projects…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-transparent pl-10 pr-9 py-2.5 text-sm outline-none placeholder:text-gray-500"
                />
                {search && (
                  <button onClick={() => setSearch('')} className={`absolute right-3 ${sub} hover:text-gold transition-colors`}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* View toggle */}
              <div className={`flex items-center rounded-xl border p-1 gap-1 ${isDark ? 'bg-white/[0.04] border-white/10' : 'bg-black/[0.04] border-black/10'}`}>
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${view === 'grid' ? 'bg-gold text-black' : `${sub} hover:text-gold`}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${view === 'list' ? 'bg-gold text-black' : `${sub} hover:text-gold`}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Filter pills */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {allTags.slice(0, 10).map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                    activeFilter === tag
                      ? 'bg-gold text-black border-gold shadow-[0_0_16px_rgba(198,169,114,0.35)]'
                      : filterInactive
                  }`}
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">

            {/* Empty state */}
            <AnimatePresence>
              {filtered.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-32 text-center"
                >
                  <Layers className={`w-14 h-14 mb-5 ${isDark ? 'text-white/10' : 'text-black/10'}`} />
                  <p className={`text-lg font-medium mb-2 ${text}`}>No projects found</p>
                  <p className={`text-sm mb-6 ${sub}`}>Try a different search or filter.</p>
                  <button
                    onClick={() => { setSearch(''); setActiveFilter('All'); }}
                    className="px-5 py-2 bg-gold/10 text-gold border border-gold/20 rounded-full text-sm hover:bg-gold/20 transition-colors"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Featured — first project, full width */}
            {filtered.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}
                className="mb-8"
              >
                <FeaturedCard project={filtered[0]} isDark={isDark} card={card} sub={sub} navigate={navigate} />
              </motion.div>
            )}

            {/* Grid / List */}
            <AnimatePresence mode="wait">
              {view === 'grid' ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {filtered.slice(1).map((p, i) => (
                    <motion.div key={p._id} custom={i} variants={fadeUp} initial="hidden" animate="visible">
                      <GridCard project={p} isDark={isDark} card={card} sub={sub} navigate={navigate} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-3"
                >
                  {filtered.slice(1).map((p, i) => (
                    <motion.div key={p._id} custom={i} variants={fadeUp} initial="hidden" animate="visible">
                      <ListCard project={p} isDark={isDark} card={card} sub={sub} navigate={navigate} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer count */}
            {filtered.length > 1 && (
              <p className={`text-center text-xs mt-14 tracking-[0.25em] uppercase ${isDark ? 'text-white/20' : 'text-black/20'}`}>
                {filtered.length} projects · {activeFilter !== 'All' ? activeFilter : 'All categories'}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Featured Card ─────────────────────────────────────── */
function FeaturedCard({ project, isDark, card, sub, navigate }) {
  return (
    <div
      onClick={() => navigate(`/project/${project.slug}`)}
      className={`group relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_24px_64px_rgba(198,169,114,0.12)] hover:border-gold/25 ${card}`}
    >
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        {/* Image side */}
        <div className="relative h-60 md:h-[420px] overflow-hidden">
          <img
            src={IMG(project.featuredImage)}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/30 hidden md:block" />

          {/* Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-gold text-black text-[10px] font-bold tracking-widest uppercase rounded-full">
              Featured
            </span>
          </div>

          {/* Hover links */}
          <div
            className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            onClick={e => e.stopPropagation()}
          >
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-xs rounded-lg hover:bg-black/90 transition-colors">
                <Github className="w-3.5 h-3.5" /> Code
              </a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gold text-black text-xs font-medium rounded-lg hover:bg-[#E6C78F] transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Live
              </a>
            )}
          </div>
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center p-8 md:p-10 xl:p-12">
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-light">Latest Work</p>
          <h2 className={`font-serif text-2xl md:text-3xl xl:text-4xl font-bold leading-tight mb-4 transition-colors duration-300 group-hover:text-gold ${isDark ? 'text-white' : 'text-[#111]'}`}>
            {project.title}
          </h2>
          <p className={`text-sm leading-relaxed mb-7 line-clamp-3 ${sub}`}>
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack?.slice(0, 5).map((t, i) => (
              <span key={i} className="px-2.5 py-1 bg-gold/10 text-gold text-[11px] rounded-md border border-gold/15 font-medium">
                {t}
              </span>
            ))}
            {project.techStack?.length > 5 && (
              <span className={`px-2.5 py-1 text-[11px] rounded-md ${isDark ? 'bg-white/5 text-gray-500' : 'bg-black/5 text-gray-400'}`}>
                +{project.techStack.length - 5} more
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-gold text-sm font-medium">
            <span>View Case Study</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Grid Card ─────────────────────────────────────────── */
function GridCard({ project, isDark, card, sub, navigate }) {
  return (
    <div
      onClick={() => navigate(`/project/${project.slug}`)}
      className={`group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(198,169,114,0.1)] hover:border-gold/20 ${card}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={IMG(project.featuredImage)}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

        {/* Floating action buttons */}
        <div
          className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300"
          onClick={e => e.stopPropagation()}
        >
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
              className="p-2 bg-black/65 backdrop-blur-sm rounded-lg text-white/80 hover:text-gold transition-colors">
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
              className="p-2 bg-gold text-black rounded-lg hover:bg-[#E6C78F] transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className={`font-serif text-base font-bold leading-snug line-clamp-1 transition-colors duration-300 group-hover:text-gold ${isDark ? 'text-white' : 'text-white'}`}>
            {project.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className={`text-xs leading-relaxed line-clamp-2 mb-4 ${sub}`}>
          {project.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack?.slice(0, 2).map((t, i) => (
              <span key={i} className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] rounded border border-gold/15 font-medium">
                {t}
              </span>
            ))}
            {project.techStack?.length > 2 && (
              <span className={`px-2 py-0.5 text-[10px] rounded ${isDark ? 'bg-white/5 text-gray-500' : 'bg-black/5 text-gray-400'}`}>
                +{project.techStack.length - 2}
              </span>
            )}
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-gold opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      </div>
    </div>
  );
}

/* ─── List Card ─────────────────────────────────────────── */
function ListCard({ project, isDark, card, sub, navigate }) {
  return (
    <div
      onClick={() => navigate(`/project/${project.slug}`)}
      className={`group flex items-center gap-5 rounded-2xl border p-4 cursor-pointer transition-all duration-300 hover:border-gold/20 hover:shadow-[0_8px_32px_rgba(198,169,114,0.08)] ${card}`}
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden">
        <img
          src={IMG(project.featuredImage)}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-serif text-base font-bold mb-1 truncate transition-colors duration-300 group-hover:text-gold ${isDark ? 'text-white' : 'text-[#111]'}`}>
          {project.title}
        </h3>
        <p className={`text-xs line-clamp-1 mb-2.5 ${sub}`}>{project.shortDescription}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack?.slice(0, 3).map((t, i) => (
            <span key={i} className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] rounded border border-gold/15 font-medium">
              {t}
            </span>
          ))}
          {project.techStack?.length > 3 && (
            <span className={`px-2 py-0.5 text-[10px] rounded ${isDark ? 'bg-white/5 text-gray-500' : 'bg-black/5 text-gray-400'}`}>
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex-shrink-0 flex items-center gap-2" onClick={e => e.stopPropagation()}>
        {project.githubLink && (
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
            className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-500 hover:text-gold hover:bg-white/5' : 'text-gray-400 hover:text-gold hover:bg-black/5'}`}>
            <Github className="w-4 h-4" />
          </a>
        )}
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-lg text-gold hover:bg-gold/10 transition-colors">
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
      </div>
    </div>
  );
}
