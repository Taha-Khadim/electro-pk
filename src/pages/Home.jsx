import { Link } from 'react-router-dom';
import { ArrowRightIcon, TruckIcon, ShieldCheckIcon, CurrencyRupeeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { categories, getFeaturedProducts } from '../data/products';

const Home = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
                  🔥 New Arrivals Available
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Pakistan's Most Trusted <span className="bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">Electric Store</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Shop premium fans, LED lights, switches, and electrical supplies at unbeatable prices. 
                  Cash on delivery across Pakistan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/products" 
                    className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-cyan-400 hover:to-cyan-300 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Shop Now <ArrowRightIcon className="w-5 h-5" />
                  </Link>
                  <a 
                    href="https://wa.me/923211234567" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Order on WhatsApp
                  </a>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600" 
                  alt="Electric supplies"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Strip */}
        <section className="bg-gradient-to-r from-cyan-500 to-cyan-400 py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex items-center justify-center gap-2">
                <TruckIcon className="w-8 h-8 text-gray-900" />
                <div className="text-left">
                  <p className="font-bold text-gray-900">Free Delivery</p>
                  <p className="text-sm text-gray-800">Orders above Rs. 2000</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheckIcon className="w-8 h-8 text-gray-900" />
                <div className="text-left">
                  <p className="font-bold text-gray-900">100% Original</p>
                  <p className="text-sm text-gray-800">Quality Guaranteed</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CurrencyRupeeIcon className="w-8 h-8 text-gray-900" />
                <div className="text-left">
                  <p className="font-bold text-gray-900">Best Prices</p>
                  <p className="text-sm text-gray-800">In Pakistan</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <PhoneIcon className="w-8 h-8 text-gray-900" />
                <div className="text-left">
                  <p className="font-bold text-gray-900">24/7 Support</p>
                  <p className="text-sm text-gray-800">WhatsApp Chat</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our wide range of electrical products for your home and office
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link 
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className="text-4xl mb-3">
                    {cat.id === 'fans' && '🌀'}
                    {cat.id === 'lights' && '💡'}
                    {cat.id === 'switches' && '🔌'}
                    {cat.id === 'wires' && '⚡'}
                    {cat.id === 'circuit' && '🛡️'}
                    {cat.id === 'pvc' && '🔧'}
                  </div>
                  <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
                <p className="text-gray-600">Best deals on top-selling items</p>
              </div>
              <Link 
                to="/products" 
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white px-5 py-2 rounded-full hover:from-cyan-400 hover:to-cyan-300 font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105"
              >
                View All <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white px-6 py-3 rounded-full font-semibold hover:from-cyan-400 hover:to-cyan-300 transition-all shadow-md hover:shadow-lg hover:scale-105"
              >
                View All Products <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Electro.pk?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We are committed to providing the best shopping experience for electrical supplies in Pakistan
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-4xl">🏪</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Wide Range of Products</h3>
                <p className="text-gray-400">
                  From ceiling fans to LED lights, we have everything you need for electrical installations
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-4xl">💰</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Best Prices Guaranteed</h3>
                <p className="text-gray-400">
                  We offer competitive prices and regular discounts to ensure you get value for your money
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-4xl">🚚</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Pakistan-Wide Delivery</h3>
                <p className="text-gray-400">
                  Fast delivery to all major cities including Lahore, Karachi, Islamabad, and more
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-cyan-500 to-cyan-400">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Need Help Choosing Products?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Our team is available on WhatsApp to help you find the right products for your needs
            </p>
            <a 
              href="https://wa.me/923211234567?text=Hi!%20I%20need%20help%20with%20electrical%20products"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-green-700 transition-colors"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;