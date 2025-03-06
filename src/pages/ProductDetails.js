import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./ProductDetails.css";
import { Link } from "react-router-dom";

const ProductDetails = ({ updateCartCount }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
      axios.get("https://fakestoreapi.com/products").then((response) => {
        setSimilarProducts(response.data.filter((p) => p.category === res.data.category && p.id !== res.data.id));
      });
    });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.push({ ...product, quantity: Number(quantity) });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(cart.reduce((total, item) => total + item.quantity, 0)); // Update cart count
    //alert("Product added to cart!");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <div className="product-details">
        <img src={product.image} alt={product.title} className="details-image" />
        <div className="details-info">
          <h1 className="details-title">{product.title}</h1>
          <p className="details-description">{product.description}</p>
          <p className="details-price">Price: ${product.price}</p>
          <p className="details-category">Category: {product.category}</p>
          <div className="cart-options">
            <input type="number" min="1" value={quantity} className="quantity-input" onChange={(e) => setQuantity(e.target.value)} />
            <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
      <h2 className="similar-title">Similar Products</h2>
      <Swiper slidesPerView={3} spaceBetween={10} className="similar-products">
        {similarProducts.map((p) => (
          <SwiperSlide key={p.id}>
            <Link to={`/product/${p.id}`} className="product-link">
              <div className="similar-product-card">
                <img src={p.image} alt={p.title} width="100" height="150"/>
                <p>{p.title}</p>
                <p>${p.price}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductDetails;
