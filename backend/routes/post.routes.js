import express from "express";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import protectedRoute from "../middleware/protectedRoute.js";
import multer from "multer";
import fs from "fs";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/userPosts/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const post = await Post.find({});

    return res.status(200).json({ data: post });
  } catch (error) {
    console.log("Error in getPost API route: ", error.message);
    return res.status(500).json({ error: "Internal Server Error on GetPost" });
  }
});

router.post(
  "/create",
  protectedRoute,
  upload.single("post"),
  async (req, res) => {
    const imageName = req.file.filename;

    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(400).json({ error: "User not Found" });
      }

      try {
        const post = new Post({
          post: imageName,
          poster: req.user,
        });

        post.save();
      } catch (error) {
        console.log("Error in creating post: ", error.message);
      }

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
