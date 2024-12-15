import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaClock, FaUser, FaShareAlt } from 'react-icons/fa';

// Featured Article Card
const FeaturedArticleCard = ({ article }) => {
  return (
    <div className="card mb-4 border-0">
      <div className="row g-0">
        {/* Image Section */}
        <div className="col-md-6 pe-md-3">
          <img 
            src={article.imageUrl || '/api/placeholder/600/400'}
            alt={article.title}
            className="img-fluid rounded-3 w-100 h-100 object-cover"
          />
        </div>
        
        {/* Content Section */}
        <div className="col-md-6 d-flex align-items-center">
          <div className="card-body p-0 ps-md-3">
            {/* Category Badge */}
            <span className="badge bg-primary mb-2">
              {article.category}
            </span>
            
            {/* Title */}
            <h2 className="card-title fw-bold mb-3">
              {article.title}
            </h2>
            
            {/* Article Meta */}
            <div className="d-flex text-muted mb-3">
              <div className="me-3 d-flex align-items-center">
                <FaUser className="me-2" />
                <span>{article.author}</span>
              </div>
              <div className="d-flex align-items-center">
                <FaClock className="me-2" />
                <span>{article.publishedDate}</span>
              </div>
            </div>
            
            {/* Description */}
            <p className="card-text text-muted">
              {article.description.substring(0, 250)}...
            </p>
            
            {/* Read More Button */}
            <a href={`/article/${article.slug}`} className="btn btn-outline-primary">
              Read Full Article
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Vertical Article Card
const VerticalArticleCard = ({ article }) => {
  return (
    <div className="card h-100 border-0">
      <img 
        src={article.imageUrl || '/api/placeholder/400/300'}
        alt={article.title}
        className="card-img-top rounded-3"
      />
      
      <div className="card-body px-0">
        <span className="badge bg-info mb-2">
          {article.category}
        </span>
        
        <h5 className="card-title fw-bold mb-2">
          {article.title}
        </h5>
        
        <div className="d-flex text-muted small mb-2">
          <div className="me-3 d-flex align-items-center">
            <FaUser className="me-1" />
            <span>{article.author}</span>
          </div>
          <div className="d-flex align-items-center">
            <FaClock className="me-1" />
            <span>{article.publishedDate}</span>
          </div>
        </div>
        
        <p className="card-text text-muted">
          {article.description.substring(0, 100)}...
        </p>
        
        <a 
          href={`/article/${article.slug}`} 
          className="stretched-link text-decoration-none"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

// Example Usage Component
const ArticleSection = () => {
  const sampleArticles = [
    {
      id: 1,
      title: 'Breaking: Major Tech Innovation Unveiled',
      category: 'Technology',
      author: 'John Doe',
      publishedDate: '2 hours ago',
      description: 'A groundbreaking technology that promises to revolutionize...',
      imageUrl: '/api/placeholder/800/600',
      slug: 'tech-innovation-2024'
    },
    {
        id: 2,
        title: 'Breaking: Major Tech Innovation Unveiled',
        category: 'Technology',
        author: 'John Doe',
        publishedDate: '2 hours ago',
        description: 'A groundbreaking technology that promises to revolutionize...',
        imageUrl: '/api/placeholder/800/600',
        slug: 'tech-innovation-2024'
      },
    // Add more sample articles
  ];

  return (
    <div className="container">
      <div className="row">
        {/* Featured Article */}
        <div className="col-12 mb-4">
          <FeaturedArticleCard article={sampleArticles[0]} />
        </div>
        
        {/* Grid of Articles */}
        <div className="col-12">
          <div className="row">
            {sampleArticles.slice(1).map(article => (
              <div key={article.id} className="col-md-4 mb-4">
                <VerticalArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSection;