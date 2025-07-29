// src/components/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      // 🔐 Save login details
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("username", res.data.username); // Store username


setUser({
  token: res.data.token,
  role: res.data.role,
  userId: res.data.userId,
  username: res.data.username, // ✅ use 'res', not 'response'
});


      // 🔁 Redirect
      navigate(res.data.role === "admin" ? "/admin" : "/user");
    } catch (err) {
      setError("Invalid credentials 😓");
    }
  };

  return (
    <div className="login-container">
      <h2>Login 🔐</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-msg">{error}</p>}
      </form>

      <p className="signup-link">
        Don’t have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
