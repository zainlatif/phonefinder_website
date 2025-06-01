import { useEffect, useState } from 'react';
import axios from 'axios';

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  maxWidth: '200px',
  width: '200px',
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const imageStyle = {
  width: '100%',
  height: '180px',
  objectFit: 'contain',
  borderRadius: '6px 6px 0 0',
  marginBottom: '8px'
};

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {products.map((product) => (
            <div key={product._id} style={cardStyle}>
              {product.image && (
                <img src={product.image} alt={product.title} style={imageStyle} />
              )}
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Rs. {product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
