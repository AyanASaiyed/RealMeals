import express from "express";
import { getPosts, createPost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/create", createPost);

export default router;
