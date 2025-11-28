const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Public routes
router.get("/", postController.getAllPosts);
router.get("/search", postController.searchPosts);
router.get("/slug/:slug", postController.getPostBySlug);
router.get("/category/:slug", postController.getPostsByCategory);
router.get("/:id", postController.getPostById);

// Protected routes
router.post(
  "/",
  authMiddleware,
  upload.single("featuredImage"),
  postController.createPost
);
router.put(
  "/:id",
  authMiddleware,
  upload.single("featuredImage"),
  postController.updatePost
);
router.delete("/:id", authMiddleware, postController.deletePost);
router.post("/:id/comments", authMiddleware, postController.addComment);

module.exports = router;
