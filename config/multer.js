const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-east-2'
})

const s3 = new aws.S3()

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now()+file.originalname) 
//     }
// });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {
        'Content-Type': file.mimetype 
      });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString()+file.originalname)
    }
  })
})

// const upload = multer({ storage: storage })

module.exports = upload