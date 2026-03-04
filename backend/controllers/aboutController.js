import About from '../models/About.js';
import fs from 'fs';

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

export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About({
        bio: 'Your bio here',
        experienceYears: 0,
        socialLinks: {}
      });
      await about.save();
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = new About();
    
    const { bio, experienceYears, resumeLink, socialLinks } = req.body;
    
    if (bio) about.bio = bio;
    if (experienceYears) about.experienceYears = experienceYears;
    if (resumeLink) about.resumeLink = resumeLink;
    if (socialLinks) about.socialLinks = JSON.parse(socialLinks);
    
    // Handle profile image
    if (req.files?.profileImage) {
      deleteFile(about.profileImage);
      about.profileImage = getRelativePath(req.files.profileImage[0].path);
    }
    
    // Handle resume file
    if (req.files?.resume) {
      deleteFile(about.resumeFile);
      about.resumeFile = getRelativePath(req.files.resume[0].path);
      about.resumeLink = `http://localhost:5000/${about.resumeFile}`;
    }
    
    await about.save();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
