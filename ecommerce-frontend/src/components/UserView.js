// src/components/UserView.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const UserView = ({user, setUser }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [view, setView] = useState("products");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleBuyNow = (product) => {
    alert(`Buying: ${product.name}`);
  };

  const toggleWishlist = (product) => {
    const isWishlisted = wishlist.find((item) => item._id === product._id);
    if (isWishlisted) {
      setWishlist(wishlist.filter((item) => item._id !== product._id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const handleLogout = () => {
    localStorage.clear();      // ✅ clear token
    setUser(null);             // ✅ remove user state
    navigate("/");             // ✅ go to login
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayList =
    view === "wishlist"
      ? wishlist
      : view === "cart"
      ? cart
      : filteredProducts;

  return (
    <div className="user-view">
      <div className="top-bar">
        <button onClick={() => setView("products")}>User View</button>
        <button onClick={() => setView("cart")}>🛒 View Cart ({cart.length})</button>
        <button onClick={() => setView("wishlist")}>❤️ Wishlist ({wishlist.length})</button>
        <button onClick={handleLogout}>🔓 Logout</button>
      </div>
<h1>Hello, {user?.username || localStorage.getItem("username")} 👋</h1>



      {view === "products" && (
        <input
          type="text"
          className="search-bar"
          placeholder="Search product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}

      {view === "cart" && cart.length === 0 && (
        <p className="wishlist-empty">Your cart is empty.</p>
      )}

      {view === "wishlist" && wishlist.length === 0 && (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      )}

      <div className="product-list">
        {displayList.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <p>{product.description}</p>

            <div className="action-buttons">
              <button className="add-btn" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <button className="buy-btn" onClick={() => handleBuyNow(product)}>
                Buy Now
              </button>
              <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(product)}
              >
                {wishlist.find((item) => item._id === product._id) ? "❤" : "♡"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserView;
