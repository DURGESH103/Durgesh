import Project from '../models/Project.js';
import fs from 'fs';
import path from 'path';

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const deleteFile = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('File deletion error:', error.message);
  }
};

const getRelativePath = (filePath) => {
  return filePath ? filePath.replace(/\\/g, '/') : '';
};

export const createProject = async (req, res) => {
  try {
    const { title, shortDescription, fullDescription, techStack, liveLink, githubLink, featured, category, status } = req.body;
    
    if (!title || !shortDescription || !fullDescription) {
      return res.status(400).json({ message: 'Title, short description, and full description are required' });
    }

    if (!req.files?.featuredImage?.[0]) {
      return res.status(400).json({ message: 'Featured image is required' });
    }
    
    const slug = generateSlug(title);
    const featuredImage = getRelativePath(req.files.featuredImage[0].path);
    const galleryImages = req.files?.galleryImages?.map(f => getRelativePath(f.path)) || [];
    
    const project = new Project({
      title,
      slug,
      shortDescription,
      fullDescription,
      techStack: JSON.parse(techStack || '[]'),
      liveLink,
      githubLink,
      featuredImage,
      galleryImages,
      featured: featured === 'true',
      category,
      status: status || 'Completed',
    });
    
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleFeatured = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    project.featured = !project.featured;
    await project.save();
    res.json({ _id: project._id, featured: project.featured });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title, shortDescription, fullDescription, techStack, liveLink, githubLink, featured, category, status, keepGallery } = req.body;
    
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    if (title && title !== project.title) project.slug = generateSlug(title);
    
    if (title)            project.title            = title;
    if (shortDescription) project.shortDescription = shortDescription;
    if (fullDescription)  project.fullDescription  = fullDescription;
    if (techStack)        project.techStack        = JSON.parse(techStack);
    if (liveLink  !== undefined) project.liveLink   = liveLink;
    if (githubLink !== undefined) project.githubLink = githubLink;
    if (featured  !== undefined) project.featured   = featured === 'true';
    if (category  !== undefined) project.category   = category;
    if (status)           project.status           = status;

    // Replace featured image
    if (req.files?.featuredImage?.[0]) {
      deleteFile(project.featuredImage);
      project.featuredImage = getRelativePath(req.files.featuredImage[0].path);
    }

    // Merge gallery: keep selected existing + append new uploads
    if (keepGallery !== undefined) {
      const kept = JSON.parse(keepGallery); // paths to keep
      // delete removed ones
      project.galleryImages
        .filter(img => !kept.includes(img))
        .forEach(img => deleteFile(img));
      const newUploads = req.files?.galleryImages?.map(f => getRelativePath(f.path)) || [];
      project.galleryImages = [...kept, ...newUploads];
    } else if (req.files?.galleryImages) {
      // fallback: full replace
      project.galleryImages.forEach(img => deleteFile(img));
      project.galleryImages = req.files.galleryImages.map(f => getRelativePath(f.path));
    }
    
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    
    deleteFile(project.featuredImage);
    project.galleryImages.forEach(img => deleteFile(img));
    
    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
