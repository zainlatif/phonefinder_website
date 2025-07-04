import { useState } from "react";
import axios from "axios";
import "./ComparePage.css";

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
    const res = await axios.get(
      `http://localhost:5000/api/products?search=${encodeURIComponent(query)}`
    );
    setResults(res.data);
  };

  return (
    <div className="compare-container">
      {[1, 2].map((col) => (
        <div key={col} className="compare-col">
          <div className="compare-title">
            COMPARE WITH
          </div>
          <input
            type="text"
            className="compare-input"
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
            <div className="compare-suggestions">
              {(col === 1 ? results1 : results2).length === 0 ? (
                <div className="compare-suggestion-empty">No results</div>
              ) : (
                (col === 1 ? results1 : results2).map(product => (
                  <div
                    key={product._id}
                    className="compare-suggestion-item"
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
                      className="compare-suggestion-img"
                    />
                    <span className="compare-suggestion-title">{product.title}</span>
                  </div>
                ))
              )}
            </div>
          )}
          {!((col === 1 ? selected1 : selected2)) && (
            <div className="compare-placeholder">
              <div>
                <img src="/placeholder/compareplaceholder.png" alt="placeholder" className="compare-placeholder-img" />
              </div>
              Add a device to compare
            </div>
          )}
          {(col === 1 ? selected1 : selected2) && (
            <div className="compare-selected">
              <div className="compare-selected-img-wrap">
                <img
                  src={(col === 1 ? selected1 : selected2).image}
                  alt={(col === 1 ? selected1 : selected2).title}
                  className="compare-selected-img"
                />
              </div>
              <h3 className="compare-selected-title">
                {(col === 1 ? selected1 : selected2).title}
              </h3>
              <p className="compare-selected-desc">
                {(col === 1 ? selected1 : selected2).description}
              </p>
              <div className="compare-table-wrap">
                <table className="compare-table">
                  <tbody>
                    {(col === 1 ? selected1 : selected2).specs?.map((row, idx) => (
                      <tr key={idx}>
                        <td className="compare-table-spec">{row.spec}</td>
                        <td className="compare-table-value">{row.value}</td>
                        <td className="compare-table-extra">{row.extra}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComparePage;