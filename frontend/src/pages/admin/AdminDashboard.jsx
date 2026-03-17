import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { LogOut, FolderKanban, Award, Code, Image, User, BookOpen } from 'lucide-react';
import ProjectsManager from './ProjectsManager';
import CertificationsManager from './CertificationsManager';
import SkillsManager from './SkillsManager';
import GalleryManager from './GalleryManager';
import AboutManager from './AboutManager';
import BlogManager from './BlogManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'projects',       label: 'Projects',       icon: <FolderKanban className="w-5 h-5" /> },
    { id: 'certifications', label: 'Certifications', icon: <Award className="w-5 h-5" /> },
    { id: 'skills',         label: 'Skills',         icon: <Code className="w-5 h-5" /> },
    { id: 'gallery',        label: 'Gallery',        icon: <Image className="w-5 h-5" /> },
    { id: 'about',          label: 'About',          icon: <User className="w-5 h-5" /> },
    { id: 'blog',           label: 'Blog',           icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Header */}
      <div className="bg-[#111111] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold">
              Admin <span className="text-gold">Dashboard</span>
            </h1>
            <p className="text-gray-400 text-sm">Welcome, {user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#111111] border-b border-white/10 px-6">
        <div className="max-w-7xl mx-auto flex gap-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-gold text-gold'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'certifications' && <CertificationsManager />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'about'   && <AboutManager />}
          {activeTab === 'blog'    && <BlogManager />}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
