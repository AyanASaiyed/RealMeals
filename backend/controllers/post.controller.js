import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
  res.send("Get Post Route");
};

// export const createPost = async (req, res) => {
//   const imageName = req.file.filename;

//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(400).json({ error: "User not Found" });
//     }

//     const post = new Post({
//       post: imageName,
//     });

//     post.save();

//     console.log("Image Saved in DB");

//     return res.status(200).json("ok");
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: "Internal Server Error on createPost" });
//   }
// };
