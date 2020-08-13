const multer = require('multer');
const path = require('path');

//set multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
});

const upload = multer({ 
  storage: storage 
}).single("avatar");
 
module.exports = upload;