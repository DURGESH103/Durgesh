import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, Eye, Tag, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import { getBlogs } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const IMG = (p) => {
  if (!p) return null;
  if (p.startsWith('http')) return p;
  return `http://localhost:5000/${p}`;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

export default function BlogList() {
  const [data, setData]           = useState({ blogs: [], total: 0, pages: 1 });
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [allTags, setAllTags]     = useState([]);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const bg   = isDark ? 'bg-[#0d0d0d] text-white'       : 'bg-[#f7f4ef] text-[#111]';
  const card = isDark ? 'bg-[#141414] border-white/[0.07]' : 'bg-white border-black/[0.07]';
  const sub  = isDark ? 'text-gray-400' : 'text-gray-500';
  const inputCls = isDark ? 'bg-white/[0.05] border-white/10 text-white' : 'bg-black/[0.04] border-black/10 text-[#111]';

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await getBlogs({ page, limit: 9, search, tag: activeTag });
      setData(res);
      // Load all tags once on first fetch (no filters)
      if (!tagsLoaded) {
        const { data: allRes } = await getBlogs({ limit: 100 });
        const tags = new Set();
        allRes.blogs.forEach(b => b.tags?.forEach(t => tags.add(t)));
        setAllTags([...tags]);
        setTagsLoaded(true);
      }
    } catch (e) {
      console.error('Blog fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, [page, search, activeTag, tagsLoaded]);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setSearchParams({ page: 1 });
  };

  const setPage = (p) => setSearchParams({ page: p });

  return (
    <>
      <SEO title="Blog — DK" description="Articles on web development, design, and technology." />

      <div className={`min-h-screen transition-colors duration-300 ${bg}`}>

        {/* Hero */}
        <div className="relative pt-32 pb-16 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gold/[0.06] rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
              className="text-gold text-xs tracking-[0.4em] uppercase mb-4 font-light">
              Writing
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="font-serif text-5xl md:text-7xl font-bold mb-5 leading-tight">
              The <span className="text-gradient">Blog</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
              className={`text-base max-w-md leading-relaxed ${sub}`}>
              Thoughts on development, design systems, and building things that matter.
            </motion.p>
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 pb-8">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className={`relative flex items-center rounded-xl border flex-1 max-w-md ${inputCls}`}>
                <Search className="absolute left-3.5 w-4 h-4 text-gold/50 pointer-events-none" />
                <input
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="Search articles…"
                  className="w-full bg-transparent pl-10 pr-9 py-2.5 text-sm outline-none placeholder:text-gray-500"
                />
                {searchInput && (
                  <button type="button" onClick={() => { setSearchInput(''); setSearch(''); }}
                    className={`absolute right-3 ${sub} hover:text-gold transition-colors`}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button type="submit"
                className="px-5 py-2.5 bg-gold text-black text-sm font-medium rounded-xl hover:bg-[#E6C78F] transition-colors">
                Search
              </button>
            </form>

            {/* Tags */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setActiveTag(''); setSearchParams({ page: 1 }); }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    !activeTag ? 'bg-gold text-black border-gold' : isDark ? 'bg-white/[0.04] text-gray-400 border-white/10 hover:text-white' : 'bg-black/[0.04] text-gray-500 border-black/10 hover:text-black'
                  }`}>
                  All
                </button>
                {allTags.map(tag => (
                  <button key={tag}
                    onClick={() => { setActiveTag(tag); setSearchParams({ page: 1 }); }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      activeTag === tag ? 'bg-gold text-black border-gold' : isDark ? 'bg-white/[0.04] text-gray-400 border-white/10 hover:text-white' : 'bg-black/[0.04] text-gray-500 border-black/10 hover:text-black'
                    }`}>
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`rounded-2xl border overflow-hidden animate-pulse ${card}`}>
                    <div className={`h-48 ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />
                    <div className="p-5 space-y-3">
                      <div className={`h-4 rounded ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />
                      <div className={`h-3 rounded w-3/4 ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />
                    </div>
                  </div>
                ))}
              </div>
            ) : data.blogs.length === 0 ? (
              <div className="flex flex-col items-center py-32 text-center">
                <BookOpen className={`w-14 h-14 mb-5 ${isDark ? 'text-white/10' : 'text-black/10'}`} />
                <p className="text-lg font-medium mb-2">No articles found</p>
                <p className={`text-sm ${sub}`}>Try a different search or tag.</p>
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${page}-${search}-${activeTag}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                  >
                    {data.blogs.map((blog, i) => (
                      <motion.div key={blog._id} custom={i} variants={fadeUp} initial="hidden" animate="visible">
                        <BlogCard blog={blog} isDark={isDark} card={card} sub={sub} navigate={navigate} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {data.pages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-14">
                    <button onClick={() => setPage(page - 1)} disabled={page === 1}
                      className={`p-2 rounded-xl border transition-all disabled:opacity-30 ${isDark ? 'border-white/10 hover:border-white/20 text-gray-400 hover:text-white' : 'border-black/10 hover:border-black/20 text-gray-500 hover:text-black'}`}>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {[...Array(data.pages)].map((_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)}
                        className={`w-9 h-9 rounded-xl text-sm font-medium border transition-all ${
                          page === i + 1 ? 'bg-gold text-black border-gold' : isDark ? 'border-white/10 text-gray-400 hover:text-white' : 'border-black/10 text-gray-500 hover:text-black'
                        }`}>
                        {i + 1}
                      </button>
                    ))}
                    <button onClick={() => setPage(page + 1)} disabled={page === data.pages}
                      className={`p-2 rounded-xl border transition-all disabled:opacity-30 ${isDark ? 'border-white/10 hover:border-white/20 text-gray-400 hover:text-white' : 'border-black/10 hover:border-black/20 text-gray-500 hover:text-black'}`}>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function BlogCard({ blog, isDark, card, sub, navigate }) {
  return (
    <div
      onClick={() => navigate(`/blog/${blog.slug}`)}
      className={`group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(198,169,114,0.1)] hover:border-gold/20 ${card}`}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        {IMG(blog.thumbnail) ? (
          <img src={IMG(blog.thumbnail)} alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-white/[0.03]' : 'bg-black/[0.03]'}`}>
            <BookOpen className="w-10 h-10 text-gold/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {blog.category && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-gold text-black text-[10px] font-bold tracking-wider uppercase rounded-full">
            {blog.category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className={`font-serif text-base font-bold leading-snug mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-gold ${isDark ? 'text-white' : 'text-[#111]'}`}>
          {blog.title}
        </h3>
        <p className={`text-xs leading-relaxed line-clamp-2 mb-4 ${sub}`}>{blog.excerpt}</p>

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {blog.tags.slice(0, 3).map(t => (
              <span key={t} className="flex items-center gap-1 px-2 py-0.5 bg-gold/10 text-gold text-[10px] rounded border border-gold/15 font-medium">
                <Tag className="w-2.5 h-2.5" />{t}
              </span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className={`flex items-center gap-4 text-[11px] ${sub}`}>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime} min read</span>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{blog.views} views</span>
          <span className="ml-auto">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}
