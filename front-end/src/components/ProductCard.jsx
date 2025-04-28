import React from 'react';
import "./ProductCard.css"
import { API_BASE_URL } from '../utils/auth';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const imageUrl = product.image;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={product.name} className="product-image" />

      <div className="product-details">
        <h3>{product.name}</h3>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>

        <div className="product-actions">
          <button className="edit-button" onClick={() => onEdit(product)}>Edit</button>
          <button className="delete-button" onClick={() => onDelete(product._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
