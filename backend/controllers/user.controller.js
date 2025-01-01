export const self = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ error: "No user found" });
    }

    res.status(200).json(user.username);
  } catch (error) {
    console.log("Error getting user: " + error.message);
    res.status(400).json({ error: "Error getting user." });
  }
};
