import { useState, useEffect } from 'react';
import axios from 'axios';
import { Minus, Plus, Search, Trash2 } from 'lucide-react';
import { getApiUrl, getArrayResponse } from '../config/api';

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

  const fetchProducts = async () => {
    try {
      const res = await axios.get(getApiUrl('/api/products'));
      setProducts(getArrayResponse(res.data, '/api/products'));
    } catch (err) {
      console.error('Error fetching products:', err);
    }
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
    axios.post(getApiUrl('/api/products'), newProduct)
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
    axios.delete(getApiUrl(`/api/products/${id}`))
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
    axios.put(getApiUrl(`/api/products/${editId}`), {
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
    <main className="mx-auto min-h-[60vh] max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Admin Panel</h1>
      <p className="mt-1 text-sm text-slate-500">{editId ? 'Edit product details' : 'Add a new product'}</p>
      <input
        className="mt-6 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-colors focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        placeholder="Second Image URL"
        value={image2}
        onChange={(e) => setImage2(e.target.value)}
      />
      <div className="mt-7">
        <h2 className="text-lg font-semibold text-slate-900">Product Specifications</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[38rem] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th>Specification</th>
              <th>Value</th>
              <th>Extra</th>
              <th aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {specs.map((row, idx) => (
              <tr key={idx}>
                <td className="p-2">
                  <input
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    type="text"
                    value={row.spec}
                    onChange={e => handleSpecChange(idx, 'spec', e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <input
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    type="text"
                    value={row.value}
                    onChange={e => handleSpecChange(idx, 'value', e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <input
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    type="text"
                    value={row.extra}
                    onChange={e => handleSpecChange(idx, 'extra', e.target.value)}
                  />
                </td>
                <td className="p-2">
                  {specs.length > 1 && idx !== specs.length - 1 && (
                    <button type="button" aria-label="Remove specification" className="inline-flex size-8 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50" onClick={() => removeSpecRow(idx)}><Minus className="size-4" /></button>
                  )}
                  {idx === specs.length - 1 && (
                    <button type="button" aria-label="Add specification" className="inline-flex size-8 items-center justify-center rounded-lg text-emerald-600 hover:bg-emerald-50" onClick={addSpecRow}><Plus className="size-4" /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      {editId ? (
        <>
          <button className="mt-6 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700" onClick={handleUpdateProduct}>Update Product</button>
          <button className="ml-2 mt-6 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50" onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <button className="mt-6 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700" onClick={handleAddProduct}>Add Product</button>
      )}
      <input
        type="text"
        className="mt-8 w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        placeholder="Search by model name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <h2 className="mt-8 text-xl font-bold text-slate-900">Product List <span className="text-sm font-normal text-slate-500">{search ? '(Search Results)' : '(Latest 10)'}</span></h2>
      <div>
        {filtered.length === 0 ? (
          <div className="mt-4 rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">No products found.</div>
        ) : (
          filtered.map((product) => (
            <div key={product._id} className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex min-w-0 items-center gap-4">
                {product.image && (
                  <img src={product.image} alt={product.title} className="size-20 rounded-lg bg-white object-contain p-2" />
                )}
                <div>
                  <strong className="block text-slate-900">{product.title}</strong>
                  <span className="mt-1 block max-w-xl text-sm text-slate-500">{product.description}</span>
                  <span className="mt-2 block font-semibold text-orange-600">Rs. {product.price}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-700" onClick={() => handleEditProduct(product)}>Edit</button>
                <button aria-label={`Delete ${product.title}`} className="inline-flex size-9 items-center justify-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50" onClick={() => handleDeleteProduct(product._id)}><Trash2 className="size-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>
      </section>
    </main>
  );
};

export default AdminPanel;