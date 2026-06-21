const Image = require("../Model/Image-model");
const fs = require("fs");
const cloudinary = require("../Configs/cloudinary-config");

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
      localStoredPath: file.path,
    });

    await newUploadedImage.save();
    console.log("🙄😎😋😊😊😎", file.path);
   
    // fs.unlinkSync(file.path);

    res.status(201).json({
      success: true,
      message: "Image Uploaded Succesfully",
      image: newUploadedImage,
    });
  } catch (error) {
    console.error(`Error uploadImage ${error}`);
    res.status(500).json({
      success: false,
      messsage: `Internla server error ${error?.message}`,
    });
  }
};

const fetchImages = async (req, res) => {
try {

  const allImages = await Image.find({});
  console.lof
  if(!allImages.length > 0){
   return res.status(404).json({
      success: true,
      message: "No images found"
    })
  }

  res.status(200).json({
    success: true,
    message: "Images fetched successfully",
    data: allImages,
  })
  
} catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal error-fetchImages, ${error.message} `
    })
}
}

const deleteImage =async (req, res) => {
     try {
       const getImageIdToBeDeleted = req.params.id;
       const  curentUserId = req.userInfo._id;
console.log("getImageIdToBeDeleted", req.params.id)
       if(!getImageIdToBeDeleted){
       return res.status(400).json({
          success: false,
          message: "Invalid Request"
        })
       }

      // Find the image from DB
       const imageToDelete = await Image.findById(getImageIdToBeDeleted);
       if(!imageToDelete){
       return res.status(404).json({
        success: false,
        message:`${getImageIdToBeDeleted} Image not found`
        })
       };
       console.log("imageToDelete", imageToDelete.uploadedBy, curentUserId)
      // Check this curent user is Uploade this image
       if(imageToDelete.uploadedBy.toString() !== curentUserId){
        return res.status(404).json({
          success: false,
          message: "You dont have acces to delete thie image, You not uploaded it"
        })
       }

      //  Delete the image form clodinary
      await cloudinary.uploader.destroy(imageToDelete?.publicId);

      //Delete the Image Doc from DB;
      await Image.findByIdAndDelete(getImageIdToBeDeleted);
      res.status(200).json({
        success: true,
        message: "Deleted Successfully"
      })

     } catch (error) {
      res.status(500).json({
        success: false,
        message:`Server error-deleteImage- ${error.message}`
      })
     }
}
module.exports = {
  uploadImage,fetchImages, deleteImage
};
