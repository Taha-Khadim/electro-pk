-- Electro.pk Supabase Database Schema
-- Run this in Supabase SQL Editor to set up all tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category_id VARCHAR(50) NOT NULL,
  category_slug VARCHAR(100) NOT NULL,
  category_name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  old_price DECIMAL(10, 2),
  image TEXT,
  images TEXT[],
  tags TEXT[],
  stock INTEGER DEFAULT 0,
  rating DECIMAL(2, 1) DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for product search
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

-- Users/Profiles table (extends Supabase auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Carts table
CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  items JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  items JSONB NOT NULL DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  guest_email VARCHAR(255),
  guest_phone VARCHAR(50),
  guest_name VARCHAR(255),
  guest_address TEXT,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  delivery_charge DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- Order Status History
CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_read ON contact_messages(read);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  icon VARCHAR(50),
  description TEXT,
  image TEXT,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'EPK-' || TO_CHAR(NOW(), 'YYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 6));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for order number
DROP TRIGGER IF EXISTS trigger_generate_order_number ON orders;
CREATE TRIGGER trigger_generate_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION generate_order_number();

-- Function to update timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS trigger_products_updated ON products;
CREATE TRIGGER trigger_products_updated
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trigger_profiles_updated ON profiles;
CREATE TRIGGER trigger_profiles_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trigger_orders_updated ON orders;
CREATE TRIGGER trigger_orders_updated
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trigger_carts_updated ON carts;
CREATE TRIGGER trigger_carts_updated
  BEFORE UPDATE ON carts
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

DROP TRIGGER IF EXISTS trigger_wishlists_updated ON wishlists;
CREATE TRIGGER trigger_wishlists_updated
  BEFORE UPDATE ON wishlists
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_on_auth_user_created ON auth.users;
CREATE TRIGGER trigger_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Carts policies
CREATE POLICY "Users can view own cart" ON carts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart" ON carts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart" ON carts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart" ON carts
  FOR DELETE USING (auth.uid() = user_id);

-- Wishlists policies
CREATE POLICY "Users can view own wishlist" ON wishlists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wishlist" ON wishlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wishlist" ON wishlists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own wishlist" ON wishlists
  FOR DELETE USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id OR guest_email IS NOT NULL);

CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Public read for orders status (for tracking)
CREATE POLICY "Anyone can view order by number" ON orders
  FOR SELECT USING (true);

-- Contact messages - anyone can insert, only admin can view/update
CREATE POLICY "Anyone can submit contact message" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contact messages" ON contact_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND (raw_user_meta_data->>'role' = 'admin' OR raw_user_meta_data->>'role' = 'staff')
    )
  );

CREATE POLICY "Admins can update contact messages" ON contact_messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND (raw_user_meta_data->>'role' = 'admin' OR raw_user_meta_data->>'role' = 'staff')
    )
  );

-- Newsletter policies
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view subscribers" ON newsletter_subscribers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND (raw_user_meta_data->>'role' = 'admin' OR raw_user_meta_data->>'role' = 'staff')
    )
  );

-- Products - public read
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Categories - public read
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active categories" ON categories
  FOR SELECT USING (active = true);

CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- ============================================
-- API ENDPOINTS (via Supabase Edge Functions)
-- ============================================

-- Create API endpoint for product search with filters
CREATE OR REPLACE FUNCTION search_products(query TEXT)
RETURNS TABLE(
  id UUID,
  name VARCHAR(255),
  slug VARCHAR(255),
  description TEXT,
  category_slug VARCHAR(100),
  price DECIMAL(10, 2),
  old_price DECIMAL(10, 2),
  image TEXT,
  stock INTEGER,
  rating DECIMAL(2, 1)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id, p.name, p.slug, p.description, 
    p.category_slug, p.price, p.old_price, p.image, p.stock, p.rating
  FROM products p
  WHERE p.active = true
    AND (
      p.name ILIKE '%' || query || '%'
      OR p.description ILIKE '%' || query || '%'
      OR EXISTS (
        SELECT 1 FROM unnest(p.tags) AS tag WHERE tag ILIKE '%' || query || '%'
      )
    )
  ORDER BY 
    CASE WHEN p.name ILIKE '%' || query || '%' THEN 0 ELSE 1 END,
    p.rating DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get featured products
CREATE OR REPLACE FUNCTION get_featured_products(limit_count INTEGER DEFAULT 8)
RETURNS TABLE(
  id UUID,
  name VARCHAR(255),
  slug VARCHAR(255),
  category_slug VARCHAR(100),
  price DECIMAL(10, 2),
  old_price DECIMAL(10, 2),
  image TEXT,
  stock INTEGER,
  rating DECIMAL(2, 1)
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id, p.name, p.slug, p.category_slug, p.price, p.old_price, p.image, p.stock, p.rating
  FROM products p
  WHERE p.active = true AND (p.featured = true OR p.old_price IS NOT NULL)
  ORDER BY p.rating DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SEED DATA (Sample Products)
-- ============================================

INSERT INTO categories (id, name, slug, icon, description, sort_order) VALUES
  ('fans', 'Fans', 'fans', 'Wind', 'Ceiling fans, pedestal fans, wall fans, and exhaust fans for every space', 1),
  ('lights', 'Lights & LED', 'lights-led', 'Lightbulb', 'LED bulbs, tube lights, panel lights, strip lights, and more', 2),
  ('switches', 'Switches & Sockets', 'switches-sockets', 'ToggleRight', 'Premium switches, sockets, dimmers, and USB outlets', 3),
  ('wires', 'Wires & Cables', 'wires-cables', 'Cable', 'Electrical wires, cables, and accessories for safe installations', 4),
  ('circuit', 'Circuit Breakers', 'circuit-breakers', 'Zap', 'MCBs, MCCBs, and distribution boards for electrical safety', 5),
  ('pvc', 'PVC Pipes', 'pvc-pipes', 'Box', 'PVC conduits, pipes, and fittings for cable management', 6),
  ('coolers', 'Air Coolers', 'air-coolers', 'Wind', 'Desert coolers, air coolers, and cooling solutions', 7),
  ('pumps', 'Water Pumps', 'water-pumps', 'Wrench', 'Electric water pumps for homes and industries', 8),
  ('tools', 'Tools & Testers', 'tools-testers', 'WrenchScrewdriver', 'Electrical testers, multimeters, and professional tools', 9),
  ('extensions', 'Extensions & Boards', 'extensions-boards', 'Power', 'Power strips, extension cords, and socket boards', 10);

-- Insert sample products
INSERT INTO products (name, slug, category_id, category_slug, category_name, description, price, old_price, image, stock, rating, tags, featured) VALUES
  ('Pak Electron Ceiling Fan 56"', 'pak-electron-ceiling-fan-56', 'fans', 'fans', 'Fans', 'Energy-efficient ceiling fan with powerful air delivery. Perfect for Pakistani summers.', 8500, 9500, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400', 25, 4.5, ARRAY['ceiling fan', 'Pak Electron', '56 inch', 'best seller'], true),
  ('Super General Pedestal Fan 18"', 'super-general-pedestal-fan-18', 'fans', 'fans', 'Fans', 'Adjustable pedestal fan with oscillation. Ideal for offices and shops.', 6500, NULL, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 30, 4.3, ARRAY['pedestal fan', 'Super General', 'adjustable'], false),
  ('Royal Wall Fan 16"', 'royal-wall-fan-16', 'fans', 'fans', 'Fans', 'Compact wall-mounted fan with remote control. Saves floor space.', 4200, NULL, 'https://images.unsplash.com/photo-1620733723572-11c53fc73571?w=400', 20, 4.2, ARRAY['wall fan', 'Royal', 'remote control'], false),
  ('GFC Exhaust Fan 8"', 'gfc-exhaust-fan-8', 'fans', 'fans', 'Fans', 'Bathroom and kitchen exhaust fan. Removes moisture and odors.', 2800, NULL, 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400', 40, 4.0, ARRAY['exhaust fan', 'GFC', 'bathroom'], false),
  ('Dawlance Ceiling Fan 56" Gold', 'dawlance-ceiling-fan-56-gold', 'fans', 'fans', 'Fans', 'Premium gold finish ceiling fan by Dawlance. Elegant design with powerful performance.', 12500, 14000, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400', 15, 4.8, ARRAY['ceiling fan', 'Dawlance', 'gold', 'premium'], true),
  ('Philips LED Bulb 12W', 'philips-led-bulb-12w', 'lights', 'lights-led', 'Lights & LED', 'Energy-saving LED bulb. Lasts up to 25,000 hours. Cool daylight.', 350, NULL, 'https://images.unsplash.com/photo-1494438879904-6779160b1c21?w=400', 200, 4.6, ARRAY['LED bulb', 'Philips', '12W', 'energy saving'], false),
  ('LED Panel Light Round 18W', 'led-panel-light-round-18w', 'lights', 'lights-led', 'Lights & LED', 'Slim LED panel light for false ceilings. Bright and uniform lighting.', 1200, 1500, 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400', 80, 4.4, ARRAY['LED panel', 'round', '18W', 'ceiling light'], true),
  ('LED Strip Light 5m RGB', 'led-strip-light-5m-rgb', 'lights', 'lights-led', 'Lights & LED', 'Colorful RGB LED strip with remote control. Perfect for decoration.', 1800, NULL, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', 60, 4.2, ARRAY['LED strip', 'RGB', 'colorful', 'decorative'], false),
  ('Philips LED Tube Light 4ft', 'philips-led-tube-light-4ft', 'lights', 'lights-led', 'Lights & LED', 'Bright 4ft LED tube light. Replaces traditional fluorescent tubes.', 550, NULL, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400', 100, 4.5, ARRAY['LED tube', 'Philips', '4ft', 'office'], false),
  ('LED Flood Light 50W', 'led-flood-light-50w', 'lights', 'lights-led', 'Lights & LED', 'Powerful LED flood light for outdoor areas. Weatherproof IP65.', 3500, NULL, 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400', 35, 4.7, ARRAY['flood light', 'LED', '50W', 'outdoor'], true),
  ('Pakistan Cables Switch Board 6-Gang', 'pakistan-cables-switch-board-6-gang', 'switches', 'switches-sockets', 'Switches & Sockets', '6-gang premium switch board by Pakistan Cables. Fire-retardant material.', 2800, NULL, 'https://images.unsplash.com/photo-1541748603027-cfa1cde8f223?w=400', 45, 4.6, ARRAY['switch board', '6-gang', 'Pakistan Cables', 'premium'], true),
  ('Universal Socket with USB', 'universal-socket-with-usb', 'switches', 'switches-sockets', 'Switches & Sockets', 'International socket with 2 USB ports. Charge phones and gadgets easily.', 850, NULL, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 70, 4.3, ARRAY['socket', 'USB', 'universal', 'charging'], false),
  ('LED Dimmer Switch', 'led-dimmer-switch', 'switches', 'switches-sockets', 'Switches & Sockets', 'Rotary dimmer for LED lights. Adjust brightness to your preference.', 1200, NULL, 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400', 40, 4.1, ARRAY['dimmer', 'LED', 'adjustable', 'switch'], false),
  ('Pakistan Cables Wire 2.5mm (90m)', 'pakistan-cables-wire-2.5mm-90m', 'wires', 'wires-cables', 'Wires & Cables', 'Premium 2.5mm electrical wire by Pakistan Cables. 90 meter roll.', 18500, NULL, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', 25, 4.8, ARRAY['wire', '2.5mm', 'Pakistan Cables', '90m roll'], true),
  ('Ferozepur Wire 1.5mm (90m)', 'ferozepur-wire-1.5mm-90m', 'wires', 'wires-cables', 'Wires & Cables', '1.5mm copper wire by Ferozepur. Ideal for lighting circuits.', 12000, NULL, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 30, 4.5, ARRAY['wire', '1.5mm', 'Ferozepur', 'lighting'], false);

-- ============================================
-- STORAGE (for product images)
-- ============================================

-- Create a bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Anyone can upload product images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can view product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Admins can delete product images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'product-images' AND
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );

-- ============================================
-- COMPLETE - Schema Ready
-- ============================================
-- This schema includes:
-- - Products with categories
-- - User profiles and auth
-- - Cart and wishlist storage
-- - Orders with status tracking
-- - Newsletter subscribers
-- - Contact messages
-- - Storage for images
-- - Row Level Security policies
-- - API functions for search and featured products