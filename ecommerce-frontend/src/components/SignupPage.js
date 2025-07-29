// src/components/SignupPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        password,
        role: "user", // 👤 All signups here are users by default
      });
      alert("✅ Signup successful! Please log in now.");
      navigate("/"); // ✅ redirect to login page ("/" is login)
    } catch (err) {
      console.error("Signup error:", err);
      setError("⚠️ Signup failed. Try a different username.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up 👤</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
