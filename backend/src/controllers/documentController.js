import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import Document from "../models/Document.js";

export const uploadDocument = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }
        console.log(req.files);

        const uploadedDocuments = [];

        for (const file of req.files) {
            const uploadResult = await new Promise(
                (resolve, reject) => {
                    const stream =
                        cloudinary.uploader.upload_stream(
                            {
                                folder: "study-companion",
                                resource_type: "raw",
                            },
                            (error, result) => {
                                if (error)
                                    return reject(error);

                                resolve(result);
                            }
                        );

                    streamifier
                        .createReadStream(file.buffer)
                        .pipe(stream);
                }
            );

            const document = await Document.create({
                userId: req.user._id,

                title: file.originalname,

                fileUrl: uploadResult.secure_url,

                publicId: uploadResult.public_id,

                fileType: file.mimetype,

                fileSize: file.size,
            });

            uploadedDocuments.push(document);
        }

        res.status(201).json({
            success: true,
            documents: uploadedDocuments,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to upload document",
        });
    }
};