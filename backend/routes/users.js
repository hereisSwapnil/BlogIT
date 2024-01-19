const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const verifyToken = require("../verifyToken");

const router = express.Router();

// update user details
router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    const { password, ...info } = updatedUser._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete user
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ userId: req.params.id });
    await Post.deleteMany({ userId: req.params.id });
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
