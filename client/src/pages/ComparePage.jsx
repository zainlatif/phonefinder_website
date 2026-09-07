import { useState } from "react";
import axios from "axios";
import { getApiUrl, getArrayResponse } from "../config/api";

const ComparePage = () => {
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [results1, setResults1] = useState([]);
  const [results2, setResults2] = useState([]);
  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);

  // Search products by title
  const handleSearch = async (query, setResults) => {
    if (!query) {
      setResults([]);
      return;
    }
    try {
      const res = await axios.get(
        getApiUrl(`/api/products?search=${encodeURIComponent(query)}`)
      );
      setResults(getArrayResponse(res.data, "/api/products"));
    } catch (err) {
      setResults([]);
      console.error("Error searching products:", err);
    }
  };

  return (
    <main className="min-h-[60vh] bg-slate-50/60 px-3 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:gap-6">
      {[1, 2].map((col) => (
        <section key={col} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
          <div className="mb-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-orange-600 sm:text-sm">
            COMPARE WITH
          </div>
          <input
            type="text"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100 sm:text-sm"
            placeholder="Enter model name to compare"
            value={col === 1 ? query1 : query2}
            onChange={e => {
              if (col === 1) {
                setQuery1(e.target.value);
                handleSearch(e.target.value, setResults1);
              } else {
                setQuery2(e.target.value);
                handleSearch(e.target.value, setResults2);
              }
            }}
          />
          {(col === 1 ? query1 : query2) && (
            <div className="mt-2 max-h-56 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
              {(col === 1 ? results1 : results2).length === 0 ? (
                <div className="px-3 py-3 text-center text-xs text-slate-500">No results</div>
              ) : (
                (col === 1 ? results1 : results2).map(product => (
                  <div
                    key={product._id}
                    className="flex cursor-pointer items-center gap-2 border-b border-slate-100 p-2 text-xs last:border-0 hover:bg-orange-50 sm:text-sm"
                    onClick={() => {
                      if (col === 1) {
                        setSelected1(product);
                        setQuery1(product.title);
                        setResults1([]);
                      } else {
                        setSelected2(product);
                        setQuery2(product.title);
                        setResults2([]);
                      }
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="size-8 shrink-0 rounded object-contain sm:size-10"
                    />
                    <span className="line-clamp-2 text-slate-700">{product.title}</span>
                  </div>
                ))
              )}
            </div>
          )}
          {!((col === 1 ? selected1 : selected2)) && (
            <div className="mt-8 flex min-h-64 flex-col items-center justify-center gap-3 text-center text-sm text-slate-400">
              <div>
                <img src="/placeholder/compareplaceholder.png" alt="placeholder" className="size-14 opacity-40" />
              </div>
              Add a device to compare
            </div>
          )}
          {(col === 1 ? selected1 : selected2) && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
              <div className="text-center">
                <img
                  src={(col === 1 ? selected1 : selected2).image}
                  alt={(col === 1 ? selected1 : selected2).title}
                  className="mx-auto size-24 object-contain sm:size-32"
                />
              </div>
              <h2 className="mt-3 text-center text-sm font-bold text-slate-900 sm:text-lg">
                {(col === 1 ? selected1 : selected2).title}
              </h2>
              <p className="mt-2 line-clamp-3 text-center text-xs leading-5 text-slate-500 sm:text-sm">
                {(col === 1 ? selected1 : selected2).description}
              </p>
              <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full min-w-[18rem] border-collapse text-xs sm:text-sm">
                  <tbody>
                    {(col === 1 ? selected1 : selected2).specs?.map((row, idx) => (
                      <tr key={idx}>
                        <td className="border-b border-slate-100 bg-slate-50 px-2 py-2 font-semibold text-slate-700">{row.spec}</td>
                        <td className="border-b border-slate-100 px-2 py-2 text-slate-600">{row.value}</td>
                        <td className="border-b border-slate-100 px-2 py-2 text-slate-500">{row.extra}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      ))}
      </div>
    </main>
  );
};

export default ComparePage;