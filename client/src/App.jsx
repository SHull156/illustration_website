import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
