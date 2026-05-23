import { useState } from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { contactInfo, deliveryInfo } from '../data/products';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsAppContact = () => {
    const message = `Hi! I have a question about Electro.pk products.`;
    window.open(`https://wa.me/${contactInfo.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
            <p className="text-gray-400">Get in touch with us for any queries or support</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-2xl p-8 text-white mb-8 shadow-lg">
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  <p className="mb-6 text-white/90">
                    Have questions about our products or need help with your order? 
                    We're here to help!
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPinIcon className="w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Our Location</h3>
                        <p>{contactInfo.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <PhoneIcon className="w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <a href={`tel:${contactInfo.phone}`} className="hover:underline">{contactInfo.phone}</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <EnvelopeIcon className="w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <ClockIcon className="w-6 h-6 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold">Business Hours</h3>
                        <p>{contactInfo.timings}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-3"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </button>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  
                  {submitted ? (
                    <div className="bg-green-100 text-green-800 p-6 rounded-xl text-center">
                      <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                      <p>We'll get back to you as soon as possible.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block font-medium mb-2">Your Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                            placeholder="Ahmed Khan"
                          />
                        </div>
                        <div>
                          <label className="block font-medium mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                            placeholder="ahmed@example.com"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block font-medium mb-2">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                            placeholder="+92 300 1234567"
                          />
                        </div>
                        <div>
                          <label className="block font-medium mb-2">Subject *</label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
                          >
                            <option value="">Select a subject</option>
                            <option value="order">Order Inquiry</option>
                            <option value="product">Product Question</option>
                            <option value="delivery">Delivery Status</option>
                            <option value="return">Returns/Exchange</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block font-medium mb-2">Your Message *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-white font-bold py-3 rounded-lg hover:from-cyan-400 hover:to-cyan-300 transition-colors shadow-lg hover:shadow-xl"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>

                {/* Delivery Cities */}
                <div className="mt-8 bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-4">Delivery Coverage</h3>
                  <p className="text-gray-600 mb-4">
                    We deliver to all major cities across Pakistan:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {deliveryInfo.cities.map((city) => (
                      <div key={city.name} className="bg-white rounded-lg p-3 text-center shadow-sm">
                        <p className="font-medium">{city.name}</p>
                        <p className="text-sm text-gray-500">{city.days}</p>
                      </div>
                    ))}
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

export default Contact;