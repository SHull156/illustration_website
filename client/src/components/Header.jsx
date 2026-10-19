import { useState } from "react";
import { NavLink } from "react-router";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <h1 className="site-title">Sarah Rolph</h1>

        <nav className="nav-bar" aria-label="Primary">
          <button
            className="menu-toggle"
            aria-controls="nav-links"
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            ☰ <span className="sr-only">Menu</span>
          </button>

          <div
            className={isOpen ? "nav-links show" : "nav-links"}
            id="nav-links"
            onClick={closeMenu}
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/works">Works</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/cart">
              Cart (<span>0</span>)
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
