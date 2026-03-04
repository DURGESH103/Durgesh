import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload } from 'lucide-react';
import { getAbout, updateAbout } from '../../services/api';

const AboutManager = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    bio: '',
    experienceYears: '',
    resumeLink: '',
    socialLinks: { github: '', linkedin: '', twitter: '', instagram: '' }
  });
  const [profileImage, setProfileImage] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const { data } = await getAbout();
      setFormData({
        bio: data.bio || '',
        experienceYears: data.experienceYears || '',
        resumeLink: data.resumeLink || '',
        socialLinks: data.socialLinks || { github: '', linkedin: '', twitter: '', instagram: '' }
      });
    } catch (error) {
      console.error('Error fetching about:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('bio', formData.bio);
    data.append('experienceYears', formData.experienceYears);
    data.append('resumeLink', formData.resumeLink);
    data.append('socialLinks', JSON.stringify(formData.socialLinks));
    if (profileImage) data.append('profileImage', profileImage);
    if (resumeFile) data.append('resume', resumeFile);

    try {
      await updateAbout(data);
      alert('About section updated!');
      fetchAbout();
      setProfileImage(null);
      setResumeFile(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">About Section</h2>
        <p className="text-gray-400 text-sm">Manage your profile information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="glass p-6 rounded-xl">
          <h3 className="text-lg font-bold mb-4">Basic Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                rows="6"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold resize-none"
                placeholder="Tell us about yourself..."
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Years of Experience</label>
              <input
                type="number"
                value={formData.experienceYears}
                onChange={(e) => setFormData({...formData, experienceYears: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Resume Link</label>
              <input
                type="url"
                value={formData.resumeLink}
                onChange={(e) => setFormData({...formData, resumeLink: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files[0])}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Resume File (PDF/DOC)</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
              />
              <p className="text-xs text-gray-400 mt-1">Upload PDF or DOC file (max 10MB)</p>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl">
          <h3 className="text-lg font-bold mb-4">Social Links</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">GitHub</label>
              <input
                type="url"
                value={formData.socialLinks.github}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, github: e.target.value}})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">LinkedIn</label>
              <input
                type="url"
                value={formData.socialLinks.linkedin}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, linkedin: e.target.value}})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Twitter</label>
              <input
                type="url"
                value={formData.socialLinks.twitter}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, twitter: e.target.value}})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
                placeholder="https://twitter.com/username"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Instagram</label>
              <input
                type="url"
                value={formData.socialLinks.instagram}
                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-gold"
                placeholder="https://instagram.com/username"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C6A972] to-[#E6C78F] text-[#0d0d0d] font-medium rounded-full hover:shadow-[0_0_50px_rgba(198,169,114,0.5)] transition-all duration-300"
        >
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default AboutManager;
