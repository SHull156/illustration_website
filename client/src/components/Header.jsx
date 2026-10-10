export default function Header(){

    return (
        <header className="site-header">
            <div className="header-inner">
                <h1 className="site-title">Sarah Rolph</h1>

                <nav className="nav-bar" aria-label="Primary">
                <button className="menu-toggle" id="menu-toggle" aria-controls="nav-links" aria-expanded="false">
                    ☰ <span className="sr-only">Menu</span>
                </button>

                <div className="nav-links" id="nav-links">
                    <a className="active" href="/index.html">Home</a>
                    <a href="/about.html">About</a>
                    <a href="/works.html">Works</a>
                    <a href="/shop.html">Shop</a>
                    <a href="/cart.html" id="cart-link">Cart (<span id="cart-count">0</span>)</a>
                </div>
                </nav>
            </div>
            </header>
    )

}