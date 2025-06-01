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
  cursor: 'pointer'
};

const imageStyle = {
  width: '100%',
  height: '180px',
  objectFit: 'contain',
  borderRadius: '6px 6px 0 0',
  marginBottom: '8px'
};

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
  marginTop: '24px'
};

const thtdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left'
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleCardClick = (product) => {
    setSelected(product);
  };

  const handleBack = () => {
    setSelected(null);
  };

  // Helper to get up to 25 rows from longDescription
  const getSpecRows = (longDescription) => {
    if (!longDescription) return [];
    // Split by comma, then by colon
    const specs = longDescription.split(',').map(spec => spec.split(':'));
    // Pad to 25 rows if needed
    while (specs.length < 25) {
      specs.push(['', '']);
    }
    return specs.slice(0, 25);
  };

  return (
    <div>
      <h2>Products</h2>
      {selected ? (
        <div>
          <button onClick={handleBack} style={{ marginBottom: '16px' }}>Back</button>
          <table style={tableStyle}>
            <tbody>
              <tr>
                <th style={thtdStyle}>Image</th>
                <td style={thtdStyle}>
                  {selected.image && (
                    <img src={selected.image} alt={selected.title} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
                  )}
                </td>
              </tr>
              <tr>
                <th style={thtdStyle}>Title</th>
                <td style={thtdStyle}>{selected.title}</td>
              </tr>
              <tr>
                <th style={thtdStyle}>Description</th>
                <td style={thtdStyle}>{selected.description}</td>
              </tr>
              <tr>
                <th style={thtdStyle}>Price</th>
                <td style={thtdStyle}>Rs. {selected.price}</td>
              </tr>
              {/* Show up to 25 specification rows */}
              {getSpecRows(selected.longDescription).map(([key, value], idx) => (
                <tr key={idx}>
                  <th style={thtdStyle}>{key ? key.trim() : ''}</th>
                  <td style={thtdStyle}>{value ? value.trim() : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {products.map((product) => (
              <div
                key={product._id}
                style={cardStyle}
                onClick={() => handleCardClick(product)}
              >
                {product.image && (
                  <img src={product.image} alt={product.title} style={imageStyle} />
                )}
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>Rs. {product.price}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Home;