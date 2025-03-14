import multer from "multer";

// Multer configuration for file upload
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage }); // You can also set limits for file size

// Middleware to handle file upload
export const uploadSingleFile = upload.single("image"); // 'image' is the field name in your form
