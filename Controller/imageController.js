const Image = require("../Model/Image-model");
const {
  uplaodFileToClodinary,
} = require("../Helpers/Cloudinary_fileUpload_helper");

const uploadImage = async (req, res) => {
  try {
    // Check for file from FE
    const file = req.file;
    console.log("file", file);
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File was required, Please upload a file",
      });
    }

    //Upload Image to clodinary;
    const { url, publicId } = await uplaodFileToClodinary(file?.path);

    // Store in MongoDb
    const newUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req?.userInfo?._id,
    });

    await newUploadedImage.save();

    res.status(201).json({
      success: true,
      message: "Image Uploaded Succesfully",
      image: newUploadedImage,
    });
  } catch (error) {
    cosole.error(`Error uploadImage ${error}`);
    res.status(500).json({
      success: flase,
      messsage: `Internla server error ${error?.message}`,
    });
  }
};

module.exports = {
  uploadImage,
};
