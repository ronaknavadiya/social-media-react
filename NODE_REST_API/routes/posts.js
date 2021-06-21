const router = require("express").Router();
const { Promise } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

// CREATE A POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    return res.status(500).json(error);
  }
});
// UPDATE A POST
router.put("/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  try {
    if (post.userId === req.body.userId) {
      await Post.findByIdAndUpdate(req.params.postId, { $set: req.body }); // post.updateOne({ $set: req.body })
      res.status(200).json("Post has been updated");
    } else {
      res
        .status(403)
        .json("Permission denied:Can't update someone else's post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE A POST
router.delete("/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  try {
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } else {
      res
        .status(403)
        .json("Permission denied:Can't delete someone else's post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// LIKE AND DISLIKE A POST
router.put("/:postId/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("post has been unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET A POST
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL HOMEPAGE POSTS
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPost = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPost));
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
