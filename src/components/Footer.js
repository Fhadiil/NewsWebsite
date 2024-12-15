import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <div className="bg-light text-dark py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="fw-bold">About Us</h5>
            <p className="text-muted">
              We are The News, your go-to source for the latest news, articles, and updates from around the world. Stay informed with unbiased and in-depth reporting.
            </p>
          </Col>
          <Col md={4}>
            <h5 className="fw-bold">Quick Links</h5>
            <Nav className="flex-column">
              <Link to="/">Home</Link>
              <Link to="/business">Business</Link>
              <Link to="/technology">Technology</Link>
              <Link to="/politics">Politics</Link>
              <Link to="/sports">Sports</Link>
              <Link to="/entertainment">Entertainment</Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5 className="fw-bold">Follow US</h5>
            <div className="d-flex">
              <a href="https://facebook.com" className="text-dark me-2">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-dark me-2">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-dark me-2">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" className="text-dark">
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
