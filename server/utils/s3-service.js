// aws/s3-service.js
import { s3 } from "../config/aws.js"; // Import your configured S3 client
import multer from "multer";
import multerS3 from "multer-s3";

// --- S3 Multer Setup ---
const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.S3_BUCKET_NAME,
  // acl: "public-read", // Or private, depending on your needs. Public-read allows direct access.
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    // Use a unique name for the file to prevent collisions
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage: s3Storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only JPEG, PNG, or PDF are allowed!"), false);
    }
  },
});

// Function to delete a file from S3
export const deleteFileFromS3 = async (fileName) => {
  if (!fileName) {
    console.warn("No filename provided for S3 deletion.");
    return;
  }
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  };
  try {
    await s3.deleteObject(params).promise();
    console.log(`File ${fileName} deleted from S3.`);
  } catch (error) {
    console.error(`Error deleting file ${fileName} from S3:`, error);
    // Optionally, re-throw or handle specific errors
    throw error;
  }
};