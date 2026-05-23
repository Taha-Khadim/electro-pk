import { Link } from 'react-router-dom';
import { ShieldCheckIcon, TruckIcon, BanknotesIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Quality Products',
      description: 'We only sell genuine, original products from authorized distributors and trusted brands.'
    },
    {
      icon: BanknotesIcon,
      title: 'Best Prices',
      description: 'Competitive prices in PKR with regular discounts and special offers for our customers.'
    },
    {
      icon: TruckIcon,
      title: 'Fast Delivery',
      description: 'Quick delivery across Pakistan with tracking. Free shipping on orders above Rs. 2,000.'
    },
    {
      icon: UserGroupIcon,
      title: 'Customer Support',
      description: 'WhatsApp support available 9 AM - 9 PM for orders, inquiries, and after-sales service.'
    }
  ];

  const teamValues = [
    { icon: '🎯', title: 'Customer First', desc: 'Your satisfaction is our priority' },
    { icon: '🤝', title: 'Trust', desc: 'Building long-term relationships' },
    { icon: '⚡', title: 'Reliability', desc: 'Consistent quality and service' },
    { icon: '💡', title: 'Innovation', desc: 'Continuously improving our offerings' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Pakistan's Trusted <span className="bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">Electric Store</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Electro.pk has been serving homes and businesses across Pakistan with quality electrical 
                supplies since 2020. We believe in making electrical products accessible to everyone.
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-white px-8 py-3 rounded-full font-bold hover:from-cyan-400 hover:to-cyan-300 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Electro.pk started with a simple mission: to make quality electrical products 
                    accessible and affordable for every Pakistani household and business.
                  </p>
                  <p>
                    Based in Lahore, Pakistan's electrical hub, we've grown from a small shop to 
                    one of the leading online stores for electrical supplies. Our team understands 
                    the needs of Pakistani consumers and ensures we stock products that perform 
                    well in local conditions.
                  </p>
                  <p>
                    We work directly with authorized distributors of major brands like Pakistan Cables, 
                    Dawlance, Philips, Super General, and Legrand to bring you genuine products 
                    at competitive prices.
                  </p>
                  <p>
                    Today, we serve thousands of customers across Pakistan, from individual homeowners 
                    to contractors and businesses, all trusting us for their electrical needs.
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600" 
                  alt="Electro.pk Store"
                  className="w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-cyan-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <feature.icon className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-cyan-400 bg-clip-text text-transparent" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamValues.map((value, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent mb-2">5000+</div>
                <p className="text-gray-400">Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent mb-2">30+</div>
                <p className="text-gray-400">Product Brands</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent mb-2">500+</div>
                <p className="text-gray-400">Products</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent mb-2">50+</div>
                <p className="text-gray-400">Cities Served</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-cyan-500 to-cyan-400">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Shop?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Browse our wide range of electrical products and experience the Electro.pk difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Shop Now
              </Link>
              <Link 
                to="/contact" 
                className="bg-white text-cyan-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;