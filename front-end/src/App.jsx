import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GetStartedPage from './pages/GetStartedPage/GetStartedPage';
import HomePage from './pages/HomePage/HomePage';
import AdminHomePage from './pages/AdminHomePage/AdminHomePage';
import AdminLoginPage from './pages/AdminLoginPage/AdminLoginPage';
import AddProductPage from './pages/AddProductPage/AddProductPage';
import EditProductPage from './pages/EditProductPage/EditProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin/home" element={<AdminHomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/add-product" element={<AddProductPage />} />
        <Route path="/admin/edit-product/:id" element={<EditProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
