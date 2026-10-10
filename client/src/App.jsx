import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts () {
      const response = await fetch("/products");
      const result = await response.json();
      setProducts(result);
    }
    fetchProducts();

  }, []);

  return(
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )

}

export default App
