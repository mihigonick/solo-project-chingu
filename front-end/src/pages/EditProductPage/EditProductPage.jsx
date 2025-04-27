import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authFetch from '../../utils/auth';
import { API_BASE_URL } from '../../utils/auth';
import './EditProductPage.css';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/admin/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch product');
        setName(data.name);
        setCategory(data.category);
        setDescription(data.description);
        setPrice(data.price);
        setImageUrl(`${API_BASE_URL.slice(0, -4)}images/${data.image}`);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id, navigate]);

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

      const res = await authFetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'PATCH',
        body: formData,
      });

      let data;
      if (res.headers.get('Content-Type')?.includes('application/json')) {
        data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to update product');
        }
      } else {
        data = await res.text();
        if (!res.ok) {
          throw new Error(data || 'Failed to update product');
        }
      }

      setSuccess('Product updated successfully!');
      setError('');
      navigate('/admin/home');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="edit-product-container">
      <h1 className="edit-product-heading">Edit Product</h1>
      {error && <p className="edit-product-error">{error}</p>}
      {success && <p className="edit-product-success">{success}</p>}
      {imageUrl && <img src={imageUrl} alt="Product" className="edit-product-image" />}
      <form onSubmit={handleSubmit} className="edit-product-form">
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
        <button type="submit" className="edit-product-button">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
