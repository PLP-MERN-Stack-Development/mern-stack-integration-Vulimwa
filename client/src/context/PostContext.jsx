import React, { createContext, useState, useCallback } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePosts = useCallback((newPosts) => {
    setPosts(newPosts);
  }, []);

  const updateCategories = useCallback((newCategories) => {
    setCategories(newCategories);
  }, []);

  const updatePagination = useCallback((newPagination) => {
    setPagination(newPagination);
  }, []);

  const setLoading_ = useCallback((isLoading) => {
    setLoading(isLoading);
  }, []);

  const setError_ = useCallback((err) => {
    setError(err);
  }, []);

  const value = {
    posts,
    categories,
    pagination,
    loading,
    error,
    updatePosts,
    updateCategories,
    updatePagination,
    setLoading: setLoading_,
    setError: setError_,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
