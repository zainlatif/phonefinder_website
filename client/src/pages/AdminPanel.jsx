import { useState, useEffect } from 'react';
import axios from 'axios';

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#fafafa'
};

const btnStyle = {
  background: '#e74c3c',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '6px 12px',
  cursor: 'pointer'
};

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  };

  const handleAddProduct = () => {
    const newProduct = { title, description, price };

    axios.post('http://localhost:5000/api/products', newProduct)
      .then(() => {
        alert('Product added');
        setTitle('');
        setDescription('');
        setPrice('');
        fetchProducts();
      })
      .catch((err) => console.error('Error adding product:', err));
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== id));
      })
      .catch((err) => console.error('Error deleting product:', err));
  };

  return (
    <div>
      <h2>Admin Panel - Add Product</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
      <button onClick={handleAddProduct}>Add Product</button>

      <h3>Product List</h3>
      <div>
        {products.map((product) => (
          <div key={product._id} style={cardStyle}>
            <div>
              <strong>{product.title}</strong><br />
              <span>{product.description}</span><br />
              <span style={{ color: '#2ecc71' }}>${product.price}</span>
            </div>
            <button onClick={() => handleDeleteProduct(product._id)} style={btnStyle}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;