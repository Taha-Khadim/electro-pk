import { useParams, Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { categories, getProductsByCategory } from '../data/products';

const CategoryPage = () => {
  const { slug } = useParams();
  const category = categories.find(c => c.slug === slug);
  const products = slug ? getProductsByCategory(slug) : [];

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <Link to="/categories" className="text-yellow-600 hover:underline">
              Back to Categories
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // SEO structured data for category
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} - Electro.pk`,
    "description": category.description,
    "url": `https://electro.pk/categories/${slug}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://electro.pk/product/${p.id}`
      }))
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="hover:text-yellow-600">Home</Link>
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              <Link to="/categories" className="hover:text-yellow-600">Categories</Link>
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">{category.name}</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <section className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-yellow-500 rounded-2xl flex items-center justify-center text-4xl">
                {category.id === 'fans' && '🌀'}
                {category.id === 'lights' && '💡'}
                {category.id === 'switches' && '🔌'}
                {category.id === 'wires' && '⚡'}
                {category.id === 'circuit' && '🛡️'}
                {category.id === 'pvc' && '🔧'}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.name} in Pakistan</h1>
                <p className="text-gray-400">
                  {products.length} products available | Best prices guaranteed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Category Description */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold mb-2">About {category.name}</h2>
              <p className="text-gray-600">
                {category.description}. Shop online with cash on delivery across Pakistan. 
                We offer genuine products with warranty and best after-sales service.
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{products.length} products</p>
              <Link to="/products" className="text-yellow-600 hover:underline font-medium">
                View All Products
              </Link>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-bold mb-2">No products in this category</h3>
                <Link to="/products" className="text-yellow-600 hover:underline">
                  Browse all products
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Related Categories */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4">
            <h3 className="text-xl font-bold mb-6">Other Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.filter(c => c.id !== category.id).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  className="bg-gray-50 rounded-xl p-4 text-center hover:bg-yellow-50 transition-colors"
                >
                  <div className="text-3xl mb-2">
                    {cat.id === 'fans' && '🌀'}
                    {cat.id === 'lights' && '💡'}
                    {cat.id === 'switches' && '🔌'}
                    {cat.id === 'wires' && '⚡'}
                    {cat.id === 'circuit' && '🛡️'}
                    {cat.id === 'pvc' && '🔧'}
                  </div>
                  <p className="font-medium text-sm">{cat.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;