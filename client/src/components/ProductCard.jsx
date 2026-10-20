export default function ProductCard({ product }) {
  return (
    <div className="product">
      <img src={`/${product.image_url}`} alt={product.name} loading="lazy" />
      <h3>{product.name}</h3>
      <p>£{Number(product.price).toFixed(2)}</p>
      <button className="add-to-cart" type="button">
        Add to Cart
      </button>
    </div>
  );
}
