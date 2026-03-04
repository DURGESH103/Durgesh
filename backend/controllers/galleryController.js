import Gallery from '../models/Gallery.js';
import fs from 'fs';

export const createGalleryItem = async (req, res) => {
  try {
    const { title, category } = req.body;
    const image = req.file?.path || '';
    
    const galleryItem = new Gallery({ title, image, category });
    await galleryItem.save();
    res.status(201).json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllGalleryItems = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const items = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });
    
    if (item.image) fs.unlinkSync(item.image);
    await item.deleteOne();
    res.json({ message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
