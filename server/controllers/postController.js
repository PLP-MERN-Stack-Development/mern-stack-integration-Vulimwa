const Post = require("../models/Post");
const Category = require("../models/Category");
const { body, validationResult } = require("express-validator");

// Get all posts with pagination
exports.getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ isPublished: true })
      .populate("author", "name email avatar")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({ isPublished: true });

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get single post by ID
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email avatar bio")
      .populate("category", "name slug")
      .populate("comments.user", "name avatar");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Increment view count
    await post.incrementViewCount();

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// Get post by slug
exports.getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate("author", "name email avatar bio")
      .populate("category", "name slug")
      .populate("comments.user", "name avatar");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.incrementViewCount();

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// Create new post
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, excerpt, category, tags, isPublished } = req.body;

    const post = new Post({
      title,
      content,
      excerpt,
      category,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      isPublished: isPublished || false,
      author: req.user.id,
      featuredImage: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await post.save();
    await post.populate("author", "name email avatar");
    await post.populate("category", "name slug");

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });
    }

    const { title, content, excerpt, category, tags, isPublished } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (excerpt) post.excerpt = excerpt;
    if (category) post.category = category;
    if (tags) post.tags = tags.split(",").map((tag) => tag.trim());
    if (isPublished !== undefined) post.isPublished = isPublished;
    if (req.file) post.featuredImage = `/uploads/${req.file.filename}`;

    await post.save();
    await post.populate("author", "name email avatar");
    await post.populate("category", "name slug");

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// Delete post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Search posts
exports.searchPosts = async (req, res, next) => {
  try {
    const { q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const searchQuery = {
      isPublished: true,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { tags: { $in: [new RegExp(q, "i")] } },
      ],
    };

    const posts = await Post.find(searchQuery)
      .populate("author", "name email avatar")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(searchQuery);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Filter posts by category
exports.getPostsByCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ category: category._id, isPublished: true })
      .populate("author", "name email avatar")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments({
      category: category._id,
      isPublished: true,
    });

    res.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Add comment to post
exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.addComment(req.user.id, content);
    await post.populate("comments.user", "name avatar");

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};
