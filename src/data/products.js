// Format price in PKR
export const formatPrice = (price) => `Rs. ${price.toLocaleString()}`;

// Product categories with SEO-friendly slugs
export const categories = [
  { id: 'fans', name: 'Fans', slug: 'fans', icon: 'Wind', 
    description: 'Ceiling fans, pedestal fans, wall fans, and exhaust fans for every space' },
  { id: 'lights', name: 'Lights & LED', slug: 'lights-led', icon: 'Lightbulb',
    description: 'LED bulbs, tube lights, panel lights, strip lights, and more' },
  { id: 'switches', name: 'Switches & Sockets', slug: 'switches-sockets', icon: 'ToggleRight',
    description: 'Premium switches, sockets, dimmers, and USB outlets' },
  { id: 'wires', name: 'Wires & Cables', slug: 'wires-cables', icon: 'Cable',
    description: 'Electrical wires, cables, and accessories for safe installations' },
  { id: 'circuit', name: 'Circuit Breakers', slug: 'circuit-breakers', icon: 'Zap',
    description: 'MCBs, MCCBs, and distribution boards for electrical safety' },
  { id: 'pvc', name: 'PVC Pipes', slug: 'pvc-pipes', icon: 'Box',
    description: 'PVC conduits, pipes, and fittings for cable management' }
];

// Products with Pakistani Rupee prices
export const products = [
  // FANS
  { id: 1, name: 'Pak Electron Ceiling Fan 56"', category: 'fans', price: 8500,
    oldPrice: 9500, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400',
    description: 'Energy-efficient ceiling fan with powerful air delivery. Perfect for Pakistani summers.',
    tags: ['ceiling fan', 'Pak Electron', '56 inch', 'best seller'],
    stock: 25, rating: 4.5 },
  { id: 2, name: 'Super General Pedestal Fan 18"', category: 'fans', price: 6500,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Adjustable pedestal fan with oscillation. Ideal for offices and shops.',
    tags: ['pedestal fan', 'Super General', 'adjustable'],
    stock: 30, rating: 4.3 },
  { id: 3, name: 'Royal Wall Fan 16"', category: 'fans', price: 4200,
    image: 'https://images.unsplash.com/photo-1620733723572-11c53fc73571?w=400',
    description: 'Compact wall-mounted fan with remote control. Saves floor space.',
    tags: ['wall fan', 'Royal', 'remote control'],
    stock: 20, rating: 4.2 },
  { id: 4, name: 'GFC Exhaust Fan 8"', category: 'fans', price: 2800,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400',
    description: 'Bathroom and kitchen exhaust fan. Removes moisture and odors.',
    tags: ['exhaust fan', 'GFC', 'bathroom'],
    stock: 40, rating: 4.0 },
  { id: 5, name: 'Dawlance Ceiling Fan 56" Gold', category: 'fans', price: 12500,
    oldPrice: 14000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
    description: 'Premium gold finish ceiling fan by Dawlance. Elegant design with powerful performance.',
    tags: ['ceiling fan', 'Dawlance', 'gold', 'premium'],
    stock: 15, rating: 4.8 },

  // LIGHTS
  { id: 6, name: 'Philips LED Bulb 12W', category: 'lights', price: 350,
    image: 'https://images.unsplash.com/photo-1494438879904-6779160b1c21?w=400',
    description: 'Energy-saving LED bulb. Lasts up to 25,000 hours. Cool daylight.',
    tags: ['LED bulb', 'Philips', '12W', 'energy saving'],
    stock: 200, rating: 4.6 },
  { id: 7, name: 'LED Panel Light Round 18W', category: 'lights', price: 1200,
    oldPrice: 1500, image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400',
    description: 'Slim LED panel light for false ceilings. Bright and uniform lighting.',
    tags: ['LED panel', 'round', '18W', 'ceiling light'],
    stock: 80, rating: 4.4 },
  { id: 8, name: 'LED Strip Light 5m RGB', category: 'lights', price: 1800,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
    description: 'Colorful RGB LED strip with remote control. Perfect for decoration.',
    tags: ['LED strip', 'RGB', 'colorful', 'decorative'],
    stock: 60, rating: 4.2 },
  { id: 9, name: 'Philips LED Tube Light 4ft', category: 'lights', price: 550,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400',
    description: 'Bright 4ft LED tube light. Replaces traditional fluorescent tubes.',
    tags: ['LED tube', 'Philips', '4ft', 'office'],
    stock: 100, rating: 4.5 },
  { id: 10, name: 'LED Flood Light 50W', category: 'lights', price: 3500,
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400',
    description: 'Powerful LED flood light for outdoor areas. Weatherproof IP65.',
    tags: ['flood light', 'LED', '50W', 'outdoor'],
    stock: 35, rating: 4.7 },

  // SWITCHES
  { id: 11, name: 'Pakistan Cables Switch Board 6-Gang', category: 'switches', price: 2800,
    image: 'https://images.unsplash.com/photo-1541748603027-cfa1cde8f223?w=400',
    description: '6-gang premium switch board by Pakistan Cables. Fire-retardant material.',
    tags: ['switch board', '6-gang', 'Pakistan Cables', 'premium'],
    stock: 45, rating: 4.6 },
  { id: 12, name: 'Universal Socket with USB', category: 'switches', price: 850,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'International socket with 2 USB ports. Charge phones and gadgets easily.',
    tags: ['socket', 'USB', 'universal', 'charging'],
    stock: 70, rating: 4.3 },
  { id: 13, name: 'LED Dimmer Switch', category: 'switches', price: 1200,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
    description: 'Rotary dimmer for LED lights. Adjust brightness to your preference.',
    tags: ['dimmer', 'LED', 'adjustable', 'switch'],
    stock: 40, rating: 4.1 },
  { id: 14, name: 'Modular Switch 1-Way', category: 'switches', price: 180,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Single modular switch. Clean modern design for new installations.',
    tags: ['modular switch', '1-way', 'modern'],
    stock: 150, rating: 4.4 },
  { id: 15, name: 'TV & Phone Socket Combo', category: 'switches', price: 750,
    image: 'https://images.unsplash.com/photo-1541748603027-cfa1cde8f223?w=400',
    description: 'Combined TV and phone socket. Essential for modern homes.',
    tags: ['TV socket', 'phone socket', 'combo'],
    stock: 55, rating: 4.2 },

  // WIRES
  { id: 16, name: 'Pakistan Cables Wire 2.5mm (90m)', category: 'wires', price: 18500,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
    description: 'Premium 2.5mm electrical wire by Pakistan Cables. 90 meter roll.',
    tags: ['wire', '2.5mm', 'Pakistan Cables', '90m roll'],
    stock: 25, rating: 4.8 },
  { id: 17, name: 'Ferozepur Wire 1.5mm (90m)', category: 'wires', price: 12000,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: '1.5mm copper wire by Ferozepur. Ideal for lighting circuits.',
    tags: ['wire', '1.5mm', 'Ferozepur', 'lighting'],
    stock: 30, rating: 4.5 },
  { id: 18, name: 'Flexible Wire 4mm (50m)', category: 'wires', price: 9500,
    image: 'https://images.unsplash.com/photo-1621905251189-c6f2d9d4a5c9?w=400',
    description: 'Flexible copper wire for air conditioners and heavy appliances.',
    tags: ['flexible wire', '4mm', 'AC wire', 'heavy duty'],
    stock: 20, rating: 4.6 },
  { id: 19, name: 'USB Cable Wire 2 Core', category: 'wires', price: 250,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: '2 core USB cable wire for data and charging applications.',
    tags: ['USB cable', '2 core', 'data cable'],
    stock: 100, rating: 4.0 },
  { id: 20, name: 'Earth Wire 2.5mm (90m)', category: 'wires', price: 9500,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Green/yellow earth wire for safety grounding. Essential for all installations.',
    tags: ['earth wire', 'grounding', 'safety', '2.5mm'],
    stock: 35, rating: 4.7 },

  // CIRCUIT BREAKERS
  { id: 21, name: 'Legrand MCB 10A Single Pole', category: 'circuit', price: 680,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Mini circuit breaker for overload protection. Trusted Legrand quality.',
    tags: ['MCB', 'Legrand', '10A', 'circuit breaker'],
    stock: 60, rating: 4.6 },
  { id: 22, name: 'Hager MCCB 63A 3-Pole', category: 'circuit', price: 8500,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
    description: 'Heavy-duty MCCB for industrial applications. 3-phase protection.',
    tags: ['MCCB', 'Hager', '63A', '3-pole', 'industrial'],
    stock: 15, rating: 4.9 },
  { id: 23, name: 'Circuit Breaker Distribution Box 12-Way', category: 'circuit', price: 2200,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Surface-mounted DB box for 12 circuit breakers. Metal enclosure.',
    tags: ['distribution box', 'DB box', '12-way', 'metal'],
    stock: 25, rating: 4.4 },
  { id: 24, name: 'Earth Leakage Circuit Breaker 30mA', category: 'circuit', price: 3500,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
    description: 'ELCB/RCCB for human safety. Detects earth leakage instantly.',
    tags: ['ELCB', 'RCCB', 'earth leakage', 'safety'],
    stock: 20, rating: 4.7 },
  { id: 25, name: 'Surge Protection Device', category: 'circuit', price: 4500,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'SPD to protect appliances from voltage surges. Essential for modern homes.',
    tags: ['SPD', 'surge protection', 'voltage protection'],
    stock: 18, rating: 4.5 },

  // PVC PIPES
  { id: 26, name: 'NIPCO PVC Pipe 1" (10ft)', category: 'pvc', price: 850,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Heavy-duty PVC conduit pipe for electrical wiring protection.',
    tags: ['PVC pipe', 'NIPCO', '1 inch', 'conduit'],
    stock: 150, rating: 4.3 },
  { id: 27, name: 'PVC Elbow 1" 90-Degree', category: 'pvc', price: 45,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'PVC elbow fitting for smooth wire routing around corners.',
    tags: ['PVC elbow', '90 degree', 'fitting'],
    stock: 300, rating: 4.1 },
  { id: 28, name: 'PVC Junction Box Large', category: 'pvc', price: 180,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Large junction box for wire connections and maintenance access.',
    tags: ['junction box', 'PVC', 'large'],
    stock: 80, rating: 4.2 },
  { id: 29, name: 'PVC Conduit Clip 1" (100pcs)', category: 'pvc', price: 550,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: '100 pieces of conduit clips for securing PVC pipes to walls.',
    tags: ['conduit clip', '100 pcs', 'PVC'],
    stock: 40, rating: 4.0 },
  { id: 30, name: 'PVC Bend 1" (Large Radius)', category: 'pvc', price: 120,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    description: 'Large radius bend for easy wire pulling through conduit system.',
    tags: ['PVC bend', 'large radius', 'conduit'],
    stock: 90, rating: 4.4 }
];

// Get products by category
export const getProductsByCategory = (categorySlug) => {
  const category = categories.find(c => c.slug === categorySlug);
  if (!category) return [];
  return products.filter(p => p.category === category.id);
};

// Get product by ID
export const getProductById = (id) => products.find(p => p.id === parseInt(id));

// Get featured products
export const getFeaturedProducts = () => {
  return products.filter(p => p.oldPrice).slice(0, 8);
};

// Get related products
export const getRelatedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

// Search products
export const searchProducts = (query) => {
  const q = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(tag => tag.toLowerCase().includes(q))
  );
};

// Pakistan-specific payment options
export const paymentMethods = [
  { id: 'cod', name: 'Cash on Delivery', icon: 'Banknote', description: 'Pay when you receive' },
  { id: 'jazzcash', name: 'JazzCash', icon: 'Wallet', description: 'Mobile wallet payment' },
  { id: 'easypaisa', name: 'EasyPaisa', icon: 'Phone', description: 'Mobile wallet payment' },
  { id: 'bank', name: 'Bank Transfer', icon: 'Building2', description: 'Direct bank transfer' }
];

// Delivery information for Pakistan
export const deliveryInfo = {
  cities: [
    { name: 'Lahore', days: '1-2 days', charge: 200 },
    { name: 'Karachi', days: '3-5 days', charge: 400 },
    { name: 'Islamabad', days: '2-3 days', charge: 300 },
    { name: 'Rawalpindi', days: '2-3 days', charge: 250 },
    { name: 'Faisalabad', days: '2-3 days', charge: 250 },
    { name: 'Multan', days: '3-4 days', charge: 350 },
    { name: 'Peshawar', days: '3-5 days', charge: 400 },
    { name: 'Other Cities', days: '4-7 days', charge: 500 }
  ],
  freeThreshold: 2000,
  freeDeliveryCities: ['Lahore']
};

// Contact information
export const contactInfo = {
  phone: '+92 321 1234567',
  whatsapp: '+923211234567',
  email: 'info@electro.pk',
  address: 'Shop #123, Main Market, Gulberg III, Lahore, Pakistan',
  timings: '9:00 AM - 9:00 PM (All Days)'
};