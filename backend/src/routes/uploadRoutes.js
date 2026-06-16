import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.single("file"), (req, res) => {
  console.log("router.post / called");
  console.log("Uploaded file:", req.file);

  res.json({
    success: true,
    consoleMessage: "File uploaded successfully",
    file: req.file,
  });
});

export default router;