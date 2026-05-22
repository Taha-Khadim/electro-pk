import { Link } from 'react-router-dom';
import { contactInfo } from '../data/products';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: 'Fans', path: '/categories/fans' },
    { name: 'Lights & LED', path: '/categories/lights-led' },
    { name: 'Switches & Sockets', path: '/categories/switches-sockets' },
    { name: 'Wires & Cables', path: '/categories/wires-cables' },
    { name: 'Circuit Breakers', path: '/categories/circuit-breakers' },
    { name: 'PVC Pipes', path: '/categories/pvc-pipes' },
    { name: 'Air Coolers', path: '/categories/air-coolers' },
    { name: 'Water Pumps', path: '/categories/water-pumps' },
    { name: 'Tools & Testers', path: '/categories/tools-testers' },
    { name: 'Extensions & Boards', path: '/categories/extensions-boards' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Track Order', path: '/contact' },
    { name: 'FAQs', path: '/contact' },
    { name: 'Privacy Policy', path: '/about' },
    { name: 'Terms of Service', path: '/about' },
    { name: 'Refund Policy', path: '/about' }
  ];

  const paymentMethods = [
    { name: 'Cash on Delivery', icon: '💵' },
    { name: 'JazzCash', icon: '📱' },
    { name: 'EasyPaisa', icon: '📱' },
    { name: 'Bank Transfer', icon: '🏦' }
  ];

  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-900 to-gray-800 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-gray-900 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                ⚡ Get Exclusive Deals!
              </h3>
              <p className="text-gray-800 mt-1">Subscribe for latest products and special offers</p>
            </div>
            <form className="flex w-full lg:w-auto flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 lg:w-72 px-5 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none text-gray-900 shadow-lg"
              />
              <button 
                type="submit"
                className="bg-gray-900 text-white px-8 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-gray-800 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Subscribe 🔔
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-500 text-gray-900 p-3 rounded-xl shadow-lg">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <div>
                <span className="text-white text-2xl font-bold">Electro.pk</span>
                <p className="text-xs text-yellow-500">Pakistan's Electric Store</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Pakistan's premier electric store offering quality electrical supplies at the best prices. 
              Serving customers across Pakistan since 2020.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com/electropk" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com/electropk" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all hover:scale-110 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\s|\+|\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-all hover:scale-110 shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              🛍️ Product Categories
            </h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.path}>
                  <Link to={cat.path} className="hover:text-yellow-500 transition-colors flex items-center gap-2 hover:translate-x-1">
                    <span className="text-yellow-500">›</span> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              🔗 Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path + link.name}>
                  <Link to={link.path} className="hover:text-yellow-500 transition-colors flex items-center gap-2 hover:translate-x-1">
                    <span className="text-yellow-500">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
              📞 Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 mt-1">📍</span>
                <span className="text-gray-400">{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-yellow-500">📱</span>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-yellow-500 transition-colors">{contactInfo.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-yellow-500">💬</span>
                <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\s|\+|\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-yellow-500">✉️</span>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-yellow-500 transition-colors">{contactInfo.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-yellow-500">⏰</span>
                <span className="text-gray-400">{contactInfo.timings}</span>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-6">
              <h5 className="text-white font-medium mb-3 flex items-center gap-2">
                💳 We Accept:
              </h5>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((pm) => (
                  <span key={pm.name} className="bg-gray-800 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                    {pm.icon} {pm.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="text-gray-400 text-sm">
                © {currentYear} <Link to="/" className="text-yellow-500 hover:underline font-semibold">Electro.pk</Link>. All rights reserved. Made with ❤️ in Pakistan 🇵🇰
              </p>
              <p className="text-xs text-gray-500 mt-1">Powered by <a href="https://lumoracode.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">Lumoracode</a></p>
            </div>
            <div className="flex items-center gap-6 text-sm flex-wrap justify-center">
              <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>
              <Link to="/products" className="hover:text-yellow-500 transition-colors">Products</Link>
              <Link to="/about" className="hover:text-yellow-500 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-yellow-500 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;