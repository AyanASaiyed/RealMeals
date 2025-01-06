import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../token/generateTokenAndSetCookie.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ error: "No user with listed username located." });
    }

    const userPass = user.password;

    const comparePass = await bcrypt.compare(password, userPass);

    if (!comparePass) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    generateTokenAndSetCookie(user._id.toString(), res);
    return res.status(200).json({
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.log("Error Logging in User: " + error.message);
  }
};

export const register = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = User({
      username,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id.toString(), res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("error registering in registration controller", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt01", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out" });
  } catch (error) {
    console.log("error logging out", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
