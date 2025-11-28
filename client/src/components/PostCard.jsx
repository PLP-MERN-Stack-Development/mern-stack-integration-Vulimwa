import React from "react";
import "../styles/PostCard.css";

export const PostCard = ({ post, onClick }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="post-card">
      {post.featuredImage && (
        <div className="post-card-image">
          <img src={post.featuredImage} alt={post.title} />
        </div>
      )}
      <div className="post-card-content">
        <h2 className="post-card-title">{post.title}</h2>
        <div className="post-card-meta">
          <span className="post-author">{post.author?.name}</span>
          <span className="post-date">{formatDate(post.createdAt)}</span>
          {post.category && (
            <span className="post-category">{post.category.name}</span>
          )}
        </div>
        <p className="post-excerpt">
          {post.excerpt || post.content.substring(0, 150)}...
        </p>
        <div className="post-footer">
          <span className="post-views">{post.viewCount} views</span>
          <button onClick={onClick} className="btn-read-more">
            Read More
          </button>
        </div>
      </div>
    </article>
  );
};
