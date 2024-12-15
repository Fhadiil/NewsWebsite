import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { FaClock, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await API.get(`articles/${id}`);
        setArticle(response.data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetail();
  }, [id]);

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

  if (!article) return null;

  const { title, content, image, created_at, category, author } = article;

  return (
    <Container className="my-4">
      <Row>
        <Col md={8} className="mx-auto">
          <div className="card border-0">
            <img
              src={image}
              alt={title}
              className="card-img-top rounded-3"
            />
            <div className="card-body">
              <span className="badge bg-info mb-2">
                {category ? category.name : "Uncategorized"}
              </span>
              <h2 className="card-title fw-bold mb-3">{title}</h2>
              <div className="d-flex text-muted small mb-3">
                <div className="me-3 d-flex align-items-center">
                  <FaUser className="me-1" />
                  <span>{author ? author.username : "Anonymous"}</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaClock className="me-1" />
                  <span>{new Date(created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="card-text text-muted">{content}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleDetail;
