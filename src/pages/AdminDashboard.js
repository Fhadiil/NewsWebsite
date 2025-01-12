import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    author: "",
    image: null,
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState({});
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "https://newswebsite-backend-d4ve.onrender.com/api";

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/articles/`);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/`);
      const categoryMap = response.data.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
      }, {});
      setCategories(categoryMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/`);
      const userMap = response.data.reduce((acc, user) => {
        acc[user.id] = user.username;
        return acc;
      }, {});
      setUsers(userMap);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchArticles(), fetchCategories(), fetchUsers()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFormData({ ...formData, image: file });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.content ||
      !formData.category ||
      !formData.author
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });

    try {
      if (selectedArticle) {
        await axios.put(
          `${API_BASE_URL}/articles/${selectedArticle.id}/`,
          formPayload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post(`${API_BASE_URL}/articles/`, formPayload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      alert(`Article ${selectedArticle ? "updated" : "created"} successfully!`);
      setFormData({
        title: "",
        content: "",
        category: "",
        author: "",
        image: null,
      });
      setSelectedArticle(null);
      fetchArticles();
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save article. Please check the input fields.");
    }
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category, // Use category ID
      author: article.author, // Use author ID
      image: article.image, // Pre-fill image URL
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await axios.delete(`${API_BASE_URL}/articles/${id}/`);
        fetchArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title mb-4">
                {selectedArticle ? "Edit Article" : "Create Article"}
              </h2>
              <form onSubmit={handleFormSubmit}>
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows="5"
                    required
                  ></textarea>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {Object.entries(categories).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div className="mb-3">
                  <label className="form-label">Author</label>
                  <select
                    className="form-select"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Author</option>
                    {Object.entries(users).map(([id, username]) => (
                      <option key={id} value={id}>
                        {username}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image */}
                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleFileChange}
                  />
                  {selectedArticle && selectedArticle.image && (
                    <div>
                      <img
                        src={selectedArticle.image}
                        alt="article-preview"
                        width="100"
                        height="100"
                      />
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-100">
                  {selectedArticle ? "Update" : "Create"}
                </button>

                {/* Cancel */}
                {selectedArticle && (
                  <button
                    type="button"
                    className="btn btn-secondary w-100 mt-2"
                    onClick={() => setSelectedArticle(null)}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Articles</h2>
              {loading ? (
                <p>Loading articles...</p>
              ) : (
                <ul className="list-group">
                  {articles.map((article) => (
                    <li
                      key={article.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <h5>{article.title}</h5>
                        <p>{article.content.slice(0, 50)}...</p>
                        <small>
                          <strong>Author:</strong>{" "}
                          {users[article.author] || "Unknown"} <br />
                          <strong>Category:</strong>{" "}
                          {categories[article.category] || "Uncategorized"}
                        </small>
                      </div>
                      <div>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(article)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(article.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
