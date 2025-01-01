import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);

export default Post;
