import { useParams, Link } from 'react-router-dom';
import { ChevronRightIcon, StarIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon, HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { getProductById, getRelatedProducts, formatPrice } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(id, 4);
  const { addToCart, cart, updateQuantity, removeFromCart, toggleWishlist, isInWishlist, generateWhatsAppOrder } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const cartItem = cart.find(item => item.id === product?.id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link to="/products" className="text-yellow-600 hover:underline">
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discount = product.oldPrice 
    ? Math.round((1 - product.price / product.oldPrice) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleWhatsAppOrder = () => {
    const items = cart.map(item => 
      `• ${item.name} x${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const message = `🛒 *New Order from Electro.pk*\n\n${items}\n\n💰 *Total: Rs. ${total.toLocaleString()}*\n\nPlease confirm my order.`;
    window.open(`https://wa.me/923211234567?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="hover:text-yellow-600">Home</Link>
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              <Link to="/products" className="hover:text-yellow-600">Products</Link>
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500 truncate">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Image */}
              <div className="relative">
                <div className="bg-gray-100 rounded-2xl overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x600?text=Electro.pk';
                    }}
                  />
                </div>
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-4 py-2 rounded-full">
                    -{discount}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.rating} ratings)</span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <>
                        <span className="text-xl text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                        <span className="text-green-600 font-semibold">Save {formatPrice(product.oldPrice - product.price)}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium flex items-center gap-2">
                      ✓ In Stock ({product.stock} available)
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium">Out of Stock</span>
                  )}
                </div>

                {/* Quantity & Cart */}
                {cartItem ? (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                        className="p-3 hover:bg-gray-100"
                      >
                        <MinusIcon className="w-5 h-5" />
                      </button>
                      <span className="w-12 text-center font-semibold">{cartItem.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                        className="p-3 hover:bg-gray-100"
                      >
                        <PlusIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(cartItem.id)}
                      className="text-red-500 hover:text-red-600 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-100"
                      >
                        <MinusIcon className="w-5 h-5" />
                      </button>
                      <span className="w-12 text-center font-semibold">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-gray-100"
                      >
                        <PlusIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      className="flex-1 bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <ShoppingCartIcon className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mb-8">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`flex-1 py-3 px-6 rounded-lg border font-semibold flex items-center justify-center gap-2 transition-colors ${
                      inWishlist 
                        ? 'bg-red-50 border-red-200 text-red-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <HeartIcon className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                    {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                  <a
                    href={`https://wa.me/923211234567?text=Hi!%20I%20want%20to%20order:%20${encodeURIComponent(product.name)}%20(Rs.${product.price})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Order on WhatsApp
                  </a>
                </div>

                {/* Delivery Info */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span>🚚</span>
                    <span>Free delivery on orders above Rs. 2,000</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>💵</span>
                    <span>Cash on Delivery Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>🔄</span>
                    <span>Easy 7-day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;