import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Code2, Server, Database, Wrench, Layers,
  Zap, Globe, GitBranch, Terminal, Cpu,
  Layout, Box, Cloud, Shield, Smartphone,
  BarChart2
} from 'lucide-react';
import SEO from '../components/SEO';
import { getSkills } from '../services/api';
import { useTheme } from '../context/ThemeContext';

/* ── Skill icon map (name → icon + color) ─────────────────── */
const SKILL_META = {
  // Frontend
  'react':        { icon: '⚛️',  color: '#61DAFB' },
  'next.js':      { icon: '▲',   color: '#ffffff' },
  'nextjs':       { icon: '▲',   color: '#ffffff' },
  'vue':          { icon: '💚',  color: '#42b883' },
  'angular':      { icon: '🔴',  color: '#dd0031' },
  'typescript':   { icon: 'TS',  color: '#3178c6' },
  'javascript':   { icon: 'JS',  color: '#f7df1e' },
  'html':         { icon: '🌐',  color: '#e34f26' },
  'css':          { icon: '🎨',  color: '#1572b6' },
  'tailwind':     { icon: '💨',  color: '#38bdf8' },
  'tailwindcss':  { icon: '💨',  color: '#38bdf8' },
  'sass':         { icon: '💅',  color: '#cc6699' },
  'framer':       { icon: '🎭',  color: '#bb4b96' },
  'gsap':         { icon: '🟢',  color: '#88ce02' },
  // Backend
  'node':         { icon: '🟩',  color: '#339933' },
  'node.js':      { icon: '🟩',  color: '#339933' },
  'nodejs':       { icon: '🟩',  color: '#339933' },
  'express':      { icon: '🚂',  color: '#ffffff' },
  'python':       { icon: '🐍',  color: '#3776ab' },
  'django':       { icon: '🎸',  color: '#092e20' },
  'fastapi':      { icon: '⚡',  color: '#009688' },
  'php':          { icon: '🐘',  color: '#777bb4' },
  'java':         { icon: '☕',  color: '#f89820' },
  'go':           { icon: '🐹',  color: '#00add8' },
  'rust':         { icon: '🦀',  color: '#ce422b' },
  // Database
  'mongodb':      { icon: '🍃',  color: '#47a248' },
  'mysql':        { icon: '🐬',  color: '#4479a1' },
  'postgresql':   { icon: '🐘',  color: '#336791' },
  'postgres':     { icon: '🐘',  color: '#336791' },
  'redis':        { icon: '🔴',  color: '#dc382d' },
  'firebase':     { icon: '🔥',  color: '#ffca28' },
  'supabase':     { icon: '⚡',  color: '#3ecf8e' },
  'sqlite':       { icon: '💾',  color: '#003b57' },
  // Tools
  'git':          { icon: '🌿',  color: '#f05032' },
  'github':       { icon: '🐙',  color: '#ffffff' },
  'docker':       { icon: '🐳',  color: '#2496ed' },
  'aws':          { icon: '☁️',  color: '#ff9900' },
  'linux':        { icon: '🐧',  color: '#fcc624' },
  'figma':        { icon: '🎨',  color: '#f24e1e' },
  'vscode':       { icon: '💙',  color: '#007acc' },
  'postman':      { icon: '📮',  color: '#ff6c37' },
  'webpack':      { icon: '📦',  color: '#8dd6f9' },
  'vite':         { icon: '⚡',  color: '#646cff' },
};

const getSkillMeta = (name) => {
  const key = name.toLowerCase().replace(/\s+/g, '');
  return SKILL_META[key] || SKILL_META[name.toLowerCase()] || { icon: name.slice(0, 2).toUpperCase(), color: '#C6A972' };
};

/* ── Category config ──────────────────────────────────────── */
const CATEGORY_CONFIG = {
  Frontend:  { icon: Layout,   gradient: 'from-blue-500/20 to-cyan-500/20',    border: 'border-blue-500/20',   accent: '#61DAFB' },
  Backend:   { icon: Server,   gradient: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/20',  accent: '#339933' },
  Database:  { icon: Database, gradient: 'from-orange-500/20 to-amber-500/20',  border: 'border-orange-500/20', accent: '#47a248' },
  Tools:     { icon: Wrench,   gradient: 'from-purple-500/20 to-pink-500/20',   border: 'border-purple-500/20', accent: '#f24e1e' },
  Design:    { icon: Box,      gradient: 'from-pink-500/20 to-rose-500/20',     border: 'border-pink-500/20',   accent: '#f24e1e' },
  default:   { icon: Code2,    gradient: 'from-gold/20 to-yellow-500/20',       border: 'border-gold/20',       accent: '#C6A972' },
};

const getCatConfig = (cat) => CATEGORY_CONFIG[cat] || CATEGORY_CONFIG.default;

/* ── Animated counter ─────────────────────────────────────── */
function Counter({ to, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Progress bar ─────────────────────────────────────────── */
function ProgressBar({ level, color, isDark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const label =
    level >= 90 ? 'Expert' :
    level >= 75 ? 'Advanced' :
    level >= 55 ? 'Intermediate' : 'Learning';

  return (
    <div ref={ref} className="mt-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className={`text-[10px] tracking-widest uppercase font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {label}
        </span>
        <span className="text-xs font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
        >
          <motion.div
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ── Skill Card with 3D tilt ──────────────────────────────── */
function SkillCard({ skill, index, isDark }) {
  const meta = getSkillMeta(skill.name);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const cardBg = isDark
    ? 'bg-[#141414] border-white/[0.07]'
    : 'bg-white border-black/[0.06] shadow-sm';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      animate={{ rotateX: tilt.y, rotateY: tilt.x }}
      style={{ transformStyle: 'preserve-3d', perspective: 800 }}
      className={`relative rounded-2xl border p-5 cursor-default transition-shadow duration-300 ${cardBg} ${
        hovered ? 'shadow-[0_16px_48px_rgba(198,169,114,0.12)]' : ''
      }`}
    >
      {/* Glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 0%, ${meta.color}12, transparent 70%)` }}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 mb-1" style={{ transform: 'translateZ(20px)' }}>
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0 transition-transform duration-300"
          style={{
            background: `${meta.color}18`,
            border: `1px solid ${meta.color}30`,
            color: meta.color,
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {meta.icon}
        </div>

        {/* Name */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-sm leading-tight truncate transition-colors duration-300 ${
            hovered ? '' : isDark ? 'text-white' : 'text-[#111]'
          }`} style={{ color: hovered ? meta.color : undefined }}>
            {skill.name}
          </h3>
          <p className={`text-[10px] mt-0.5 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            {skill.category}
          </p>
        </div>
      </div>

      <ProgressBar level={skill.level} color={meta.color} isDark={isDark} />
    </motion.div>
  );
}

/* ── Category Section ─────────────────────────────────────── */
function CategorySection({ category, skills, isDark }) {
  const cfg = getCatConfig(category);
  const Icon = cfg.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14"
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${cfg.gradient} border ${cfg.border}`}>
          <Icon className="w-4 h-4" style={{ color: cfg.accent }} />
        </div>
        <h2 className={`font-serif text-xl font-bold ${isDark ? 'text-white' : 'text-[#111]'}`}>
          {category}
        </h2>
        <div className={`flex-1 h-px ${isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'}`} />
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${isDark ? 'bg-white/5 text-gray-400' : 'bg-black/5 text-gray-500'}`}>
          {skills.length} skills
        </span>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {skills.map((skill, i) => (
          <SkillCard key={skill._id} skill={skill} index={i} isDark={isDark} />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main Page ────────────────────────────────────────────── */
export default function SkillsPage() {
  const [skills, setSkills]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeCategory, setActive]   = useState('All');
  const { isDark } = useTheme();

  useEffect(() => {
    getSkills()
      .then(({ data }) => setSkills(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(skills.map(s => s.category))].sort();
    return ['All', ...cats];
  }, [skills]);

  const grouped = useMemo(() => {
    const cats = categories.filter(c => c !== 'All');
    return cats.reduce((acc, cat) => {
      const list = skills.filter(s => s.category === cat);
      if (list.length) acc[cat] = list;
      return acc;
    }, {});
  }, [skills, categories]);

  const filtered = useMemo(() =>
    activeCategory === 'All'
      ? skills
      : skills.filter(s => s.category === activeCategory),
  [skills, activeCategory]);

  // Stats
  const stats = useMemo(() => ({
    total:    skills.length,
    expert:   skills.filter(s => s.level >= 90).length,
    advanced: skills.filter(s => s.level >= 75 && s.level < 90).length,
    cats:     categories.length - 1,
  }), [skills, categories]);

  const bg   = isDark ? 'bg-[#0d0d0d] text-white'         : 'bg-[#f7f4ef] text-[#111]';
  const sub  = isDark ? 'text-gray-400'                    : 'text-gray-500';
  const statCard = isDark ? 'bg-[#141414] border-white/[0.07]' : 'bg-white border-black/[0.07] shadow-sm';

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${bg}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-gold text-xs tracking-[0.3em] uppercase">Loading Skills</p>
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title="Skills — DK Portfolio"
        description="Technical skills, expertise levels, and technologies I work with."
        keywords="skills, expertise, technologies, programming, frontend, backend"
      />

      <div className={`min-h-screen transition-colors duration-300 ${bg}`}>

        {/* ── Hero ── */}
        <div className="relative pt-32 pb-16 px-6 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gold/[0.05] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/[0.04] rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-20 right-10 w-64 h-64 bg-purple-500/[0.04] rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative">
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-gold text-xs tracking-[0.4em] uppercase mb-4 font-light"
            >
              Expertise
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-5"
            >
              My <span className="text-gradient">Skills</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
              className={`text-base max-w-lg leading-relaxed ${sub}`}
            >
              Technologies I've worked with — from pixel-perfect frontends to scalable backends.
            </motion.p>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { label: 'Total Skills',   value: stats.total,    suffix: '+', icon: Zap },
                { label: 'Expert Level',   value: stats.expert,   suffix: '',  icon: BarChart2 },
                { label: 'Advanced',       value: stats.advanced, suffix: '',  icon: Cpu },
                { label: 'Categories',     value: stats.cats,     suffix: '',  icon: Layers },
              ].map(({ label, value, suffix, icon: Icon }) => (
                <div key={label} className={`rounded-2xl border p-5 ${statCard}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-gold" />
                    <p className={`text-[10px] uppercase tracking-widest ${sub}`}>{label}</p>
                  </div>
                  <p className="text-2xl font-bold font-serif text-gold">
                    <Counter to={value} suffix={suffix} />
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="px-6 pb-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map(cat => {
                const cfg = getCatConfig(cat);
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                      isActive
                        ? 'bg-gold text-black border-gold shadow-[0_0_20px_rgba(198,169,114,0.35)]'
                        : isDark
                          ? 'bg-white/[0.04] text-gray-400 border-white/10 hover:bg-white/[0.08] hover:text-white'
                          : 'bg-black/[0.04] text-gray-500 border-black/10 hover:bg-black/[0.08] hover:text-black'
                    }`}
                  >
                    {cat}
                    {cat !== 'All' && (
                      <span className={`ml-1.5 text-[10px] ${isActive ? 'text-black/60' : isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                        {skills.filter(s => s.category === cat).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* ── Skills Content ── */}
        <div className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {activeCategory === 'All' ? (
                <motion.div key="all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {Object.entries(grouped).map(([cat, catSkills]) => (
                    <CategorySection key={cat} category={cat} skills={catSkills} isDark={isDark} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <CategorySection category={activeCategory} skills={filtered} isDark={isDark} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {filtered.length === 0 && !loading && (
              <div className="text-center py-24">
                <Code2 className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-white/10' : 'text-black/10'}`} />
                <p className={`text-sm ${sub}`}>No skills in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
