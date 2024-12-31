import express from "express";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/create", createPost);

export default router;
