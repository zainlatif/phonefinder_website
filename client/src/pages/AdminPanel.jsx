import { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduct = () => {
    const newProduct = { title, description, price };

    axios.post('http://localhost:5000/api/products', newProduct)
      .then(() => {
        alert('Product added');
        setTitle('');
        setDescription('');
        setPrice('');
      })
      .catch((err) => console.error('Error adding product:', err));
  };

  return (
    <div>
      <h2>Admin Panel - Add Product</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AdminPanel;
