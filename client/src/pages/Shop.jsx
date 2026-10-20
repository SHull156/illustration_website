import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/products");
      const result = await response.json();
      setProducts(result);
    }
    fetchProducts();
  }, []);

  return (
    <>
      <h2 className="page-title">Shop</h2>
      <section className="shop-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}
