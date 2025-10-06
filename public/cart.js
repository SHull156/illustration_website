// cart.js

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    // If on cart page, render the cart
    if (document.getElementById("cart-items")) {
        renderCart();
    }

    // Clear cart button
    const clearBtn = document.getElementById("clear-cart");
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            renderCart();
            showToast("Cart cleared");
        });
    }

    // Add to Cart button listener (for shop.html)
    document.body.addEventListener("click", (e) => {
        const btn = e.target.closest(".add-to-cart");
        if (!btn) return;

        const productEl = btn.closest(".product");
        const name = productEl.querySelector("h3")?.textContent || "Unnamed";
        const priceText = productEl.querySelector("p")?.textContent || "$0";
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
        const img = productEl.querySelector("img")?.src || "";
        const id = productEl.dataset.id || name;

        addToCart({ id, name, price, image: img });
    });
});

// Cart helpers
function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// header cart count
function updateCartCount() {
    const el = document.getElementById("cart-count");
    if (!el) return;
    const cart = getCart();
    const total = cart.reduce((sum, p) => sum + p.quantity, 0);
    el.textContent = total;
}

// add to cart
function addToCart(product) {
    const cart = getCart();
    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    saveCart(cart);
    showToast(`${product.name} added to cart`);
}

// render cart
function renderCart() {
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    if (!container || !totalEl) return;

    const cart = getCart();
    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" width="80" style="vertical-align: middle;">
            <strong>${item.name}</strong> - $${item.price} × ${item.quantity}
            <button class="decrease" data-index="${index}">-</button>
            <button class="increase" data-index="${index}">+</button>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        total += item.price * item.quantity;
        container.appendChild(div);
    });

    totalEl.textContent = `$${total.toFixed(2)}`;

    // Button event listeners
    document.querySelectorAll(".remove-item").forEach((btn) => {
        btn.addEventListener("click", () => removeFromCart(btn.dataset.index));
    });
    document.querySelectorAll(".increase").forEach((btn) => {
        btn.addEventListener("click", () => changeQuantity(btn.dataset.index, 1));
    });
    document.querySelectorAll(".decrease").forEach((btn) => {
        btn.addEventListener("click", () => changeQuantity(btn.dataset.index, -1));
    });
}

// modify cart
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    showToast("Item removed from cart");
}

function changeQuantity(index, delta) {
    const cart = getCart();
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart(cart);
    renderCart();
}

// toast notifcation
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
