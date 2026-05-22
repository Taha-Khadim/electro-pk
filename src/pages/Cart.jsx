import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { formatPrice, deliveryInfo, contactInfo } from '../data/products';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const freeDeliveryThreshold = deliveryInfo.freeThreshold;
  const amountForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartTotal);
  const isEligibleForFreeDelivery = cartTotal >= freeDeliveryThreshold;

  const handleWhatsAppOrder = () => {
    const items = cart.map(item => 
      `• ${item.name} x${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`
    ).join('%0A');
    
    const message = `🛒 *New Order from Electro.pk*%0A%0A${items}%0A%0A💰 *Total: Rs. ${cartTotal.toLocaleString()}*%0A%0APlease confirm my order and provide delivery details.`;
    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/\s|\+|\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <ShoppingBagIcon className="w-24 h-24 text-cyan-300 mx-auto mb-6 product-card-3d" />
            <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#023e8a] to-[#0077b6] bg-clip-text text-transparent">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all btn-3d"
            >
              Continue Shopping <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50 to-blue-50">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-r from-[#023e8a] via-[#0077b6] to-[#00b4d8] text-white py-10 hero-3d">
          <div className="container mx-auto px-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Home
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
            <p className="text-white/80">{cart.length} items in your cart</p>
          </div>
        </section>

        {!isEligibleForFreeDelivery && (
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 py-4">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm font-medium text-white">
                  Add <strong>Rs. {amountForFreeDelivery.toLocaleString()}</strong> more for FREE delivery! 🚚
                </span>
              </div>
              <div className="mt-2 h-2.5 bg-white/30 rounded-full overflow-hidden max-w-md mx-auto">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${Math.min((cartTotal / freeDeliveryThreshold) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {isEligibleForFreeDelivery && (
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 py-3">
            <div className="container mx-auto px-4 text-center">
              <span className="text-white font-bold">🎉 You qualify for FREE delivery!</span>
            </div>
          </div>
        )}

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden depth-2">
                  {cart.map((item) => (
                    <div 
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4 p-4 md:p-6 border-b last:border-b-0 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-colors product-card-3d"
                    >
                      <Link to={`/product/${item.id}`} className="flex-shrink-0 mx-auto sm:mx-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl shadow-lg product-image-3d"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/128x128?text=Product';
                          }}
                        />
                      </Link>

                      <div className="flex-1 text-center sm:text-left">
                        <Link 
                          to={`/product/${item.id}`}
                          className="font-bold text-gray-900 hover:text-cyan-600 line-clamp-2 text-lg"
                        >
                          {item.name}
                        </Link>
                        <p className="text-cyan-600 font-medium text-sm mt-1">{formatPrice(item.price)} each</p>
                        
                        <div className="flex items-center justify-center sm:justify-start gap-4 mt-4">
                          <div className="flex items-center border-2 border-cyan-200 rounded-xl overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-3 hover:bg-cyan-50 transition-colors"
                            >
                              <MinusIcon className="w-4 h-4 text-cyan-600" />
                            </button>
                            <span className="w-12 text-center font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-3 hover:bg-cyan-50 transition-colors"
                            >
                              <PlusIcon className="w-4 h-4 text-cyan-600" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-3 rounded-xl transition-colors"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                        <p className="font-bold text-lg bg-gradient-to-r from-[#0077b6] to-[#00b4d8] bg-clip-text text-transparent">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-medium transition-colors"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                    Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-600 font-medium transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 depth-3">
                  <h2 className="text-lg font-bold mb-4 text-[#023e8a]">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                      <span className="font-medium">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery (5-7 days)</span>
                      <span className={isEligibleForFreeDelivery ? 'text-green-600 font-bold' : 'font-medium'}>
                        {isEligibleForFreeDelivery ? 'FREE 🎉' : 'Rs. 200'}
                      </span>
                    </div>
                    <div className="border-t-2 border-cyan-100 pt-3 flex justify-between">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-xl bg-gradient-to-r from-[#0077b6] to-[#00b4d8] bg-clip-text text-transparent">
                        {formatPrice(cartTotal + (isEligibleForFreeDelivery ? 0 : 200))}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg flex items-center justify-center gap-3 mb-3 btn-3d"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Order via WhatsApp
                  </button>

                  <Link
                    to="/checkout"
                    className="block w-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white text-center py-4 rounded-xl font-bold hover:from-[#023e8a] hover:to-[#0077b6] transition-all shadow-lg flex items-center justify-center gap-2 btn-3d"
                  >
                    Proceed to Checkout
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>

                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-gray-500 mb-3 font-medium">We Accept:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium">📱 JazzCash</span>
                      <span className="bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium">📱 EasyPaisa</span>
                      <span className="bg-gradient-to-r from-cyan-50 to-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium">🏦 Bank</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;