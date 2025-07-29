// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import UserView from "./components/UserView";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username"); // ✅ Get username

    if (token && role && userId && username) {
      setUser({ token, role, userId, username }); // ✅ Include username
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <LoginPage setUser={setUser} />
            ) : (
              <Navigate to={user.role === "admin" ? "/admin" : "/user"} />
            )
          }
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <AdminDashboard setUser={setUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/user"
          element={
            user?.role === "user" ? (
              <UserView user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
