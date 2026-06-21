const multer = require("multer");
const path  = require("path")


const storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, "Uploads/")
  },
  filename : function(req,file, cb){
    const fileName = file.fieldname + '_' + Date.now() + '_' + path.extname(file.originalname);
    cb(null, fileName)
  }
});

const checkFileType = function(req, file, cb){
    if(file.mimetype.startsWith("image")){
        cb(null, true)
    }
    else{
        cb(new Error("File must be Image-Type only..."))
    }
}

module.exports = multer({
    storage: storage,
    fileFilter: checkFileType,
    limits: {
        fileSize: 50 * 1024 * 1024// 50MB file max
    }
})