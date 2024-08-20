const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: 183526381349727,
      api_secret: process.env.API_SECRET,
    });
    console.log('Connected to Cloudinary');
  } catch (error) {
    console.error('Error connecting to Cloudinary:', error.message);
  }
};
