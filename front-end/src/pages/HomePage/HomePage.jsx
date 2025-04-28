import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../utils/auth';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-heading">Products</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button className="add-to-cart-button">Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
