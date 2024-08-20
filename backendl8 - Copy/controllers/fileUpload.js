const file = require("../models/File");
//localfileupload -> handler function
const cloudinary = require ('cloudinary');

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

function isFileTypeSupported(type,supportedTypes){

  return supportedTypes.includes(type);
}
// function to upload something on cloundinary
async function uploadFileToCloudinary(file, folder){
  const options = {folder};
 return await cloudinary.uploader.upload(file.tempFilePath,options);
}

// handler to upload image
exports.imageUpload = async (req,res)=>{

try{
const {name,tags, email}=req.body;
console.log(name,tags, email);
const file = req.files.imageFile;
console.log(file);
// validation
const supportedTypes = ["jpg","png","jpeg"];
const fileType= file.name.split('.')[1].toLowerCase();
console.log("file type",fileType);
if(!isFileTypeSupported(fileType,supportedTypes)){
  return res.status(400).json({
    success:false,
    message: 'file type not supported'

  })
}
// file format supported hai to ham upload karenge

const response =  await uploadFileToCloudinary(file,"codehelp");
console.log(response);

// db me entry save karni hai
// const fileData = await file.create({
//   name,
//   tags,
//   imagaeUrl,
//   emails
// })

res.json({
  success:true,
  message:'image uploaded  successfully'
})


 

}
catch(error){
  console.error(error);
  return res.status(400).json({
    success:false,
    message:'issue in image uploading'
  })

}


}