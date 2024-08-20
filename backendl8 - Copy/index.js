const express = require('express');
const app = express();
require('dotenv').config();
const PORT = parseInt(process.env.PORT, 10) || 3000;  

// Middleware
app.use(express.json());
const fileupload = require("express-fileupload");


app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// Database Connection
const db = require("./config/database");
db.connect();

// Cloudinary Connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();
app.get('/api/v1/test', (req, res) => {
    res.json({
      success: true,
      message: "Test route is working!",
    });
  });

// API Route Mount
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);  // Fixed the route path


// Activate Server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});
