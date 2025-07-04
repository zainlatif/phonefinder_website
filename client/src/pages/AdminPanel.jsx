import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

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
    if (search.trim()) {
      setFiltered(
        products.filter(p =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFiltered([...products].slice(-10).reverse());
    }
  }, [products, search]);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  };

  const addSpecRow = () => setSpecs([...specs, { spec: '', value: '', extra: '' }]);
  const removeSpecRow = (idx) => setSpecs(specs.filter((_, i) => i !== idx));
  const handleSpecChange = (idx, col, value) => {
    setSpecs(prev => prev.map((row, i) =>
      i === idx ? { ...row, [col]: value } : row
    ));
  };
  const specsToArray = () => specs.filter(row => row.spec || row.value || row.extra);
  const backendSpecsToArray = (backendSpecs) => {
    const arr = (backendSpecs || []).map(row => ({
      spec: row.spec || '',
      value: row.value || '',
      extra: row.extra || ''
    }));
    arr.push({ spec: '', value: '', extra: '' });
    return arr;
  };

  const handleAddProduct = () => {
    if (!title || !description || !price || !image || !image2) return;
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
    if (!title || !description || !price || !image || !image2) return;
    axios.put(`http://localhost:5000/api/products/${editId}`, {
      title,
      description,
      price,
      image,
      image2,
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
    <div className="admin-panel">
      <h2 className="admin-title">Admin Panel - {editId ? 'Edit Product' : 'Add Product'}</h2>
      <input
        className="admin-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br />
      <input
        className="admin-input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br />
      <input
        className="admin-input"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      /><br />
      <input
        className="admin-input"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      /><br />
      <input
        className="admin-input"
        placeholder="Second Image URL"
        value={image2}
        onChange={(e) => setImage2(e.target.value)}
      /><br />
      <div className="admin-specs-section">
        <b>Product Specifications:</b>
        <table className="admin-specs-table">
          <thead>
            <tr>
              <th>Specification</th>
              <th>Value</th>
              <th>Extra</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {specs.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    className="admin-specs-input"
                    type="text"
                    value={row.spec}
                    onChange={e => handleSpecChange(idx, 'spec', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="admin-specs-input"
                    type="text"
                    value={row.value}
                    onChange={e => handleSpecChange(idx, 'value', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="admin-specs-input"
                    type="text"
                    value={row.extra}
                    onChange={e => handleSpecChange(idx, 'extra', e.target.value)}
                  />
                </td>
                <td>
                  {specs.length > 1 && idx !== specs.length - 1 && (
                    <button type="button" className="admin-specs-remove-btn" onClick={() => removeSpecRow(idx)}>✕</button>
                  )}
                  {idx === specs.length - 1 && (
                    <button type="button" className="admin-specs-add-btn" onClick={addSpecRow}>＋</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editId ? (
        <>
          <button className="admin-btn admin-btn-edit" onClick={handleUpdateProduct}>Update Product</button>
          <button className="admin-btn admin-btn-cancel" onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <button className="admin-btn admin-btn-add" onClick={handleAddProduct}>Add Product</button>
      )}
      <input
        type="text"
        className="admin-search"
        placeholder="Search by model name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <h3 className="admin-list-title">Product List {search ? '(Search Results)' : '(Latest 10)'}</h3>
      <div>
        {filtered.length === 0 ? (
          <div className="admin-no-products">No products found.</div>
        ) : (
          filtered.map((product) => (
            <div key={product._id} className="admin-card">
              <div className="admin-card-info">
                {product.image && (
                  <img src={product.image} alt={product.title} className="admin-card-img" />
                )}
                <div>
                  <strong>{product.title}</strong><br />
                  <span>{product.description}</span><br />
                  <span className="admin-card-price">${product.price}</span>
                </div>
              </div>
              <div className="admin-card-actions">
                <button className="admin-btn admin-btn-edit" onClick={() => handleEditProduct(product)}>Edit</button>
                <button className="admin-btn admin-btn-delete" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;