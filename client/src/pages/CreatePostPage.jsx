import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { postAPI, categoryAPI } from "../services/api";
import "../styles/Pages.css";

export const CreatePostPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    isPublished: false,
  });
  const [categories, setCategories] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getAll();
        setCategories(response.data.data);
      } catch (err) {
        console.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.content || !formData.category) {
      setError("Title, content, and category are required");
      return;
    }

    try {
      setLoading(true);
      const postFormData = new FormData();
      postFormData.append("title", formData.title);
      postFormData.append("content", formData.content);
      postFormData.append("excerpt", formData.excerpt);
      postFormData.append("category", formData.category);
      postFormData.append("tags", formData.tags);
      postFormData.append("isPublished", formData.isPublished);
      if (featuredImage) {
        postFormData.append("featuredImage", featuredImage);
      }

      const response = await postAPI.create(postFormData);
      navigate(`/posts/${response.data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-section">
        <h1>Create New Post</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              maxLength="100"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows="3"
              maxLength="200"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content*</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows="10"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="e.g., react, nodejs, javascript"
            />
          </div>

          <div className="form-group">
            <label htmlFor="featuredImage">Featured Image</label>
            <input
              type="file"
              id="featuredImage"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleInputChange}
            />
            <label htmlFor="isPublished">Publish immediately</label>
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};
