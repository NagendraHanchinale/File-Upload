const { cloudinaryConnect } = require("../config/cloudinary");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// LOCAL FILE UPLOAD
exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("FILE : ", file);

    const path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".").pop()}`;
    console.log("Path : ", path);

    file.mv(path, (err) => {
      if (err) {
        console.error("Error while moving file:", err);
        return res.status(500).json({ success: false, message: "File move failed" });
      }

      res.json({
        success: true,
        message: "Local File Uploaded Successfully",
        path,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong during local file upload",
    });
  }
};

// ✅ FIXED: spelling and bug in `includes`
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

// CLOUDINARY UPLOAD HELPER
async function uploadFileToCloudinary(file, folder,quality) {
  const options = { folder };
  options.resource_type = "auto";

  if(quality){
   options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options); // 🛠️ Must return response

}

// CLOUDINARY IMAGE UPLOAD HANDLER
exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log("File : ", file);

    // Validate type
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".").pop().toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // Upload to Cloudinary
    console.log("uploading to :");
    const uploadResponse = await uploadFileToCloudinary(file, "FileUpload");
    console.log("Cloudinary Upload:", uploadResponse);

    // Save to DB (optional, commented for now)
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: uploadResponse.secure_url
    });

    res.json({
      success: true,
      message: "Image successfully uploaded to Cloudinary",
      url: uploadResponse.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong during image upload",
    });
  }
};



exports.videoUpload = async (req,res) => {
   try{
      const {name,tags,email} = req.body;
      console.log(name,tags,email);

      const file = req.files.videoFile;
      console.log(file);
      const supportedTypes = ["mp4", "mov"];
      const fileType = file.name.split(".").pop().toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

        // Upload to Cloudinary
    console.log("uploading to :");
    const uploadResponse = await uploadFileToCloudinary(file, "FileUpload");
    console.log("Cloudinary Upload:", uploadResponse);
   
   const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: uploadResponse.secure_url
    });

   res.json({
      success: true,
      message: "Video successfully uploaded to Cloudinary",
      url: uploadResponse.secure_url,
    });


   }catch(error){
      res.status(400).json({
         success:false,
         message:"Something went wrong"
      })
   }
}



exports.imageSizeReducer = async (req,res) => {
   try{
const {name,tags,email} = req.body;
      console.log(name,tags,email);

      const file = req.files.imageFile;
      console.log(file);
      const supportedTypes = ["jpg", "jpeg","png"];
      const fileType = file.name.split(".").pop().toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

        // Upload to Cloudinary
    console.log("uploading to :");
    const uploadResponse = await uploadFileToCloudinary(file, "FileUpload",30);
    console.log("Cloudinary Upload:", uploadResponse);
   
   const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: uploadResponse.secure_url
    });

   res.json({
      success: true,
      message: "Video successfully uploaded to Cloudinary",
      url: uploadResponse.secure_url,
    });
   }catch(error){
         res.status(400).json({
         success:false,
         message:"Something went wrong"
      })
   }
}
