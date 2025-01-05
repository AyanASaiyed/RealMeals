import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;
const postSchema = new Schema(
  {
    post: {
      type: String,
      default: "no photo",
    },
    poster: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);

export default Post;
