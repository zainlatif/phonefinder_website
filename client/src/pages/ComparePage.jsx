import { useState } from "react";
import axios from "axios";

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
    <div style={{ display: "flex", gap: 24, padding: 24 }}>
      {[1, 2].map((col) => (
        <div key={col} style={{ flex: 1, minWidth: 320 }}>
          <div style={{ marginBottom: 8, fontWeight: "bold" }}>
            COMPARE WITH
          </div>
          <input
            type="text"
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
            style={{ width: "100%", padding: 8, marginBottom: 4 }}
          />
          {(col === 1 ? query1 : query2) && (
            <div style={{
              background: "#fff",
              border: "1px solid #ddd",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              position: "relative",
              zIndex: 2
            }}>
              {(col === 1 ? results1 : results2).length === 0 ? (
                <div style={{ padding: 8, color: "#888" }}>No results</div>
              ) : (
                (col === 1 ? results1 : results2).map(product => (
                  <div
                    key={product._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: 8,
                      cursor: "pointer",
                      borderBottom: "1px solid #eee"
                    }}
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
                      style={{ width: 50, height: 50, objectFit: "contain", marginRight: 10 }}
                    />
                    <span>{product.title}</span>
                  </div>
                ))
              )}
            </div>
          )}
          {!((col === 1 ? selected1 : selected2)) && (
            <div style={{
              textAlign: "center",
              color: "#888",
              marginTop: 32,
              fontSize: 16
            }}>
              <div>
                <img src="/placeholder/compareplaceholder.png" alt="placeholder" style={{ width: 60, opacity: 0.3 }} />
              </div>
              Add a device to compare
            </div>
          )}
          {(col === 1 ? selected1 : selected2) && (
            <div style={{
              marginTop: 16,
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 12,
              background: "#fafafa"
            }}>
              <div style={{ textAlign: "center" }}>
                <img
                  src={(col === 1 ? selected1 : selected2).image}
                  alt={(col === 1 ? selected1 : selected2).title}
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                />
              </div>
              <h3 style={{ fontSize: 18, margin: "8px 0", textAlign: "center" }}>
                {(col === 1 ? selected1 : selected2).title}
              </h3>
              <p style={{ textAlign: "center", color: "#444" }}>
                {(col === 1 ? selected1 : selected2).description}
              </p>
              <table style={{ width: "100%", marginTop: 10, fontSize: 14 }}>
                <tbody>
                  {(col === 1 ? selected1 : selected2).specs?.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: "bold", padding: "2px 6px", border: "1px solid #eee" }}>{row.spec}</td>
                      <td style={{ padding: "2px 6px", border: "1px solid #eee" }}>{row.value}</td>
                      <td style={{ padding: "2px 6px", border: "1px solid #eee" }}>{row.extra}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComparePage;