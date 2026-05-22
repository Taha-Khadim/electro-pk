import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, TruckIcon, CreditCardIcon, WalletIcon, PhoneIcon, MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { formatPrice, deliveryInfo, contactInfo } from '../data/products';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Lahore',
    address: '',
    paymentMethod: 'jazzcash'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isEligibleForFreeDelivery = cartTotal >= deliveryInfo.freeThreshold;
  const deliveryCharge = isEligibleForFreeDelivery ? 0 : 200;
  const finalTotal = cartTotal + deliveryCharge;

  const validatePhone = (phone) => {
    const phoneRegex = /^(\+92|92|0)?[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid Pakistani phone number (e.g., 03001234567)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    } else if (formData.address.length < 10) {
      newErrors.address = 'Please enter a complete address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    const items = cart.map(item => 
      `• ${item.name} x${item.quantity} = Rs. ${(item.price * item.quantity).toLocaleString()}`
    ).join('%0A');

    const paymentText = formData.paymentMethod === 'jazzcash' ? 'JazzCash' : 
                       formData.paymentMethod === 'easypaisa' ? 'EasyPaisa' : 'Bank Transfer';

    const orderMessage = `🛒 *NEW ORDER - Electro.pk*%0A%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A%0A` +
      `📋 *Customer Details:*%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `👤 Name: ${formData.name}%0A` +
      `📱 Phone: ${formData.phone}%0A` +
      `✉️ Email: ${formData.email}%0A` +
      `🏙️ City: ${formData.city}%0A` +
      `📍 Address: ${formData.address}%0A%0A` +
      `📦 *Order Items:*%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A` +
      `${items}%0A%0A` +
      `🚚 *Delivery:* ${formData.city} (5-7 days)%0A` +
      `💳 *Payment:* ${paymentText}%0A%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A%0A` +
      `💰 *TOTAL: Rs. ${finalTotal.toLocaleString()}*%0A%0A` +
      `━━━━━━━━━━━━━━━━━━━━%0A%0A` +
      `⚡ Order received at electro-pk.vercel.app`;

    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/\s|\+|\D/g, '')}?text=${orderMessage}`, '_blank');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    setOrderPlaced(true);
    setLoading(false);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 product-card-3d">
              <svg className="w-12 h-12 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#023e8a] to-[#0077b6] bg-clip-text text-transparent">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some products to your cart before checking out.</p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all btn-3d"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="text-center max-w-lg mx-auto px-4">
            <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 product-card-3d">
              <CheckCircleIcon className="w-20 h-20 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">Order Placed Successfully! 🎉</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order! Your order details have been sent via WhatsApp. We will contact you shortly to confirm delivery.
            </p>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 mb-8 depth-2">
              <h3 className="font-bold text-lg mb-4 text-[#023e8a]">📋 What Happens Next?</h3>
              <ul className="text-left space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-cyan-600" />
                  <span>We'll call you to confirm your Order</span>
                </li>
                <li className="flex items-center gap-3">
                  <TruckIcon className="w-5 h-5 text-cyan-600" />
                  <span>Delivery in 5-7 business days</span>
                </li>
                <li className="flex items-center gap-3">
                  <CreditCardIcon className="w-5 h-5 text-cyan-600" />
                  <span>Pay via your selected payment method</span>
                </li>
                <li className="flex items-center gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-cyan-600" />
                  <span>Quality guaranteed or money back</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#023e8a] to-[#0077b6] text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all"
              >
                Back to Home
              </Link>
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00b4d8] to-[#0077b6] text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-50 to-blue-50">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/cart" className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110">
              <ArrowLeftIcon className="w-5 h-5 text-cyan-600" />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#023e8a] to-[#0077b6] bg-clip-text text-transparent">Checkout</h1>
              <p className="text-gray-500">Complete your order - Delivery in 5-7 days</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 depth-2">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#023e8a]">
                  👤 Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all input-3d ${errors.name ? 'border-red-500' : 'border-cyan-100 focus:border-cyan-500'}`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all input-3d ${errors.phone ? 'border-red-500' : 'border-cyan-100 focus:border-cyan-500'}`}
                      placeholder="03001234567"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all input-3d ${errors.email ? 'border-red-500' : 'border-cyan-100 focus:border-cyan-500'}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 depth-2">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#023e8a]">
                  <MapPinIcon className="w-5 h-5 text-cyan-500" />
                  Delivery Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-cyan-100 rounded-xl focus:border-cyan-500 focus:outline-none transition-all bg-white input-3d"
                    >
                      {deliveryInfo.cities.map((city) => (
                        <option key={city.name} value={city.name}>{city.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Time</label>
                    <div className="px-4 py-3 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-100 rounded-xl text-cyan-700 font-medium">
                      ⏱️ 5-7 Business Days
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all resize-none input-3d ${errors.address ? 'border-red-500' : 'border-cyan-100 focus:border-cyan-500'}`}
                      placeholder="House #, Street, Area, Near Landmark, City"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 depth-2">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-[#023e8a]">
                  <WalletIcon className="w-5 h-5 text-cyan-500" />
                  Payment Method
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { id: 'jazzcash', name: 'JazzCash', icon: '📱', desc: 'Mobile wallet payment' },
                    { id: 'easypaisa', name: 'EasyPaisa', icon: '📱', desc: 'Mobile wallet payment' },
                    { id: 'bank', name: 'Bank Transfer', icon: '🏦', desc: 'Direct bank transfer' }
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all product-card-3d ${
                        formData.paymentMethod === method.id 
                          ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50' 
                          : 'border-cyan-100 hover:border-cyan-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <div className="flex-1">
                        <span className="font-bold text-gray-900">{method.name}</span>
                        <p className="text-xs text-gray-500">{method.desc}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.paymentMethod === method.id 
                          ? 'border-cyan-500 bg-gradient-to-r from-[#0077b6] to-[#00b4d8]' 
                          : 'border-gray-300'
                      }`}>
                        {formData.paymentMethod === method.id && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 depth-3">
                <h2 className="text-lg font-bold mb-4 text-[#023e8a]">Order Summary</h2>
                
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center p-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover product-image-3d"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/56'}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold text-[#0077b6]">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-cyan-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery (5-7 days)</span>
                    <span className={isEligibleForFreeDelivery ? 'text-green-600 font-bold' : 'font-medium'}>
                      {isEligibleForFreeDelivery ? 'FREE 🎉' : formatPrice(deliveryCharge)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t-2 border-cyan-100">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] bg-clip-text text-transparent text-xl">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white py-4 rounded-xl font-bold hover:from-[#023e8a] hover:to-[#0077b6] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-3d"
                >
                  {loading ? (
                    <>
                      <div className="spinner-3d w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="w-5 h-5" />
                      Place Order
                    </>
                  )}
                </button>

                <div className="mt-4 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl text-center">
                  <p className="text-xs text-gray-600">
                    📱 Your order will be sent to our WhatsApp. We'll call you to confirm.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;