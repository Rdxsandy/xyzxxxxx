const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: "name",
      api_key: api_key,
      api_secret: "secret",
    });
    console.log("Connected to Cloudinary");
  } catch (error) {
    console.error("Error connecting to Cloudinary:", error.message);
  }
};
