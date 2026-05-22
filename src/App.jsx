import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:slug" element={<CategoryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* SEO-friendly redirects */}
          <Route path="/fans" element={<CategoryPage />} />
          <Route path="/lights" element={<CategoryPage />} />
          <Route path="/switches" element={<CategoryPage />} />
          <Route path="/wires" element={<CategoryPage />} />
          <Route path="/circuit-breakers" element={<CategoryPage />} />
          <Route path="/pvc-pipes" element={<CategoryPage />} />
          <Route path="/coolers" element={<CategoryPage />} />
          <Route path="/pumps" element={<CategoryPage />} />
          <Route path="/tools" element={<CategoryPage />} />
          <Route path="/extensions" element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
