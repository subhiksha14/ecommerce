// src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🧭 Navigation
import "../index.css";

const API = process.env.REACT_APP_API || "http://localhost:5000";

const AdminDashboard = ({ setUser }) => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API}/api/products/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post(`${API}/api/products`, formData);
      }
      setFormData({ name: "", price: "", description: "", image: "" });
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err.message);
    }
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();   // ✅ Clear token, role, userId
    setUser(null);          // ✅ Update app state
    navigate("/");          // 🔁 Redirect to login
  };

  return (
    <div className="app-container">
      <h1>Admin Dashboard 🛠️</h1>

      <button onClick={handleLogout} style={{ marginBottom: "1rem", background: "#ff4d4d", padding: "8px 16px", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
        🔓 Logout
      </button>

      <form onSubmit={handleSubmit} className="form">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
        <button type="submit">{editId ? "Update" : "Add"} Product</button>
      </form>

      <div className="product-list">
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p>{p.description}</p>
            <div className="action-buttons">
              <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
