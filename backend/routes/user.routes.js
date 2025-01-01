import express from "express";
import { self } from "../controllers/user.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/self", protectedRoute, self);

export default router;
