import multer from "multer"
import { Router } from "express"

import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { uploadFile } from "../controllers/MessageController.js";

const upload = multer({ dest: "upload/files" });

export const messageRoute = Router();
messageRoute.post("/upload-file", verifyToken, upload.single('file'), uploadFile);