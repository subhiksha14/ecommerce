import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import UserView from "./components/UserView";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import AddLiveClass from "./components/addliveclass";
import LiveClassesList from "./components/liveclasseslist";

const App = () => {
  const [user, setUser] = useState(null);

  // 🔹 Check localStorage to keep user logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");

    if (token && role && userId && username) {
      setUser({ token, role, userId, username });
    }
  }, []);

  return (
    <Router>
      {/* 🔹 Navbar (Visible only after login) */}
      {user && (
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 40px",
            background: "linear-gradient(90deg, #9333ea, #ec4899)",
            color: "white",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>🎨 Art Gallery</h2>

          <div style={{ display: "flex", gap: "20px" }}>
            {user.role === "user" && (
              <>
                <Link to="/user" style={linkStyle}>Home</Link>
                <Link to="/live-classes" style={linkStyle}>Live Classes</Link>
              </>
            )}

            {user.role === "admin" && (
              <>
                <Link to="/admin" style={linkStyle}>Dashboard</Link>
                <Link to="/add-live-class" style={linkStyle}>Add Live Class</Link>
                <Link to="/live-classes" style={linkStyle}>View Live Classes</Link>
              </>
            )}
          </div>
        </nav>
      )}

      {/* 🔹 App Routes */}
      <Routes>
        {/* 🏠 Default: Login or Redirect */}
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

        {/* 📝 Signup */}
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/" />}
        />

        {/* 🧑‍💼 Admin Dashboard */}
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

        {/* 👤 User Dashboard */}
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

        {/* 🎥 Live Classes (Both Roles Can View) */}
        <Route path="/live-classes" element={<LiveClassesList />} />

        {/* 🧑‍🎨 Add Live Class (Admin Only) */}
        <Route
          path="/add-live-class"
          element={
            user?.role === "admin" ? (
              <AddLiveClass />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>

      {/* 🔹 Footer */}
      {user && (
        <footer
          style={{
            textAlign: "center",
            padding: "12px",
            marginTop: "20px",
            background: "#111",
            color: "#aaa",
            fontSize: "14px",
          }}
        >
          © 2025 Art Gallery — Empowering Artists & Learners 🌈
        </footer>
      )}
    </Router>
  );
};

// 🔹 Link styles
const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
  transition: "0.3s",
};
linkStyle[":hover"] = { color: "#ffd700" };

export default App;
