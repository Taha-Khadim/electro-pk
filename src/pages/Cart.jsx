import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { formatPrice, deliveryInfo } from '../data/products';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const freeDeliveryThreshold = deliveryInfo.freeThreshold;
  const amountForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartTotal);
  const isEligibleForFreeDelivery = cartTotal >= freeDeliveryThreshold;

  const handleWhatsAppOrder = () => {
    const items = cart.map(item => 
      `• ${item.name} x${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
    const message = `🛒 *New Order from Electro.pk*\n\n${items}\n\n💰 *Total: Rs. ${cartTotal.toLocaleString()}*\n\nPlease confirm my order and provide delivery details.`;
    window.open(`https://wa.me/923211234567?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <ShoppingBagIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400"
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
            <p className="text-gray-400">{cart.length} items in your cart</p>
          </div>
        </section>

        {/* Free Delivery Progress */}
        {!isEligibleForFreeDelivery && (
          <div className="bg-yellow-50 py-3">
            <div className="container mx-auto px-4">
              <p className="text-sm text-center">
                Add <strong>Rs. {amountForFreeDelivery.toLocaleString()}</strong> more for free delivery! 🚚
              </p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 transition-all"
                  style={{ width: `${Math.min((cartTotal / freeDeliveryThreshold) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {cart.map((item) => (
                    <div 
                      key={item.id}
                      className="flex gap-4 p-4 border-b last:border-b-0"
                    >
                      {/* Image */}
                      <Link to={`/product/${item.id}`} className="flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100x100?text=Product';
                          }}
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/product/${item.id}`}
                          className="font-semibold text-gray-900 hover:text-yellow-600 line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-gray-500 text-sm mt-1">{formatPrice(item.price)} each</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <MinusIcon className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <PlusIcon className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 p-2"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex-shrink-0 text-right">
                        <p className="font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="mt-4 text-red-500 hover:text-red-600 font-medium"
                >
                  Clear Cart
                </button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery</span>
                      <span className={isEligibleForFreeDelivery ? 'text-green-600 font-medium' : 'font-medium'}>
                        {isEligibleForFreeDelivery ? 'FREE' : 'Rs. 200'}
                      </span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-lg">
                        {formatPrice(cartTotal + (isEligibleForFreeDelivery ? 0 : 200))}
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Order Button */}
                  <a
                    href={`https://wa.me/923211234567?text=${encodeURIComponent(
                      `🛒 *Order from Electro.pk*\n\n${cart.map(item => 
                        `• ${item.name} x${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`
                      ).join('\n')}\n\n💰 *Total: Rs. ${(cartTotal + (isEligibleForFreeDelivery ? 0 : 200)).toLocaleString()}*\n\nPlease confirm and share delivery address.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-500 text-white text-center py-3 rounded-lg font-bold hover:bg-green-600 transition-colors mb-3"
                  >
                    Order via WhatsApp
                  </a>

                  <Link
                    to="/checkout"
                    className="block w-full bg-yellow-500 text-gray-900 text-center py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                  >
                    Proceed to Checkout
                  </Link>

                  {/* Payment Methods */}
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-gray-500 mb-2">We Accept:</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-gray-100 px-2 py-1 rounded">💵 Cash on Delivery</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">📱 JazzCash</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">📱 EasyPaisa</span>
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