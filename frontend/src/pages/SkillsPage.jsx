import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Database, Wrench } from 'lucide-react';
import SEO from '../components/SEO';
import { getSkills } from '../services/api';

const categoryIcons = {
  Frontend: <Code className="w-6 h-6" />,
  Backend: <Database className="w-6 h-6" />,
  Design: <Palette className="w-6 h-6" />,
  Tools: <Wrench className="w-6 h-6" />
};

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data } = await getSkills();
      setSkills(data);
      const uniqueCategories = [...new Set(data.map(s => s.category))];
      setCategories(['all', ...uniqueCategories]);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const groupedSkills = categories.filter(c => c !== 'all').reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center pt-32">
        <div className="text-gold text-xl">Loading skills...</div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Skills - DK Portfolio"
        description="Technical skills and expertise"
        keywords="skills, expertise, technologies, programming"
      />
      
      <section className="pt-32 pb-24 px-4 sm:px-6 min-h-screen bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
              My <span className="text-gold">Skills</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Technical expertise and proficiency levels
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#C6A972] to-[#E6C78F] text-[#0d0d0d] shadow-[0_0_30px_rgba(198,169,114,0.3)]'
                    : 'glass hover:bg-white/10'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          {activeCategory === 'all' ? (
            Object.entries(groupedSkills).map(([category, categorySkills], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="text-gold">
                    {categoryIcons[category] || <Code className="w-6 h-6" />}
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-gold">{category}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {categorySkills.map((skill, i) => (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass p-6 rounded-xl hover:shadow-[0_10px_40px_rgba(198,169,114,0.15)] transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold group-hover:text-gold transition-colors">
                          {skill.name}
                        </h3>
                        <span className="text-gold font-bold text-lg">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut', delay: i * 0.05 }}
                          className="h-full bg-gradient-to-r from-[#C6A972] to-[#E6C78F] rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSkills.map((skill, i) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass p-6 rounded-xl hover:shadow-[0_10px_40px_rgba(198,169,114,0.15)] transition-all duration-300 group"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold group-hover:text-gold transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-gold font-bold text-lg">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: i * 0.05 }}
                      className="h-full bg-gradient-to-r from-[#C6A972] to-[#E6C78F] rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SkillsPage;
