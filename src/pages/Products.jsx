import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products, categories, searchProducts } from '../data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || 'default';

  const [displayedProducts, setDisplayedProducts] = useState(products);

  useEffect(() => {
    let filtered = searchQuery ? searchProducts(searchQuery) : [...products];
    
    if (categoryFilter) {
      const category = categories.find(c => c.slug === categoryFilter);
      if (category) {
        filtered = filtered.filter(p => p.category === category.id);
      }
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setDisplayedProducts(filtered);
  }, [searchQuery, categoryFilter, sortBy]);

  const handleCategoryChange = (slug) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {searchQuery ? `Search: "${searchQuery}"` : 'All Products'}
            </h1>
            <p className="text-gray-400">
              {displayedProducts.length} products found
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Filters</h3>
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden text-gray-500"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Categories</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleCategoryChange('')}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          !categoryFilter ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-50'
                        }`}
                      >
                        All Products
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.slug)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            categoryFilter === cat.slug ? 'bg-yellow-50 text-yellow-700' : 'hover:bg-gray-50'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Info */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Price Range</h4>
                    <p className="text-sm text-gray-600">
                      Rs. 350 - Rs. 18,500
                    </p>
                  </div>

                  {/* Clear Filters */}
                  {(searchQuery || categoryFilter) && (
                    <button
                      onClick={clearFilters}
                      className="w-full text-red-600 hover:text-red-700 font-medium py-2"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Sort & Results Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <p className="text-gray-600">
                    Showing {displayedProducts.length} products
                  </p>
                  
                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Toggle */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <FunnelIcon className="w-5 h-5" />
                      Filters
                    </button>

                    {/* Sort Dropdown */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSearchParams({ ...Object.fromEntries(searchParams), sort: e.target.value })}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500"
                    >
                      <option value="default">Sort by: Default</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name: A-Z</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>

                {/* Products */}
                {displayedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold mb-2">No products found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search or filters
                    </p>
                    <button
                      onClick={clearFilters}
                      className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;