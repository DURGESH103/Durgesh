import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const IMG = (path) =>
  path?.startsWith('http') ? path : `http://localhost:5000/${path}`;

/* ── Tooltip ─────────────────────────────────────────────── */
function Tooltip({ label, children }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1a1a1a] text-white text-[10px] rounded-md whitespace-nowrap border border-white/10 shadow-lg z-50 pointer-events-none">
          {label}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a1a]" />
        </span>
      )}
    </span>
  );
}

/* ── Skeleton ────────────────────────────────────────────── */
export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#141414] overflow-hidden animate-pulse">
      <div className="h-48 bg-white/[0.05]" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/[0.07] rounded w-3/4" />
        <div className="h-3 bg-white/[0.05] rounded w-full" />
        <div className="h-3 bg-white/[0.05] rounded w-2/3" />
        <div className="flex gap-2 pt-1">
          <div className="h-5 w-14 bg-white/[0.05] rounded-md" />
          <div className="h-5 w-14 bg-white/[0.05] rounded-md" />
          <div className="h-5 w-10 bg-white/[0.05] rounded-md" />
        </div>
      </div>
    </div>
  );
}

/* ── Status Badge ────────────────────────────────────────── */
function StatusBadge({ status }) {
  if (!status) return null;
  const isCompleted = status?.toLowerCase() === 'completed';
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border ${
        isCompleted
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      }`}
    >
      {isCompleted ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
      {status}
    </span>
  );
}

/* ── Main ProjectCard ────────────────────────────────────── */
export default function ProjectCard({ project, index = 0 }) {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const cardBg = isDark
    ? 'bg-[#111111]/80 border-white/[0.08]'
    : 'bg-white/80 border-black/[0.08]';
  const sub = isDark ? 'text-gray-400' : 'text-gray-500';
  const titleColor = isDark ? 'text-white' : 'text-[#111]';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.03)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.25s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetTilt}
      onClick={() => navigate(`/project/${project.slug}`)}
      className={`group relative rounded-2xl border overflow-hidden cursor-pointer backdrop-blur-sm ${cardBg}`}
    >
      {/* Gradient border glow on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background:
            'linear-gradient(135deg, rgba(198,169,114,0.18) 0%, transparent 60%)',
          boxShadow: hovered
            ? '0 0 0 1.5px rgba(198,169,114,0.45), 0 20px 60px rgba(198,169,114,0.12)'
            : 'none',
        }}
      />

      {/* ── Image ── */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={IMG(project.featuredImage)}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Shine sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shine-sweep" />

        {/* Image hover overlay */}
        <div className="absolute inset-0 bg-gold/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Status badge — top left */}
        <div className="absolute top-3 left-3 z-20">
          <StatusBadge status={project.status} />
        </div>

        {/* Action buttons — top right, appear on hover */}
        <div
          className="absolute top-3 right-3 flex gap-1.5 z-20 opacity-0 group-hover:opacity-100 -translate-y-1.5 group-hover:translate-y-0 transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {project.githubLink && (
            <Tooltip label="View Code">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-black/70 backdrop-blur-sm text-white/80 hover:text-gold border border-white/10 hover:border-gold/40 transition-all duration-200"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </Tooltip>
          )}
          {project.liveLink && (
            <Tooltip label="Live Demo">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold text-black hover:bg-[#E6C78F] border border-gold/50 transition-all duration-200"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Tooltip>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="relative z-10 p-5">
        {/* Title */}
        <h3
          className={`font-serif text-[15px] font-bold leading-snug line-clamp-2 mb-2 transition-colors duration-300 group-hover:text-gold ${titleColor}`}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className={`text-[12px] leading-relaxed line-clamp-2 mb-4 ${sub}`}>
          {project.shortDescription}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack?.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] rounded-md border border-gold/15 font-medium tracking-wide"
            >
              {t}
            </span>
          ))}
          {project.techStack?.length > 3 && (
            <span
              className={`px-2 py-0.5 text-[10px] rounded-md font-medium ${
                isDark ? 'bg-white/[0.05] text-gray-500' : 'bg-black/[0.05] text-gray-400'
              }`}
            >
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Bottom row */}
        <div
          className={`flex items-center justify-between pt-3.5 border-t ${
            isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'
          }`}
        >
          {/* Links */}
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {project.githubLink && (
              <Tooltip label="GitHub">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-200 ${
                    isDark
                      ? 'text-gray-500 hover:text-gold'
                      : 'text-gray-400 hover:text-gold'
                  }`}
                >
                  <Github className="w-4 h-4" />
                </a>
              </Tooltip>
            )}
            {project.liveLink && (
              <Tooltip label="Live Demo">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-[#E6C78F] transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Tooltip>
            )}
          </div>

          {/* View Details */}
          <span className="flex items-center gap-1 text-[11px] text-gold font-medium opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
            View Details
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
