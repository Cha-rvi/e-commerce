import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductListing.css";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data);
      const uniqueCategories = ["All", ...new Set(response.data.map((p) => p.category))];
      setCategories(uniqueCategories);
    });
  }, []);

  const filterProducts = useCallback(() => {
    let filtered = products.filter((p) => p.price <= maxPrice);
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [products, selectedCategory, maxPrice]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  return (
    <div className="container">
      <h1 className="title">Product Listing</h1>
      <div className="filters">
        <select className="filter-dropdown" onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          className="price-slider"
          type="range"
          min="5"
          max="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <span className="price-text">Max Price: ${maxPrice}</span>
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-cards">
            <Link to={`/product/${product.id}`} className="product-link">
              <div className="product-card">
                <img src={product.image} alt={product.title} className="product-image" />
                <p className="product-title">{product.title}</p>
                <p className="product-price">${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
