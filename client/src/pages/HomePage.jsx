import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../services/api";
import { PostCard } from "../components/PostCard";
import { Pagination } from "../components/Pagination";
import "../styles/Pages.css";

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await postAPI.getAll(page, 6);
        setPosts(response.data.data);
        setPagination(response.data.pagination);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="container">
      <header className="page-header">
        <h1>Latest Blog Posts</h1>
        <p>Discover interesting articles and insights</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="no-posts">No posts available yet.</div>
      ) : (
        <>
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onClick={() => handlePostClick(post._id)}
              />
            ))}
          </div>

          {pagination.pages > 1 && (
            <Pagination
              page={page}
              totalPages={pagination.pages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};
