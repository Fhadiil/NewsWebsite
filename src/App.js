import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import Navbar from './components/Navbar'
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <AppRoutes />
      </div>
      <Footer />
    </Router>
  );
};

export default App;
