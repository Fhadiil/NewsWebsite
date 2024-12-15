import React, { useEffect, useState } from "react";
import API from "../services/api";
import ArticleCard, { FeaturedArticleCard } from "../components/ArticleCard";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await API.get("articles/");
        setArticles(response.data);
        console.log(response.data)
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return (
    <div className="container-fluid">
      {/* Top Advertisement Section */}
      <div className="container my-4">
        <div className="bg-light p-5 text-center rounded">
          <p className="text-muted fw-bold">ADVERTISEMENT</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="row">
          {/* Featured Article */}
          <Col md={8} className="mb-4">
            {articles.length > 0 && <FeaturedArticleCard article={articles[0]} />}
          </Col>

          {/* Headlines */}
          <Col md={4} className="mb-4">
            <h3 className="fw-bold mb-3">HEADLINES</h3>
            {articles.slice(1, 5).map((article) => (
              <div key={article.id} className="mb-3">
                <h5 className="fw-bold">{article.title}</h5>
                <p className="text-muted small">{article.category.name}</p>
              </div>
            ))}
          </Col>
        </div>

        {/* Article List */}
        <div className="row mt-4">
          <h2 className="fw-bold mb-4">Latest News</h2>
          {articles.slice(1).map((article) => (
            <Col md={4} key={article.id} className="mb-4">
              <ArticleCard article={article} />
            </Col>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
