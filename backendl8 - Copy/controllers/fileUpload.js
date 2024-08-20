
//localfileupload -> handler function
const cloudinary = require("cloudinary");
const File = require("../models/File");

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file
    const file = req.files.file;
    console.log("file aa gayi", file);

    let path = __dirname + "/files/" + Date.now();
    console.log("PATH->", path);

    file.mv(path, (err) => {
      console.log(err);
    });
    res.json({
      success: true,
      message: "local file uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
};


// handler to upload image
// Function to check if the file type is supported
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

// Function to upload a file to Cloudinary
async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Handler to upload image
exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.imageFile;
    console.log(file);
    // Check if file is present
    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    console.log("test1");

    // Validation
    const supportedTypes = ["jpg", "png", "jpeg"];
    const fileType = file.name.split(".").pop().toLowerCase();
    console.log("file type", fileType);

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File type not supported",
      });
    }
    console.log("test2");
    // File format supported, proceed with upload
    const response = await uploadFileToCloudinary(file, "codehelp");
    console.log(response);
    console.log("test3");
    // Save entry to the database
   const fileData = await File.create({
      name,
      imageUrl: response.secure_url,
      tags,
      email,
   })
    console.log("test4");

    res.json({
      success: true,
      message: "Image uploaded successfully",
      data: fileData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Issue in image uploading",
    });
  }
};
