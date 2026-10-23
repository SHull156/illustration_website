import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/products");

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const result = await response.json();
        setProducts(result);
      } catch (err) {
        setError("Products couldn't load right now");
        console.error("There was an error", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  let content;

  if (loading) {
    content = <p className="muted">Loading products</p>;
  } else if (error) {
    content = <p className="muted">{error}</p>;
  } else if (products.length === 0) {
    content = <p className="muted">No products available right now</p>;
  } else {
    content = (
      <section className="shop-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    );
  }

  return (
    <>
      <h2 className="page-title">Shop</h2>
      {content}
    </>
  );
}
