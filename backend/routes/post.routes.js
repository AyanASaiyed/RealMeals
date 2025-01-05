import express from "express";
import { getPosts, createPost } from "../controllers/post.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/get", getPosts);
router.post("/create", protectedRoute,createPost);

export default router;
