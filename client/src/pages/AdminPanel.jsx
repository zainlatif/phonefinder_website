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

const editBtnStyle = {
  background: '#2980b9',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  padding: '6px 12px',
  cursor: 'pointer',
  marginRight: '8px'
};

const imageStyle = {
  width: '80px',
  height: '80px',
  objectFit: 'cover',
  borderRadius: '6px',
  marginRight: '16px'
};

const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  };

  const handleAddProduct = () => {
    if (!title || !description || !price || !image) return;
    const newProduct = { title, description, price, image, longDescription };

    axios.post('http://localhost:5000/api/products', newProduct)
      .then(() => {
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
        setLongDescription('');
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

  const handleEditProduct = (product) => {
    setEditId(product._id);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setImage(product.image);
    setLongDescription(product.longDescription || '');
  };

  const handleUpdateProduct = () => {
    if (!title || !description || !price || !image) return;
    axios.put(`http://localhost:5000/api/products/${editId}`, {
      title,
      description,
      price,
      image,
      longDescription
    })
      .then(() => {
        setEditId(null);
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
        setLongDescription('');
        fetchProducts();
      })
      .catch((err) => console.error('Error updating product:', err));
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setTitle('');
    setDescription('');
    setPrice('');
    setImage('');
    setLongDescription('');
  };

  return (
    <div>
      <h2>Admin Panel - {editId ? 'Edit Product' : 'Add Product'}</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
      <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} /><br />
      <input placeholder="Long Description (e.g. camera: 50mp, battery: 5000mah, charging: 35watt)" 
        value={longDescription} 
        onChange={(e) => setLongDescription(e.target.value)} 
      /><br />
      {editId ? (
        <>
          <button onClick={handleUpdateProduct} style={editBtnStyle}>Update Product</button>
          <button onClick={handleCancelEdit} style={btnStyle}>Cancel</button>
        </>
      ) : (
        <button onClick={handleAddProduct}>Add Product</button>
      )}

      <h3>Product List</h3>
      <div>
        {products.map((product) => (
          <div key={product._id} style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {product.image && (
                <img src={product.image} alt={product.title} style={imageStyle} />
              )}
              <div>
                <strong>{product.title}</strong><br />
                <span>{product.description}</span><br />
                <span style={{ color: '#2ecc71' }}>${product.price}</span>
              </div>
            </div>
            <div>
              <button onClick={() => handleEditProduct(product)} style={editBtnStyle}>Edit</button>
              <button onClick={() => handleDeleteProduct(product._id)} style={btnStyle}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;