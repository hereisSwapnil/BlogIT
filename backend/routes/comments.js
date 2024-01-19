const express = require("express");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

const router = express.Router();

// creating a new comment
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a comment by its ID
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a comment by its ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).send("Comment successfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// get post comments
router.get("/post/:postId", async (req, res) => {
  // try {
  const comments = await Comment.find({ postId: req.params.postId });
  res.status(200).json(comments);
  // } catch (error) {
  //   res.status(500).json(error);
  // }
});

module.exports = router;
