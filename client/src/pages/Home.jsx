// Home.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

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
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  // Parse search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') || '');
  }, [location.search]);

  // Fetch product list once
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleCardClick = (product) => setSelected(product);
  const handleBack = () => setSelected(null);

  const addToFav = async (productId) => {
    if (!user) {
      alert('Please log in first');
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/users/favorite/${user.email}`,
        { productId }
      );
      alert('Added to favourites 🎉');
    } catch (err) {
      console.error('Add-fav error:', err);
      alert('Could not add favourite');
    }
  };

  const getSpecRows = (longDescription) => {
    if (!longDescription) return [];
    const specs = longDescription.split(',').map((s) => s.split(':'));
    while (specs.length < 25) specs.push(['', '']);
    return specs.slice(0, 25);
  };

  // Filter products by search term (case-insensitive, matches title or description)
  const filteredProducts = searchTerm
    ? products.filter(
        (p) =>
          p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div>
      <h2>Products</h2>

      {selected ? (
        <div>
          <button onClick={handleBack} style={{ marginBottom: '16px' }}>
            ← Back
          </button>

          <table style={tableStyle}>
            <tbody>
              <tr>
                <th style={thtdStyle}>Image</th>
                <td style={thtdStyle}>
                  {selected.image && (
                    <img
                      src={selected.image}
                      alt={selected.title}
                      style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                    />
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
                <td style={thtdStyle}>Rs.&nbsp;{selected.price}</td>
              </tr>
              {getSpecRows(selected.longDescription).map(([k, v], idx) => (
                <tr key={idx}>
                  <th style={thtdStyle}>{k?.trim() || ''}</th>
                  <td style={thtdStyle}>{v?.trim() || ''}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} style={{ textAlign: 'center', padding: '16px' }}>
                  <button onClick={() => addToFav(selected._id)}>❤️ Add to favourites</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {filteredProducts.map((product) => (
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
              <p>Rs.&nbsp;{product.price}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToFav(product._id);
                }}
                style={{ marginTop: 'auto' }}
              >
                ❤️ Favourite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
