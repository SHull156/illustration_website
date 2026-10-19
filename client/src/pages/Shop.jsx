import { useState, useEffect } from "react";

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
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
}
