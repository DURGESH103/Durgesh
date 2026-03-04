import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../services/api';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', level: '', category: '' });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data } = await getSkills();
      setSkills(data);
    } catch (error) {
      alert('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateSkill(editing._id, formData);
        alert('Skill updated!');
      } else {
        await createSkill(formData);
        alert('Skill created!');
      }
      fetchSkills();
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try {
      await deleteSkill(id);
      alert('Skill deleted!');
      fetchSkills();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const handleEdit = (skill) => {
    setEditing(skill);
    setFormData({ name: skill.name, level: skill.level, category: skill.category });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: '', level: '', category: '' });
    setEditing(null);
    setShowForm(false);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Skills ({skills.length})</h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-gold text-[#0d0d0d] rounded-lg hover:shadow-[0_0_30px_rgba(198,169,114,0.5)] transition-all">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="glass p-8 rounded-2xl max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editing ? 'Edit' : 'Add'} Skill</h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Skill Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold" required />
              <input type="number" placeholder="Level (0-100)" min="0" max="100" value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold" required />
              <input type="text" placeholder="Category (e.g., Frontend, Backend)" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold" required />
              <div className="flex gap-4">
                <button type="submit" className="flex-1 px-6 py-3 bg-gold text-[#0d0d0d] rounded-lg hover:shadow-[0_0_30px_rgba(198,169,114,0.5)] transition-all">{editing ? 'Update' : 'Create'}</button>
                <button type="button" onClick={resetForm} className="px-6 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div key={skill._id} className="glass p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{skill.name}</h3>
              <span className="text-gold font-bold">{skill.level}%</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">{skill.category}</p>
            <div className="w-full bg-white/5 rounded-full h-2 mb-4">
              <div style={{ width: `${skill.level}%` }} className="h-full bg-gradient-to-r from-[#C6A972] to-[#E6C78F] rounded-full" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(skill)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-all"><Edit className="w-4 h-4" /> Edit</button>
              <button onClick={() => handleDelete(skill._id)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"><Trash2 className="w-4 h-4" /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsManager;
