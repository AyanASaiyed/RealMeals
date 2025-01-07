import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt01;

    if (!token) {
      return res
        .status(401)
        .json({ error: "unauthorized - no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "unauthorized - invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }

    console.log("Token from prot: ", token);
    req.user = user;

    next();
  } catch (error) {
    console.log("error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal Sever Error in middleware" });
  }
};

export default protectedRoute;
