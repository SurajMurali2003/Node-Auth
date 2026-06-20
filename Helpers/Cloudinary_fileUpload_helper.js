const cloudinary = require("../Configs/cloudinary-config");

const uplaodFileToClodinary = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error(`Clodinary upload error ${error}`);
    throw error;
  }
};

module.exports = {
  uplaodFileToClodinary,
};
