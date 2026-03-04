import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const existingAdmin = await User.findOne({ email: 'admin@portfolio.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!');
      console.log('Email: admin@portfolio.com');
      process.exit(0);
    }

    const admin = new User({
      name: 'Admin',
      email: 'admin@portfolio.com',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@portfolio.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');
    console.log('⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
