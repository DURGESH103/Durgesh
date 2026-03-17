import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  ArrowLeft, Clock, Eye, Calendar, Tag, Share2,
  Linkedin, Twitter, Copy, Check, List, X, BookOpen
} from 'lucide-react';
import SEO from '../components/SEO';
import { getBlogBySlug, getRelatedBlogs } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const IMG = (p) => p ? `http://localhost:5000/${p}` : null;

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [blog, setBlog]         = useState(null);
  const [related, setRelated]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied]     = useState(false);
  const [tocOpen, setTocOpen]   = useState(false);
  const [toc, setToc]           = useState([]);
  const articleRef = useRef(null);

  const bg   = isDark ? 'bg-[#0d0d0d] text-white'         : 'bg-[#f7f4ef] text-[#111]';
  const card = isDark ? 'bg-[#141414] border-white/[0.07]' : 'bg-white border-black/[0.07]';
  const sub  = isDark ? 'text-gray-400' : 'text-gray-500';

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const winH = window.innerHeight;
      const pct = Math.min(100, Math.max(0, ((winH - top) / (height + winH)) * 100));
      setProgress(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [blog]);

  // Fetch blog
  useEffect(() => {
    setLoading(true);
    getBlogBySlug(slug)
      .then(({ data }) => {
        setBlog(data);
        // Build TOC from markdown headings
        const headings = [];
        const lines = data.content.split('\n');
        lines.forEach(line => {
          const m = line.match(/^(#{1,3})\s+(.+)/);
          if (m) headings.push({ level: m[1].length, text: m[2], id: m[2].toLowerCase().replace(/[^a-z0-9]+/g, '-') });
        });
        setToc(headings);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    getRelatedBlogs(slug).then(({ data }) => setRelated(data)).catch(() => {});
  }, [slug]);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(blog?.title || '');

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${bg}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-gold text-xs tracking-[0.3em] uppercase">Loading</p>
      </div>
    </div>
  );

  if (!blog) return (
    <div className={`min-h-screen flex items-center justify-center ${bg}`}>
      <div className="text-center">
        <BookOpen className="w-16 h-16 text-gold/20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3">Article not found</h2>
        <button onClick={() => navigate('/blog')} className="text-gold hover:underline text-sm">← Back to Blog</button>
      </div>
    </div>
  );

  return (
    <>
      <SEO title={`${blog.title} — DK Blog`} description={blog.excerpt} keywords={blog.tags?.join(', ')} />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <motion.div className="h-full bg-gradient-to-r from-gold to-[#E6C78F]" style={{ width: `${progress}%` }} />
      </div>

      <div className={`min-h-screen transition-colors duration-300 ${bg}`}>

        {/* TOC Drawer (mobile) */}
        <AnimatePresence>
          {tocOpen && toc.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setTocOpen(false)}>
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className={`absolute right-0 top-0 bottom-0 w-72 p-6 overflow-y-auto ${isDark ? 'bg-[#141414]' : 'bg-white'}`}
                onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-sm tracking-widest uppercase">Contents</h3>
                  <button onClick={() => setTocOpen(false)} className={sub}><X className="w-4 h-4" /></button>
                </div>
                <TocList toc={toc} isDark={isDark} onClose={() => setTocOpen(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-24">

          {/* Back */}
          <motion.button initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-gold text-sm mb-10 hover:gap-3 transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blog
          </motion.button>

          <div className="grid lg:grid-cols-[1fr_260px] gap-12 xl:gap-16">

            {/* ── Main Article ── */}
            <motion.article ref={articleRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

              {/* Category + Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {blog.category && (
                  <span className="px-3 py-1 bg-gold text-black text-[10px] font-bold tracking-widest uppercase rounded-full">
                    {blog.category}
                  </span>
                )}
                {blog.tags?.map(t => (
                  <span key={t} className="flex items-center gap-1 px-2.5 py-1 bg-gold/10 text-gold text-[10px] rounded-full border border-gold/15 font-medium">
                    <Tag className="w-2.5 h-2.5" />{t}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
                {blog.title}
              </h1>

              {/* Meta row */}
              <div className={`flex flex-wrap items-center gap-5 text-xs mb-8 pb-8 border-b ${isDark ? 'border-white/10' : 'border-black/10'} ${sub}`}>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />
                  {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{blog.readTime} min read</span>
                <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{blog.views} views</span>
                <span className="ml-auto font-medium">{blog.author}</span>

                {/* TOC toggle (mobile) */}
                {toc.length > 0 && (
                  <button onClick={() => setTocOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 text-gold hover:text-[#E6C78F] transition-colors">
                    <List className="w-3.5 h-3.5" /> Contents
                  </button>
                )}
              </div>

              {/* Thumbnail */}
              {IMG(blog.thumbnail) && (
                <div className="rounded-2xl overflow-hidden mb-10">
                  <img src={IMG(blog.thumbnail)} alt={blog.title}
                    className="w-full aspect-video object-cover" loading="lazy" />
                </div>
              )}

              {/* Markdown Content */}
              <div className={`prose-blog ${isDark ? 'prose-dark' : 'prose-light'}`}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ children }) => <h1 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-serif text-3xl font-bold mt-10 mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-serif text-2xl font-bold mt-8 mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 id={String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="font-serif text-xl font-semibold mt-6 mb-2">{children}</h3>,
                    p:  ({ children }) => <p className={`leading-8 mb-5 text-[15px] ${sub}`}>{children}</p>,
                    ul: ({ children }) => <ul className={`list-disc pl-6 mb-5 space-y-1.5 text-[15px] ${sub}`}>{children}</ul>,
                    ol: ({ children }) => <ol className={`list-decimal pl-6 mb-5 space-y-1.5 text-[15px] ${sub}`}>{children}</ol>,
                    li: ({ children }) => <li className="leading-7">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className={`border-l-4 border-gold pl-5 py-1 my-6 italic ${isDark ? 'bg-gold/5 text-gray-300' : 'bg-gold/5 text-gray-600'} rounded-r-xl`}>
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline underline-offset-2">{children}</a>
                    ),
                    img: ({ src, alt }) => (
                      <img src={src} alt={alt} loading="lazy" className="rounded-xl w-full my-6 object-cover" />
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6">
                        <table className={`w-full text-sm border-collapse rounded-xl overflow-hidden ${isDark ? 'border-white/10' : 'border-black/10'}`}>{children}</table>
                      </div>
                    ),
                    th: ({ children }) => <th className={`px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase ${isDark ? 'bg-white/5 text-gray-300' : 'bg-black/5 text-gray-600'}`}>{children}</th>,
                    td: ({ children }) => <td className={`px-4 py-3 border-t text-[13px] ${isDark ? 'border-white/5 text-gray-400' : 'border-black/5 text-gray-600'}`}>{children}</td>,
                    code({ inline, className, children }) {
                      const lang = /language-(\w+)/.exec(className || '')?.[1];
                      if (inline) return (
                        <code className={`px-1.5 py-0.5 rounded text-[13px] font-mono ${isDark ? 'bg-white/10 text-gold' : 'bg-black/8 text-gold'}`}>
                          {children}
                        </code>
                      );
                      return <CodeBlock lang={lang} isDark={isDark}>{String(children).replace(/\n$/, '')}</CodeBlock>;
                    },
                  }}
                >
                  {blog.content}
                </ReactMarkdown>
              </div>

              {/* Share */}
              <div className={`mt-12 pt-8 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                <p className={`text-xs tracking-widest uppercase mb-4 ${sub}`}>Share this article</p>
                <div className="flex flex-wrap gap-3">
                  <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                    target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition-all hover:-translate-y-0.5 ${isDark ? 'border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/5' : 'border-black/10 text-gray-600 hover:border-black/20 hover:bg-black/5'}`}>
                    <Twitter className="w-4 h-4" /> Twitter
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition-all hover:-translate-y-0.5 ${isDark ? 'border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/5' : 'border-black/10 text-gray-600 hover:border-black/20 hover:bg-black/5'}`}>
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                  <button onClick={copyLink}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border border-gold/20 text-gold hover:bg-gold/10 transition-all hover:-translate-y-0.5">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy link'}
                  </button>
                </div>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="mt-16">
                  <p className="text-gold text-xs tracking-[0.35em] uppercase mb-6 font-light">Related Articles</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {related.map(r => (
                      <div key={r._id} onClick={() => navigate(`/blog/${r.slug}`)}
                        className={`group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-[0_12px_32px_rgba(198,169,114,0.1)] ${card}`}>
                        {IMG(r.thumbnail) && (
                          <div className="h-32 overflow-hidden">
                            <img src={IMG(r.thumbnail)} alt={r.title} loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                        )}
                        <div className="p-4">
                          <h4 className={`font-serif text-sm font-bold line-clamp-2 mb-1.5 group-hover:text-gold transition-colors ${isDark ? 'text-white' : 'text-[#111]'}`}>{r.title}</h4>
                          <p className={`text-xs flex items-center gap-1 ${sub}`}><Clock className="w-3 h-3" />{r.readTime} min</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>

            {/* ── Sticky Sidebar (desktop) ── */}
            <motion.aside initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="hidden lg:block">
              <div className="sticky top-28 space-y-5">

                {/* TOC */}
                {toc.length > 0 && (
                  <div className={`rounded-2xl border p-5 ${card}`}>
                    <p className="text-xs tracking-widest uppercase font-semibold mb-4 flex items-center gap-2">
                      <List className="w-3.5 h-3.5 text-gold" /> Contents
                    </p>
                    <TocList toc={toc} isDark={isDark} />
                  </div>
                )}

                {/* Article info */}
                <div className={`rounded-2xl border p-5 space-y-4 ${card}`}>
                  <p className="text-xs tracking-widest uppercase font-semibold">Article Info</p>
                  {[
                    { label: 'Author',    value: blog.author },
                    { label: 'Read time', value: `${blog.readTime} min` },
                    { label: 'Views',     value: blog.views },
                    { label: 'Published', value: new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className={`text-[10px] uppercase tracking-widest mb-0.5 ${sub}`}>{label}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Share */}
                <div className={`rounded-2xl border p-5 ${card}`}>
                  <p className="text-xs tracking-widest uppercase font-semibold mb-4 flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5 text-gold" /> Share
                  </p>
                  <div className="space-y-2">
                    <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                      target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-xs border transition-all ${isDark ? 'border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/5' : 'border-black/10 text-gray-600 hover:bg-black/5'}`}>
                      <Twitter className="w-3.5 h-3.5" /> Share on Twitter
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                      target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-xs border transition-all ${isDark ? 'border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/5' : 'border-black/10 text-gray-600 hover:bg-black/5'}`}>
                      <Linkedin className="w-3.5 h-3.5" /> Share on LinkedIn
                    </a>
                    <button onClick={copyLink}
                      className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-xs border border-gold/20 text-gold hover:bg-gold/10 transition-all">
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied!' : 'Copy link'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Code Block with copy button ── */
function CodeBlock({ lang, isDark, children }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group my-6 rounded-xl overflow-hidden">
      <div className={`flex items-center justify-between px-4 py-2 text-xs font-mono ${isDark ? 'bg-[#1a1a1a] text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
        <span>{lang || 'code'}</span>
        <button onClick={copy} className="flex items-center gap-1.5 hover:text-gold transition-colors">
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={lang || 'text'}
        style={isDark ? oneDark : oneLight}
        customStyle={{ margin: 0, borderRadius: 0, fontSize: '13px', padding: '1.25rem' }}
        showLineNumbers
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

/* ── TOC List ── */
function TocList({ toc, isDark, onClose }) {
  const sub = isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black';
  return (
    <nav className="space-y-1">
      {toc.map((h, i) => (
        <a key={i} href={`#${h.id}`} onClick={onClose}
          className={`block text-xs leading-relaxed transition-colors hover:text-gold ${h.level === 1 ? 'font-semibold' : h.level === 2 ? `pl-3 ${sub}` : `pl-6 ${sub}`}`}>
          {h.text}
        </a>
      ))}
    </nav>
  );
}
