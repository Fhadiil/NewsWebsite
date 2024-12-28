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
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = "http://127.0.0.1:8000/api"; // Update to match your backend

  // Fetch articles, categories, and users
  useEffect(() => {
    fetchArticles();
    fetchCategories();
    fetchUsers();
  }, []);

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
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Ensure all required fields are present
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
    formPayload.append("title", formData.title);
    formPayload.append("content", formData.content);
    formPayload.append("category", formData.category); // Send as ID
    formPayload.append("author", formData.author); // Send as ID
    if (formData.image && formData.image !== selectedArticle?.image) {
      formPayload.append("image", formData.image); // File upload
    }

    try {
      let response;
      if (selectedArticle) {
        // Update existing article
        response = await axios.put(
          `${API_BASE_URL}/articles/${selectedArticle.id}/`,
          formPayload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Create new article
        response = await axios.post(`${API_BASE_URL}/articles/`, formPayload, {
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
      if (error.response && error.response.data) {
        console.error("Response data:", error.response.data);
        alert("Failed to save article. Please check the input fields.");
      }
    }
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category.id, // Use category ID
      author: article.author.id, // Use author ID
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
      <h1>Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>{selectedArticle ? "Edit Article" : "Create Article"}</h2>
          <form onSubmit={handleFormSubmit}>
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
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
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
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={handleFileChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {selectedArticle ? "Update" : "Create"}
            </button>
            {selectedArticle && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setSelectedArticle(null);
                  setFormData({
                    title: "",
                    content: "",
                    category: "",
                    author: "",
                    image: null,
                  });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
        <div className="col-md-6">
          <h2>Articles</h2>
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
                      <strong>Author:</strong> {article.author.username} <br />
                      <strong>Category:</strong> {article.category.name}
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
  );
};

export default AdminDashboard;
