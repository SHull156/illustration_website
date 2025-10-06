//Adding cart functionality to the exisitng product list

document.addEventListener ("DOMContentLoaded", () =>{
    //Update header cart count 
    updateCartCount();

    //Listen for click on "Add to Cart buttons"
    document.body.addEventListener ("click", (e) => {
        const btn = e.target.closest(".add-to-cart");
        if (!btn) return;

        //get product data from the DOM
        const productEl = btn.closest(".product");
        const name = productEl.querySelector("h3")?.textContent || "Unnamed";
        const priceText = productEl.querySelector("p")?.textContent || "$0";
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        const img = productEl.querySelector('img')?.src || '';
        const id = productEl.dataset.id || name; // fallback if no id attribute

        console.log("Product info:", {id, name, price, img}); // check product data


        addToCart({id, name, price, image: img}); 
    });
});

//helpers

function getCart () {
    return JSON.parse(localStorage.getItem("cart") || '[]');
}

function saveCart (cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart (product) {
    const cart = getCart ();
    const existing = cart.find (p => p.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        product.quantity = 1; 
        cart.push(product);
    }

    saveCart(cart);
    showToast(`${product.name} added to cart`);
}

function updateCartCount () {
    const el = document.getElementById ("cart-count");
    if (!el) return; 
    const cart = getCart ();
    const total = cart.reduce ((sum, p) => sum + p.quantity, 0);
    el.textContent = total;
}

function showToast(msg) {
    const t = document.createElement('div');
    t.textContent = msg;
    t.style = "position:fixed;bottom:20px;right:20px;background:#333;color:#fff;padding:10px 15px;border-radius:6px;";
    document.body.appendChild(t);
    setTimeout (() => t.remove (), 1500); 
}