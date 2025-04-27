import React, { useState, useEffect } from 'react';
import './AddProductPage.css';
import { useNavigate } from 'react-router-dom';
import authFetch from '../../utils/auth';
import { API_BASE_URL } from '../../utils/auth';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('price', price);
      if (image) {
        formData.append('image', image);
      }

      const res = await authFetch(`${API_BASE_URL}/admin/products`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to add product');
      }

      setSuccess('Product added successfully!');
      setError('');
      setName('');
      setCategory('');
      setDescription('');
      setPrice('');
      setImage(null);
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="add-product-container">
      <h1 className="add-product-heading">Add Product</h1>
      {error && <p className="add-product-error">{error}</p>}
      {success && <p className="add-product-success">{success}</p>}
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="add-product-button">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage
