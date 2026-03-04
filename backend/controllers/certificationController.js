import Certification from '../models/Certification.js';
import fs from 'fs';

export const createCertification = async (req, res) => {
  try {
    const { title, issuer, year } = req.body;
    const certificateImage = req.file?.path || '';
    
    const certification = new Certification({ title, issuer, year, certificateImage });
    await certification.save();
    res.status(201).json(certification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ year: -1 });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCertification = async (req, res) => {
  try {
    const { title, issuer, year } = req.body;
    const certification = await Certification.findById(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification not found' });
    
    certification.title = title || certification.title;
    certification.issuer = issuer || certification.issuer;
    certification.year = year || certification.year;
    
    if (req.file) {
      if (certification.certificateImage) fs.unlinkSync(certification.certificateImage);
      certification.certificateImage = req.file.path;
    }
    
    await certification.save();
    res.json(certification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) return res.status(404).json({ message: 'Certification not found' });
    
    if (certification.certificateImage) fs.unlinkSync(certification.certificateImage);
    await certification.deleteOne();
    res.json({ message: 'Certification deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
