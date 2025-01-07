import express from "express";
import { getPosts } from "../controllers/post.controller.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import protectedRoute from "../middleware/protectedRoute.js";
import multer from "multer";
import fs from "fs";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./user-posts";
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
router.post(
  "/create",
  protectedRoute,
  upload.single("post"),
  async (req, res) => {
    console.log("Here");
    const imageName = req.file.filename;

    try {
      const user = await User.findById(req.user._id);
      console.log("Here2");

      if (!user) {
        return res.status(400).json({ error: "User not Found" });
      }

      const post = new Post({
        post: imageName,
        poster: req.user,
      });

      post.save();

      console.log("Image Saved in DB");

      return res.status(200).json("ok");
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error on createPost" });
    }
  }
);

export default router;
