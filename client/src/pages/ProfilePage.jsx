import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { postAPI } from "../services/api";
import { PostCard } from "../components/PostCard";
import "../styles/Pages.css";

export const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const response = await postAPI.getAll(1, 100);
        const posts = response.data.data.filter(
          (post) => post.author._id === user._id
        );
        setUserPosts(posts);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user, navigate]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container">
      <header className="page-header">
        <h1>My Profile</h1>
      </header>

      <div className="profile-section">
        <div className="profile-card">
          <h2>{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <p className="profile-stats">
            Published Posts: <strong>{userPosts.length}</strong>
          </p>
          {user.bio && <p className="profile-bio">{user.bio}</p>}
        </div>
      </div>

      <section className="my-posts-section">
        <h3>My Posts</h3>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading your posts...</div>
        ) : userPosts.length === 0 ? (
          <div className="no-posts">
            You haven't published any posts yet. Create one to get started!
          </div>
        ) : (
          <div className="posts-grid">
            {userPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onClick={() => handlePostClick(post._id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
