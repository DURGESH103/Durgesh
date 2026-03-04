import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { getCertifications, createCertification, updateCertification, deleteCertification } from '../../services/api';

const CertificationsManager = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ title: '', issuer: '', year: '' });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const { data } = await getCertifications();
      setCertifications(data);
    } catch (error) {
      alert('Failed to fetch certifications');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('certificateImage', image);

    try {
      if (editing) {
        await updateCertification(editing._id, data);
        alert('Certification updated!');
      } else {
        await createCertification(data);
        alert('Certification created!');
      }
      fetchCertifications();
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this certification?')) return;
    try {
      await deleteCertification(id);
      alert('Certification deleted!');
      fetchCertifications();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const handleEdit = (cert) => {
    setEditing(cert);
    setFormData({ title: cert.title, issuer: cert.issuer, year: cert.year });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: '', issuer: '', year: '' });
    setImage(null);
    setEditing(null);
    setShowForm(false);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Certifications ({certifications.length})</h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-gold text-[#0d0d0d] rounded-lg hover:shadow-[0_0_30px_rgba(198,169,114,0.5)] transition-all">
          <Plus className="w-4 h-4" /> Add Certification
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6 overflow-y-auto">
          <div className="glass p-8 rounded-2xl max-w-md w-full my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{editing ? 'Edit' : 'Add'} Certification</h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold" required />
              <input type="text" placeholder="Issuer" value={formData.issuer} onChange={(e) => setFormData({...formData, issuer: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold" required />
              <input type="number" placeholder="Year" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold" required />
              <div>
                <label className="block text-sm mb-2">Certificate Image</label>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold" />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="flex-1 px-6 py-3 bg-gold text-[#0d0d0d] rounded-lg hover:shadow-[0_0_30px_rgba(198,169,114,0.5)] transition-all">{editing ? 'Update' : 'Create'}</button>
                <button type="button" onClick={resetForm} className="px-6 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div key={cert._id} className="glass p-4 rounded-xl">
            <img src={`http://localhost:5000/${cert.certificateImage}`} alt={cert.title} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="font-bold text-lg mb-2">{cert.title}</h3>
            <p className="text-gray-400 text-sm mb-1">{cert.issuer}</p>
            <p className="text-gold text-sm mb-4">{cert.year}</p>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(cert)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-all"><Edit className="w-4 h-4" /> Edit</button>
              <button onClick={() => handleDelete(cert._id)} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"><Trash2 className="w-4 h-4" /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsManager;
