import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  GitCompare,
  LogIn,
  LogOut,
  Menu,
  Search,
  UserCircle,
  X,
} from 'lucide-react';
import logoImg from '../assets/logo64.png';

const Header = ({ products = [] }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search)}`);
      setSearch('');
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const productList = Array.isArray(products) ? products : [];
    if (search.trim() && productList.length > 0) {
      const filtered = productList
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 6)
        .map(p => p.title);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [search, products]);

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowMenu(false);
        setShowSuggestions(false);
        setMobileNavOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 shadow-[0_2px_12px_rgba(120,53,15,0.08)] backdrop-blur">
        <div className="mx-auto flex h-[4.5rem] max-w-[1240px] items-center gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={22} strokeWidth={2} />
          </button>

          <Link to="/" className="group flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2" aria-label="PhoneFinder home">
            <div className="flex flex-col text-[0.9rem] font-extrabold leading-[0.85] tracking-tight text-slate-900 sm:text-base">
              <span>Phone</span>
              <span className="text-orange-600">Finder</span>
            </div>
            <img src={logoImg} alt="" className="size-8 object-contain transition-transform group-hover:scale-105" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            <Link to="/compare" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">
              <GitCompare size={17} />
              Compare
            </Link>
            <Link to="/news" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">
              News
            </Link>
            <Link to="/reviews" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">
              Reviews
            </Link>
          </nav>

          <div className="relative min-w-0 flex-1 lg:ml-auto lg:max-w-[25rem]" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex h-10 items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-colors focus-within:border-orange-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-100">
              <Search size={18} className="ml-3 shrink-0 text-slate-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                aria-label="Search products"
                aria-autocomplete="list"
                aria-controls="product-suggestions"
              />
              <button type="submit" className="mr-1 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-orange-600 text-white transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1" aria-label="Submit product search">
                <Search size={16} />
              </button>
            </form>
            {showSuggestions && (
              <div id="product-suggestions" className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg" role="listbox" aria-label="Product suggestions">
                {suggestions.length === 0 ? (
                  <div className="px-4 py-3 text-center text-sm text-slate-500">No results found</div>
                ) : (
                  suggestions.map((title, idx) => (
                    <button
                      type="button"
                      key={idx}
                      className="block w-full border-b border-slate-100 px-4 py-3 text-left text-sm text-slate-700 last:border-0 hover:bg-orange-50 hover:text-orange-700 focus-visible:bg-orange-50 focus-visible:outline-none"
                      onMouseDown={() => {
                        setSearch(title);
                        setShowSuggestions(false);
                        navigate(`/?search=${encodeURIComponent(title)}`);
                      }}
                      role="option"
                    >
                      {title}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="shrink-0">
            {!user ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link to="/login" className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:px-3">
                  <LogIn size={16} className="hidden sm:block" />
                  Login
                </Link>
                <Link to="/signup" className="rounded-lg bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:px-4">
                  Signup
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowMenu(!showMenu)}
                  className="inline-flex max-w-[10rem] items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 sm:px-3"
                  aria-expanded={showMenu}
                  aria-haspopup="menu"
                  aria-label="Open account menu"
                >
                  <UserCircle size={22} className="shrink-0 text-orange-600" />
                  <span className="hidden truncate sm:block">{user.name || 'Account'}</span>
                  <ChevronDown size={15} className="hidden sm:block" />
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[13rem] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg" role="menu">
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="truncate text-xs text-slate-500">Signed in as</p>
                      <p className="truncate text-sm font-semibold text-slate-800">{user.email}</p>
                    </div>
                    <Link to="/account" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700 focus-visible:bg-orange-50 focus-visible:outline-none" onClick={() => setShowMenu(false)} role="menuitem">
                      User Info
                    </Link>
                    <Link to="/favourites" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700 focus-visible:bg-orange-50 focus-visible:outline-none" onClick={() => setShowMenu(false)} role="menuitem">
                      Fav Products
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700 focus-visible:bg-orange-50 focus-visible:outline-none" onClick={() => setShowMenu(false)} role="menuitem">
                        Admin Panel
                      </Link>
                    )}
                    <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none" role="menuitem">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-950/40 lg:hidden" onClick={() => setMobileNavOpen(false)} role="presentation">
          <aside className="h-full w-[min(19rem,85vw)] bg-white p-5 shadow-2xl" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Mobile navigation">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <h2 className="text-lg font-bold text-slate-900">Menu</h2>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="inline-flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-label="Close navigation menu"
              >
                <X size={21} />
              </button>
            </div>
            <nav className="flex flex-col gap-1 pt-5" aria-label="Mobile navigation links">
              <Link to="/" onClick={() => setMobileNavOpen(false)} className="rounded-lg px-3 py-3 text-base font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">Home</Link>
              <Link to="/compare" onClick={() => setMobileNavOpen(false)} className="rounded-lg px-3 py-3 text-base font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">Compare</Link>
              <Link to="/news" onClick={() => setMobileNavOpen(false)} className="rounded-lg px-3 py-3 text-base font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">News</Link>
              <Link to="/reviews" onClick={() => setMobileNavOpen(false)} className="rounded-lg px-3 py-3 text-base font-semibold text-slate-700 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">Reviews</Link>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;