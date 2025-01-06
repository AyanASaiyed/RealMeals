import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
  res.send("Get Post Route");
};

export const createPost = async (req, res) => {
  const { base64url } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }

    const post = new Post({
      post: base64url,
      poster: req.user,
    });

    post.save();
    console.log("Saving in db");
    return res.status(200).json({ post });
  } catch (error) {
    console.log("Error in createPost API: ", error.message);
  }
};
