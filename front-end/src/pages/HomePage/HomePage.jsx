import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8080/api/products');
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
            <img src={`http://localhost:8080/images/${product.image}`} alt={product.name} />
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
