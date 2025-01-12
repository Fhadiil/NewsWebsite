import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
      <Toaster />
      <Navbar />
      <div className="container mt-4 main-content">
        <AppRoutes />
      </div>
      <Footer />
    </Router>
  );
};

export default App;
