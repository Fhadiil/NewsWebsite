import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaClock, FaUser, FaShareAlt } from "react-icons/fa";
import API from "../services/api";

const ArticleCard = ({ article }) => {
  const [categories, setCategories] = useState({});
  const [authors, setAuthors] = useState({});

  useEffect(() => {
    fetchCategories();
    fetchAuthors();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await API.get("categories/");
      const categoryMap = {};
      response.data.forEach((ctg) => {
        categoryMap[ctg.id] = `${ctg.name}`;
      });
      setCategories(categoryMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await API.get("users/");
      const authorMap = {};
      console.log(response.data);
      response.data.forEach((auth) => {
        authorMap[auth.id] = `${auth.username}`;
      });
      setAuthors(authorMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const { title, content, image, created_at, id, category, author } = article;

  return (
    <div className="card h-100 border-0">
      <img src={image} alt={title} className="card-img-top rounded-3" />

      <div className="card-body px-0">
        <span className="badge bg-info mb-2">
          {/* Display the categoty name instead of the ID */}
          {category && categories[category]
            ? categories[category]
            : "No category assigned"}
        </span>

        <h5 className="card-title fw-bold mb-2">{title}</h5>

        <div className="d-flex text-muted small mb-2">
          <div className="me-3 d-flex align-items-center">
            <FaUser className="me-1" />
            <span>
              {author && authors[author] ? authors[author] : "Anonymous"}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <FaClock className="me-1" />
            <span>{new Date(created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <p className="card-text text-muted">{content.substring(0, 100)}...</p>

        <Link
          to={`/article/${id}`}
          className="stretched-link text-decoration-none"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
const FeaturedArticleCard = ({ article }) => {
  const [categories, setCategories] = useState({});
  const [authors, setAuthors] = useState({});

  useEffect(() => {
    fetchCategories();
    fetchAuthors();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await API.get("categories/");
      const categoryMap = {};
      response.data.forEach((ctg) => {
        categoryMap[ctg.id] = `${ctg.name}`;
      });
      setCategories(categoryMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchAuthors = async () => {
    try {
      const response = await API.get("users/");
      const authorMap = {};
      console.log(response.data);
      response.data.forEach((auth) => {
        authorMap[auth.id] = `${auth.username}`;
      });
      setAuthors(authorMap);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const { title, content, image, created_at, id, category, author } = article;
  return (
    <div className="card mb-4 border-0">
      <div className="row g-0">
        {/* Image Section */}
        <div className="col-md-6 pe-md-3">
          <img
            src={image}
            alt={title}
            className="img-fluid rounded-3 w-100 h-100 object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="col-md-6 d-flex align-items-center">
          <div className="card-body p-0 ps-md-3">
            {/* Category Badge */}
            <span className="badge bg-primary mb-2">
              {/* Display the categoty name instead of the ID */}
              {category && categories[category]
                ? categories[category]
                : "Uncategorizedx"}
            </span>

            {/* Title */}
            <h2 className="card-title fw-bold mb-3">{title}</h2>

            {/* Article Meta */}
            <div className="d-flex text-muted mb-3">
              <div className="me-3 d-flex align-items-center">
                <FaUser className="me-2" />
                <span>
                  {author && authors[author] ? authors[author] : "Anonymous"}
                </span>
              </div>
              <div className="d-flex align-items-center">
                <FaClock className="me-2" />
                <span>{created_at}</span>
              </div>
            </div>

            {/* Description */}
            <p className="card-text text-muted">
              {content.substring(0, 150)}...
            </p>

            {/* Read More Button */}
            <Link to={`/article/${id}`} className="btn btn-outline-primary">
              Read Full Article
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export { FeaturedArticleCard };
export default ArticleCard;
