import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./database/connectToMongoDB.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(
    `Server running on PORT: ${PORT} on address: http://localhost:${PORT}`
  );
});
