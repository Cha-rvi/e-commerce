import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import "./App.css";

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, []);

  const updateCartCount = (count) => {
    setCartCount(count);
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-logo">E-commerce</Link>
        <div className="cart-icon">
          🛒 <span className="cart-count">{cartCount}</span>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails updateCartCount={updateCartCount} />} />
      </Routes>
    </Router>
  );
}

export default App;
