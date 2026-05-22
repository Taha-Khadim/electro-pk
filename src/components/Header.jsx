import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { contactInfo } from '../data/products';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#023e8a] via-[#0077b6] to-[#00b4d8] text-white text-sm py-2.5">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-sm">⚡ Pakistan's Most Trusted Electric Store</span>
            <span className="sm:hidden text-xs">Electro.pk - Electric Store</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-1 hover:text-cyan-200 transition-colors">
              <PhoneIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{contactInfo.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>
            <span className="hidden sm:inline text-white/50">|</span>
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-1 hover:text-cyan-200 transition-colors">
              <EnvelopeIcon className="w-4 h-4" />
              <span className="hidden md:inline">{contactInfo.email}</span>
              <span className="md:hidden">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#023e8a] to-[#0077b6] bg-clip-text text-transparent">Electro.pk</h1>
              <p className="text-xs text-cyan-600 font-medium">Pakistan's Electric Store</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search fans, lights, switches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-2 border-cyan-100 rounded-full py-2.5 px-5 pr-12 focus:border-cyan-500 focus:outline-none transition-all input-3d"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white p-2.5 rounded-full hover:shadow-lg transition-all hover:scale-110"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Wishlist */}
            <Link to="/wishlist" className="hidden md:flex flex-col items-center text-gray-600 hover:text-cyan-600 transition-all hover:scale-110">
              <HeartIcon className="w-6 h-6" />
              <span className="text-xs mt-1">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative flex flex-col items-center text-gray-600 hover:text-cyan-600 transition-all hover:scale-110">
              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
              <span className="text-xs mt-1">Cart</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-cyan-600 transition-colors"
            >
              {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:block border-t border-cyan-100">
          <ul className="flex items-center gap-8 py-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className="text-gray-700 hover:text-cyan-600 font-medium transition-colors relative group nav-link-3d"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <a 
                href={`https://wa.me/${contactInfo.whatsapp.replace(/\s|\+|\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white px-5 py-2.5 rounded-full flex items-center gap-2 hover:shadow-xl transition-all hover:scale-105 pulse-glow"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order on WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-cyan-100 shadow-xl">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="p-4 border-b border-cyan-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-2 border-cyan-100 rounded-full py-2.5 px-5 focus:border-cyan-500 focus:outline-none input-3d"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white p-2.5 rounded-full"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Mobile Nav Links */}
          <nav className="p-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 hover:text-cyan-600 font-medium py-2 hover:translate-x-2 transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile WhatsApp CTA */}
          <div className="p-4 border-t border-cyan-100">
            <a 
              href={`https://wa.me/${contactInfo.whatsapp.replace(/\s|\+|\D/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white text-center py-4 rounded-xl font-bold pulse-glow"
            >
              📱 Order on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;