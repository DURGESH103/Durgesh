import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, X } from 'lucide-react';
import { getGallery, createGalleryItem, deleteGalleryItem } from '../../services/api';

const GalleryManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: '' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data } = await getGallery();
      setItems(data);
    } catch (error) {
      alert('Failed to fetch gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    if (image) data.append('image', image);

    try {
      await createGalleryItem(data);
      alert('Image uploaded!');
      fetchGallery();
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || 'Upload failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await deleteGalleryItem(id);
      alert('Image deleted!');
      fetchGallery();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', category: '' });
    setImage(null);
    setShowForm(false);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Gallery ({items.length})</h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-gold text-[#0d0d0d] rounded-lg hover:shadow-[0_0_30px_rgba(198,169,114,0.5)] transition-all">
          <Plus className="w-4 h-4" /> Upload Image
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="glass p-8 rounded-2xl max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Upload Image</h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold" required />
              <input type="text" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold" required />
              <div>
                <label className="block text-sm mb-2">Image</label>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold" required />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 px-6 py-3 bg-gold text-[#0d0d0d] rounded-lg hover:shadow-[0_0_30px_rgba(198,169,114,0.5)] transition-all">Upload</button>
                <button type="button" onClick={resetForm} className="px-6 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item._id} className="glass rounded-xl overflow-hidden group relative">
            <img src={`http://localhost:5000/${item.image}`} alt={item.title} className="w-full aspect-square object-cover" />
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-1 truncate">{item.title}</h3>
              <p className="text-xs text-gray-400 mb-2">{item.category}</p>
              <button onClick={() => handleDelete(item._id)} className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all text-sm"><Trash2 className="w-3 h-3" /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
