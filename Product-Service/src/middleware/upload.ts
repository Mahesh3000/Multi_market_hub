import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3";

const bucketName = process.env.AWS_S3_BUCKET_NAME!;

const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `products/${Date.now()}-${file.originalname}`);
    },
  }),
});

export default upload;
