const express = require("express");
const ImageRouter = express.Router();
const {uploadImage, fetchImages, deleteImage} = require("../Controller/imageController.js");
const authMiddleware = require("../Middleware/auth-middleware");
const adminRightsMiddleware = require("../Middleware/adminRights-middleware");
const multerMiddleware = require("../Middleware/multer-middleware");

//Upload an IMage
ImageRouter.post("/upload",authMiddleware,adminRightsMiddleware,multerMiddleware.single("user_Image"), uploadImage);


//Fecth all images
ImageRouter.get("/get", authMiddleware, fetchImages)

//Delete Images
ImageRouter.delete("/:id", authMiddleware, adminRightsMiddleware, deleteImage)

module.exports = ImageRouter;