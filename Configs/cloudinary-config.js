const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dyime8z2l" ,// process.env.CLOUDINARY_CLOUD_NAME,
  api_key: 228859972799569, // process.env.CLOUDINARY_API_KEY,
  api_secret: "_d9kkWaqi3bK8WBP5Sdip08nHDY" // process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
