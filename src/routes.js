import React from "react";
import { Routes, Route } from "react-router-dom";
import ArticleDetail from "./components/ArticleDetail";
import ArticleList from "./components/ArticleList";
import HomePage from "./pages/HomePage";
import ArticleSection from "./components/FeaturedArticleCard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/article" element={<ArticleList />} />
      <Route path="/articles" element={<ArticleSection />} />
      <Route path="/article/:id" element={<ArticleDetail />} />
    </Routes>
  );
};

export default AppRoutes;
