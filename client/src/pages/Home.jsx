import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products') // adjust if backend is on another port
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div key={product._id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Rs. {product.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
