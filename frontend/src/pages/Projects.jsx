import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink, Github, Search, X, ArrowRight,
  Layers, LayoutGrid, List, Star,
} from 'lucide-react';
import SEO from '../components/SEO';
import ProjectCard, { ProjectCardSkeleton } from '../components/ProjectCard';
import { getProjects, getFeaturedProjects } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const IMG = (p) => p?.startsWith('http') ? p : `http://localhost:5000/${p}`;

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Projects() {
  const [projects, setProjects]         = useState([]);
  const [featured, setFeatured]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [view, setView]                 = useState('grid');
  const { isDark } = useTheme();
  const navigate   = useNavigate();

  useEffect(() => {
    Promise.all([getProjects(), getFeaturedProjects()])
      .then(([all, feat]) => {
        setProjects(all.data);
        setFeatured(feat.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => p.techStack?.forEach((t) => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, [projects]);

  // Non-featured projects for the main grid
  const nonFeatured = useMemo(
    () => projects.filter((p) => !p.featured),
    [projects]
  );

  const filtered = useMemo(
    () =>
      nonFeatured.filter((p) => {
        const q = search.toLowerCase();
        const matchSearch =
          p.title.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q);
        const matchFilter =
          activeFilter === 'All' || p.techStack?.includes(activeFilter);
        return matchSearch && matchFilter;
      }),
    [nonFeatured, search, activeFilter]
  );

  /* ── theme tokens ── */
  const bg           = isDark ? 'bg-[#0d0d0d]'              : 'bg-[#f7f4ef]';
  const text         = isDark ? 'text-white'                 : 'text-[#111]';
  const sub          = isDark ? 'text-gray-400'              : 'text-gray-500';
  const card         = isDark ? 'bg-[#141414] border-white/[0.07]' : 'bg-white border-black/[0.07]';
  const inputBg      = isDark ? 'bg-white/[0.05] border-white/10 text-white'   : 'bg-black/[0.04] border-black/10 text-[#111]';
  const filterInactive = isDark
    ? 'bg-white/[0.04] text-gray-400 border-white/10 hover:bg-white/[0.08] hover:text-white'
    : 'bg-black/[0.04] text-gray-500 border-black/10 hover:bg-black/[0.08] hover:text-black';

  return (
    <>
      <SEO
        title="Projects"
        description="Portfolio of web design and development projects by Durgesh Kumar."
      />

      <div className={`min-h-screen ${bg} ${text} transition-colors duration-300`}>

        {/* ── Hero ── */}
        <div className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gold/[0.06] rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative">
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gold text-xs tracking-[0.4em] uppercase mb-5 font-light"
            >
              Portfolio
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] mb-6"
            >
              My <span className="text-gradient">Projects</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-base max-w-lg leading-relaxed ${sub}`}
            >
              {loading
                ? '…'
                : `${projects.length} carefully crafted projects — from concept to deployment.`}
            </motion.p>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            FEATURED CASE STUDIES
        ════════════════════════════════════════════════ */}
        {!loading && featured.length > 0 && (
          <section className="px-6 pb-20">
            <div className="max-w-7xl mx-auto">

              {/* Section label */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-8"
              >
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="text-gold text-xs tracking-[0.35em] uppercase font-medium">
                  Featured Case Studies
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  isDark ? 'border-white/10 text-gray-500' : 'border-black/10 text-gray-400'
                }`}>
                  {featured.length}
                </span>
                <div className={`flex-1 h-px ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'}`} />
              </motion.div>

              {/* Featured cards */}
              <div className="space-y-5">
                {featured.map((project, i) => (
                  <motion.div
                    key={project._id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <FeaturedCaseCard
                      project={project}
                      isDark={isDark}
                      card={card}
                      sub={sub}
                      navigate={navigate}
                      index={i}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ════════════════════════════════════════════════
            ALL PROJECTS — Controls + Grid/List
        ════════════════════════════════════════════════ */}
        <div className="px-6 pb-10">
          <div className="max-w-7xl mx-auto">

            {/* Section label */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-3 mb-8"
              >
                <Layers className={`w-4 h-4 ${isDark ? 'text-white/40' : 'text-black/30'}`} />
                <span className={`text-xs tracking-[0.35em] uppercase font-medium ${isDark ? 'text-white/40' : 'text-black/30'}`}>
                  All Projects
                </span>
                <div className={`flex-1 h-px ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'}`} />
              </motion.div>
            )}

            {/* Search + View toggle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6"
            >
              <div className={`relative flex items-center rounded-xl border ${inputBg} w-full sm:w-72`}>
                <Search className="absolute left-3.5 w-4 h-4 text-gold/50 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search projects…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent pl-10 pr-9 py-2.5 text-sm outline-none placeholder:text-gray-500"
                />
                {search && (
                  <button onClick={() => setSearch('')} className={`absolute right-3 ${sub} hover:text-gold transition-colors`}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex-1" />

              <div className={`flex items-center rounded-xl border p-1 gap-1 ${
                isDark ? 'bg-white/[0.04] border-white/10' : 'bg-black/[0.04] border-black/10'
              }`}>
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {allTags.slice(0, 10).map((tag) => (
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

            {/* Skeleton */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)}
              </div>
            )}

            {!loading && (
              <>
                {/* Empty state */}
                <AnimatePresence>
                  {filtered.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
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

                {/* Grid / List */}
                <AnimatePresence mode="wait">
                  {view === 'grid' ? (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    >
                      {filtered.map((p, i) => (
                        <ProjectCard key={p._id} project={p} index={i} />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col gap-3"
                    >
                      {filtered.map((p, i) => (
                        <ListCard
                          key={p._id} project={p} index={i}
                          isDark={isDark} card={card} sub={sub} navigate={navigate}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {filtered.length > 0 && (
                  <p className={`text-center text-xs mt-14 tracking-[0.25em] uppercase ${isDark ? 'text-white/20' : 'text-black/20'}`}>
                    {filtered.length} projects · {activeFilter !== 'All' ? activeFilter : 'All categories'}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Featured Case Card ─────────────────────────────────── */
function FeaturedCaseCard({ project, isDark, card, sub, navigate, index }) {
  // Alternate layout direction for visual variety
  const flip = index % 2 === 1;

  return (
    <div
      onClick={() => navigate(`/project/${project.slug}`)}
      className={`group relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500
        hover:shadow-[0_24px_64px_rgba(198,169,114,0.14)] hover:border-gold/30 ${card}`}
    >
      {/* Gradient glow overlay */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{ background: 'linear-gradient(135deg, rgba(198,169,114,0.10) 0%, transparent 55%)' }}
      />

      <div className={`grid md:grid-cols-[1.1fr_1fr] ${flip ? 'md:[direction:rtl]' : ''}`}>
        {/* Image */}
        <div className="relative h-60 md:h-[400px] overflow-hidden" style={{ direction: 'ltr' }}>
          <img
            src={IMG(project.featuredImage)}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          {!flip && <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/25 hidden md:block" />}
          {flip  && <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/25 hidden md:block" />}

          {/* Featured badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-gold text-black text-[10px] font-bold tracking-widest uppercase rounded-full">
              <Star className="w-2.5 h-2.5 fill-black" /> Case Study
            </span>
          </div>

          {/* Hover links */}
          <div
            className="absolute bottom-4 left-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-xs rounded-lg hover:bg-black/90 border border-white/10 transition-colors">
                <Github className="w-3.5 h-3.5" /> Code
              </a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gold text-black text-xs font-medium rounded-lg hover:bg-[#E6C78F] transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-8 md:p-10 xl:p-12" style={{ direction: 'ltr' }}>
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-light">
            {project.category || 'Case Study'}
          </p>
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

/* ─── List Card ─────────────────────────────────────────── */
function ListCard({ project, index, isDark, card, sub, navigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => navigate(`/project/${project.slug}`)}
      className={`group flex items-center gap-5 rounded-2xl border p-4 cursor-pointer transition-all duration-300 hover:border-gold/25 hover:shadow-[0_8px_32px_rgba(198,169,114,0.09)] ${card}`}
    >
      <div className="flex-shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden">
        <img
          src={IMG(project.featuredImage)}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

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

      <div className="flex-shrink-0 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
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
    </motion.div>
  );
}
