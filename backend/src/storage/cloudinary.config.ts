import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'placeholder_cloud',
  api_key: process.env.CLOUDINARY_API_KEY || 'placeholder_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'placeholder_secret'
});

export default cloudinary;
