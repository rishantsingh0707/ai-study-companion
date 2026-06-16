import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "study-companion/documents",
    resource_type: "raw",
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

const upload = multer({
  storage,
});


export default upload;