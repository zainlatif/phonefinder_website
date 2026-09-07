import { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, LoaderCircle, PackageOpen } from 'lucide-react';
import { getApiUrl } from '../config/api';
import ProductDetails from '../components/ProductDetails';

const FavorateProduct = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      setLoading(false);
      return;
    }

    const parsed = JSON.parse(stored);
    setUser(parsed);
    axios.get(getApiUrl(`/api/users/${parsed.email}`))
      .then(async (res) => {
        const favoriteIds = res.data.favorites || [];
        const favProducts = await Promise.all(
          favoriteIds.map(id => axios.get(getApiUrl(`/api/products/${id}`)).then(r => r.data))
        );
        setFavorites(favProducts);
      })
      .catch(err => console.error('Error fetching favorites:', err))
      .finally(() => setLoading(false));
  }, []);

  if (!user) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center px-5 py-16">
        <section className="w-full max-w-md rounded-2xl border border-orange-100 bg-white p-8 text-center shadow-sm">
          <Heart className="mx-auto mb-4 size-10 text-orange-500" />
          <h1 className="text-2xl font-bold text-slate-900">Your favorite products</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Please log in to view the phones you have saved.</p>
        </section>
      </main>
    );
  }

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
    <main className="min-h-[60vh] bg-slate-50/60 px-5 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-600">Saved phones</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Favorite Products</h1>
            <p className="mt-2 text-sm text-slate-500">Your saved phones, ready for another look.</p>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-700 sm:flex">
            <Heart className="size-4" />
            {favorites.length} saved
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-56 items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <LoaderCircle className="size-7 animate-spin text-orange-500" aria-label="Loading favorites" />
          </div>
        ) : favorites.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <PackageOpen className="mx-auto mb-4 size-10 text-slate-400" />
            <h2 className="text-lg font-semibold text-slate-800">No favorite products yet</h2>
            <p className="mt-2 text-sm text-slate-500">Save a phone from its product details to see it here.</p>
          </section>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((product) => (
              <button
                key={product._id}
                type="button"
                onClick={() => setSelectedProduct(product)}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <div className="flex h-56 items-center justify-center bg-slate-50 p-6">
                  {product.image ? (
                    <img src={product.image} alt={product.title} className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105" />
                  ) : (
                    <PackageOpen className="size-12 text-slate-300" />
                  )}
                </div>
                <div className="p-5">
                  <h2 className="line-clamp-2 min-h-12 text-lg font-semibold text-slate-900">{product.title}</h2>
                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">{product.description || 'View product details'}</p>
                  <p className="mt-4 text-lg font-bold text-orange-600">Rs. {product.price}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default FavorateProduct;