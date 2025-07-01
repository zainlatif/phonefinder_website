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
  const [image2, setImage2] = useState('');
  const [specs, setSpecs] = useState([{ spec: '', value: '', extra: '' }]);
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products by search (case-insensitive, on title)
    if (search.trim()) {
      setFiltered(
        products.filter(p =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      // Show only latest 10 products if no search
      setFiltered([...products].slice(-10).reverse());
    }
  }, [products, search]);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  };

  // Add a new empty row
  const addSpecRow = () => setSpecs([...specs, { spec: '', value: '', extra: '' }]);

  // Remove a row by index
  const removeSpecRow = (idx) => setSpecs(specs.filter((_, i) => i !== idx));

  // Handle input change
  const handleSpecChange = (idx, col, value) => {
    setSpecs(prev => prev.map((row, i) =>
      i === idx ? { ...row, [col]: value } : row
    ));
  };

  // Only send filled rows to backend
  const specsToArray = () => specs.filter(row => row.spec || row.value || row.extra);

  // For editing, load existing specs and add an empty row at the end
  const backendSpecsToArray = (backendSpecs) => {
    const arr = (backendSpecs || []).map(row => ({
      spec: row.spec || '',
      value: row.value || '',
      extra: row.extra || ''
    }));
    arr.push({ spec: '', value: '', extra: '' }); // Always one empty row
    return arr;
  };

  const handleAddProduct = () => {
    if (!title || !description || !price || !image) return;
    const newProduct = {
      title,
      description,
      price,
      image,
      image2,
      specs: specsToArray()
    };
    axios.post('http://localhost:5000/api/products', newProduct)
      .then(() => {
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
        setImage2('');
        setSpecs([{ spec: '', value: '', extra: '' }]);
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
    setImage2(product.image2 || '');
    setSpecs(backendSpecsToArray(product.specs));
  };

  const handleUpdateProduct = () => {
    if (!title || !description || !price || !image) return;
    axios.put(`http://localhost:5000/api/products/${editId}`, {
      title,
      description,
      price,
      image,
      specs: specsToArray()
    })
      .then(() => {
        setEditId(null);
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
        setImage2('');
        setSpecs([{ spec: '', value: '', extra: '' }]);
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
    setImage2('');
    setSpecs([{ spec: '', value: '', extra: '' }]);
  };

  return (
    <div>
      <h2>Admin Panel - {editId ? 'Edit Product' : 'Add Product'}</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
      <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} /><br />
      <input placeholder="Second Image URL (optional)" value={image2} onChange={(e) => setImage2(e.target.value)} /><br />
      <div style={{ margin: '16px 0' }}>
        <b>Product Specifications:</b>
        <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '8px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '4px' }}>Specification</th>
              <th style={{ border: '1px solid #ccc', padding: '4px' }}>Value</th>
              <th style={{ border: '1px solid #ccc', padding: '4px' }}>Extra</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {specs.map((row, idx) => (
              <tr key={idx}>
                <td style={{ border: '1px solid #ccc', padding: '4px' }}>
                  <input
                    type="text"
                    value={row.spec}
                    onChange={e => handleSpecChange(idx, 'spec', e.target.value)}
                    style={{ width: '95%' }}
                  />
                </td>
                <td style={{ border: '1px solid #ccc', padding: '4px' }}>
                  <input
                    type="text"
                    value={row.value}
                    onChange={e => handleSpecChange(idx, 'value', e.target.value)}
                    style={{ width: '95%' }}
                  />
                </td>
                <td style={{ border: '1px solid #ccc', padding: '4px' }}>
                  <input
                    type="text"
                    value={row.extra}
                    onChange={e => handleSpecChange(idx, 'extra', e.target.value)}
                    style={{ width: '95%' }}
                  />
                </td>
                <td>
                  {specs.length > 1 && idx !== specs.length - 1 && (
                    <button type="button" onClick={() => removeSpecRow(idx)} style={{ color: 'red' }}>✕</button>
                  )}
                  {idx === specs.length - 1 && (
                    <button type="button" onClick={addSpecRow} style={{ color: 'green' }}>＋</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editId ? (
        <>
          <button onClick={handleUpdateProduct} style={editBtnStyle}>Update Product</button>
          <button onClick={handleCancelEdit} style={btnStyle}>Cancel</button>
        </>
      ) : (
        <button onClick={handleAddProduct}>Add Product</button>
      )}
      <input
        type="text"
        placeholder="Search by model name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          margin: '18px 0 12px 0',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: 350
        }}
      />
      <h3>Product List {search ? '(Search Results)' : '(Latest 10)'}</h3>
      <div>
        {filtered.length === 0 ? (
          <div style={{ color: '#e74c3c', margin: '12px 0' }}>No products found.</div>
        ) : (
          filtered.map((product) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;