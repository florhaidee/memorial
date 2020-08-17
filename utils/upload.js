const multer = require('multer');
const multerS3 = require('multer-s3')
const path = require('path');
const aws = require('aws-sdk');
require('dotenv').config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION
});

const s3 = new aws.S3({
  apiVersion: '2012-10-17',
  params: {Bucket: process.env.S3_BUCKET_NAME}
});

//set multer storage
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, 'images/'+Date.now().toString() + path.extname(file.originalname))
    }
  })
}).single("avatar");

// //set multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb);
//   }
// });

// const upload = multer({ 
//   storage: storage 
// }).single("avatar");
 
module.exports = upload;