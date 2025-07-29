import React, { useEffect, useState } from 'react';
import { fetchProducts } from './api';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.title} - ${product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
