const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { protect } = require('../middleware/authmiddleware');

// Middleware to get post by ID
async function getPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.post = post;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ✅ GET all posts (public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET all posts by the logged-in user (protected)
router.get('/user-posts', protect, async (req, res) => {
  try {
    const posts = await Post.find({ authorId: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET posts by any user ID (protected)
router.get('/user/:userId', protect, async (req, res) => {
  try {
    const posts = await Post.find({ authorId: req.params.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET single post by ID (public)
router.get('/:id', getPost, (req, res) => {
  res.json(res.post);
});

// ✅ CREATE new post (protected)
router.post('/', protect, async (req, res) => {
  const { title, content, tags, featuredImage } = req.body;

  const post = new Post({
    title,
    content,
    tags,
    featuredImage,
    author: `${req.user.firstName} ${req.user.lastName}`,
    authorEmail: req.user.email,
    authorId: req.user._id
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ UPDATE post (only author)
router.put('/:id', protect, getPost, async (req, res) => {
  if (res.post.authorId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to update this post' });
  }

  const { title, content, tags, featuredImage } = req.body;

  if (title) res.post.title = title;
  if (content) res.post.content = content;
  if (tags) res.post.tags = tags;
  if (featuredImage) res.post.featuredImage = featuredImage;

  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE post (only author)
router.delete('/:id', protect, getPost, async (req, res) => {
  if (res.post.authorId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to delete this post' });
  }

  try {
    await res.post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
