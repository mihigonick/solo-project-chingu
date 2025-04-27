import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import './AdminHomePage.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import authFetch from '../../utils/auth';
import { API_BASE_URL } from '../../utils/auth';

const AdminHomePage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await authFetch(`${API_BASE_URL}/admin/products`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch products');
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await authFetch(`${API_BASE_URL}/admin/products/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');

      setProducts(products.filter((p) => p._id !== id));
      alert(data.message || 'Product deleted');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (product) => {
    navigate(`/admin/edit-product/${product._id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="admin-home-container">
      <header className="header">
        <h1 className="logo">Kenny Store</h1>
        <button className="admin-button" onClick={handleLogout}>Logout</button>
      </header>
      <div className="admin-home-content">
        <h1 className="admin-home-heading">Admin Dashboard</h1>
        <Link to="/admin/add-product">
          <button className="admin-button">Add Product</button>
        </Link>
        {error && <p className="admin-home-error">{error}</p>}
        {products.length === 0 ? (
          <p className="admin-home-no-products">No products found.</p>
        ) : (
          <div className="product-list-container">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;
