import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { categories, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryProducts = selectedCategory ? getProductsByCategory(selectedCategory.slug) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Product Categories</h1>
            <p className="text-gray-400">Browse our wide range of electrical products</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Category Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`group bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all ${
                    selectedCategory?.id === cat.id ? 'ring-2 ring-yellow-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-yellow-50 rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {cat.id === 'fans' && '🌀'}
                      {cat.id === 'lights' && '💡'}
                      {cat.id === 'switches' && '🔌'}
                      {cat.id === 'wires' && '⚡'}
                      {cat.id === 'circuit' && '🛡️'}
                      {cat.id === 'pvc' && '🔧'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg group-hover:text-yellow-600 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{cat.description}</p>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Category Description Cards */}
            <div className="space-y-6">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-gray-50 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center text-2xl">
                      {cat.id === 'fans' && '🌀'}
                      {cat.id === 'lights' && '💡'}
                      {cat.id === 'switches' && '🔌'}
                      {cat.id === 'wires' && '⚡'}
                      {cat.id === 'circuit' && '🛡️'}
                      {cat.id === 'pvc' && '🔧'}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{cat.name}</h2>
                      <p className="text-gray-600">{cat.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {getProductsByCategory(cat.slug).slice(0, 5).map((product) => (
                      <span key={product.id} className="bg-white px-4 py-2 rounded-full text-sm shadow-sm">
                        {product.name}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold"
                  >
                    View All {cat.name} <ChevronRightIcon className="w-5 h-5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Electrical Products in Pakistan</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Electro.pk is Pakistan's leading online store for electrical supplies and equipment. 
                We offer a comprehensive range of electrical products including ceiling fans, LED lights, 
                switches, wires, circuit breakers, and PVC pipes from trusted brands like Pakistan Cables, 
                Dawlance, Super General, Philips, and more.
              </p>
              <p className="mb-4">
                Whether you're looking for <strong>ceiling fans for your home</strong>, <strong>LED lights 
                for your office</strong>, or <strong>electrical wires for construction</strong>, we've got 
                you covered. Our products are sourced from authorized distributors ensuring 100% authenticity.
              </p>
              <h3 className="text-xl font-bold mt-6 mb-3">Why Shop From Electro.pk?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>✓ Wide range of genuine electrical products</li>
                <li>✓ Competitive prices in Pakistani Rupees (PKR)</li>
                <li>✓ Cash on Delivery across Pakistan</li>
                <li>✓ Free delivery on orders above Rs. 2,000</li>
                <li>✓ WhatsApp support for instant assistance</li>
                <li>✓ Easy returns and exchange policy</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;