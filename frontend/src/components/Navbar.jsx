import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import DKLogo from './DKLogo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainLinks = [
    { name: 'Home',           path: '/' },
    { name: 'Projects',        path: '/projects' },
    { name: 'Certifications',  path: '/certifications' },
    { name: 'Blog',            path: '/blog' },
  ];

  const dropdownLinks = [
    { name: 'Skills', path: '/skills' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'power3.out', delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0d0d0d]/80 backdrop-blur-xl border-b border-gold/20 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/">
          <DKLogo size="sm" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {mainLinks.map((link, i) => (
            <motion.div key={link.name} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
              <Link to={link.path} className={`relative text-sm tracking-widest transition-colors duration-300 ${location.pathname === link.path ? 'text-gold' : 'text-gray-300 hover:text-white'}`}>
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-gold to-[#E6C78F] transition-all duration-500 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            </motion.div>
          ))}

          {/* Dropdown */}
          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className="flex items-center gap-1 text-sm tracking-widest text-gray-300 hover:text-white transition-colors">
              More <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-48 glass rounded-xl overflow-hidden"
                >
                  {dropdownLinks.map((link) => (
                    <Link key={link.name} to={link.path} className={`block px-6 py-3 text-sm hover:bg-gold/10 transition-colors ${location.pathname === link.path ? 'text-gold' : 'text-gray-300 hover:text-white'}`}>
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hire Me Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link to="/hire-me">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(198,169,114,0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-gold via-[#E6C78F] to-gold text-black text-sm font-semibold rounded-full hover:shadow-[0_0_30px_rgba(198,169,114,0.4)] transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Hire Me</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#E6C78F] to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-400">Hi, {user?.name}</span>
              {isAdmin && (
                <Link to="/admin/dashboard">
                  <button className="px-4 py-2 text-sm text-gold hover:text-white transition-colors">
                    Dashboard
                  </button>
                </Link>
              )}
              <button
                onClick={logout}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-6 py-2.5 bg-gradient-to-r from-[#C6A972] to-[#E6C78F] text-[#0d0d0d] text-sm font-medium rounded-full hover:shadow-[0_0_30px_rgba(198,169,114,0.4)] transition-all duration-300">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0d0d]/95 backdrop-blur-xl border-t border-gold/20 mt-4"
          >
            <div className="px-6 py-4 space-y-4">
              {[...mainLinks, ...dropdownLinks].map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setMobileOpen(false)} className={`block text-sm tracking-widest transition-colors ${location.pathname === link.path ? 'text-gold' : 'text-gray-300'}`}>
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Hire Me Button */}
              <Link to="/hire-me" onClick={() => setMobileOpen(false)}>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-gold to-[#E6C78F] text-black text-sm font-semibold rounded-full mt-4">
                  Hire Me
                </button>
              </Link>
              
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Link to="/admin/dashboard" onClick={() => setMobileOpen(false)}>
                      <button className="w-full px-6 py-3 text-gold text-sm text-left">
                        Dashboard
                      </button>
                    </Link>
                  )}
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full px-6 py-3 text-gray-400 text-sm text-left">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <button className="w-full px-6 py-3 text-gray-300 text-sm text-left">
                      Login
                    </button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)}>
                    <button className="w-full px-6 py-3 bg-gradient-to-r from-[#C6A972] to-[#E6C78F] text-[#0d0d0d] text-sm font-medium rounded-full">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
