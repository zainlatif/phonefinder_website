import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import ProductDetails from '../components/ProductDetails';

const FavorateProduct = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      axios.get(`http://localhost:5000/api/users/${parsed.email}`)
        .then(async (res) => {
          if (res.data.favorites && res.data.favorites.length > 0) {
            const favProducts = await Promise.all(
              res.data.favorites.map(id =>
                axios.get(`http://localhost:5000/api/products/${id}`).then(r => r.data)
              )
            );
            setFavorites(favProducts);
          } else {
            setFavorites([]);
          }
        })
        .catch(err => console.error('Error fetching favorites:', err));
    }
  }, []);

  const handleRemoveFavorite = async (productId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/users/unfavorite/${user.email}`,
        { productId }
      );
      setFavorites(favorites.filter(fav => fav._id !== productId));
      // If the removed product is currently selected, close details view
      if (selectedProduct && selectedProduct._id === productId) {
        setSelectedProduct(null);
      }
    } catch (err) {
      alert('Error removing favorite');
    }
  };

  if (!user) return <p>Please login to view your favorite products.</p>;

  // Show product details if a card is clicked
  if (selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <div>
      <h2>Favorite Products</h2>
      {favorites.length === 0 ? (
        <p>No favorite products.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {favorites.map(product => (
            <Card
              key={product._id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavorateProduct;