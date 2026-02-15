// public/cart.js
// LocalStorage cart for shop.html + cart.html

const CART_KEY = "cart";

document.addEventListener("DOMContentLoaded", () => {

  updateCartCount();

  // If on cart page, render it
  if (document.getElementById("cart-items")) {
    renderCart();
  }

  // Clear cart button
  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem(CART_KEY);
      updateCartCount();
      renderCart();
      showToast("Cart cleared");
    });
  }

  // Add to cart handler (works even for dynamically-rendered products)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart");
    if (!btn) return;

    const productEl = btn.closest(".product");
    console.log("productEl:", productEl);

    if (!productEl) {
      return;
    }

    const id = productEl.dataset.id;
    const name = productEl.dataset.name;
    const price = Number(productEl.dataset.price);
    const image = productEl.dataset.image;

    console.log("parsed product:", { id, name, price, image });

    if (!id || !name || !Number.isFinite(price)) {
      console.error("❌ Missing/invalid product data on element dataset:", productEl.dataset);
      showToast("Product data missing");
      return;
    }

    addToCart({ id, name, price, image });
  });

  // Cart page: +/- / remove (event delegation)
  const cartContainer = document.getElementById("cart-items");
  if (cartContainer) {
    cartContainer.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (!action || !id) return;

      console.log("cart action:", { action, id });

      if (action === "remove") removeFromCart(id);
      if (action === "increase") changeQuantity(id, 1);
      if (action === "decrease") changeQuantity(id, -1);
    });
  }
});

// ---------- Storage helpers ----------
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

// ---------- Header count ----------
function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;

  const cart = getCart();
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  el.textContent = totalQty;

}

// ---------- Add / remove / quantity ----------
function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((p) => p.id === product.id);

  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });

  saveCart(cart);
  showToast(`${product.name} added to cart`);
}

function removeFromCart(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  renderCart();
  showToast("Item removed");
}

function changeQuantity(id, delta) {
  const cart = getCart();
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.quantity += delta;

  const next = item.quantity <= 0 ? cart.filter((x) => x.id !== id) : cart;

  saveCart(next);
  renderCart();
}

// ---------- Render cart page ----------
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p class="muted">Your cart is empty. <a href="shop.html">Go to shop</a>.</p>`;
    totalEl.textContent = "£0.00";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${escapeHtml(item.image)}" width="80" style="vertical-align: middle;" alt="${escapeHtml(item.name)}">
      <strong>${escapeHtml(item.name)}</strong>
      £${Number(item.price).toFixed(2)} × ${item.quantity}
      <button data-action="decrease" data-id="${escapeHtml(item.id)}" type="button">-</button>
      <button data-action="increase" data-id="${escapeHtml(item.id)}" type="button">+</button>
      <button data-action="remove" data-id="${escapeHtml(item.id)}" type="button">Remove</button>
    `;
    container.appendChild(row);
  });

  totalEl.textContent = `£${total.toFixed(2)}`;
}

// ---------- Utilities ----------
function showToast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #333;
    color: #fff;
    padding: 10px 15px;
    border-radius: 6px;
    z-index: 1000;
    opacity: 0.95;
  `;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1500);
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
