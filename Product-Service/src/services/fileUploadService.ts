// services/fileUploadService.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import s3 from "../config/s3";

dotenv.config();

export const uploadFileToS3 = async (
  file: Express.Multer.File,
  storeId: string,
  productId: string
) => {
  const fileName = `${storeId}/products/${productId}/${Date.now()}-${
    file.originalname
  }`;
  const bucketName = process.env.AWS_S3_BUCKET_NAME!;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);
    const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    return url;
  } catch (error) {
    throw new Error("Failed to upload file to S3");
  }
};
