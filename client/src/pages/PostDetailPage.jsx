import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postAPI } from "../services/api";
import "../styles/Pages.css";

export const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await postAPI.getById(id);
        setPost(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmittingComment(true);
      const response = await postAPI.addComment(id, { content: newComment });
      setPost(response.data.data);
      setNewComment("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return <div className="container loading">Loading post...</div>;
  }

  if (error) {
    return <div className="container error-message">{error}</div>;
  }

  if (!post) {
    return <div className="container no-posts">Post not found.</div>;
  }

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn-back">
        Back
      </button>

      <article className="post-detail">
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="post-detail-image"
          />
        )}

        <div className="post-detail-header">
          <h1>{post.title}</h1>
          <div className="post-detail-meta">
            <span className="author">by {post.author?.name}</span>
            <span className="date">{formatDate(post.createdAt)}</span>
            {post.category && (
              <span className="category">{post.category.name}</span>
            )}
            <span className="views">{post.viewCount} views</span>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="post-detail-content">{post.content}</div>

        <section className="comments-section">
          <h2>Comments ({post.comments?.length || 0})</h2>

          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              required
              disabled={submittingComment}
              rows="4"
            />
            <button
              type="submit"
              disabled={submittingComment}
              className="btn-submit"
            >
              {submittingComment ? "Posting..." : "Post Comment"}
            </button>
          </form>

          <div className="comments-list">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <div className="comment-author">{comment.user?.name}</div>
                  <div className="comment-date">
                    {formatDate(comment.createdAt)}
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </section>
      </article>
    </div>
  );
};
