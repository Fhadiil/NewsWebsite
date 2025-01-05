import React, { useEffect, useState } from "react";
import API from "../services/api";
import ArticleCard from "../components/ArticleCard";
import { FeaturedArticleCard } from "../components/ArticleCard";
import { Row, Col, Spinner, Alert } from "react-bootstrap";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await API.get("articles/");
        setArticles(response.data);
        console.log(response.data);
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

  if (articles.length === 0) {
    return (
      <div className="text-center my-4">
        <h3>No articles available</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="mb-4">Latest News</h1>
      <div className="row">
        {/* Featured Article */}
        <div className="col-12 mb-4">
          <FeaturedArticleCard article={articles[0]} />
        </div>
      </div>
      <div className="col-12">
        <div className="row">
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

export default ArticleList;
