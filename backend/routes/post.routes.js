import express from "express";
import { getPosts, createPost } from "../controllers/post.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";
import multer from "multer";
import fs from "fs";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "user-posts/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/get", getPosts);
router.post("/create", protectedRoute, upload.single("post"), createPost);

export default router;
