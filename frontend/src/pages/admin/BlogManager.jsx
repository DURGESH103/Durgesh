import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MDEditor from '@uiw/react-md-editor';
import { Plus, Edit, Trash2, X, Eye, EyeOff, Clock, BookOpen } from 'lucide-react';
import { getBlogs, createBlog, updateBlog, deleteBlog, toggleBlogPublish } from '../../services/api';

const EMPTY = { title: '', excerpt: '', content: '', tags: '', category: 'General', author: 'DK', isPublished: false };

export default function BlogManager() {
  const [blogs, setBlogs]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [editing, setEditing]       = useState(null);
  const [form, setForm]             = useState(EMPTY);
  const [thumbnail, setThumbnail]   = useState(null);
  const [saving, setSaving]         = useState(false);
  const [preview, setPreview]       = useState(null); // blog to preview

  const fetchAll = async () => {
    setLoading(true);
    try {
      // No draft param = admin sees ALL (published + drafts)
      const { data } = await getBlogs({ limit: 100 });
      setBlogs(data.blogs || []);
    } catch {
      alert('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setThumbnail(null); setShowForm(true); };
  const openEdit   = (b) => {
    setEditing(b);
    setForm({ title: b.title, excerpt: b.excerpt, content: b.content, tags: b.tags?.join(', ') || '', category: b.category, author: b.author, isPublished: b.isPublished });
    setThumbnail(null);
    setShowForm(true);
  };
  const closeForm  = () => { setShowForm(false); setEditing(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title',       form.title);
      fd.append('excerpt',     form.excerpt);
      fd.append('content',     form.content);
      fd.append('tags',        JSON.stringify(form.tags.split(',').map(t => t.trim()).filter(Boolean)));
      fd.append('category',    form.category);
      fd.append('author',      form.author);
      fd.append('isPublished', String(form.isPublished));
      if (thumbnail) fd.append('thumbnail', thumbnail);

      if (editing) await updateBlog(editing._id, fd);
      else         await createBlog(fd);

      closeForm();
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    try { await deleteBlog(id); fetchAll(); }
    catch { alert('Delete failed'); }
  };

  const handleToggle = async (id) => {
    try {
      const { data } = await toggleBlogPublish(id);
      setBlogs(prev => prev.map(b => b._id === id ? { ...b, isPublished: data.isPublished } : b));
    } catch { alert('Toggle failed'); }
  };

  const inp = 'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-gray-600';

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Blog Posts <span className="text-gold">({blogs.length})</span></h2>
          <p className="text-gray-400 text-sm mt-1">{blogs.filter(b => b.isPublished).length} published · {blogs.filter(b => !b.isPublished).length} drafts</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold text-black rounded-xl text-sm font-semibold hover:bg-[#E6C78F] transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Blog list */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading…</div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-24">
          <BookOpen className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-gray-400">No blog posts yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map(b => (
            <div key={b._id} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/[0.07] rounded-2xl hover:border-white/15 transition-colors">
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden bg-white/5">
                {b.thumbnail
                  ? <img src={b.thumbnail.startsWith('http') ? b.thumbnail : `http://localhost:5000/${b.thumbnail}`} alt={b.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center"><BookOpen className="w-5 h-5 text-white/20" /></div>
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-sm truncate">{b.title}</h3>
                  <span className={`flex-shrink-0 px-2 py-0.5 text-[10px] font-bold rounded-full ${b.isPublished ? 'bg-green-500/15 text-green-400' : 'bg-yellow-500/15 text-yellow-400'}`}>
                    {b.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-gray-500 text-xs truncate">{b.excerpt}</p>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-600">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.readTime} min</span>
                  <span>{b.category}</span>
                  <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => handleToggle(b._id)} title={b.isPublished ? 'Unpublish' : 'Publish'}
                  className={`p-2 rounded-lg transition-colors ${b.isPublished ? 'text-green-400 hover:bg-green-500/10' : 'text-yellow-400 hover:bg-yellow-500/10'}`}>
                  {b.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => openEdit(b)}
                  className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(b._id)}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.97, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97, y: 16 }}
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-4xl my-8">

              {/* Modal header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/10">
                <h3 className="text-xl font-bold">{editing ? 'Edit Post' : 'New Blog Post'}</h3>
                <button onClick={closeForm} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                {/* Title */}
                <input type="text" placeholder="Post title *" value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className={inp} required />

                {/* Excerpt */}
                <textarea placeholder="Short excerpt / description *" value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  className={`${inp} resize-none`} rows={2} required />

                {/* Row: category + author + tags */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input type="text" placeholder="Category" value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className={inp} />
                  <input type="text" placeholder="Author" value={form.author}
                    onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                    className={inp} />
                  <input type="text" placeholder="Tags (comma-separated)" value={form.tags}
                    onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                    className={inp} />
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">Thumbnail Image</label>
                  <input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files[0])}
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gold/10 file:text-gold hover:file:bg-gold/20 cursor-pointer" />
                  {editing?.thumbnail && !thumbnail && (
                    <p className="text-xs text-gray-500 mt-1">Current thumbnail will be kept unless you upload a new one.</p>
                  )}
                </div>

                {/* Markdown Editor */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2 uppercase tracking-widest">Content (Markdown) *</label>
                  <div data-color-mode="dark">
                    <MDEditor
                      value={form.content}
                      onChange={v => setForm(f => ({ ...f, content: v || '' }))}
                      height={420}
                      preview="live"
                    />
                  </div>
                </div>

                {/* Publish toggle */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={form.isPublished}
                      onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))} />
                    <div className={`w-11 h-6 rounded-full transition-colors ${form.isPublished ? 'bg-gold' : 'bg-white/10'}`} />
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.isPublished ? 'translate-x-5' : ''}`} />
                  </div>
                  <span className="text-sm">{form.isPublished ? 'Published' : 'Save as Draft'}</span>
                </label>

                {/* Submit */}
                <div className="flex gap-4 pt-2">
                  <button type="submit" disabled={saving}
                    className="flex-1 py-3 bg-gold text-black font-semibold rounded-xl hover:bg-[#E6C78F] transition-colors disabled:opacity-60">
                    {saving ? 'Saving…' : editing ? 'Update Post' : 'Create Post'}
                  </button>
                  <button type="button" onClick={closeForm}
                    className="px-6 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
